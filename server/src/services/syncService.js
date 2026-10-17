import { LeetCodeService } from './leetcode.js';
import { PatternClassifier } from './classifier.js';

export const KNOWN_PROBLEMS = {
  '1': { title: 'Two Sum', slug: 'two-sum', difficulty: 'Easy', tags: ['array', 'hash-table'] },
  '3': { title: 'Longest Substring Without Repeating Characters', slug: 'longest-substring-without-repeating-characters', difficulty: 'Medium', tags: ['hash-table', 'string', 'sliding-window'] },
  '5': { title: 'Longest Palindromic Substring', slug: 'longest-palindromic-substring', difficulty: 'Medium', tags: ['string', 'dynamic-programming'] },
  '11': { title: 'Container With Most Water', slug: 'container-with-most-water', difficulty: 'Medium', tags: ['array', 'two-pointers', 'greedy'] },
  '15': { title: '3Sum', slug: '3sum', difficulty: 'Medium', tags: ['array', 'two-pointers', 'sorting'] },
  '20': { title: 'Valid Parentheses', slug: 'valid-parentheses', difficulty: 'Easy', tags: ['string', 'stack'] },
  '21': { title: 'Merge Two Sorted Lists', slug: 'merge-two-sorted-lists', difficulty: 'Easy', tags: ['linked-list', 'recursion'] },
  '23': { title: 'Merge k Sorted Lists', slug: 'merge-k-sorted-lists', difficulty: 'Hard', tags: ['linked-list', 'divide-and-conquer', 'heap'] },
  '33': { title: 'Search in Rotated Sorted Array', slug: 'search-in-rotated-sorted-array', difficulty: 'Medium', tags: ['array', 'binary-search'] },
  '39': { title: 'Combination Sum', slug: 'combination-sum', difficulty: 'Medium', tags: ['array', 'backtracking'] },
  '42': { title: 'Trapping Rain Water', slug: 'trapping-rain-water', difficulty: 'Hard', tags: ['array', 'two-pointers', 'dynamic-programming', 'stack', 'monotonic-stack'] },
  '46': { title: 'Permutations', slug: 'permutations', difficulty: 'Medium', tags: ['array', 'backtracking'] },
  '48': { title: 'Rotate Image', slug: 'rotate-image', difficulty: 'Medium', tags: ['array', 'math', 'matrix'] },
  '49': { title: 'Group Anagrams', slug: 'group-anagrams', difficulty: 'Medium', tags: ['array', 'hash-table', 'string', 'sorting'] },
  '53': { title: 'Maximum Subarray', slug: 'maximum-subarray', difficulty: 'Medium', tags: ['array', 'divide-and-conquer', 'dynamic-programming'] },
  '54': { title: 'Spiral Matrix', slug: 'spiral-matrix', difficulty: 'Medium', tags: ['array', 'matrix', 'simulation'] },
  '55': { title: 'Jump Game', slug: 'jump-game', difficulty: 'Medium', tags: ['array', 'dynamic-programming', 'greedy'] },
  '56': { title: 'Merge Intervals', slug: 'merge-intervals', difficulty: 'Medium', tags: ['array', 'sorting'] },
  '57': { title: 'Insert Interval', slug: 'insert-interval', difficulty: 'Medium', tags: ['array', 'sorting'] },
  '70': { title: 'Climbing Stairs', slug: 'climbing-stairs', difficulty: 'Easy', tags: ['math', 'dynamic-programming', 'memoization'] },
  '73': { title: 'Set Matrix Zeroes', slug: 'set-matrix-zeroes', difficulty: 'Medium', tags: ['array', 'hash-table', 'matrix'] },
  '76': { title: 'Minimum Window Substring', slug: 'minimum-window-substring', difficulty: 'Hard', tags: ['hash-table', 'string', 'sliding-window'] },
  '78': { title: 'Subsets', slug: 'subsets', difficulty: 'Medium', tags: ['array', 'backtracking', 'bit-manipulation'] },
  '79': { title: 'Word Search', slug: 'word-search', difficulty: 'Medium', tags: ['array', 'backtracking', 'matrix'] },
  '98': { title: 'Validate Binary Search Tree', slug: 'validate-binary-search-tree', difficulty: 'Medium', tags: ['tree', 'depth-first search', 'binary search tree', 'binary tree'] },
  '102': { title: 'Binary Tree Level Order Traversal', slug: 'binary-tree-level-order-traversal', difficulty: 'Medium', tags: ['tree', 'breadth-first search', 'binary tree'] },
  '104': { title: 'Maximum Depth of Binary Tree', slug: 'maximum-depth-of-binary-tree', difficulty: 'Easy', tags: ['tree', 'depth-first search', 'breadth-first search', 'binary tree'] },
  '105': { title: 'Construct Binary Tree from Preorder and Inorder Traversal', slug: 'construct-binary-tree-from-preorder-and-inorder-traversal', difficulty: 'Medium', tags: ['array', 'hash-table', 'divide-and-conquer', 'tree', 'binary tree'] },
  '121': { title: 'Best Time to Buy and Sell Stock', slug: 'best-time-to-buy-and-sell-stock', difficulty: 'Easy', tags: ['array', 'dynamic-programming'] },
  '124': { title: 'Binary Tree Maximum Path Sum', slug: 'binary-tree-maximum-path-sum', difficulty: 'Hard', tags: ['dynamic-programming', 'tree', 'depth-first search', 'binary tree'] },
  '128': { title: 'Longest Consecutive Sequence', slug: 'longest-consecutive-sequence', difficulty: 'Medium', tags: ['array', 'hash-table', 'union-find'] },
  '133': { title: 'Clone Graph', slug: 'clone-graph', difficulty: 'Medium', tags: ['hash-table', 'depth-first search', 'breadth-first search', 'graph'] },
  '139': { title: 'Word Break', slug: 'word-break', difficulty: 'Medium', tags: ['hash-table', 'string', 'dynamic-programming', 'trie', 'memoization'] },
  '141': { title: 'Linked List Cycle', slug: 'linked-list-cycle', difficulty: 'Easy', tags: ['hash-table', 'linked-list', 'two-pointers'] },
  '143': { title: 'Reorder List', slug: 'reorder-list', difficulty: 'Medium', tags: ['linked-list', 'two-pointers', 'stack', 'recursion'] },
  '152': { title: 'Maximum Product Subarray', slug: 'maximum-product-subarray', difficulty: 'Medium', tags: ['array', 'dynamic-programming'] },
  '153': { title: 'Find Minimum in Rotated Sorted Array', slug: 'find-minimum-in-rotated-sorted-array', difficulty: 'Medium', tags: ['array', 'binary-search'] },
  '198': { title: 'House Robber', slug: 'house-robber', difficulty: 'Medium', tags: ['array', 'dynamic-programming'] },
  '200': { title: 'Number of Islands', slug: 'number-of-islands', difficulty: 'Medium', tags: ['array', 'depth-first search', 'breadth-first search', 'union find', 'matrix'] },
  '206': { title: 'Reverse Linked List', slug: 'reverse-linked-list', difficulty: 'Easy', tags: ['linked-list', 'recursion'] },
  '207': { title: 'Course Schedule', slug: 'course-schedule', difficulty: 'Medium', tags: ['depth-first search', 'breadth-first search', 'graph', 'topological sort'] },
  '208': { title: 'Implement Trie (Prefix Tree)', slug: 'implement-trie-prefix-tree', difficulty: 'Medium', tags: ['hash-table', 'string', 'design', 'trie'] },
  '211': { title: 'Design Add and Search Words Data Structure', slug: 'design-add-and-search-words-data-structure', difficulty: 'Medium', tags: ['string', 'depth-first search', 'design', 'trie'] },
  '212': { title: 'Word Search II', slug: 'word-search-ii', difficulty: 'Hard', tags: ['array', 'string', 'backtracking', 'trie', 'matrix'] },
  '213': { title: 'House Robber II', slug: 'house-robber-ii', difficulty: 'Medium', tags: ['array', 'dynamic-programming'] },
  '217': { title: 'Contains Duplicate', slug: 'contains-duplicate', difficulty: 'Easy', tags: ['array', 'hash-table', 'sorting'] },
  '226': { title: 'Invert Binary Tree', slug: 'invert-binary-tree', difficulty: 'Easy', tags: ['tree', 'depth-first search', 'breadth-first search', 'binary tree'] },
  '230': { title: 'Kth Smallest Element in a BST', slug: 'kth-smallest-element-in-a-bst', difficulty: 'Medium', tags: ['tree', 'depth-first search', 'binary search tree', 'binary tree'] },
  '235': { title: 'Lowest Common Ancestor of a Binary Search Tree', slug: 'lowest-common-ancestor-of-a-binary-search-tree', difficulty: 'Medium', tags: ['tree', 'depth-first search', 'binary search tree', 'binary tree'] },
  '238': { title: 'Product of Array Except Self', slug: 'product-of-array-except-self', difficulty: 'Medium', tags: ['array', 'prefix-sum'] },
  '242': { title: 'Valid Anagram', slug: 'valid-anagram', difficulty: 'Easy', tags: ['hash-table', 'string', 'sorting'] },
  '252': { title: 'Meeting Rooms', slug: 'meeting-rooms', difficulty: 'Easy', tags: ['array', 'sorting'] },
  '253': { title: 'Meeting Rooms II', slug: 'meeting-rooms-ii', difficulty: 'Medium', tags: ['array', 'two-pointers', 'greedy', 'sorting', 'heap'] },
  '268': { title: 'Missing Number', slug: 'missing-number', difficulty: 'Easy', tags: ['array', 'hash-table', 'math', 'binary-search', 'bit-manipulation', 'sorting'] },
  '295': { title: 'Find Median from Data Stream', slug: 'find-median-from-data-stream', difficulty: 'Hard', tags: ['two-pointers', 'design', 'sorting', 'heap', 'data-stream'] },
  '300': { title: 'Longest Increasing Subsequence', slug: 'longest-increasing-subsequence', difficulty: 'Medium', tags: ['array', 'binary-search', 'dynamic-programming'] },
  '312': { title: 'Burst Balloons', slug: 'burst-balloons', difficulty: 'Hard', tags: ['array', 'dynamic-programming'] },
  '322': { title: 'Coin Change', slug: 'coin-change', difficulty: 'Medium', tags: ['array', 'dynamic-programming', 'breadth-first search'] },
  '329': { title: 'Longest Increasing Path in a Matrix', slug: 'longest-increasing-path-in-a-matrix', difficulty: 'Hard', tags: ['array', 'dynamic-programming', 'depth-first search', 'breadth-first search', 'graph', 'topological sort', 'matrix'] },
  '347': { title: 'Top K Frequent Elements', slug: 'top-k-frequent-elements', difficulty: 'Medium', tags: ['array', 'hash-table', 'divide-and-conquer', 'sorting', 'heap', 'bucket-sort'] },
  '371': { title: 'Sum of Two Integers', slug: 'sum-of-two-integers', difficulty: 'Medium', tags: ['math', 'bit-manipulation'] },
  '416': { title: 'Partition Equal Subset Sum', slug: 'partition-equal-subset-sum', difficulty: 'Medium', tags: ['array', 'dynamic-programming'] },
  '417': { title: 'Pacific Atlantic Water Flow', slug: 'pacific-atlantic-water-flow', difficulty: 'Medium', tags: ['array', 'depth-first search', 'breadth-first search', 'matrix'] },
  '424': { title: 'Longest Repeating Character Replacement', slug: 'longest-repeating-character-replacement', difficulty: 'Medium', tags: ['hash-table', 'string', 'sliding-window'] },
  '435': { title: 'Non-overlapping Intervals', slug: 'non-overlapping-intervals', difficulty: 'Medium', tags: ['array', 'dynamic-programming', 'greedy', 'sorting'] },
  '560': { title: 'Subarray Sum Equals K', slug: 'subarray-sum-equals-k', difficulty: 'Medium', tags: ['array', 'hash-table', 'prefix-sum'] },
  '572': { title: 'Subtree of Another Tree', slug: 'subtree-of-another-tree', difficulty: 'Easy', tags: ['tree', 'depth-first search', 'string-matching', 'binary tree', 'hash-function'] },
  '647': { title: 'Palindromic Substrings', slug: 'palindromic-substrings', difficulty: 'Medium', tags: ['two-pointers', 'string', 'dynamic-programming'] },
  '739': { title: 'Daily Temperatures', slug: 'daily-temperatures', difficulty: 'Medium', tags: ['array', 'stack', 'monotonic-stack'] },
  '787': { title: 'Cheapest Flights Within K Stops', slug: 'cheapest-flights-within-k-stops', difficulty: 'Medium', tags: ['dynamic-programming', 'depth-first search', 'breadth-first search', 'graph', 'heap', 'shortest path'] },
  '834': { title: 'Sum of Distances in Tree', slug: 'sum-of-distances-in-tree', difficulty: 'Hard', tags: ['dynamic-programming', 'tree', 'depth-first search', 'graph'] },
  '847': { title: 'Shortest Path Visiting All Nodes', slug: 'shortest-path-visiting-all-nodes', difficulty: 'Hard', tags: ['dynamic-programming', 'bit-manipulation', 'breadth-first search', 'graph', 'bitmask'] },
  '1011': { title: 'Capacity To Ship Packages Within D Days', slug: 'capacity-to-ship-packages-within-d-days', difficulty: 'Medium', tags: ['array', 'binary-search'] },
  '1368': { title: 'Minimum Cost to Make at Least One Valid Path in a Grid', slug: 'minimum-cost-to-make-at-least-one-valid-path-in-a-grid', difficulty: 'Hard', tags: ['array', 'breadth-first search', 'graph', 'heap', 'matrix', 'shortest path'] }
};

