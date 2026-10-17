import { describe, it, expect } from 'vitest';
import { lintHints } from '../dataset/tools/validate.js';

describe('Hint Linter and Tone Checker', () => {
  const baseProblem = {
    slug: 'dummy-problem',
    hints: [
      {
        level: 1,
        title: 'Obstacle Analysis',
        text: 'Checking all pairs takes quadratic time when elements are considered independently. When observing a value, what criterion decides if it can complete a pair?'
      },
      {
        level: 2,
        title: 'Key Inversion',
        text: 'Store previously visited items in an indexed structure that allows immediate membership queries by expected value.'
      },
      {
        level: 3,
        title: 'Step Procedure',
        text: 'Traverse the list once while maintaining a mapping from element value to index. At each step check if the complement exists before recording the current index.'
      },
      {
        level: 4,
        title: 'Reference Implementation',
        text: '```python\ndef solve(nums):\n    return []\n```'
      }
    ],
    solutions: [
      {
        lang: 'python3',
        code: 'def solve(nums):\n    return []'
      }
    ]
  };

  it('flags an exclamation mark in any hint as an error', () => {
    const prob = structuredClone(baseProblem);
    prob.hints[0].text = 'This is an exciting hint!';
    const res = lintHints(prob, 'test.json');
    expect(res.errors.some(e => e.includes('exclamation mark (!)') && e.includes('level 1'))).toBe(true);

    const prob2 = structuredClone(baseProblem);
    prob2.hints[2].text = 'Do not do this!';
    const res2 = lintHints(prob2, 'test.json');
    expect(res2.errors.some(e => e.includes('exclamation mark (!)') && e.includes('level 3'))).toBe(true);
  });

  it('flags unapproved ALL-CAPS words like FIRST as an error, but allows BFS', () => {
    const prob = structuredClone(baseProblem);
    prob.hints[1].text = 'Pick which balloon to burst FIRST in the sequence.';
    const res = lintHints(prob, 'test.json');
    expect(res.errors.some(e => e.includes('unapproved ALL-CAPS word "FIRST"'))).toBe(true);

    const probAllowed = structuredClone(baseProblem);
    probAllowed.hints[1].text = 'Perform a BFS traversal to reach the target.';
    const resAllowed = lintHints(probAllowed, 'test.json');
    expect(resAllowed.errors.some(e => e.includes('unapproved ALL-CAPS word'))).toBe(false);
  });

  it('produces a warning if hint 1 contains banned technique/structure keywords', () => {
    const bannedKeywords = [
      'priority queue',
      'hash map',
      'stack',
      'heap',
      'dynamic programming',
      'binary search'
    ];

    for (const kw of bannedKeywords) {
      const prob = structuredClone(baseProblem);
      prob.hints[0].text = `You can solve this using a ${kw} approach.`;
      const res = lintHints(prob, 'test.json');
      expect(
        res.warnings.some(w => w.includes('Hint level 1 contains technique/structure keyword')),
        `Expected warning for keyword: "${kw}"`
      ).toBe(true);
    }
  });

  it('produces a warning if hint 1 or hint 2 exceeds 300 characters', () => {
    const longText = 'A'.repeat(301);
    
    const prob1 = structuredClone(baseProblem);
    prob1.hints[0].text = longText;
    const res1 = lintHints(prob1, 'test.json');
    expect(res1.warnings.some(w => w.includes('Hint level 1 length is 301 chars (exceeds 300 characters limit)'))).toBe(true);

    const prob2 = structuredClone(baseProblem);
    prob2.hints[1].text = longText;
    const res2 = lintHints(prob2, 'test.json');
    expect(res2.warnings.some(w => w.includes('Hint level 2 length is 301 chars (exceeds 300 characters limit)'))).toBe(true);

    const probOk = structuredClone(baseProblem);
    probOk.hints[0].text = 'A'.repeat(300);
    probOk.hints[1].text = 'A'.repeat(300);
    const resOk = lintHints(probOk, 'test.json');
    expect(resOk.warnings.some(w => w.includes('exceeds 300 characters limit'))).toBe(false);
  });

  it('produces an error if hint 4 does not match the solution', () => {
    const prob = structuredClone(baseProblem);
    prob.hints[3].text = '```python\ndef solve(nums):\n    return [1, 2, 3]\n```';
    const res = lintHints(prob, 'test.json');
    expect(res.errors.some(e => e.includes('Hint level 4 code does not match primary solution code'))).toBe(true);

    // Matching solution
    const probMatch = structuredClone(baseProblem);
    probMatch.hints[3].text = '```python\ndef solve(nums):\n    return []\n```';
    const resMatch = lintHints(probMatch, 'test.json');
    expect(resMatch.errors.some(e => e.includes('Hint 4 Solution Mismatch'))).toBe(false);
  });

  it('demonstrates the errors and warnings produced on the old text of burst-balloons and 1368', () => {
    const oldBurstBalloonsL1 = {
      slug: 'burst-balloons',
      hints: [
        {
          level: 1,
          title: 'The Forward Trap vs Reverse Insight',
          text: 'If you pick which balloon to burst FIRST in range [i, j], the remaining balloons on the left and right now become adjacent to each other! Their future coins depend on what happens on the other side. This destroys subproblem independence! What if we invert time and pick which balloon is burst LAST?'
        }
      ],
      solutions: [{ lang: 'python3', code: 'pass' }]
    };

    const burstRes = lintHints(oldBurstBalloonsL1, 'burst-balloons.json');
    expect(burstRes.errors.some(e => e.includes('contains exclamation mark (!)')), 'Should flag exclamation marks in old burst-balloons').toBe(true);
    expect(burstRes.errors.some(e => e.includes('unapproved ALL-CAPS word "FIRST"')), 'Should flag FIRST in old burst-balloons').toBe(true);
    expect(burstRes.errors.some(e => e.includes('unapproved ALL-CAPS word "LAST"')), 'Should flag LAST in old burst-balloons').toBe(true);

    const old1368L1 = {
      slug: 'minimum-cost-to-make-at-least-one-valid-path-in-a-grid',
      hints: [
        {
          level: 1,
          title: 'Priority Queue Overhead Obstacle',
          text: 'Standard priority queue shortest-path algorithms introduce logarithmic heap overhead per step, which is unnecessarily slow when transitions only cost zero or one. Why does an edge cost restricted to zero or one allow you to avoid a full comparison sort?'
        }
      ],
      solutions: [{ lang: 'python3', code: 'pass' }]
    };

    const p1368Res = lintHints(old1368L1, 'minimum-cost-to-make-at-least-one-valid-path-in-a-grid.json');
    expect(p1368Res.warnings.some(w => w.includes('Hint level 1 contains technique/structure keyword')), 'Should flag technique keyword in old 1368').toBe(true);
  });
});
