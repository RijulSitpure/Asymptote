import { describe, it, expect, beforeAll } from 'vitest';
import path from 'node:path';
import {
  createAsymptoteEngine,
  loadDatasetFromFs,
  createMemoryStorage,
  formatHintsForDisplay,
  getProblemSolutionCode
} from '../shared/asymptote-engine.js';
import '../shared/languages.js';

describe('Shared Serverless Data Engine (Vitest Suite)', () => {
  let dataset;
  let engine;
  let storage;

  beforeAll(async () => {
    const dataDir = path.resolve(process.cwd(), 'extension', 'data');
    dataset = await loadDatasetFromFs(dataDir);
    storage = createMemoryStorage();
    engine = createAsymptoteEngine({ dataset, storage });
  });

  // 1. Dataset Loading: All 99 patterns and 27 curated problems
  it('1. Loads all 99 patterns across 6 domains and all 27 tested problems', async () => {
    const patterns = engine.getPatterns();
    expect(patterns.length).toBe(99);

    const domains = new Set(patterns.map(p => p.domain));
    expect(domains.has('Algorithms')).toBe(true);
    expect(domains.has('Database')).toBe(true);
    expect(domains.has('pandas')).toBe(true);
    expect(domains.has('Shell')).toBe(true);
    expect(domains.has('Concurrency')).toBe(true);
    expect(domains.has('JavaScript')).toBe(true);

    for (const p of patterns) {
      expect(p.id).toBeTruthy();
      expect(p.domain).toBeTruthy();
      expect(p.family).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.difficulty).toBeTruthy();
      expect(typeof p.short_description).toBe('string');
      expect(typeof p.complexity).toBe('string');
      expect(Array.isArray(p.mental_triggers)).toBe(true);
      expect(Array.isArray(p.constraint_signals)).toBe(true);
    }

    const problems = await engine.getProblems();
    expect(problems.length).toBe(27);

    for (const prob of problems) {
      expect(prob.verified).toBe(1);
      expect(['tested', 'reviewed']).toContain(prob.verification_tier);
      expect(prob.source).toBe('dataset');
      expect(prob.slug).toBeTruthy();
      expect(prob.frontend_id).toBeTruthy();
      expect(typeof prob.number).toBe('number');
      expect(prob.category).toBeTruthy();
      expect(prob.title).toBeTruthy();
      expect(prob.pattern_id).toBeTruthy();
    }
  });

  // 2. Multi-key Problem Hints Resolution
  it('2. Resolves hints by slug ("two-sum"), by number ("1"), and by title ("Two Sum")', async () => {
    // By slug
    const bySlug = await engine.getProblemHints('two-sum');
    expect(bySlug.problem).not.toBeNull();
    expect(bySlug.problem.slug).toBe('two-sum');
    expect(bySlug.problem.number).toBe(1);
    expect(bySlug.problem.title).toBe('Two Sum');

    // By number as string
    const byNumStr = await engine.getProblemHints('1');
    expect(byNumStr.problem).not.toBeNull();
    expect(byNumStr.problem.slug).toBe('two-sum');
    expect(byNumStr.problem.number).toBe(1);

    // By number as integer
    const byNumInt = await engine.getProblemHints(1);
    expect(byNumInt.problem).not.toBeNull();
    expect(byNumInt.problem.slug).toBe('two-sum');

    // By exact title
    const byTitle = await engine.getProblemHints('Two Sum');
    expect(byTitle.problem).not.toBeNull();
    expect(byTitle.problem.slug).toBe('two-sum');

    // By lowercase title
    const byLowerTitle = await engine.getProblemHints('two sum');
    expect(byLowerTitle.problem).not.toBeNull();
    expect(byLowerTitle.problem.slug).toBe('two-sum');

    // Check database problem resolution by number
    const dbProblem = await engine.getProblemHints('175');
    expect(dbProblem.problem).not.toBeNull();
    expect(dbProblem.problem.slug).toBe('combine-two-tables');
    expect(dbProblem.problem.number).toBe(175);

    // Check algorithms problem resolution by title
    const burstProblem = await engine.getProblemHints('Burst Balloons');
    expect(burstProblem.problem).not.toBeNull();
    expect(burstProblem.problem.slug).toBe('burst-balloons');
    expect(burstProblem.problem.number).toBe(312);
  });

  // 3. Locked Hint Title Spoiler Guard
  it('3. Verifies the Locked Hint Title Spoiler Guard on daily-temperatures', async () => {
    const hintData = await engine.getProblemHints('daily-temperatures');
    expect(hintData.hints.length).toBe(4);

    // Ensure raw hints contain real titles
    expect(hintData.hints[1].realTitle.toLowerCase()).toContain('monotonic stack');

    // Guard with unlockedMaxLevel = 0: All hints locked with generic titles, content null
    const lockedAll = formatHintsForDisplay(hintData.hints, 0);
    expect(lockedAll.length).toBe(4);

    expect(lockedAll[0].title).toBe('Recognize the obstacle');
    expect(lockedAll[0].locked).toBe(true);
    expect(lockedAll[0].content).toBeNull();
    expect(lockedAll[0].text).toBeNull();

    expect(lockedAll[1].title).toBe('Identify the core insight');
    expect(lockedAll[1].locked).toBe(true);
    expect(lockedAll[1].content).toBeNull();
    expect(lockedAll[1].text).toBeNull();

    expect(lockedAll[2].title).toBe('Outline the procedure');
    expect(lockedAll[2].locked).toBe(true);
    expect(lockedAll[2].content).toBeNull();

    expect(lockedAll[3].title).toBe('See the blueprint');
    expect(lockedAll[3].locked).toBe(true);
    expect(lockedAll[3].content).toBeNull();

    // Critical assertion: Monotonic Stack does NOT appear in displayed locked hints
    const stringifiedDisplay = JSON.stringify(lockedAll.map(h => ({ title: h.title, content: h.content })));
    expect(stringifiedDisplay.toLowerCase().includes('monotonic stack')).toBe(false);

    // Guard with unlockedMaxLevel = 2: L1 and L2 unlocked with real titles and content, L3 and L4 locked
    const lockedTwo = formatHintsForDisplay(hintData.hints, 2);
    expect(lockedTwo[0].locked).toBe(false);
    expect(lockedTwo[0].title).toBe(hintData.hints[0].realTitle);
    expect(typeof lockedTwo[0].content).toBe('string');
    expect(lockedTwo[0].content.length).toBeGreaterThan(10);

    expect(lockedTwo[1].locked).toBe(false);
    expect(lockedTwo[1].title).toBe(hintData.hints[1].realTitle);
    expect(typeof lockedTwo[1].content).toBe('string');
    expect(lockedTwo[1].content.length).toBeGreaterThan(10);

    expect(lockedTwo[2].locked).toBe(true);
    expect(lockedTwo[2].title).toBe('Outline the procedure');
    expect(lockedTwo[2].content).toBeNull();

    expect(lockedTwo[3].locked).toBe(true);
    expect(lockedTwo[3].title).toBe('See the blueprint');
    expect(lockedTwo[3].content).toBeNull();
  });

  // 4. Language Accuracy Across Categories
  it('4. Verifies language accuracy across categories (Algorithms, Database, Shell)', async () => {
    // Algorithms: two-sum offers python3, never mysql
    const twoSum = await engine.getProblemHints('two-sum');
    const twoSumLangs = twoSum.supported_languages.map(l => l.id);
    expect(twoSumLangs).toContain('python3');
    expect(twoSumLangs).not.toContain('mysql');
    expect(twoSum.problem.category).toBe('Algorithms');

    const twoSumCode = getProblemSolutionCode(twoSum.problem, 'python3');
    expect(twoSumCode).toContain('class Solution');
    expect(twoSumCode).toContain('twoSum');

    // Database: combine-two-tables offers mysql, never python3 or cpp
    const ctt = await engine.getProblemHints('combine-two-tables');
    const cttLangs = ctt.supported_languages.map(l => l.id);
    expect(cttLangs).toContain('mysql');
    expect(cttLangs).not.toContain('python3');
    expect(cttLangs).not.toContain('cpp');
    expect(ctt.problem.category).toBe('Database');

    const cttCode = getProblemSolutionCode(ctt.problem, 'mysql');
    expect(cttCode).toContain('LEFT JOIN Address');

    // Shell: word-frequency offers bash
    const wf = await engine.getProblemHints('word-frequency');
    const wfLangs = wf.supported_languages.map(l => l.id);
    expect(wfLangs).toContain('bash');
    expect(wf.problem.category).toBe('Shell');

    const wfCode = getProblemSolutionCode(wf.problem, 'bash');
    expect(wfCode).toContain('tr -s');
    expect(wfCode).toContain('uniq -c');
  });

  // 5. Complexity Kind Shapes
  it('5. Verifies all 3 complexity.kind shapes (big-o, query-notes, none)', async () => {
    // big-o for two-sum
    const ts = await engine.getProblemHints('two-sum');
    expect(ts.complexity.kind).toBe('big-o');
    expect(ts.complexity.time).toBe('O(N)');
    expect(ts.complexity.space).toBe('O(N)');
    expect(ts.complexity.targetTime).toBe('O(N)');
    expect(ts.complexity.targetSpace).toBe('O(N)');

    // query-notes for combine-two-tables
    const ctt = await engine.getProblemHints('combine-two-tables');
    expect(ctt.complexity.kind).toBe('query-notes');
    expect(ctt.complexity.time).toBe('O(P + A)');
    expect(ctt.complexity.space).toBe('O(P)');
    expect(ctt.complexity.targetTime).toBe('O(P + A)');

    // none for print-foobar-alternately
    const foobar = await engine.getProblemHints('print-foobar-alternately');
    expect(foobar.complexity.kind).toBe('none');
    expect(foobar.complexity.time).toBe('n/a');
    expect(foobar.complexity.space).toBe('n/a');
  });

  // 6. Uncurated Synced Problem Handling
  it('6. Verifies uncurated synced problem handling without two-pointers fallback', async () => {
    // Record submission for unknown uncurated problem #9999
    const syncRes = await engine.recordSubmission({
      titleSlug: 'uncurated-sample-problem',
      questionId: '9999',
      title: 'Uncurated Sample Problem',
      difficulty: 'Hard',
      category: 'Algorithms',
      languages: ['python3'],
      code: 'class Solution:\n    def solve(self): pass'
    });

    expect(syncRes.success).toBe(true);
    expect(syncRes.newlySynced).toBe(1);

    // List problems: total count is now 28 (27 curated + 1 uncurated)
    const problems = await engine.getProblems();
    expect(problems.length).toBe(28);

    const uncurated = problems.find(p => p.slug === 'uncurated-sample-problem');
    expect(uncurated).toBeDefined();
    expect(uncurated.is_solved).toBe(1);
    expect(uncurated.verified).toBe(0);
    expect(uncurated.verification_tier).toBe('unverified');
    expect(uncurated.pattern_id).toBeNull();
    expect(uncurated.patterns).toEqual([]);
    expect(uncurated.source).toBe('leetcode-sync');

    // Query hints for uncurated problem: must return empty hints and null pattern (never fallback to two-pointers)
    const hintRes = await engine.getProblemHints('uncurated-sample-problem');
    expect(hintRes.problem).not.toBeNull();
    expect(hintRes.verified).toBe(0);
    expect(hintRes.verification_tier).toBe('unverified');
    expect(hintRes.hints).toEqual([]);
    expect(hintRes.pattern).toBeNull();
    expect(hintRes.suggested_pattern).toBeNull();
    expect(hintRes.complexity).toBeNull();
  });

  // 7. Problem User State Updates & Stats Calculation
  it('7. Verifies updateProblemUserState and getStats calculations', async () => {
    // Mark two-sum as solved with rating and review queue
    const updated = await engine.updateProblemUserState('two-sum', {
      is_solved: 1,
      review_needed: 1,
      user_notes: 'Tested hash map invariant during mock interview',
      user_rating: 4
    });

    expect(updated).not.toBeNull();
    expect(updated.slug).toBe('two-sum');
    expect(updated.is_solved).toBe(1);
    expect(updated.review_needed).toBe(1);
    expect(updated.user_notes).toBe('Tested hash map invariant during mock interview');
    expect(updated.user_rating).toBe(4);

    // Check stats
    const stats = await engine.getStats();
    expect(stats.totalProblems).toBe(28);
    // Solved: two-sum (curated) + uncurated-sample-problem (from test 6)
    expect(stats.solvedCount).toBe(2);
    expect(stats.totalSolved).toBe(2);
    expect(stats.reviewQueueCount).toBeGreaterThanOrEqual(1);
    expect(stats.totalPatternsCount).toBe(99);
    expect(stats.coveredPatternsCount).toBeGreaterThanOrEqual(1);
    expect(stats.patternCoveragePercent).toBeGreaterThan(0);

    // Difficulty breakdown: two-sum (Easy), uncurated-sample-problem (Hard)
    expect(stats.difficultyBreakdown.Easy).toBe(1);
    expect(stats.difficultyBreakdown.Hard).toBe(1);
    expect(stats.difficultyBreakdown.Medium).toBe(0);

    // Weak spots and recent logs
    expect(Array.isArray(stats.weakSpots)).toBe(true);
    expect(stats.weakSpots.length).toBeLessThanOrEqual(6);
    expect(stats.recentLogs.length).toBeGreaterThanOrEqual(1);

    // Wizard diagnosis works through the engine
    const wizardCandidates = engine.diagnoseWizard({
      structure: 'array',
      goal: 'longest_valid_subarray'
    });
    expect(Array.isArray(wizardCandidates)).toBe(true);
    expect(wizardCandidates.length).toBeGreaterThan(0);
    expect(wizardCandidates[0].pattern_id).toBe('two-pointers-window-dynamic');
  });
});