export class SyncService {
  constructor(db, patterns, leetcode = null) {
    this.db = db;
    this.patterns = patterns;
    this.leetcode = leetcode || new LeetCodeService();
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

        const category = details.categoryTitle || null;
        const languages = details.codeSnippets && Array.isArray(details.codeSnippets)
          ? details.codeSnippets.map(s => s.langSlug)
          : null;

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
          review_needed: false,
          source: 'heuristic',
          verified: 0,
          category,
          languages
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

    const category = details?.categoryTitle || null;
    const languages = details?.codeSnippets && Array.isArray(details.codeSnippets)
      ? details.codeSnippets.map(s => s.langSlug)
      : null;

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
      review_needed: false,
      source: 'heuristic',
      verified: 0,
      category,
      languages
    });

    this.db.addSyncLog('extension', 'success', `Captured and auto-classified ${title}`);
    return { id: newId, status: 'created', pattern_id: classification.pattern_id };
  }

  /**
   * Batch ingest all solved problems (e.g. from Chrome extension or LeetCode export)
   */
  async syncBatchSolved(username, problemList = []) {
    if (!Array.isArray(problemList) || problemList.length === 0) {
      throw new Error('Problem list cannot be empty');
    }

    let newlySynced = 0;
    let updatedCount = 0;

    for (const item of problemList) {
      let frontendId = String(item.frontend_id || item.frontendId || item.id || '');
      let slug = item.title_slug || item.titleSlug;
      let title = item.title;
      let difficulty = item.difficulty || 'Medium';
      let tags = item.topicTags || [];
      let category = item.category || item.categoryTitle || null;
      let languages = item.languages || (item.codeSnippets && Array.isArray(item.codeSnippets) ? item.codeSnippets.map(s => s.langSlug) : null);

      // Enrich from known problems library if numeric ID or title matches
      if (frontendId && KNOWN_PROBLEMS[frontendId]) {
        const known = KNOWN_PROBLEMS[frontendId];
        if (!title || title.startsWith('LeetCode #')) title = known.title;
        if (!slug || slug.startsWith('problem-')) slug = known.slug;
        difficulty = known.difficulty;
        if (!tags.length) tags = known.tags;
      }

      if (!slug) slug = (title || 'problem').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      if (!title) title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      // Skip problems with invalid or missing frontend IDs
      if (!frontendId || !/^\d+$/.test(frontendId)) {
        continue;
      }

      const existing = (slug ? this.db.findProblem(slug) : null) || this.db.findProblem(frontendId);
      if (existing) {
        const updates = {
          is_solved: true,
          solved_at: item.solved_at || existing.solved_at || new Date().toISOString()
        };
        if (category && !existing.category) updates.category = category;
        if (languages && !existing.languages) updates.languages = languages;
        this.db.updateProblemDetails(existing.id, updates);
        updatedCount++;
      } else {
        const classification = this.classifier.classify({
          title,
          titleSlug: slug,
          topicTags: tags
        });

        const targetPattern = this.patterns.find(p => p.id === classification.pattern_id);
        const progressiveHints = this.classifier.generateProgressiveHints({ title }, targetPattern);

        this.db.upsertProblem({
          frontend_id: frontendId,
          title,
          title_slug: slug,
          difficulty,
          pattern_id: classification.pattern_id,
          twist_type: classification.twist_type,
          constraints: '',
          summary: `Auto-synced from LeetCode account (${username || 'User'})`,
          trigger_clues: targetPattern?.mental_triggers.slice(0, 3) || [],
          hints_progressive: progressiveHints,
          solution_python: '',
          is_solved: true,
          solved_at: item.solved_at || new Date().toISOString(),
          user_code: '',
          user_notes: `Synced via LeetCode Companion`,
          user_rating: 3,
          review_needed: false,
          source: 'heuristic',
          verified: 0,
          category,
          languages
        });
        newlySynced++;
      }
    }

    if (username) this.db.setSetting('leetcode_username', username);
    this.db.setSetting('last_synced_at', new Date().toISOString());
    this.db.addSyncLog('batch', 'success', `Synced ${newlySynced} new, ${updatedCount} updated (total ${problemList.length} questions) for ${username || 'User'}`);

    return { total: problemList.length, newlySynced, updatedCount };
  }
}
