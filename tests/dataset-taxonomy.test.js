import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const datasetDir = path.resolve(rootDir, 'dataset');
const patternsDir = path.resolve(datasetDir, 'patterns');
const problemsDir = path.resolve(datasetDir, 'problems');

const ALLOWED_DOMAINS = [
  'Algorithms',
  'Database',
  'pandas',
  'Shell',
  'Concurrency',
  'JavaScript'
];

const ALLOWED_ALGO_FAMILIES = [
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Binary Search',
  'Stack & Queue',
  'Linked List',
  'Trees',
  'Heap',
  'Backtracking',
  'Greedy',
  'Graphs',
  'Dynamic Programming',
  'Bit Manipulation',
  'Strings',
  'Math',
  'Data Structures',
  'Design',
  'Sorting',
  'Matrix'
];

function loadAllPatterns() {
  const patternFiles = fs.readdirSync(patternsDir).filter(f => f.endsWith('.json'));
  const patterns = [];
  for (const file of patternFiles) {
    const filePath = path.join(patternsDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const p of content) {
      patterns.push({ ...p, _file: file });
    }
  }
  return patterns;
}

function loadAllProblems() {
  const problemFiles = fs.readdirSync(problemsDir).filter(f => f.endsWith('.json'));
  return problemFiles.map(file => ({
    file,
    data: JSON.parse(fs.readFileSync(path.join(problemsDir, file), 'utf8'))
  }));
}

