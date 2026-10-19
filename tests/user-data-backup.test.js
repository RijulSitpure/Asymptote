import { describe, it, expect, beforeEach } from 'vitest';
import { createAsymptoteEngine, createMemoryStorage } from '../shared/asymptote-engine.js';

describe('User Data Backup & Restore (Export / Import JSON)', () => {
  let engine;
  let mockDataset;

  beforeEach(() => {
    mockDataset = {
      manifest: { version: '2.0.0', datasetVersion: '1.0.0' },
      shards: {
        algorithms: {
          domain: 'algorithms',
          patterns: [
            { id: 'hash-map', title: 'Hash Map Lookup', difficulty: 'Easy', domain: 'Algorithms' }
          ],
          problems: [
            {
              slug: 'two-sum',
              number: 1,
              title: 'Two Sum',
              difficulty: 'Easy',
              category: 'Algorithms',
              patterns: ['hash-map'],
              hints: [
                { level: 1, title: 'H1', text: 'Hint 1' },
                { level: 2, title: 'H2', text: 'Hint 2' },
                { level: 3, title: 'H3', text: 'Hint 3' },
                { level: 4, title: 'H4', text: 'Hint 4' }
              ],
              complexity: { time: 'O(N)', space: 'O(N)' },
              solutions: [{ lang: 'python3', code: 'class Solution: pass' }]
            }
          ]
        }
      }
    };

    engine = createAsymptoteEngine({
      dataset: mockDataset,
      storage: createMemoryStorage()
    });
  });

  it('1. Exports initial user state with schema metadata and empty problems', async () => {
    const backup = await engine.exportUserData();
    expect(backup).toBeDefined();
    expect(backup.schema_version).toBe('asymptote-backup-v1');
    expect(backup.app_version).toBe('2.0.0');
    expect(backup.exported_at).toBeTypeOf('string');
    expect(backup.total_problems).toBe(0);
    expect(backup.user_problems).toEqual({});
  });

  it('2. Exports populated user progress with custom notes, ratings, and solved state', async () => {
    // Record solved problem and custom notes
    await engine.batchSyncProblems([
      { slug: 'two-sum', number: 1, title: 'Two Sum', difficulty: 'Easy', is_solved: 1 }
    ], 'Rijul-Sitpure');

    await engine.updateProblemNotes('two-sum', {
      notes: 'Remember complement logic with hash table: target - num',
      confidence: 5,
      review_needed: false
    });

    const backup = await engine.exportUserData();
    expect(backup.username).toBe('Rijul-Sitpure');
    expect(backup.total_problems).toBe(1);
    expect(backup.user_problems['two-sum']).toBeDefined();
    expect(backup.user_problems['two-sum'].is_solved).toBe(1);
    expect(backup.user_problems['two-sum'].notes).toBe('Remember complement logic with hash table: target - num');
    expect(backup.user_problems['two-sum'].confidence).toBe(5);
  });

  it('3. Successfully imports backup and restores user state into storage', async () => {
    const backupPayload = {
      schema_version: 'asymptote-backup-v1',
      app_version: '2.0.0',
      exported_at: '2026-10-19T20:00:00.000Z',
      username: 'RestoredUser',
      last_sync: '2026-10-19T19:55:00.000Z',
      user_problems: {
        'two-sum': {
          slug: 'two-sum',
          number: 1,
          title: 'Two Sum',
          difficulty: 'Easy',
          is_solved: 1,
          notes: 'Restored note content',
          confidence: 4,
          review_needed: true
        },
        '3sum': {
          slug: '3sum',
          number: 15,
          title: '3Sum',
          difficulty: 'Medium',
          is_solved: 1,
          notes: 'Sort + two pointers',
          confidence: 3
        }
      }
    };

    const res = await engine.importUserData(backupPayload);
    expect(res.success).toBe(true);
    expect(res.importedCount).toBe(2);
    expect(res.totalUserProblems).toBe(2);

    const stats = await engine.getStats();
    expect(stats.username).toBe('RestoredUser');
    expect(stats.solvedCount).toBe(2);

    const problems = await engine.getProblems();
    const twoSum = problems.find(p => p.slug === 'two-sum');
    expect(twoSum).toBeDefined();
    expect(twoSum.is_solved).toBe(1);
    expect(twoSum.notes).toBe('Restored note content');
    expect(twoSum.confidence).toBe(4);
  });

  it('4. Supports importing legacy/flat problems map directly', async () => {
    const flatPayload = {
      'two-sum': {
        slug: 'two-sum',
        number: 1,
        is_solved: 1,
        notes: 'Flat format note'
      }
    };

    const res = await engine.importUserData(flatPayload);
    expect(res.success).toBe(true);
    expect(res.importedCount).toBe(1);

    const problems = await engine.getProblems();
    const twoSum = problems.find(p => p.slug === 'two-sum');
    expect(twoSum.notes).toBe('Flat format note');
  });

  it('5. Rejects corrupted or invalid backup payloads with descriptive error', async () => {
    await expect(engine.importUserData(null)).rejects.toThrow('Payload must be a JSON object');
    await expect(engine.importUserData('not-json')).rejects.toThrow('Payload must be a JSON object');
    await expect(engine.importUserData({ schema_version: 'asymptote-backup-v1' })).rejects.toThrow('Missing user_problems mapping');
  });

  it('6. Full Round-Trip: Export from Engine A -> Import into Engine B preserves data fidelity', async () => {
    // Engine A: populate data
    await engine.batchSyncProblems([
      { slug: 'two-sum', number: 1, is_solved: 1 }
    ], 'OriginalUser');
    await engine.updateProblemNotes('two-sum', {
      notes: 'Verified round-trip backup fidelity',
      confidence: 5
    });

    const exportedData = await engine.exportUserData();

    // Engine B: clean new engine
    const engineB = createAsymptoteEngine({
      dataset: mockDataset,
      storage: createMemoryStorage()
    });

    const initialStats = await engineB.getStats();
    expect(initialStats.solvedCount).toBe(0);

    // Import into Engine B
    const importResult = await engineB.importUserData(exportedData);
    expect(importResult.success).toBe(true);

    const restoredStats = await engineB.getStats();
    expect(restoredStats.username).toBe('OriginalUser');
    expect(restoredStats.solvedCount).toBe(1);

    const bProblems = await engineB.getProblems();
    const bTwoSum = bProblems.find(p => p.slug === 'two-sum');
    expect(bTwoSum.notes).toBe('Verified round-trip backup fidelity');
    expect(bTwoSum.confidence).toBe(5);
  });
});
