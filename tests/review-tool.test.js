import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { listProblems, formatTable, reviewProblem } from '../dataset/tools/review.js';

describe('Review Tool End-to-End Test Suite', () => {
  let tempDir;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'asymptote-review-test-'));
  });

  afterEach(() => {
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  const sampleProblem = {
    slug: 'two-sum',
    number: 1,
    category: 'Algorithms',
    patterns: ['hash-map-lookup'],
    hints: [
      { level: 1, title: 'T1', text: 'H1' },
      { level: 2, title: 'T2', text: 'H2' },
      { level: 3, title: 'T3', text: 'H3' },
      { level: 4, title: 'T4', text: '```python\npass\n```' }
    ],
    complexity: { kind: 'standard', time: 'O(N)', space: 'O(N)' },
    solutions: [{ lang: 'python3', code: 'pass' }],
    review: {
      status: 'tested',
      acceptedOnLeetCode: null,
      reviewer: null
    },
    updated: '2026-10-17'
  };

  it('lists problems correctly from a directory', () => {
    fs.writeFileSync(path.join(tempDir, 'two-sum.json'), JSON.stringify(sampleProblem, null, 2) + '\n');
    const rows = listProblems(tempDir);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toEqual({
      number: 1,
      slug: 'two-sum',
      category: 'Algorithms',
      status: 'tested',
      acceptedOnLeetCode: '-',
      reviewer: '-'
    });

    const tableStr = formatTable(rows);
    expect(tableStr).toContain('two-sum');
    expect(tableStr).toContain('Algorithms');
    expect(tableStr).toContain('tested');
  });

  it('refuses to review a problem whose status is not "tested"', () => {
    const draftProblem = structuredClone(sampleProblem);
    draftProblem.review.status = 'draft';
    fs.writeFileSync(path.join(tempDir, 'two-sum.json'), JSON.stringify(draftProblem, null, 2) + '\n');

    expect(() => {
      reviewProblem('two-sum', {
        accepted: '2026-10-18',
        reviewer: 'Rijul',
        problemsDir: tempDir,
        runValidate: false
      });
    }).toThrow(/cannot review before testing/);

    // Verify file on disk was not modified
    const fileContent = JSON.parse(fs.readFileSync(path.join(tempDir, 'two-sum.json'), 'utf8'));
    expect(fileContent.review.status).toBe('draft');
  });

  it('successfully reviews a tested problem and writes formatted JSON with trailing newline', () => {
    fs.writeFileSync(path.join(tempDir, 'two-sum.json'), JSON.stringify(sampleProblem, null, 2) + '\n');

    const updated = reviewProblem('two-sum', {
      accepted: '2026-10-18',
      reviewer: 'Rijul Sitpure',
      problemsDir: tempDir,
      runValidate: false
    });

    expect(updated.review.status).toBe('reviewed');
    expect(updated.review.acceptedOnLeetCode).toBe('2026-10-18');
    expect(updated.review.reviewer).toBe('Rijul Sitpure');
    expect(updated.updated).toBe(new Date().toISOString().slice(0, 10));

    const rawDisk = fs.readFileSync(path.join(tempDir, 'two-sum.json'), 'utf8');
    expect(rawDisk.endsWith('\n')).toBe(true);
    expect(rawDisk).toBe(JSON.stringify(updated, null, 2) + '\n');
  });

  it('validates date format and required parameters', () => {
    fs.writeFileSync(path.join(tempDir, 'two-sum.json'), JSON.stringify(sampleProblem, null, 2) + '\n');

    expect(() => {
      reviewProblem('two-sum', {
        accepted: '18-10-2026', // invalid date format
        reviewer: 'Rijul',
        problemsDir: tempDir,
        runValidate: false
      });
    }).toThrow(/Invalid accepted date/);

    expect(() => {
      reviewProblem('two-sum', {
        accepted: '2026-10-18',
        reviewer: '   ', // empty reviewer
        problemsDir: tempDir,
        runValidate: false
      });
    }).toThrow(/Reviewer name is required/);
  });
});
