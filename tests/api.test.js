import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { DBManager } from '../server/src/db/database.js';
import { createServer } from '../server/src/index.js';

class FakeLeetCodeService {
  constructor(customResponses = {}) {
    this.customResponses = customResponses;
    this.calls = [];
  }

  async getQuestionDetails(titleSlug) {
    this.calls.push({ method: 'getQuestionDetails', titleSlug });
    if (this.customResponses[titleSlug] !== undefined) {
      return this.customResponses[titleSlug];
    }
    if (titleSlug === '312' || titleSlug === 'burst-balloons') {
      return {
        questionId: '312',
        questionFrontendId: '312',
        title: 'Burst Balloons',
        titleSlug: 'burst-balloons',
        categoryTitle: 'Algorithms',
        difficulty: 'Hard',
        topicTags: [{ name: 'Array' }, { name: 'Dynamic Programming' }],
        codeSnippets: [
          { lang: 'Python3', langSlug: 'python3' },
          { lang: 'C++', langSlug: 'cpp' },
          { lang: 'Java', langSlug: 'java' }
        ]
      };
    }
    if (titleSlug === '1' || titleSlug === 'two-sum') {
      return {
        questionId: '1',
        questionFrontendId: '1',
        title: 'Two Sum',
        titleSlug: 'two-sum',
        categoryTitle: 'Algorithms',
        difficulty: 'Easy',
        topicTags: [{ name: 'Array' }, { name: 'Hash Table' }],
        codeSnippets: [
          { lang: 'Python3', langSlug: 'python3' },
          { lang: 'C++', langSlug: 'cpp' },
          { lang: 'Java', langSlug: 'java' }
        ]
      };
    }
    // Return null ("not found") for unresolvable cases
    return null;
  }

  async getRecentAcceptedSubmissions(username, limit = 20) {
    this.calls.push({ method: 'getRecentAcceptedSubmissions', username, limit });
    return [];
  }

  async query(query, variables = {}) {
    this.calls.push({ method: 'query', query, variables });
    return { question: null };
  }
}

