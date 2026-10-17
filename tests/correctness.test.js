import { describe, it, expect, beforeAll } from 'vitest';
import { DBManager } from '../server/src/db/database.js';
import { PatternClassifier } from '../server/src/services/classifier.js';
import { ComplexityService } from '../server/src/services/complexityService.js';
import '../shared/languages.js';

const {
  getSupportedLanguagesForProblem,
  getProblemSolutionCode
} = globalThis.LanguagesModule;

describe('Correctness and Category Support Tests (In-Memory Fixtures)', () => {
  let db;
  let classifier;
  let complexityService;

  beforeAll(() => {
    // 100% in-memory database independent of local server/data/tracker.db
    db = new DBManager(':memory:');
    const patterns = db.getPatterns();
    classifier = new PatternClassifier(patterns);
    complexityService = new ComplexityService();

    // Seed fixture rows for heuristic problems
    db.upsertProblem({
      frontend_id: '1',
      title: 'Two Sum',
      title_slug: 'two-sum',
      difficulty: 'Easy',
      pattern_id: null,
      twist_type: null,
      constraints: '2 <= nums.length <= 10^4',
      summary: 'Given an array of integers nums and an integer target...',
      trigger_clues: [],
      hints_progressive: [],
      solution_python: '',
      is_solved: true,
      solved_at: '2026-10-10T23:17:53.837Z',
      user_code: '',
      user_notes: 'Synced via Companion',
      user_rating: 5,
      review_needed: false,
      source: 'heuristic',
      verified: 0,
      category: 'Algorithms',
      languages: ['cpp', 'java', 'python3', 'python', 'javascript', 'typescript']
    });

    db.upsertProblem({
      frontend_id: '175',
      title: 'Combine Two Tables',
      title_slug: 'combine-two-tables',
      difficulty: 'Easy',
      pattern_id: null,
      twist_type: null,
      constraints: '',
      summary: 'Write a solution to report the first name, last name, city, and state...',
      trigger_clues: [],
      hints_progressive: [],
      solution_python: '',
      is_solved: true,
      solved_at: '2026-10-11T00:13:36.860Z',
      user_code: '',
      user_notes: 'Synced via Companion',
      user_rating: 3,
      review_needed: false,
      source: 'heuristic',
      verified: 0,
      category: 'Database',
      languages: ['mysql', 'mssql', 'postgresql', 'oraclesql', 'pythondata']
    });
  });

  describe('1. Two Sum Classification & Verification', () => {
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

    it('Two Sum row in database has verified=0, null pattern_id, and empty hints', () => {
      const twoSum = db.findProblem('two-sum');
      expect(twoSum).toBeDefined();
      expect(twoSum.verified).toBe(0);
      expect(twoSum.source).toBe('heuristic');
      expect(twoSum.pattern_id).toBeNull();
      expect(twoSum.hints_progressive).toEqual([]);
      expect(twoSum.trigger_clues).toEqual([]);
    });
  });

  describe('2. Combine Two Tables (Database Category)', () => {
    it('has no pattern, returns empty hints/unverified state, and lists only database languages', () => {
      const combineTables = db.findProblem('combine-two-tables');
      expect(combineTables).toBeDefined();
      expect(combineTables.category).toBe('Database');
      expect(combineTables.pattern_id).toBeNull();
      expect(combineTables.verified).toBe(0);
      expect(combineTables.hints_progressive).toEqual([]);

      const supported = getSupportedLanguagesForProblem(combineTables);
      const supportedSlugs = supported.map(l => l.id || l.langSlug);

      // Only database languages: mysql, mssql, postgresql, oraclesql, pythondata
      expect(supportedSlugs).toEqual(['mysql', 'mssql', 'postgresql', 'oraclesql', 'pythondata']);
      expect(supportedSlugs).not.toContain('python3');
      expect(supportedSlugs).not.toContain('cpp');
      expect(supportedSlugs).not.toContain('java');
    });
  });

  describe('3. Language Filtering & Solutions', () => {
    it('returns only supported languages from problem data', () => {
      const problem = {
        languages: ['mysql', 'postgresql'],
        verified: 0
      };
      const supported = getSupportedLanguagesForProblem(problem);
      expect(supported.map(s => s.id)).toEqual(['mysql', 'postgresql']);
      expect(supported[0].name).toBe('MySQL');
      expect(supported[1].name).toBe('PostgreSQL');
    });

    it('returns empty array when problem languages are null / unknown (nullable loading state)', () => {
      const unknownProb = {
        languages: null,
        category: null,
        verified: 0
      };
      expect(getSupportedLanguagesForProblem(unknownProb)).toEqual([]);
    });

    it('returns empty solution for unverified problem', () => {
      const unverified = {
        languages: ['python3'],
        verified: 0,
        solution_python: 'class Solution: pass'
      };
      expect(getProblemSolutionCode(unverified, 'python3')).toBe('');
    });

    it('returns "No verified solution in <language> yet" when verified problem lacks requested language', () => {
      const verified = {
        languages: ['python3', 'cpp', 'java'],
        verified: 1,
        solution_python: 'class Solution:\n    def solve(self):\n        return True'
      };
      expect(getProblemSolutionCode(verified, 'python3')).toContain('class Solution:');
      expect(getProblemSolutionCode(verified, 'cpp')).toBe('No verified solution in C++ yet');
      expect(getProblemSolutionCode(verified, 'java')).toBe('No verified solution in Java yet');
    });
  });

  describe('4. Curated Problem #312 Burst Balloons', () => {
    it('returns 4 progressive hints and verified complexity', () => {
      const balloon = db.findProblem('312');
      expect(balloon).toBeDefined();
      expect(balloon.source).toBe('curated');
      expect(balloon.verified).toBe(1);
      expect(balloon.pattern_id).toBe('dp-interval');

      // 4 progressive hints
      expect(balloon.hints_progressive).toHaveLength(4);
      expect(balloon.hints_progressive[0].level).toBe(1);
      expect(balloon.hints_progressive[3].level).toBe(4);

      // Verified complexity
      const pattern = db.getPatternById(balloon.pattern_id);
      const complexity = complexityService.analyze(balloon, pattern);
      expect(complexity).not.toBeNull();
      expect(complexity.targetTime).toContain('O(N³)');
      expect(complexity.targetSpace).toContain('O(N²)');
    });
  });
});
