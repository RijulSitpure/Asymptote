import { describe, it, expect, beforeAll } from 'vitest';
import path from 'node:path';
import {
  createAsymptoteEngine,
  loadDatasetFromFs,
  createMemoryStorage
} from '../shared/asymptote-engine.js';
import '../shared/languages.js';

describe('Solved Log & In-Extension Note-Taking Verification', () => {
  let dataset;
  let engine;
  let storage;

  beforeAll(async () => {
    const dataDir = path.resolve(process.cwd(), 'extension', 'data');
    dataset = await loadDatasetFromFs(dataDir);
    storage = createMemoryStorage();
    engine = createAsymptoteEngine({ dataset, storage });
  });

  it('1. Verifies that problems start unsolved and updateProblemUserState persists notes and rating', async () => {
    const initial = await engine.getProblems();
    expect(initial.length).toBe(2533);
    // Initial state: no problems solved
    const initiallySolved = initial.filter(p => Boolean(p.is_solved));
    expect(initiallySolved.length).toBe(0);

    // Save notes, rating, and mark as solved on #1 Two Sum
    const updated = await engine.updateProblemUserState('two-sum', {
      user_notes: 'Use a hash map complement lookup for O(1) checks.',
      user_rating: 5,
      is_solved: 1,
      review_needed: 0
    });

    expect(updated).not.toBeNull();
    expect(updated.is_solved).toBe(1);
    expect(updated.user_notes).toBe('Use a hash map complement lookup for O(1) checks.');
    expect(updated.user_rating).toBe(5);
    expect(updated.review_needed).toBe(0);

    // Verify persisted in getProblemHints
    const hints = await engine.getProblemHints('two-sum');
    expect(hints.problem.is_solved).toBe(1);
    expect(hints.problem.user_notes).toBe('Use a hash map complement lookup for O(1) checks.');
    expect(hints.problem.user_rating).toBe(5);
  });

  it('2. Verifies Solved Log isolates solved problems and supports review queue flagging', async () => {
    // Solve #20 Valid Parentheses and flag for review
    await engine.updateProblemUserState('valid-parentheses', {
      user_notes: 'Careful with odd length strings and empty stack popping.',
      user_rating: 2,
      is_solved: 1,
      review_needed: 1
    });

    // Solve #181 Employees Earning More Than Their Managers
    await engine.updateProblemUserState('employees-earning-more-than-their-managers', {
      user_notes: 'Self-join on e.managerId = m.id WHERE e.salary > m.salary',
      user_rating: 4,
      is_solved: 1,
      review_needed: 0
    });

    // Sync a catalog problem #2880 Select Data
    await engine.recordSubmission({
      titleSlug: 'select-data',
      number: 2880,
      title: 'Select Data',
      category: 'pandas',
      difficulty: 'Easy'
    });
    await engine.updateProblemUserState('select-data', {
      user_notes: 'students[students["student_id"] == 101][["name", "age"]]',
      user_rating: 5
    });

    const allProblems = await engine.getProblems();
    const solvedOnly = allProblems.filter(p => Boolean(p.is_solved));
    expect(solvedOnly.length).toBe(4);

    // Check review needed
    const reviewNeeded = solvedOnly.filter(p => Boolean(p.review_needed));
    expect(reviewNeeded.length).toBe(1);
    expect(reviewNeeded[0].slug).toBe('valid-parentheses');

    // Check category distribution of solved
    const algoSolved = solvedOnly.filter(p => (p.category || 'Algorithms').toLowerCase() === 'algorithms');
    const dbSolved = solvedOnly.filter(p => (p.category || '').toLowerCase() === 'database');
    const pandasSolved = solvedOnly.filter(p => (p.category || '').toLowerCase() === 'pandas');
    expect(algoSolved.length).toBe(2); // Two Sum, Valid Parentheses
    expect(dbSolved.length).toBe(1);   // Employees Earning More
    expect(pandasSolved.length).toBe(1); // Select Data
  });

  it('3. Verifies numerical sorting # orders problems ascending properly', async () => {
    const allProblems = await engine.getProblems();
    const solvedOnly = allProblems.filter(p => Boolean(p.is_solved));

    // Sort by number ascending
    const sorted = [...solvedOnly].sort((a, b) => {
      const numA = Number(a.number) || parseInt(a.frontend_id, 10) || 0;
      const numB = Number(b.number) || parseInt(b.frontend_id, 10) || 0;
      return numA - numB;
    });

    const numbers = sorted.map(p => Number(p.number) || parseInt(p.frontend_id, 10));
    expect(numbers).toEqual([1, 20, 181, 2880]);
  });
});