describe('Dataset Taxonomy and Content Verification Tests', () => {
  const allPatterns = loadAllPatterns();
  const allProblems = loadAllProblems();

  it('asserts domain and family structure, no category field, and unique IDs across all patterns', () => {
    const seenIds = new Set();

    for (const pattern of allPatterns) {
      expect(pattern.category, `Pattern ${pattern.id} should not have a "category" field`).toBeUndefined();
      expect(pattern.domain, `Pattern ${pattern.id} must have a valid domain`).toBeDefined();
      expect(ALLOWED_DOMAINS, `Domain of ${pattern.id} must be in allowed list`).toContain(pattern.domain);
      expect(pattern.family, `Pattern ${pattern.id} must have a family`).toBeDefined();
      expect(typeof pattern.family).toBe('string');
      expect(pattern.family.length).toBeGreaterThan(0);

      if (pattern.domain === 'Algorithms') {
        expect(
          ALLOWED_ALGO_FAMILIES,
          `Algorithms pattern ${pattern.id} has invalid family: ${pattern.family}`
        ).toContain(pattern.family);
      }

      expect(seenIds.has(pattern.id), `Pattern ID ${pattern.id} must be unique`).toBe(false);
      seenIds.add(pattern.id);
    }
  });

  it('asserts that all 24 required new pattern IDs exist in the dataset', () => {
    const requiredIds = [
      'hash-map-lookup',
      'linked-list-pointers',
      'grid-flood-fill',
      'graph-multi-source-bfs',
      'binary-search-basic',
      'greedy-general',
      'dp-lis',
      'sorting-quickselect',
      'string-matching',
      'segment-tree-fenwick',
      'design-data-structures',
      'math-number-theory',
      'matrix-simulation',
      'null-handling',
      'correlated-subquery-exists',
      'nth-highest-limit-offset',
      'dml-update-delete',
      'dataframe-basics',
      'concat-sort-limit',
      'turn-taking',
      'deadlock-avoidance',
      'classes-and-chaining',
      'array-prototype-methods',
      'json-object-traversal'
    ];

    const existingIds = new Set(allPatterns.map(p => p.id));
    for (const id of requiredIds) {
      expect(existingIds.has(id), `Required pattern ID ${id} is missing from dataset`).toBe(true);
    }
  });

  it('asserts specific Algorithms pattern constraints and trigger rules', () => {
    const rerooting = allPatterns.find(p => p.id === 'graph-tree-rerooting');
    expect(rerooting, 'graph-tree-rerooting must exist').toBeDefined();
    expect(rerooting.family).toBe('Dynamic Programming');
    const hasRecursionSignal = rerooting.constraint_signals?.some(s => /recursion/i.test(s));
    expect(hasRecursionSignal, 'graph-tree-rerooting constraint signals must mention recursion').toBe(true);

    const kadane = allPatterns.find(p => p.id === 'array-kadane');
    expect(kadane, 'array-kadane must exist').toBeDefined();
    const kadaneMentionsProduct = kadane.mental_triggers?.some(t => /product/i.test(t));
    expect(kadaneMentionsProduct, 'array-kadane triggers must not mention "product"').toBe(false);

    const dp1d = allPatterns.find(p => p.id === 'dp-1d-fib-linear');
    expect(dp1d, 'dp-1d-fib-linear must exist').toBeDefined();
    const dp1dMentionsCoinChange = dp1d.mental_triggers?.some(t => /coin change/i.test(t));
    expect(dp1dMentionsCoinChange, 'dp-1d-fib-linear triggers must not mention "Coin change"').toBe(false);

    const knapsack = allPatterns.find(p => p.id === 'dp-knapsack-variants');
    expect(knapsack, 'dp-knapsack-variants must exist').toBeDefined();
    const knapsackMentionsCoinChange = knapsack.mental_triggers?.some(t => /coin change/i.test(t));
    expect(knapsackMentionsCoinChange, 'dp-knapsack-variants triggers must mention "Coin change"').toBe(true);

    const slidingWindowDeque = allPatterns.find(p => p.id === 'queue-monotonic-sliding-window');
    expect(slidingWindowDeque, 'queue-monotonic-sliding-window must exist').toBeDefined();
    const dequeSignal = slidingWindowDeque.constraint_signals?.some(
      s => s.includes('O(N log N)') && s.includes('usually passes')
    );
    expect(dequeSignal, 'queue-monotonic-sliding-window must state heap runs in O(N log N) and usually passes').toBe(true);
  });

  it('asserts Database pattern complexity, constraint signals, and dialect notes', () => {
    const rcte = allPatterns.find(p => p.id === 'recursive-cte');
    expect(rcte, 'recursive-cte must exist').toBeDefined();
    const complexityStr = rcte.complexity || '';
    expect(
      complexityStr.toLowerCase().includes('rows produced'),
      'recursive-cte complexity must contain "rows produced"'
    ).toBe(true);
    expect(
      /time:.*?rows produced/i.test(complexityStr) && /space:.*?rows produced/i.test(complexityStr),
      'recursive-cte complexity must contain "rows produced" for both time and space'
    ).toBe(true);
    expect(rcte.dialect_notes?.mysql, 'recursive-cte must have dialect_notes.mysql').toBeDefined();
    expect(rcte.dialect_notes.mysql).toContain('1000');

    const runningTotal = allPatterns.find(p => p.id === 'running-total');
    expect(runningTotal, 'running-total must exist').toBeDefined();
    const rtSignals = runningTotal.constraint_signals || [];
    const hasRangeAndRows = rtSignals.some(
      s => s.includes('RANGE') && s.includes('ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW')
    );
    expect(
      hasRangeAndRows,
      'running-total constraint signals must mention both RANGE and "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW"'
    ).toBe(true);

    const setOps = allPatterns.find(p => p.id === 'set-operations');
    expect(setOps, 'set-operations must exist').toBeDefined();
    expect(setOps.dialect_notes?.mysql, 'set-operations dialect_notes.mysql must exist').toBeDefined();
    expect(setOps.dialect_notes.mysql).toContain('8.0.31');
    expect(setOps.dialect_notes?.oraclesql, 'set-operations dialect_notes.oraclesql must exist').toBeDefined();
    expect(setOps.dialect_notes.oraclesql).toContain('MINUS');

    const strHandling = allPatterns.find(p => p.id === 'string-handling');
    expect(strHandling, 'string-handling must exist').toBeDefined();
    const dn = strHandling.dialect_notes || {};
    expect(dn.mysql, 'string-handling dialect_notes.mysql must exist').toBeDefined();
    expect(dn.postgresql, 'string-handling dialect_notes.postgresql must exist').toBeDefined();
    expect(dn.mssql, 'string-handling dialect_notes.mssql must exist').toBeDefined();
    expect(dn.oraclesql, 'string-handling dialect_notes.oraclesql must exist').toBeDefined();
    expect(dn.mysql).toContain('GROUP_CONCAT');
    expect(dn.postgresql).toContain('STRING_AGG');
    expect(dn.mssql).toContain('STRING_AGG');
    expect(dn.oraclesql).toContain('LISTAGG');
  });

  it('asserts Concurrency pattern complexity, correctness notes, and trigger isolation', () => {
    const boundedCapacity = allPatterns.find(p => p.id === 'bounded-capacity');
    expect(boundedCapacity, 'pattern with id "bounded-capacity" must not exist').toBeUndefined();

    const concPatterns = allPatterns.filter(p => p.domain === 'Concurrency');
    expect(concPatterns.length).toBeGreaterThan(0);
    for (const cp of concPatterns) {
      expect(cp.complexity, `${cp.id} complexity must be "n/a"`).toBe('n/a');
      expect(Array.isArray(cp.correctness_notes), `${cp.id} must have correctness_notes array`).toBe(true);
      expect(cp.correctness_notes.length, `${cp.id} correctness_notes must not be empty`).toBeGreaterThan(0);
    }

    for (const p of allPatterns) {
      const triggersText = (p.mental_triggers || []).join(' ');
      if (/foobar/i.test(triggersText)) {
        expect(p.id, `FooBar must only appear in turn-taking triggers (found in ${p.id})`).toBe('turn-taking');
      }
      if (/dining philosophers/i.test(triggersText)) {
        expect(
          p.id,
          `Dining Philosophers must only appear in deadlock-avoidance triggers (found in ${p.id})`
        ).toBe('deadlock-avoidance');
      }
    }
  });

  it('asserts Shell pattern triggers and dialect notes', () => {
    const textFilter = allPatterns.find(p => p.id === 'text-filter');
    expect(textFilter, 'text-filter must exist').toBeDefined();
    const tfHasPhone = textFilter.mental_triggers?.some(t => t.includes('Valid Phone Numbers'));
    expect(tfHasPhone, 'text-filter triggers must mention "Valid Phone Numbers"').toBe(true);

    const fieldProc = allPatterns.find(p => p.id === 'field-processing');
    expect(fieldProc, 'field-processing must exist').toBeDefined();
    const fpHasTranspose = fieldProc.mental_triggers?.some(t => t.includes('Transpose File'));
    expect(fpHasTranspose, 'field-processing triggers must mention "Transpose File"').toBe(true);

    const countSort = allPatterns.find(p => p.id === 'count-and-sort');
    expect(countSort, 'count-and-sort must exist').toBeDefined();
    const csHasWordFreq = countSort.mental_triggers?.some(t => t.includes('Word Frequency'));
    expect(csHasWordFreq, 'count-and-sort triggers must mention "Word Frequency"').toBe(true);

    const shellPatterns = allPatterns.filter(p => p.domain === 'Shell');
    expect(shellPatterns.length).toBeGreaterThan(0);
    for (const sp of shellPatterns) {
      expect(sp.dialect_notes?.bash, `${sp.id} must have dialect_notes.bash`).toBeDefined();
      expect(typeof sp.dialect_notes.bash).toBe('string');
      expect(sp.dialect_notes.bash.length).toBeGreaterThan(0);
    }
  });

  it('asserts JavaScript closures triggers and object-array-utilities memoize isolation', () => {
    const closures = allPatterns.find(p => p.id === 'closures');
    expect(closures, 'closures must exist').toBeDefined();
    const closuresMentionsMemoize = closures.mental_triggers?.some(t => /memoize/i.test(t));
    expect(closuresMentionsMemoize, 'closures triggers must mention "Memoize"').toBe(true);

    const objUtils = allPatterns.find(p => p.id === 'object-array-utilities');
    expect(objUtils, 'object-array-utilities must exist').toBeDefined();
    const combinedObjUtilsText = [
      objUtils.title || '',
      objUtils.short_description || '',
      ...(objUtils.mental_triggers || []),
      ...(objUtils.constraint_signals || [])
    ].join(' ');
    expect(
      /memoize|memoization/i.test(combinedObjUtilsText),
      'object-array-utilities must have no mention of memoize anywhere'
    ).toBe(false);
  });

  it('asserts problem files tested review status and verified solutions', () => {
    expect(allProblems.length).toBe(1270);
    for (const { file, data } of allProblems) {
      expect(data.review?.status, `${file} review.status must be "tested"`).toBe('tested');
      expect(Array.isArray(data.solutions), `${file} must have solutions array`).toBe(true);
      expect(data.solutions.length).toBeGreaterThan(0);
      for (const sol of data.solutions) {
        expect(sol.verifiedBy, `${file} solution verifiedBy must be "tests"`).toBe('tests');
        expect(sol.testedOn, `${file} solution testedOn must be set`).toMatch(/^2026-10-(?:1[78]|2[01345])$/);
      }
    }
  });

  it('asserts dp-interval has expected algorithmic twists', () => {
    const datasetInterval = allPatterns.find(p => p.id === 'dp-interval');
    expect(datasetInterval, 'dataset dp-interval must exist').toBeDefined();
    expect(datasetInterval.twists).toEqual([
      {
        title: 'Twist 1: Burst Balloons (Reverse Thinking)',
        explanation: 'Choose which balloon k is burst LAST in range (i, j) to keep subproblems independent (LC 312).'
      }
    ]);
  });

  it('asserts 3-part structured complexity analysis on all curated problems', () => {
    expect(allProblems.length).toBe(1270);
    for (const { file, data } of allProblems) {
      expect(data.complexity, `${file} must have complexity`).toBeDefined();
      expect(typeof data.complexity.whyNaiveFails, `${file} whyNaiveFails must be string`).toBe('string');
      expect(data.complexity.whyNaiveFails.trim().length, `${file} whyNaiveFails must be non-empty`).toBeGreaterThan(0);

      expect(typeof data.complexity.spaceTimeTradeoff, `${file} spaceTimeTradeoff must be string`).toBe('string');
      expect(data.complexity.spaceTimeTradeoff.trim().length, `${file} spaceTimeTradeoff must be non-empty`).toBeGreaterThan(0);
      expect(typeof data.complexity.interviewerExpectation, `${file} interviewerExpectation must be string`).toBe('string');
      expect(data.complexity.interviewerExpectation.trim().length, `${file} interviewerExpectation must be non-empty`).toBeGreaterThan(0);
    }
  });

  it('asserts multi-language solutions across curated categories', () => {
    const algoProblems = allProblems.filter(({ data }) => data.category === 'Algorithms');
    expect(algoProblems.length).toBe(1238);
    for (const { file, data } of algoProblems) {
      const langs = (data.solutions || []).map(s => s.lang);
      expect(langs, `${file} must support python3, cpp, java, javascript`).toEqual(
        expect.arrayContaining(['python3', 'cpp', 'java', 'javascript'])
      );
      for (const lang of ['python3', 'cpp', 'java', 'javascript']) {
        const sol = data.solutions.find(s => s.lang === lang);
        expect(sol, `${file} solution for ${lang} must exist`).toBeDefined();
        expect(sol.code.trim().length, `${file} solution code for ${lang} must be non-empty`).toBeGreaterThan(0);
        expect(sol.verifiedBy, `${file} solution for ${lang} must be verified by tests`).toBe('tests');
      }
    }

    const dbProblems = allProblems.filter(({ data }) => data.category === 'Database');
    expect(dbProblems.length).toBe(13);
    for (const { file, data } of dbProblems) {
      const langs = (data.solutions || []).map(s => s.lang);
      expect(langs, `${file} must support mysql, postgresql, pythondata`).toEqual(
        expect.arrayContaining(['mysql', 'postgresql', 'pythondata'])
      );
      for (const lang of ['mysql', 'postgresql', 'pythondata']) {
        const sol = data.solutions.find(s => s.lang === lang);
        expect(sol, `${file} solution for ${lang} must exist`).toBeDefined();
        expect(sol.code.trim().length, `${file} solution code for ${lang} must be non-empty`).toBeGreaterThan(0);
        expect(sol.verifiedBy, `${file} solution for ${lang} must be verified by tests`).toBe('tests');
      }
    }

    const concProblems = allProblems.filter(({ data }) => data.category === 'Concurrency');
    expect(concProblems.length).toBe(3);
    for (const { file, data } of concProblems) {
      const langs = (data.solutions || []).map(s => s.lang);
      expect(langs, `${file} must support python3, cpp, java`).toEqual(
        expect.arrayContaining(['python3', 'cpp', 'java'])
      );
    }

    const jsProblems = allProblems.filter(({ data }) => data.category === 'JavaScript');
    expect(jsProblems.length).toBe(6);
    for (const { file, data } of jsProblems) {
      const langs = (data.solutions || []).map(s => s.lang);
      expect(langs, `${file} must support javascript, typescript`).toEqual(
        expect.arrayContaining(['javascript', 'typescript'])
      );
    }

    const pdProblems = allProblems.filter(({ data }) => data.category === 'pandas');
    expect(pdProblems.length).toBe(7);
    for (const { file, data } of pdProblems) {
      const langs = (data.solutions || []).map(s => s.lang);
      expect(langs, `${file} must support pythondata`).toEqual(
        expect.arrayContaining(['pythondata'])
      );
    }
  });
});
