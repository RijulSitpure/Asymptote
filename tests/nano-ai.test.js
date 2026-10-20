import { describe, it, expect, vi } from 'vitest';
import NanoAI from '../shared/nano-ai.js';

describe('Gemini Nano On-Device AI Mentor Module', () => {
  const sampleProblem = {
    number: 1,
    title: 'Two Sum',
    category: 'Algorithms',
    pattern_title: 'Two Pointers',
    complexity: {
      time: 'O(N)',
      space: 'O(N)',
      whyNaiveFails: 'Checking all pairs takes O(N^2) time which exceeds execution limits.',
      spaceTimeTradeoff: 'Trade O(N) memory for instant O(1) complements lookup.',
      interviewerExpectation: 'Check whether an element can be used twice and handle duplicate values.'
    },
    hints: [
      { level: 1, content: 'Can we identify complements without nested scans?' },
      { level: 2, content: 'Store previously visited values along with indices.' },
      { level: 3, content: 'Iterate once: if complement in map, return indices; else insert.' }
    ]
  };

  const samplePattern = {
    id: 'two-pointers',
    title: 'Two Pointers'
  };

  const sampleCode = `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, n in enumerate(nums):
        comp = target - n
        if comp in seen:
            return [seen[comp], i]
        seen[n] = i
    return []`;

  it('1. Correctly formats the Gemini Nano prompt for different modes', () => {
    const promptIntuition = NanoAI.buildNanoPrompt({
      problem: sampleProblem,
      pattern: samplePattern,
      code: sampleCode,
      lang: 'python3',
      mode: 'intuition'
    });
    expect(promptIntuition).toContain('Problem: #1 Two Sum');
    expect(promptIntuition).toContain('Pattern: Two Pointers');
    expect(promptIntuition).toContain('Verified Solution Code:');
    expect(promptIntuition).toContain('core algorithmic intuition');

    const promptWalkthrough = NanoAI.buildNanoPrompt({
      problem: sampleProblem,
      pattern: samplePattern,
      code: sampleCode,
      lang: 'python3',
      mode: 'walkthrough'
    });
    expect(promptWalkthrough).toContain('step-by-step code walkthrough');

    const promptEdgeCases = NanoAI.buildNanoPrompt({
      problem: sampleProblem,
      pattern: samplePattern,
      code: sampleCode,
      lang: 'python3',
      mode: 'edge_cases'
    });
    expect(promptEdgeCases).toContain('critical edge cases');
  });

  it('2. Seamlessly falls back to deterministic Socratic synthesis when Gemini Nano is offline', async () => {
    const res = await NanoAI.explainSolutionWithNano({
      problem: sampleProblem,
      pattern: samplePattern,
      code: sampleCode,
      lang: 'python3',
      mode: 'intuition'
    });

    expect(res.success).toBe(true);
    expect(res.provider).toBe('socratic-engine');
    expect(res.isNative).toBe(false);
    expect(res.text).toContain('Core Algorithmic Intuition (Two Pointers)');
    expect(res.text).toContain('Can we identify complements without nested scans?');
    expect(res.text).toContain('Store previously visited values along with indices.');
    expect(res.text).toContain('Checking all pairs takes O(N^2) time');
  });

  it('3. Generates structured walkthrough and edge cases offline', async () => {
    const resWalkthrough = await NanoAI.explainSolutionWithNano({
      problem: sampleProblem,
      pattern: samplePattern,
      code: sampleCode,
      lang: 'python3',
      mode: 'walkthrough'
    });
    expect(resWalkthrough.text).toContain('Step-by-Step Code Walkthrough');
    expect(resWalkthrough.text).toContain('Iterate once');

    const resEdgeCases = await NanoAI.explainSolutionWithNano({
      problem: sampleProblem,
      pattern: samplePattern,
      code: sampleCode,
      lang: 'python3',
      mode: 'edge_cases'
    });
    expect(resEdgeCases.text).toContain('Critical Boundary Cases');
    expect(resEdgeCases.text).toContain('Interviewer Expectations');
    expect(resEdgeCases.text).toContain('element can be used twice');
  });

  it('4. Uses live Prompt API session when window.ai is available', async () => {
    const mockPrompt = vi.fn().mockResolvedValue('Mocked Gemini Nano response: Invariant verified.');
    globalThis.ai = {
      languageModel: {
        capabilities: vi.fn().mockResolvedValue({ available: 'readily' }),
        create: vi.fn().mockResolvedValue({
          prompt: mockPrompt
        })
      }
    };

    const res = await NanoAI.explainSolutionWithNano({
      problem: sampleProblem,
      pattern: samplePattern,
      code: sampleCode,
      lang: 'python3',
      mode: 'intuition'
    });

    expect(res.success).toBe(true);
    expect(res.provider).toBe('gemini-nano');
    expect(res.isNative).toBe(true);
    expect(res.text).toBe('Mocked Gemini Nano response: Invariant verified.');

    delete globalThis.ai;
  });

  it('5. renderMarkdownToHtml formats headings, lists, bold text, and code cleanly', () => {
    const rawMarkdown = `### Core Intuition\n\n1. **Step One**: Initialize pointers.\n- Sub-bullet: Test point.\n\nCode snippet:\n\`\`\`python\nx = 1\n\`\`\`\n\nTime complexity is $O(N)$ and variable is \`x\`.`;
    const html = NanoAI.renderMarkdownToHtml(rawMarkdown);

    expect(html).toContain('<h4');
    expect(html).toContain('Core Intuition</h4>');
    expect(html).toContain('<strong');
    expect(html).toContain('Step One</strong>');
    expect(html).toContain('<pre');
    expect(html).toContain('x = 1');
    expect(html).toContain('O(N)');
    expect(html).not.toContain('###');
    expect(html).not.toContain('**');
  });

  it('6. Accepts custom user prompt and synthesizes targeted explanation', async () => {
    const customPrompt = 'How do we handle duplicate elements?';
    const res = await NanoAI.explainSolutionWithNano({
      problem: sampleProblem,
      pattern: samplePattern,
      code: sampleCode,
      lang: 'python3',
      prompt: customPrompt
    });

    expect(res.success).toBe(true);
    expect(res.text).toContain(customPrompt);
    expect(res.html).toContain('<h4');
  });
});
