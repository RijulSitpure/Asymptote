import { LeetCodeService } from './leetcode.js';
import { PatternClassifier } from './classifier.js';

export class SyncService {
  constructor(db, patterns) {
    this.db = db;
    this.patterns = patterns;
    this.leetcode = new LeetCodeService();
    this.classifier = new PatternClassifier(patterns);
  }

  /**
   * Sync recent accepted submissions for a LeetCode username
   */
  async syncUserSubmissions(username, limit = 20) {
    if (!username || !username.trim()) {
      throw new Error('LeetCode username is required');
    }

    const cleanUsername = username.trim();
    let submissions = [];

    try {
      submissions = await this.leetcode.getRecentAcceptedSubmissions(cleanUsername, limit);
    } catch (err) {
      this.db.addSyncLog('graphql', 'error', `Failed to fetch submissions for ${cleanUsername}: ${err.message}`);
      throw err;
    }

    let newlySynced = 0;
    let updatedCount = 0;

    for (const sub of submissions) {
      const slug = sub.titleSlug;
      const existing = this.db.findProblem(slug);

      if (existing) {
        if (!existing.is_solved) {
          this.db.updateProblemDetails(existing.id, {
            is_solved: true,
            solved_at: new Date(Number(sub.timestamp) * 1000).toISOString()
          });
          updatedCount++;
        }
        continue;
      }

      // Fetch problem details from LeetCode
      try {
        const details = await this.leetcode.getQuestionDetails(slug);
        if (!details) continue;

        // Classify pattern
        const classification = this.classifier.classify({
          title: details.title,
          titleSlug: slug,
          topicTags: details.topicTags || [],
          content: details.content || '',
          constraints: ''
        });

        const targetPattern = this.patterns.find(p => p.id === classification.pattern_id);
        const progressiveHints = this.classifier.generateProgressiveHints(details, targetPattern);

        this.db.upsertProblem({
          frontend_id: details.questionFrontendId || details.questionId,
          title: details.title,
          title_slug: slug,
          difficulty: details.difficulty,
          pattern_id: classification.pattern_id,
          twist_type: classification.twist_type,
          constraints: '',
          summary: details.content ? details.content.replace(/<[^>]*>?/gm, '').slice(0, 300) + '...' : '',
          trigger_clues: targetPattern ? targetPattern.mental_triggers.slice(0, 3) : [],
          hints_progressive: progressiveHints,
          solution_python: '',
          is_solved: true,
          solved_at: new Date(Number(sub.timestamp) * 1000).toISOString(),
          user_code: '',
          user_notes: `Auto-synced from LeetCode (${cleanUsername})`,
          user_rating: 3,
          review_needed: false
        });

        newlySynced++;
      } catch (err) {
        console.warn(`Could not fetch details for ${slug}:`, err.message);
      }
    }

    this.db.setSetting('leetcode_username', cleanUsername);
    this.db.setSetting('last_synced_at', new Date().toISOString());
    this.db.addSyncLog('graphql', 'success', `Synced ${newlySynced} new, ${updatedCount} updated for ${cleanUsername}`);

    return { newlySynced, updatedCount, totalProcessed: submissions.length };
  }

  /**
   * Ingest submission from Chrome Extension
   */
  async ingestFromExtension({ titleSlug, questionId, code, runtime, memory }) {
    if (!titleSlug) throw new Error('titleSlug is required');

    let existing = this.db.findProblem(titleSlug);

    if (existing) {
      this.db.updateProblemDetails(existing.id, {
        is_solved: true,
        solved_at: new Date().toISOString(),
        user_code: code || existing.user_code,
        user_notes: existing.user_notes || `Solved via Extension (${runtime || ''} ${memory || ''})`
      });
      this.db.addSyncLog('extension', 'success', `Updated solved status for ${titleSlug}`);
      return { id: existing.id, status: 'updated' };
    }

    // Try fetching question details
    let details = null;
    try {
      details = await this.leetcode.getQuestionDetails(titleSlug);
    } catch (e) {
      console.warn('Could not query leetcode for slug:', titleSlug);
    }

    const title = details?.title || titleSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const frontendId = details?.questionFrontendId || questionId || '0';
    const difficulty = details?.difficulty || 'Medium';

    const classification = this.classifier.classify({
      title,
      titleSlug,
      topicTags: details?.topicTags || [],
      content: details?.content || ''
    });

    const targetPattern = this.patterns.find(p => p.id === classification.pattern_id);
    const hints = this.classifier.generateProgressiveHints({ title }, targetPattern);

    const newId = this.db.upsertProblem({
      frontend_id: frontendId,
      title,
      title_slug: titleSlug,
      difficulty,
      pattern_id: classification.pattern_id,
      twist_type: classification.twist_type,
      constraints: '',
      summary: details?.content ? details.content.replace(/<[^>]*>?/gm, '').slice(0, 300) + '...' : '',
      trigger_clues: targetPattern?.mental_triggers.slice(0, 3) || [],
      hints_progressive: hints,
      solution_python: code || '',
      is_solved: true,
      solved_at: new Date().toISOString(),
      user_code: code || '',
      user_notes: `Synced via Extension (${runtime || ''} ${memory || ''})`,
      user_rating: 4,
      review_needed: false
    });

    this.db.addSyncLog('extension', 'success', `Captured and auto-classified ${title}`);
    return { id: newId, status: 'created', pattern_id: classification.pattern_id };
  }
}
