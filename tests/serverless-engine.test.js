import { describe, it, expect, beforeAll } from 'vitest';
import path from 'node:path';
import {
  createAsymptoteEngine,
  loadDatasetFromFs,
  createMemoryStorage,
  formatHintsForDisplay,
  getProblemSolutionCode,
  loadDatasetFromFetch,
  computeSha256,
  STORAGE_KEY_OTA_DATASET_V2
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
    expect(problems.length).toBe(Object.keys(dataset.index.bySlug).length);

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

    // List problems: total count is curated + 1 uncurated
    const problems = await engine.getProblems();
    expect(problems.length).toBe(Object.keys(dataset.index.bySlug).length + 1);

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
    expect(stats.totalProblems).toBe(Object.keys(dataset.index.bySlug).length + 1);
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

  // 8. LeetCode Sync Batch Payload & Null Filter Safety
  it('8. Verifies LeetCode sync batch payload with title_slug and uncurated problems', async () => {
    const syncResult = await engine.syncBatch({
      username: 'TestUser',
      problems: [
        {
          frontend_id: '1',
          title: 'Two Sum',
          title_slug: 'two-sum',
          difficulty: 'Easy',
          category: 'Algorithms',
          languages: ['python3', 'cpp'],
          topicTags: ['Array', 'Hash Table']
        },
        {
          frontend_id: '15',
          title: '3Sum',
          title_slug: '3sum',
          difficulty: 'Medium',
          category: 'Algorithms',
          languages: ['python3'],
          topicTags: ['Array', 'Two Pointers']
        },
        {
          frontend_id: '9998',
          title: 'Future Random Problem',
          title_slug: 'future-random-problem',
          difficulty: 'Hard',
          category: 'Algorithms',
          languages: ['python3'],
          topicTags: ['Brainteaser']
        }
      ]
    });
    expect(syncResult.success).toBe(true);

    // Test null filters and solved retrieval without throwing
    const allProblems = await engine.getProblems(null);
    expect(allProblems.length).toBeGreaterThanOrEqual(29);

    const solvedProblems = await engine.getProblems({ is_solved: true });
    expect(solvedProblems.some(p => p.slug === '3sum')).toBe(true);
    expect(solvedProblems.some(p => p.slug === 'future-random-problem')).toBe(true);
    expect(solvedProblems.some(p => p.slug === 'two-sum')).toBe(true);

    const stats = await engine.getStats();
    expect(stats.totalSolved).toBeGreaterThanOrEqual(3);
  });

  // 9. Structured 3-Part Complexity & Multi-Language Code Retrieval
  it('9. Verifies structured 3-part complexity and multi-language solutions via getProblemSolutionCode', async () => {
    const algoSlugs = [
      'two-sum', 'maximum-subarray', 'valid-parentheses', 'daily-temperatures',
      'burst-balloons', 'cheapest-flights-within-k-stops', 'shortest-path-visiting-all-nodes',
      'sum-of-distances-in-tree', 'longest-increasing-path-in-a-matrix', 'minimum-cost-to-make-at-least-one-valid-path-in-a-grid'
    ];
    for (const slug of algoSlugs) {
      const { problem, complexity } = await engine.getProblemHints(slug);
      expect(complexity.whyNaiveFails, `${slug} must have whyNaiveFails`).toBeTruthy();
      expect(complexity.spaceTimeTradeoff, `${slug} must have spaceTimeTradeoff`).toBeTruthy();
      expect(complexity.interviewerExpectation, `${slug} must have interviewerExpectation`).toBeTruthy();

      for (const lang of ['python3', 'cpp', 'java', 'javascript']) {
        const code = getProblemSolutionCode(problem, lang);
        expect(code, `${slug} solution code for ${lang} must exist`).toBeTruthy();
        expect(code.length).toBeGreaterThan(0);
      }
    }

    const dbSlugs = [
      'combine-two-tables', 'second-highest-salary', 'department-highest-salary',
      'rising-temperature', 'delete-duplicate-emails'
    ];
    for (const slug of dbSlugs) {
      const { problem, complexity } = await engine.getProblemHints(slug);
      expect(complexity.whyNaiveFails, `${slug} must have whyNaiveFails`).toBeTruthy();
      expect(complexity.spaceTimeTradeoff, `${slug} must have spaceTimeTradeoff`).toBeTruthy();
      expect(complexity.interviewerExpectation, `${slug} must have interviewerExpectation`).toBeTruthy();

      for (const lang of ['mysql', 'postgresql', 'pythondata']) {
        const code = getProblemSolutionCode(problem, lang);
        expect(code, `${slug} solution code for ${lang} must exist`).toBeTruthy();
        expect(code.length).toBeGreaterThan(0);
      }
    }
  });

  // 10. Full LeetCode Problem Catalog Index Resolution
  it('10. Resolves uncurated problem metadata, category, supported languages, and suggested pattern from catalog.json', async () => {
    // Problem #3502 (Minimum Cost to Reach Every Position) - uncurated, in catalog
    const uncurated = await engine.getProblemHints(3502);
    expect(uncurated.problem).not.toBeNull();
    expect(uncurated.problem.number).toBe(3502);
    expect(uncurated.problem.slug).toBe('minimum-cost-to-reach-every-position');
    expect(uncurated.problem.title).toBe('Minimum Cost to Reach Every Position');
    expect(uncurated.problem.difficulty).toBe('Easy');
    expect(uncurated.problem.category).toBe('Algorithms');
    expect(uncurated.problem.verified).toBe(0);
    expect(uncurated.problem.verification_tier).toBe('unverified');
    expect(uncurated.problem.hints).toEqual([]);
    expect(uncurated.complexity).toBeNull();
    expect(uncurated.supported_languages.length).toBeGreaterThanOrEqual(4);
    expect(uncurated.supported_languages.some(l => l.id === 'python3')).toBe(true);

    // Problem #3500 (Minimum Cost to Divide Array Into Subarrays) - uncurated, in catalog with mapped pattern prefix-sum-hashmap
    const uncuratedProb = await engine.getProblemHints('minimum-cost-to-divide-array-into-subarrays');
    expect(uncuratedProb.problem).not.toBeNull();
    expect(uncuratedProb.problem.number).toBe(3500);
    expect(uncuratedProb.suggested_pattern).not.toBeNull();
    expect(uncuratedProb.suggested_pattern.id).toBe('prefix-sum-hashmap');
    expect(uncuratedProb.problem.verified).toBe(0);

    // Syncing an uncurated catalog problem inherits its true category and number
    const syncRes = await engine.syncBatch({
      username: 'CatalogTester',
      problems: [
        {
          title_slug: 'zigzag-conversion',
          languages: ['python3']
        }
      ]
    });
    expect(syncRes.success).toBe(true);

    const problems = await engine.getProblems();
    const syncedProb = problems.find(p => p.slug === 'zigzag-conversion');
    expect(syncedProb).toBeDefined();
    expect(syncedProb.number).toBe(6);
    expect(syncedProb.title).toBe('Zigzag Conversion');
    expect(syncedProb.category).toBe('Algorithms');
  });

  // 11. Bidirectional Key Resolution & "Unclassified" Pattern Prevention
  it('11. Resolves patterns and prevents "Unclassified" status whether user state is keyed by number or canonical slug', async () => {
    const memoryStore = createMemoryStorage({
      asymptote_user_problems: {
        '1': { is_solved: 1, title: 'Two Sum' },
        '15': { is_solved: 1, title: '3Sum' },
        '2065': { is_solved: 1, title: 'Maximum Path Quality of a Graph' }
      }
    });

    const testEngine = createAsymptoteEngine({
      dataset,
      storage: memoryStore
    });

    const solved = await testEngine.getProblems({ is_solved: 1 });
    expect(solved.length).toBe(3);

    // Two Sum (#1) - curated problem keyed by numeric string "1"
    const twoSum = solved.find(p => p.number === 1);
    expect(twoSum).toBeDefined();
    expect(twoSum.slug).toBe('two-sum');
    expect(twoSum.verified).toBe(1);
    expect(twoSum.pattern_id).toBe('hash-map-lookup');
    expect(twoSum.pattern_title).toBe('Hash Map Complement Lookup & Frequency Counting');

    // 3Sum (#15) - curated problem keyed by numeric string "15"
    const threeSum = solved.find(p => p.number === 15);
    expect(threeSum).toBeDefined();
    expect(threeSum.slug).toBe('3sum');
    expect(threeSum.verified).toBe(1);
    expect(threeSum.pattern_id).toBe('two-pointers-opposite');
    expect(threeSum.pattern_title).toBe('Opposite Ends Two Pointers');

    // Maximum Path Quality of a Graph (#2065) - uncurated catalog problem keyed by numeric string "2065"
    const maxPath = solved.find(p => p.number === 2065);
    expect(maxPath).toBeDefined();
    expect(maxPath.slug).toBe('maximum-path-quality-of-a-graph');
    expect(maxPath.verified).toBe(0);
    expect(maxPath.pattern_id).toBe('graph-bfs-shortest-path');
    expect(maxPath.pattern_title).toBe('Multi-Source BFS / Unweighted Shortest Path');

    // Verify stats calculation includes solved problems properly
    const stats = await testEngine.getStats();
    expect(stats.solvedCount).toBe(3);
    expect(stats.totalSolved).toBe(3);
  });

  // 12. Slug Alias Deduplication & Exact Solved Count Integrity
  it('12. Prevents double-counting when user storage contains historical LeetCode slug aliases (e.g. #596 classes-with-at-least-5-students)', async () => {
    const memoryStore = createMemoryStorage({
      asymptote_user_problems: {
        'classes-with-at-least-5-students': {
          is_solved: 1,
          number: 596,
          difficulty: 'Easy',
          title: 'Classes With at Least 5 Students'
        }
      }
    });

    const testEngine = createAsymptoteEngine({
      dataset,
      storage: memoryStore
    });

    const solved = await testEngine.getProblems({ is_solved: 1 });
    // Must be exactly 1 problem, not duplicated into 2
    expect(solved.length).toBe(1);
    expect(solved[0].number).toBe(596);
    expect(solved[0].slug).toBe('classes-more-than-5-students');
    expect(solved[0].difficulty).toBe('Easy');
    expect(solved[0].verified).toBe(1);

    const stats = await testEngine.getStats();
    expect(stats.solvedCount).toBe(1);
    expect(stats.difficultyBreakdown.Easy).toBe(1);

    // Also test syncBatch with alias slug
    await testEngine.syncBatch({
      username: 'TestUser',
      problems: [
        {
          frontend_id: '596',
          title_slug: 'classes-with-at-least-5-students',
          difficulty: 'Easy',
          title: 'Classes With at Least 5 Students'
        }
      ]
    });

    const updatedSolved = await testEngine.getProblems({ is_solved: 1 });
    expect(updatedSolved.length).toBe(1);
    expect(updatedSolved[0].slug).toBe('classes-more-than-5-students');

    const updatedStats = await testEngine.getStats();
    expect(updatedStats.solvedCount).toBe(1);
    expect(updatedStats.difficultyBreakdown.Easy).toBe(1);
  });

  // 13. Silent Over-The-Air (OTA) Remote Dataset Updates & Offline Fallback
  it('13. Syncs remote dataset updates silently and falls back cleanly when offline', async () => {
    const memoryStore = createMemoryStorage();
    const testEngine = createAsymptoteEngine({
      dataset,
      storage: memoryStore
    });

    const initialVersion = testEngine.getActiveDatasetVersion();
    expect(initialVersion).toBeTruthy();

    // 1. Prepare simulated updated remote shard and manifest
    const updatedProblem = {
      slug: 'two-sum',
      number: 1,
      category: 'Algorithms',
      difficulty: 'Easy',
      patterns: ['two-pointers-basic'],
      review: { status: 'tested' },
      hints: [
        {
          level: 1,
          title: 'Updated OTA Hint 1',
          text: 'This is an updated OTA progressive hint received silently from GitHub.'
        }
      ],
      solutions: [
        {
          lang: 'python3',
          code: '# Updated OTA Solution\nclass Solution:\n    def twoSum(self, nums, target):\n        return [0, 1]'
        }
      ]
    };

    const updatedAlgorithmsShard = {
      domain: 'algorithms',
      patterns: dataset.shards?.algorithms?.patterns || [],
      problems: [
        updatedProblem,
        ...(dataset.shards?.algorithms?.problems || []).filter(p => p.slug !== 'two-sum')
      ]
    };

    const updatedAlgorithmsText = JSON.stringify(updatedAlgorithmsShard);
    const updatedAlgorithmsHash = await computeSha256(updatedAlgorithmsText);

    const remoteManifest = {
      version: '2.0.0',
      datasetVersion: '1.0.4',
      checksums: {
        ...(testEngine.getActiveManifest()?.checksums || {}),
        'algorithms.json': updatedAlgorithmsHash
      }
    };

    // 2. Mock fetch for remote endpoint
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url) => {
      const urlStr = String(url);
      if (urlStr.endsWith('dataset-metadata.json') || urlStr.endsWith('manifest.json')) {
        return {
          ok: true,
          status: 200,
          json: async () => remoteManifest,
          text: async () => JSON.stringify(remoteManifest)
        };
      }
      if (urlStr.endsWith('algorithms.json')) {
        return {
          ok: true,
          status: 200,
          json: async () => updatedAlgorithmsShard,
          text: async () => updatedAlgorithmsText
        };
      }
      return {
        ok: false,
        status: 404,
        json: async () => ({}),
        text: async () => ''
      };
    };

    try {
      // 3. Trigger remote OTA dataset sync
      const syncResult = await testEngine.checkAndSyncRemoteDataset({
        remoteBaseUrl: 'https://raw.githubusercontent.com/RijulSitpure/Asymptote/main/dist-dataset'
      });

      expect(syncResult.updated).toBe(true);
      expect(syncResult.version).toBe('1.0.4');
      expect(syncResult.changedFiles).toContain('algorithms.json');
      expect(testEngine.getActiveDatasetVersion()).toBe('1.0.4');

      // 4. Verify in-memory problem and hints were updated instantly
      const updatedHints = await testEngine.getProblemHints('two-sum');
      expect(updatedHints.problem.hints[0].title).toBe('Updated OTA Hint 1');
      expect(updatedHints.problem.hints[0].text).toContain('silent');

      // 5. Verify cached dataset was persisted to storage
      const cachedStorage = await memoryStore.get(STORAGE_KEY_OTA_DATASET_V2);
      expect(cachedStorage).toBeTruthy();
      expect(cachedStorage.manifest.datasetVersion).toBe('1.0.4');
      expect(cachedStorage.shards.algorithms.problems.some(p => p.slug === 'two-sum' && p.hints[0].title === 'Updated OTA Hint 1')).toBe(true);

      // 6. Test two-tier loader: loads from storage without fetching bundled files
      const loadedFromStorage = await loadDatasetFromFetch('/dummy-path', memoryStore);
      expect(loadedFromStorage.isOta).toBe(true);
      expect(loadedFromStorage.manifest.datasetVersion).toBe('1.0.4');

      // 7. Test offline fallback: network throws, checkAndSyncRemoteDataset fails silently
      globalThis.fetch = async () => {
        throw new Error('TypeError: Failed to fetch (Network offline)');
      };

      const offlineResult = await testEngine.checkAndSyncRemoteDataset({
        remoteBaseUrl: 'https://raw.githubusercontent.com/RijulSitpure/Asymptote/main/dist-dataset'
      });

      expect(offlineResult.updated).toBe(false);
      expect(offlineResult.reason).toBe('network_offline');
      // Engine continues serving cleanly without crash
      const activeHintsOffline = await testEngine.getProblemHints('two-sum');
      expect(activeHintsOffline.problem.slug).toBe('two-sum');
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  // 14. Resilient loader fallback
  it('14. Resilient loader falls back to embedded dataset when local and remote fetch fail without throwing', async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => {
      throw new Error('TypeError: Failed to fetch (No local data or network)');
    };

    try {
      const fallbackDataset = await loadDatasetFromFetch('/nonexistent-data-dir', null);
      expect(fallbackDataset).toBeTruthy();
      expect(fallbackDataset.isFallback).toBe(true);
      expect(fallbackDataset.manifest.datasetVersion).toBe('embedded-fallback');
      expect(fallbackDataset.shards.algorithms.problems.length).toBeGreaterThan(0);

      const fallbackEngine = createAsymptoteEngine({ dataset: fallbackDataset });
      const hints = await fallbackEngine.getProblemHints('two-sum');
      expect(hints.problem).not.toBeNull();
      expect(hints.problem.slug).toBe('two-sum');
      expect(hints.hints.length).toBe(4);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

