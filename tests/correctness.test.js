import { describe, it, expect } from 'vitest';
import { PatternClassifier } from '../shared/classifier.js';
import { DiagnosticWizard } from '../shared/wizard.js';
import '../shared/languages.js';
import {
  CATEGORY_PEDAGOGICAL_ORDER,
  PATTERN_PEDAGOGICAL_ORDER,
  getCategoryRank,
  getPatternRank,
  sortCategoriesByPedagogy,
  sortPatternsByPedagogy
} from '../client/src/lib/curriculum.js';

const {
  getLanguageMeta,
  getSupportedLanguagesForProblem,
  getProblemSolutionCode
} = globalThis.LanguagesModule;

describe('Correctness, Classification, and Pedagogical Logic Tests', () => {
  const classifier = new PatternClassifier();
  const wizard = new DiagnosticWizard();

  describe('1. Pattern Classifier Tests', () => {
    it('must not classify Two Sum as two-pointers-opposite', () => {
      const match = classifier.classify({
        title: 'Two Sum',
        titleSlug: 'two-sum',
        topicTags: [{ name: 'Array' }, { name: 'Hash Table' }],
        content: 'Given an array of integers nums and an integer target...',
        constraints: '2 <= nums.length <= 10^4'
      });

      expect(match.pattern_id).not.toBe('two-pointers-opposite');
      expect(match.pattern_id).toBeNull();
      expect(match.confidence).toBe(0);
    });

    it('classifies Two Pointers Dynamic Sliding Window correctly', () => {
      const match = classifier.classify({
        title: 'Longest Substring Without Repeating Characters',
        titleSlug: 'longest-substring-without-repeating-characters',
        topicTags: [{ name: 'Hash Table' }, { name: 'String' }, { name: 'Sliding Window' }],
        content: 'Given a string s, find the length of the longest substring...',
        constraints: '0 <= s.length <= 5 * 10^4'
      });

      expect(match.pattern_id).toBe('two-pointers-window-dynamic');
      expect(match.confidence).toBeGreaterThanOrEqual(0.9);
    });

    it('classifies Graph + DP K-steps correctly', () => {
      const match = classifier.classify({
        title: 'Cheapest Flights Within K Stops',
        titleSlug: 'cheapest-flights-within-k-stops',
        topicTags: [{ name: 'Dynamic Programming' }, { name: 'Depth-First Search' }, { name: 'Breadth-First Search' }, { name: 'Graph' }, { name: 'Heap (Priority Queue)' }, { name: 'Shortest Path' }],
        content: 'There are n cities connected by some number of flights. You are given an array flights...',
        constraints: 'at most k stops'
      });

      expect(match.pattern_id).toBe('graph-dp-k-steps');
      expect(match.confidence).toBeGreaterThanOrEqual(0.9);
    });

    it('classifies Kadane algorithm correctly', () => {
      const match = classifier.classify({
        title: 'Maximum Subarray',
        titleSlug: 'maximum-subarray',
        topicTags: [{ name: 'Array' }, { name: 'Divide and Conquer' }, { name: 'Dynamic Programming' }],
        content: 'Given an integer array nums, find the subarray with the largest sum and return its sum.',
        constraints: '1 <= nums.length <= 10^5'
      });

      expect(match.pattern_id).toBe('array-kadane');
      expect(match.confidence).toBeGreaterThanOrEqual(0.9);
    });
  });

  describe('2. Diagnostic Wizard Deduction Scoring', () => {
    it('deduces bitmask pattern for exponential constraints N <= 16', () => {
      const candidates = wizard.diagnose({
        structure: 'graph',
        constraints: 'n_15',
        goal: 'shortest_all_nodes',
        properties: ['exponential_subset']
      });

      expect(candidates.length).toBeGreaterThan(0);
      expect(candidates[0].pattern_id).toBe('graph-bitmask-all-nodes');
      expect(candidates[0].score).toBeGreaterThanOrEqual(95);
    });

    it('deduces graph-dp-k-steps for edge-bounded / time-bounded paths', () => {
      const candidates = wizard.diagnose({
        structure: 'graph',
        constraints: 'k_stops',
        goal: 'k_steps',
        properties: ['limited_steps']
      });

      expect(candidates.length).toBeGreaterThan(0);
      expect(candidates[0].pattern_id).toBe('graph-dp-k-steps');
      expect(candidates[0].score).toBeGreaterThanOrEqual(90);
    });

    it('deduces monotonic binary search on answer space', () => {
      const candidates = wizard.diagnose({
        structure: 'array',
        constraints: 'n_log_n',
        goal: 'min_max',
        properties: ['monotonic_predicate']
      });

      expect(candidates.some(c => c.pattern_id === 'binary-search-answer')).toBe(true);
    });
  });

  describe('3. Language Specifications & Solution Helpers', () => {
    it('resolves language metadata correctly', () => {
      const py = getLanguageMeta('python3');
      expect(py.id).toBe('python3');
      expect(py.displayName).toBe('Python 3');
      expect(py.monacoLang).toBe('python');

      const sql = getLanguageMeta('mysql');
      expect(sql.id).toBe('mysql');
      expect(sql.displayName).toBe('MySQL');
      expect(sql.monacoLang).toBe('sql');
    });

    it('filters supported languages for Database category problem', () => {
      const dbProblem = {
        category: 'Database',
        languages: ['mysql', 'mssql', 'postgresql', 'oraclesql', 'pythondata'],
        verified: 0
      };

      const supported = getSupportedLanguagesForProblem(dbProblem);
      const slugs = supported.map(s => s.id);

      expect(slugs).toEqual(['mysql', 'mssql', 'postgresql', 'oraclesql', 'pythondata']);
      expect(slugs).not.toContain('python3');
      expect(slugs).not.toContain('cpp');
      expect(slugs).not.toContain('java');
    });

    it('returns empty array when problem languages are null / unknown', () => {
      expect(getSupportedLanguagesForProblem(null)).toEqual([]);
      expect(getSupportedLanguagesForProblem({ languages: null })).toEqual([]);
      expect(getSupportedLanguagesForProblem({ languages: [] })).toEqual([]);
    });

    it('returns empty solution for unverified problem', () => {
      const unverified = {
        languages: ['python3'],
        verified: 0,
        solution_python: 'class Solution: pass'
      };
      expect(getProblemSolutionCode(unverified, 'python3')).toBe('');
    });

    it('returns verified python solution or appropriate placeholder for missing language', () => {
      const verified = {
        languages: ['python3', 'cpp', 'java'],
        verified: 1,
        solution_python: 'class Solution:\n    def solve(self):\n        return True'
      };
      expect(getProblemSolutionCode(verified, 'python3')).toContain('class Solution:');
      expect(getProblemSolutionCode(verified, 'cpp')).toContain('Verified C++ solution is not yet in the local dataset');
      expect(getProblemSolutionCode(verified, 'java')).toContain('Verified Java solution is not yet in the local dataset');
    });
  });

  describe('4. Curriculum Pedagogical Sorting', () => {
    it('maintains foundational to advanced ordering in categories', () => {
      expect(CATEGORY_PEDAGOGICAL_ORDER[0]).toBe('Arrays & Hashing');
      expect(CATEGORY_PEDAGOGICAL_ORDER[1]).toBe('Two Pointers');
      expect(CATEGORY_PEDAGOGICAL_ORDER).toContain('Dynamic Programming');
      expect(CATEGORY_PEDAGOGICAL_ORDER).toContain('Graph + DP');
      expect(PATTERN_PEDAGOGICAL_ORDER.length).toBeGreaterThan(0);

      const sorted = sortCategoriesByPedagogy(['Dynamic Programming', 'Arrays & Hashing', 'Trees']);
      expect(sorted).toEqual(['Arrays & Hashing', 'Trees', 'Dynamic Programming']);
    });

    it('places foundational patterns before advanced capstone patterns', () => {
      const patterns = [
        { id: 'dp-bitmask', title: 'Bitmask DP' },
        { id: 'prefix-sum-hashmap', title: 'Prefix Sum + Hash Map' },
        { id: 'two-pointers-opposite', title: 'Opposite Pointers' },
        { id: 'graph-tree-rerooting', title: 'Tree Rerooting' }
      ];

      const sorted = sortPatternsByPedagogy(patterns);
      const sortedIds = sorted.map(p => p.id);

      expect(sortedIds.indexOf('prefix-sum-hashmap')).toBeLessThan(sortedIds.indexOf('dp-bitmask'));
      expect(sortedIds.indexOf('two-pointers-opposite')).toBeLessThan(sortedIds.indexOf('graph-tree-rerooting'));
    });

    it('handles unknown patterns and ranks gracefully', () => {
      expect(getCategoryRank('Unknown Category')).toBe(999);
      expect(getCategoryRank(null)).toBe(999);
      expect(getPatternRank('unknown-pattern')).toBe(999);
      expect(getPatternRank(null)).toBe(999);
    });
  });
});