describe('Server API Endpoints Test Suite (In-Memory Database)', () => {
  let server;
  let db;
  let fakeLeetCode;
  let baseUrl;

  beforeAll(async () => {
    // Isolated in-memory database with curated patterns and default seeds
    db = new DBManager(':memory:');

    // Add a specific problem with review_needed = true to verify the review queue
    db.upsertProblem({
      frontend_id: '99',
      title: 'Recover Binary Search Tree',
      title_slug: 'recover-binary-search-tree',
      difficulty: 'Medium',
      pattern_id: 'tree-bst-properties',
      twist_type: '',
      constraints: 'The number of nodes in the tree is in the range [2, 1000].',
      summary: 'Two elements of a binary search tree (BST) are swapped by mistake.',
      trigger_clues: ['Inorder traversal of BST produces sorted array'],
      hints_progressive: ['Consider in-order traversal'],
      solution_python: 'class Solution: pass',
      is_solved: true,
      solved_at: '2026-10-10T12:00:00.000Z',
      user_code: '# user code',
      user_notes: 'Needs spaced repetition review',
      user_rating: 2,
      review_needed: true,
      source: 'curated',
      verified: 1,
      category: 'Algorithms',
      languages: ['python3', 'cpp', 'java']
    });

    // Ensure problem 312 in test fixture has languages and category set so tests run completely offline
    const prob312 = db.findProblem('312');
    if (prob312) {
      db.updateProblemDetails(prob312.id, {
        category: 'Algorithms',
        languages: ['python3', 'cpp', 'java']
      });
    }

    fakeLeetCode = new FakeLeetCodeService();
    const instance = createServer(db, fakeLeetCode);
    server = instance.server;

    await new Promise(resolve => {
      server.listen(0, '127.0.0.1', resolve);
    });

    const port = server.address().port;
    baseUrl = `http://127.0.0.1:${port}`;
  });

  afterAll(async () => {
    if (server) {
      await new Promise(resolve => server.close(resolve));
    }
  });

  it('Network guard - fails any attempt to make a real external network request', async () => {
    await expect(fetch('https://leetcode.com/graphql/')).rejects.toThrow(
      /Real network request forbidden during tests/
    );
  });

  it('GET /api/stats - returns HTTP 200 and comprehensive analytics fields without SQL ambiguity', async () => {
    const res = await fetch(`${baseUrl}/api/stats`);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toHaveProperty('totalProblems');
    expect(data).toHaveProperty('solvedCount');
    expect(data).toHaveProperty('totalSolved');
    expect(data).toHaveProperty('reviewQueueCount');
    expect(data).toHaveProperty('totalPatternsCount');
    expect(data).toHaveProperty('coveredPatternsCount');
    expect(data).toHaveProperty('patternCoveragePercent');
    expect(data).toHaveProperty('difficultyBreakdown');
    expect(data).toHaveProperty('categoryDistribution');
    expect(data).toHaveProperty('patternDistribution');
    expect(data).toHaveProperty('weakSpots');

    expect(typeof data.totalProblems).toBe('number');
    expect(typeof data.solvedCount).toBe('number');
    expect(Array.isArray(data.patternDistribution)).toBe(true);
    expect(Array.isArray(data.categoryDistribution)).toBe(true);
    expect(Array.isArray(data.weakSpots)).toBe(true);

    // Verify patternDistribution items have required properties
    if (data.patternDistribution.length > 0) {
      const p = data.patternDistribution[0];
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('title');
      expect(p).toHaveProperty('category');
      expect(p).toHaveProperty('total_problems');
      expect(p).toHaveProperty('solved_problems');
    }
  });

  it('GET /api/problems - returns HTTP 200 and problem list with joined pattern metadata', async () => {
    const res = await fetch(`${baseUrl}/api/problems`);
    expect(res.status).toBe(200);

    const list = await res.json();
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);

    const problem = list[0];
    expect(problem).toHaveProperty('id');
    expect(problem).toHaveProperty('frontend_id');
    expect(problem).toHaveProperty('title');
    expect(problem).toHaveProperty('title_slug');
    expect(problem).toHaveProperty('difficulty');
    expect(problem).toHaveProperty('source');
    expect(problem).toHaveProperty('verified');
    expect(problem).toHaveProperty('pattern_title');
    expect(problem).toHaveProperty('pattern_category');
  });

  it('GET /api/problems/:id - returns HTTP 200 and single problem details', async () => {
    const listRes = await fetch(`${baseUrl}/api/problems`);
    const list = await listRes.json();
    const target = list[0];

    const res = await fetch(`${baseUrl}/api/problems/${target.id}`);
    expect(res.status).toBe(200);

    const problem = await res.json();
    expect(problem.id).toBe(target.id);
    expect(problem.frontend_id).toBe(target.frontend_id);
    expect(problem.title).toBe(target.title);
    expect(problem).toHaveProperty('trigger_clues');
    expect(problem).toHaveProperty('hints_progressive');
  });

  it('GET /api/patterns - returns HTTP 200 and all pedagogical patterns', async () => {
    const res = await fetch(`${baseUrl}/api/patterns`);
    expect(res.status).toBe(200);

    const patterns = await res.json();
    expect(Array.isArray(patterns)).toBe(true);
    expect(patterns.length).toBeGreaterThanOrEqual(37);

    const first = patterns[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('title');
    expect(first).toHaveProperty('category');
    expect(first).toHaveProperty('difficulty');
    expect(first).toHaveProperty('short_description');
    expect(first).toHaveProperty('mental_triggers');
    expect(first).toHaveProperty('constraint_signals');
    expect(Array.isArray(first.mental_triggers)).toBe(true);
  });

  it('GET /api/patterns/:id - returns HTTP 200 and pattern with associated problems', async () => {
    const res = await fetch(`${baseUrl}/api/patterns/tree-bst-properties`);
    expect(res.status).toBe(200);

    const pattern = await res.json();
    expect(pattern.id).toBe('tree-bst-properties');
    expect(pattern.title).toBe('Binary Search Tree (Inorder Sorted Property)');
    expect(pattern).toHaveProperty('problems');
    expect(Array.isArray(pattern.problems)).toBe(true);
  });

  it('GET /api/problems?review_needed=true - returns HTTP 200 and filtered review queue', async () => {
    const res = await fetch(`${baseUrl}/api/problems?review_needed=true`);
    expect(res.status).toBe(200);

    const queue = await res.json();
    expect(Array.isArray(queue)).toBe(true);
    expect(queue.length).toBeGreaterThanOrEqual(1);

    for (const item of queue) {
      expect(item.review_needed).toBe(true);
    }
  });

  it('GET /api/hints/:query - returns HTTP 200, hints, complexity and supported languages', async () => {
    const res = await fetch(`${baseUrl}/api/hints/312`);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toHaveProperty('problem');
    expect(data).toHaveProperty('pattern');
    expect(data).toHaveProperty('hints');
    expect(data).toHaveProperty('complexity');
    expect(data).toHaveProperty('supported_languages');

    expect(data.problem.frontend_id).toBe('312');
    expect(Array.isArray(data.hints)).toBe(true);
    expect(data.hints.length).toBeGreaterThan(0);
  });

  it('GET /api/hints/:query - unresolved slug never invents fake id and returns problem in-memory without saving to db', async () => {
    const unresolvableSlug = 'unresolvable-unknown-problem-xyz';
    const res = await fetch(`${baseUrl}/api/hints/${unresolvableSlug}`);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toHaveProperty('problem');
    expect(data.problem.id).toBeNull();
    expect(data.problem.verified).toBe(0);
    expect(data.problem.frontend_id).toBeNull();

    // Verify it was NOT saved into SQLite database
    const saved = db.findProblem(unresolvableSlug);
    expect(saved).toBeNull();
  });

  it('GET /api/hints/:query - unknown numeric query never invents timestamp id or problem- slug and is not saved to db', async () => {
    const unknownId = '999888';
    const res = await fetch(`${baseUrl}/api/hints/${unknownId}`);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toHaveProperty('problem');
    expect(data.problem.id).toBeNull();
    expect(data.problem.title_slug).toBeNull();
    expect(data.problem.title_slug).not.toBe('problem-999888');

    // Verify it was NOT saved into SQLite database
    const saved = db.findProblem(unknownId);
    expect(saved).toBeNull();
  });

  it('GET /api/complexity/:query - returns HTTP 200 and complexity bounds for problem', async () => {
    const res = await fetch(`${baseUrl}/api/complexity/312`);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toHaveProperty('problem_id');
    expect(data).toHaveProperty('frontend_id');
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('verified');
    expect(data).toHaveProperty('complexity');

    expect(data.frontend_id).toBe('312');
    expect(data.verified).toBe(true);
    expect(data.complexity).not.toBeNull();
    expect(data.complexity).toHaveProperty('targetTime');
    expect(data.complexity).toHaveProperty('targetSpace');
  });

  it('POST /api/wizard/diagnose - returns HTTP 200 and ranked pattern candidates', async () => {
    const res = await fetch(`${baseUrl}/api/wizard/diagnose`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        constraints: 'n_small',
        structure: 'graph',
        goal: 'shortest_all_nodes'
      })
    });
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toHaveProperty('results');
    expect(data).toHaveProperty('candidates');
    expect(Array.isArray(data.results)).toBe(true);
    expect(data.results.length).toBeGreaterThan(0);
    expect(data.results[0]).toHaveProperty('pattern_id');
    expect(data.results[0]).toHaveProperty('score');
    expect(data.results[0]).toHaveProperty('reason');
  });

  it('POST /api/sync/batch - returns HTTP 200 and batch sync results for payload', async () => {
    const fakePayload = {
      username: 'test_student',
      problems: [
        {
          frontend_id: '9901',
          title: 'Simulated Dynamic Sequence',
          title_slug: 'simulated-dynamic-sequence',
          difficulty: 'Medium',
          category: 'Algorithms',
          languages: ['python3', 'cpp']
        },
        {
          frontend_id: '9902',
          title: 'Simulated Database Query',
          title_slug: 'simulated-database-query',
          difficulty: 'Easy',
          category: 'Database',
          languages: ['mysql', 'postgresql']
        }
      ]
    };

    const res = await fetch(`${baseUrl}/api/sync/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fakePayload)
    });
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toHaveProperty('success', true);
    expect(data).toHaveProperty('newlySynced');
    expect(data).toHaveProperty('updatedCount');
    expect(data.newlySynced).toBe(2);

    // Verify problems are actually in the in-memory database
    const prob1 = db.findProblem('9901');
    expect(prob1).not.toBeNull();
    expect(prob1.title).toBe('Simulated Dynamic Sequence');
    expect(prob1.category).toBe('Algorithms');
    expect(prob1.languages).toEqual(['python3', 'cpp']);

    const prob2 = db.findProblem('9902');
    expect(prob2).not.toBeNull();
    expect(prob2.title).toBe('Simulated Database Query');
    expect(prob2.category).toBe('Database');
    expect(prob2.languages).toEqual(['mysql', 'postgresql']);
  });
});
