/**
 * Asymptote - On-Device AI Chat Service (Gemini Nano Prompt API)
 * Universal service module: runs directly in the current context (extension popup, content script Shadow DOM, browser, Node.js).
 * Handles:
 *   - Global LanguageModel Prompt API integration (availability, monitor, streaming)
 *   - Availability states ('available', 'downloadable', 'downloading', 'unavailable')
 *   - System prompt synthesis with real problem metadata & blueprint code
 *   - Quota tracking & oldest-turn history trimming (system prompt never trimmed)
 *   - Delta vs. cumulative stream chunk normalization
 *   - AbortController cancellation with partial text preservation
 *   - Regenerate with freshly rebuilt session
 *   - chrome.storage.local persistence capped to 20 messages per problem slug
 */

(function (global) {
  const STORAGE_KEY_PREFIX = 'asymptote:chat:';
  const MAX_MESSAGES_PER_PROBLEM = 20;
  const DEFAULT_CONTEXT_QUOTA = 4096;
  const RESERVED_ANSWER_TOKENS = 800;

  // In-memory fallback storage for environments without chrome.storage.local (e.g. testing)
  const memoryStore = new Map();

  // Active session tracking (one session per problem slug)
  let activeSession = null;
  let activeSessionSlug = null;

  /**
   * Safe getter for global LanguageModel API
   */
  function getLanguageModelGlobal() {
    if (typeof LanguageModel !== 'undefined') {
      return LanguageModel;
    }
    if (typeof globalThis !== 'undefined' && globalThis.LanguageModel) {
      return globalThis.LanguageModel;
    }
    if (typeof window !== 'undefined' && window.LanguageModel) {
      return window.LanguageModel;
    }
    return null;
  }

  /**
   * Safe storage getter for problem slug
   */
  async function getStoredChat(slug) {
    if (!slug) return [];
    const key = `${STORAGE_KEY_PREFIX}${slug}`;

    try {
      if (typeof chrome !== 'undefined' && chrome?.storage?.local) {
        return new Promise((resolve) => {
          chrome.storage.local.get([key], (result) => {
            const data = result?.[key];
            if (Array.isArray(data)) {
              resolve(data);
            } else if (data && Array.isArray(data.messages)) {
              resolve(data.messages);
            } else {
              resolve([]);
            }
          });
        });
      }
    } catch (_e) {
      // Chrome storage access failed, fallback to memory
    }

    return memoryStore.get(key) || [];
  }

  /**
   * Safe storage saver (caps messages to MAX_MESSAGES_PER_PROBLEM)
   */
  async function saveStoredChat(slug, messages) {
    if (!slug) return;
    const key = `${STORAGE_KEY_PREFIX}${slug}`;
    const capped = Array.isArray(messages) ? messages.slice(-MAX_MESSAGES_PER_PROBLEM) : [];

    try {
      if (typeof chrome !== 'undefined' && chrome?.storage?.local) {
        return new Promise((resolve) => {
          chrome.storage.local.set({ [key]: capped }, () => {
            resolve();
          });
        });
      }
    } catch (_e) {
      // Fallback
    }

    memoryStore.set(key, capped);
  }

  /**
   * Appends a message to chat history and caps to MAX_MESSAGES_PER_PROBLEM
   */
  async function appendChatMessage(slug, message) {
    const existing = await getStoredChat(slug);
    const updated = [...existing, {
      id: message.id || `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      role: message.role || 'user',
      text: message.text || '',
      timestamp: message.timestamp || Date.now()
    }];
    await saveStoredChat(slug, updated);
    return updated;
  }

  /**
   * Removes the last assistant message (helper for Regenerate)
   */
  async function removeLastAssistantMessage(slug) {
    const existing = await getStoredChat(slug);
    if (existing.length === 0) return existing;

    if (existing[existing.length - 1].role === 'assistant') {
      const updated = existing.slice(0, -1);
      await saveStoredChat(slug, updated);
      return updated;
    }
    return existing;
  }

  /**
   * Clears chat history for a problem and destroys any active session
   */
  async function clearStoredChat(slug) {
    destroySession();

    if (!slug) return;
    const key = `${STORAGE_KEY_PREFIX}${slug}`;

    try {
      if (typeof chrome !== 'undefined' && chrome?.storage?.local) {
        return new Promise((resolve) => {
          chrome.storage.local.remove([key], () => {
            resolve();
          });
        });
      }
    } catch (_e) {
      // Fallback
    }

    memoryStore.delete(key);
  }

  /**
   * Check Prompt API availability using global LanguageModel.availability()
   * Returns: 'available' | 'downloadable' | 'downloading' | 'unavailable'
   */
  async function checkAvailability() {
    try {
      const lm = getLanguageModelGlobal();
      if (lm && typeof lm.availability === 'function') {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('LanguageModel availability check timed out')), 1500);
        });
        const availabilityOptions = {
          expectedOutputLanguages: ['en'],
          expectedInputLanguages: ['en'],
          outputLanguage: 'en'
        };
        let status;
        try {
          status = await Promise.race([lm.availability(availabilityOptions), timeoutPromise]);
        } catch (_optsErr) {
          status = await Promise.race([lm.availability(), timeoutPromise]);
        }
        if (['available', 'downloadable', 'downloading', 'unavailable'].includes(status)) {
          return status;
        }
      }

      // Legacy fallback check via NanoAIModule if defined
      if (global?.NanoAIModule?.checkNanoAIAvailability) {
        const res = await global.NanoAIModule.checkNanoAIAvailability();
        if (res && res.available) {
          return res.available;
        }
      }
    } catch (err) {
      console.warn('[NanoChatService] Availability check failed:', err);
    }
    return 'unavailable';
  }

  /**
   * Synthesize the system prompt with problem metadata and blueprint code
   */
  function buildSystemPrompt({ problem, pattern, code, lang }) {
    const number = problem?.frontend_id ?? problem?.number ?? '';
    const title = problem?.title || 'Algorithmic Problem';
    const patternTitle = pattern?.title || problem?.pattern_title || 'Algorithmic Pattern';
    const difficulty = problem?.difficulty || '';
    const cleanCode = (code || '').trim();

    let text = `You are a concise DSA tutor inside a LeetCode helper. Explain the user's code for problem ${number} ${title} (${patternTitle}, ${lang}). Use short paragraphs and small code snippets. Don't invent facts about the code. If something isn't in the provided code, say so.`;

    text += `\n\nProblem Metadata:\n- Number: ${number}\n- Title: ${title}\n- Difficulty: ${difficulty}\n- Pattern: ${patternTitle}\n- Language: ${lang}`;
    if (cleanCode) {
      text += `\n\nBlueprint Code:\n\`\`\`${lang}\n${cleanCode}\n\`\`\``;
    }
    return text;
  }

  /**
   * Formats a user prompt with problem metadata and blueprint code so that Gemini Nano
   * always knows what problem, pattern, and language are active.
   */
  function formatPromptWithContext({
    message,
    problem,
    pattern,
    code,
    lang = 'python3',
    includeBlueprint = false
  }) {
    const cleanUserText = (message || '').trim();
    const number = problem?.frontend_id ?? problem?.number ?? '';
    const title = problem?.title || 'Algorithmic Problem';
    const patternTitle = pattern?.title || problem?.pattern_title || '';
    const difficulty = problem?.difficulty || '';
    const cleanCode = (code || '').trim();

    const parts = [];
    if (number || title) {
      parts.push(`#${number} ${title}`.trim());
    }
    if (difficulty) {
      parts.push(difficulty);
    }
    if (patternTitle) {
      parts.push(`Pattern: ${patternTitle}`);
    }
    if (lang) {
      parts.push(`Language: ${lang}`);
    }

    const contextTag = parts.length > 0 ? `[Problem Context: ${parts.join(' | ')}]` : '';

    let promptToSend = '';
    if (contextTag) {
      promptToSend += `${contextTag}\n`;
    }

    if (includeBlueprint && cleanCode) {
      promptToSend += `[Verified Solution Blueprint (${lang}):\n\`\`\`${lang}\n${cleanCode}\n\`\`\`]\n\n`;
    }

    promptToSend += `User Question: ${cleanUserText}`;
    return promptToSend;
  }

  /**
   * Lightweight token estimation (~3.8 chars per token for code & English)
   */
  function estimateTokens(text) {
    if (!text) return 0;
    return Math.ceil(String(text).length / 3.8);
  }

  /**
   * Quota-aware history trimmer:
   * Trims the oldest turns first until system prompt + history fits with room left for the next answer.
   * The system prompt is NEVER trimmed.
   */
  function trimHistoryForQuota({ systemPrompt, messages = [], quota = DEFAULT_CONTEXT_QUOTA, reservedTokens = RESERVED_ANSWER_TOKENS }) {
    const systemTokens = estimateTokens(systemPrompt);
    const availableForHistory = Math.max(0, quota - systemTokens - reservedTokens);

    let trimmed = Array.isArray(messages) ? [...messages] : [];

    let totalTokens = trimmed.reduce((acc, msg) => acc + estimateTokens(msg.text || ''), 0);

    // Trim oldest turns first until history fits inside budget
    while (trimmed.length > 0 && totalTokens > availableForHistory) {
      const removed = trimmed.shift();
      totalTokens -= estimateTokens(removed.text || '');
    }

    return trimmed;
  }

  /**
   * Inspect current session input usage and quota
   */
  function getSessionUsage(session) {
    if (!session) return { usage: 0, quota: DEFAULT_CONTEXT_QUOTA };
    const usage = session.contextUsage ?? session.inputUsage ?? session.tokensSoFar ?? 0;
    const quota = session.contextWindow ?? session.inputQuota ?? session.maxTokens ?? DEFAULT_CONTEXT_QUOTA;
    return { usage, quota };
  }

  /**
   * Destroy the current active session
   */
  function destroySession() {
    if (activeSession) {
      try {
        if (typeof activeSession.destroy === 'function') {
          activeSession.destroy();
        }
      } catch (_e) {
        // Destroy error safe ignore
      }
      activeSession = null;
      activeSessionSlug = null;
    }
  }

  /**
   * Ensures an active Prompt API session exists for the problem slug.
   * Rebuilds from stored turns with quota trimming.
   * Passes monitor with downloadprogress listener when download is needed.
   */
  async function ensureSession({
    problem,
    pattern,
    code,
    lang = 'python3',
    onProgress = null,
    forceNew = false
  }) {
    const slug = problem?.slug || 'generic-problem';

    if (activeSession && activeSessionSlug === slug && !forceNew) {
      return activeSession;
    }

    destroySession();

    const lm = getLanguageModelGlobal();
    if (!lm || typeof lm.create !== 'function') {
      throw new Error('LanguageModel Prompt API is not supported in this environment');
    }

    const systemPrompt = buildSystemPrompt({ problem, pattern, code, lang });
    const storedHistory = await getStoredChat(slug);
    const trimmedHistory = trimHistoryForQuota({ systemPrompt, messages: storedHistory });

    const initialPrompts = trimmedHistory.map((m, idx) => {
      if (m.role === 'assistant') {
        return {
          role: 'assistant',
          content: m.text || ''
        };
      }
      const isFirst = (idx === 0);
      const isCode = /code|blueprint|solution|walkthrough|line|implement/i.test(m.text || '');
      return {
        role: 'user',
        content: formatPromptWithContext({
          message: m.text || '',
          problem,
          pattern,
          code,
          lang,
          includeBlueprint: isFirst || isCode
        })
      };
    });

    const createOptions = {
      systemPrompt,
      expectedOutputLanguages: ['en'],
      expectedInputLanguages: ['en'],
      outputLanguage: 'en',
      monitor: (m) => {
        if (m && typeof m.addEventListener === 'function') {
          m.addEventListener('downloadprogress', (e) => {
            let percent = 0;
            if (e.total && e.total > 0) {
              percent = Math.round((e.loaded / e.total) * 100);
            } else if (typeof e.loaded === 'number') {
              percent = Math.min(100, Math.round(e.loaded));
            }
            if (typeof onProgress === 'function') {
              onProgress(percent, e);
            }
          });
        }
      }
    };

    if (initialPrompts.length > 0) {
      createOptions.initialPrompts = initialPrompts;
    }

    let session;
    try {
      session = await lm.create(createOptions);
    } catch (err) {
      // If create failed with initialPrompts or strict language keys, fall back gracefully
      if (createOptions.initialPrompts) {
        delete createOptions.initialPrompts;
        try {
          session = await lm.create(createOptions);
        } catch (_retryErr) {
          const minimalOptions = { systemPrompt: createOptions.systemPrompt, monitor: createOptions.monitor };
          session = await lm.create(minimalOptions);
        }
      } else {
        try {
          const minimalOptions = { systemPrompt: createOptions.systemPrompt, monitor: createOptions.monitor };
          session = await lm.create(minimalOptions);
        } catch (_minimalErr) {
          throw err;
        }
      }
    }

    activeSession = session;
    activeSessionSlug = slug;
    return session;
  }

  /**
   * Normalize stream chunks:
   * Handles both cumulative text chunks and delta text chunks smoothly.
   * Yields { delta, text } for each chunk.
   */
  async function* normalizeStream(stream, signal) {
    let accumulated = '';
    for await (const rawChunk of stream) {
      if (signal?.aborted) {
        break;
      }
      const chunkStr = typeof rawChunk === 'string' ? rawChunk : (rawChunk?.text || String(rawChunk || ''));
      let delta = '';
      if (chunkStr.startsWith(accumulated)) {
        // Cumulative text chunk
        delta = chunkStr.slice(accumulated.length);
        accumulated = chunkStr;
      } else {
        // Delta text chunk
        delta = chunkStr;
        accumulated += chunkStr;
      }
      yield { delta, text: accumulated };
    }
  }

  /**
   * Send a prompt message to Gemini Nano via Prompt API streaming.
   * Appends user message to storage, ensures session, normalizes chunks,
   * handles abort / error with partial text retention, and saves assistant reply.
   */
  async function sendMessage({
    problem,
    pattern,
    code,
    lang = 'python3',
    message = '',
    onChunk = null,
    onProgress = null,
    signal = null
  }) {
    const slug = problem?.slug || 'generic-problem';
    const cleanUserText = (message || '').trim();
    if (!cleanUserText) {
      return { success: false, text: '' };
    }

    // 1. Check if first turn before appending
    const existingMessages = await getStoredChat(slug);
    const isFirstTurn = existingMessages.length === 0;
    const isCodeQuery = /code|blueprint|solution|walkthrough|line|implement/i.test(cleanUserText);

    // 2. Persist user message to storage
    await appendChatMessage(slug, {
      role: 'user',
      text: cleanUserText,
      timestamp: Date.now()
    });

    // 3. Ensure session (creates or reuses with monitor)
    let session;
    try {
      session = await ensureSession({
        problem,
        pattern,
        code,
        lang,
        onProgress
      });
    } catch (err) {
      return {
        success: false,
        error: err,
        text: '',
        provider: 'gemini-nano'
      };
    }

    // 4. Format prompt with problem context to send to Prompt API
    const promptToSend = formatPromptWithContext({
      message: cleanUserText,
      problem,
      pattern,
      code,
      lang,
      includeBlueprint: isFirstTurn || isCodeQuery
    });

    // 5. Execute promptStreaming
    let accumulatedText = '';
    try {
      if (typeof session.promptStreaming !== 'function') {
        // Fallback for non-streaming prompt method if ever returned
        if (typeof session.prompt === 'function') {
          const resp = await session.prompt(promptToSend, { signal });
          accumulatedText = resp || '';
          if (typeof onChunk === 'function') {
            onChunk(accumulatedText, accumulatedText);
          }
        } else {
          throw new Error('LanguageModel session lacks promptStreaming and prompt methods');
        }
      } else {
        const stream = session.promptStreaming(promptToSend, { signal });
        for await (const { delta, text } of normalizeStream(stream, signal)) {
          accumulatedText = text;
          if (typeof onChunk === 'function') {
            onChunk(text, delta);
          }
        }
      }

      // Check if aborted mid-stream
      if (signal?.aborted) {
        if (accumulatedText) {
          await appendChatMessage(slug, {
            role: 'assistant',
            text: accumulatedText,
            timestamp: Date.now()
          });
        }
        return {
          success: false,
          aborted: true,
          text: accumulatedText,
          provider: 'gemini-nano'
        };
      }

      // 4. Persist completed assistant reply
      await appendChatMessage(slug, {
        role: 'assistant',
        text: accumulatedText,
        timestamp: Date.now()
      });

      return {
        success: true,
        text: accumulatedText,
        provider: 'gemini-nano'
      };
    } catch (err) {
      const isAbort = signal?.aborted || err?.name === 'AbortError';

      // Keep partial text in storage even on abort or error
      if (accumulatedText) {
        await appendChatMessage(slug, {
          role: 'assistant',
          text: accumulatedText,
          timestamp: Date.now()
        });
      }

      if (isAbort) {
        return {
          success: false,
          aborted: true,
          text: accumulatedText,
          provider: 'gemini-nano'
        };
      }

      return {
        success: false,
        error: err,
        text: accumulatedText,
        provider: 'gemini-nano'
      };
    }
  }

  /**
   * Regenerate the last assistant reply:
   * Removes the last assistant turn, pops the user prompt, destroys the session,
   * and re-asks the user prompt in a freshly rebuilt session.
   */
  async function regenerateLastMessage({
    problem,
    pattern,
    code,
    lang = 'python3',
    onChunk = null,
    onProgress = null,
    signal = null
  }) {
    const slug = problem?.slug || 'generic-problem';
    let history = await getStoredChat(slug);
    if (!history || history.length === 0) {
      return { success: false, text: '' };
    }

    // 1. Remove last assistant message
    if (history[history.length - 1].role === 'assistant') {
      history = history.slice(0, -1);
    }

    if (history.length === 0) {
      await saveStoredChat(slug, []);
      return { success: false, text: '' };
    }

    // 2. Identify and pop the last user message so sendMessage can re-add it cleanly
    const lastUserMsg = history[history.length - 1];
    if (lastUserMsg.role !== 'user') {
      await saveStoredChat(slug, history);
      return { success: false, text: '' };
    }

    const previousHistory = history.slice(0, -1);
    await saveStoredChat(slug, previousHistory);

    // 3. Destroy active session so ensureSession rebuilds cleanly from earlier turns
    destroySession();

    // 4. Re-ask the user message
    return sendMessage({
      problem,
      pattern,
      code,
      lang,
      message: lastUserMsg.text,
      onChunk,
      onProgress,
      signal
    });
  }

  const api = {
    STORAGE_KEY_PREFIX,
    MAX_MESSAGES_PER_PROBLEM,
    DEFAULT_CONTEXT_QUOTA,
    RESERVED_ANSWER_TOKENS,
    getLanguageModelGlobal,
    getStoredChat,
    saveStoredChat,
    appendChatMessage,
    removeLastAssistantMessage,
    clearStoredChat,
    checkAvailability,
    buildSystemPrompt,
    formatPromptWithContext,
    estimateTokens,
    trimHistoryForQuota,
    getSessionUsage,
    destroySession,
    ensureSession,
    normalizeStream,
    sendMessage,
    regenerateLastMessage
  };

  if (typeof global !== 'undefined') {
    global.NanoChatService = api;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
