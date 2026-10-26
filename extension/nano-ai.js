// generated, do not edit - source: shared/nano-ai.js
(function (global) {
/**
 * Asymptote - On-Device AI Mentor Module (Gemini Nano Prompt API)
 * Universal module: works in browser, Node.js, and Chrome Extension content script / popup.
 * Provides on-device LLM explanations using Chrome's built-in Gemini Nano (window.ai.languageModel),
 * with deterministic Socratic fallback when Gemini Nano is not enabled.
 */
function renderMarkdownToHtml(markdown) {
    if (!markdown) return '';
    let html = String(markdown).trim();

    // 1. Normalize linebreaks
    html = html.replace(/\r\n/g, '\n');

    // 2. Escape HTML entities
    html = html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // 3. Fenced code blocks with language badge, copy button, and horizontal scroll inside the block only
    html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (_match, lang, code) => {
      const displayLang = (lang && lang.trim()) || 'code';
      const cleanCode = code.trim();
      return `<div class="asymptote-code-block" style="background:#f6f8fa; border:1px solid #e2e8f0; border-radius:8px; margin:10px 0; overflow:hidden;">` +
        `<div style="display:flex; justify-content:space-between; align-items:center; padding:4px 10px; background:#f1f5f9; border-bottom:1px solid #e2e8f0; font-size:11px; color:#64748b;">` +
          `<span>${displayLang}</span>` +
          `<button type="button" class="asymptote-code-copy-btn" style="background:#ffffff; border:1px solid #cbd5e1; border-radius:4px; padding:2px 8px; font-size:11px; color:#475569; cursor:pointer;">Copy</button>` +
        `</div>` +
        `<pre style="margin:0; padding:10px 12px; overflow-x:auto; font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size:12px; color:#1e2033; line-height:1.5;"><code>${cleanCode}</code></pre>` +
      `</div>`;
    });

    // 4. Inline code
    html = html.replace(/`([^`\n]+)`/g, '<code style="background:#f1f5f9; padding:2px 5px; border-radius:4px; font-size:12.5px; font-family:ui-monospace, monospace; color:#0f172a; border:1px solid #e2e8f0;">$1</code>');

    // 5. Math symbols like $O(N)$
    html = html.replace(/\$([^\$\n]+)\$/g, '<code style="background:#f1f5f9; padding:1px 4px; border-radius:4px; font-size:12px; font-family:ui-monospace, monospace; color:#047857; font-weight:600;">$1</code>');

    // 6. Headings (###, ##, #)
    html = html.replace(/^### (.*$)/gim, '<h4 style="font-family:\'Space Grotesk\', sans-serif; font-size:14px; font-weight:700; color:#1e2033; margin:10px 0 4px 0;">$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3 style="font-family:\'Space Grotesk\', sans-serif; font-size:15px; font-weight:700; color:#1e2033; margin:12px 0 5px 0;">$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h2 style="font-family:\'Space Grotesk\', sans-serif; font-size:16px; font-weight:700; color:#1e2033; margin:14px 0 6px 0;">$1</h2>');

    // 7. Bold & Italic
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong style="font-weight:700; color:#1e2033;">$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em style="font-style:italic;">$1</em>');

    // 8. Numbered lists (1. item)
    html = html.replace(/^\s*(\d+)\.\s+(.*$)/gim, '<div style="margin-left:18px; margin-bottom:4px; display:flex; align-items:flex-start; gap:6px;"><span style="font-weight:700; color:#64748b; font-size:12px; line-height:1.6;">$1.</span><span style="flex:1; line-height:1.6;">$2</span></div>');

    // 9. Bullet lists (- or *)
    html = html.replace(/^\s*[-*]\s+(.*$)/gim, '<div style="margin-left:18px; margin-bottom:4px; display:flex; align-items:flex-start; gap:8px;"><span style="color:#059669; font-size:14px; line-height:1.4;">•</span><span style="flex:1; line-height:1.6;">$1</span></div>');

    // 10. Line breaks
    html = html.replace(/\n\n+/g, '<div style="margin-bottom:8px;"></div>');
    html = html.replace(/\n/g, '<br/>');

    // Clean up extra <br/> following headings, blocks, or lists
    html = html.replace(/(<\/h[234]>)\s*<br\/>/gi, '$1');
    html = html.replace(/(<\/pre>)\s*<br\/>/gi, '$1');
    html = html.replace(/(<\/div>)\s*<br\/>/gi, '$1');

    return html;
  }

  /**
   * Checks availability of Chrome's built-in Gemini Nano Prompt API (LanguageModel).
   * Returns: { available: 'available' | 'downloadable' | 'downloading' | 'unavailable', isNative: boolean, statusText: string }
   */
async function checkNanoAIAvailability() {
    try {
      const lm = (typeof LanguageModel !== 'undefined')
        ? LanguageModel
        : (typeof globalThis !== 'undefined' && globalThis.LanguageModel
          ? globalThis.LanguageModel
          : (typeof window !== 'undefined' && window.LanguageModel ? window.LanguageModel : null));

      if (lm && typeof lm.availability === 'function') {
        let status;
        const availabilityOptions = {
          expectedInputs: [{ type: 'text', languages: ['en'] }],
          expectedOutputs: [{ type: 'text', languages: ['en'] }],
          expectedOutputLanguages: ['en'],
          expectedInputLanguages: ['en'],
          outputLanguage: 'en'
        };
        try {
          status = await lm.availability(availabilityOptions);
        } catch (_optsErr) {
          try {
            status = await lm.availability({
              expectedInputs: [{ type: 'text', languages: ['en'] }],
              expectedOutputs: [{ type: 'text', languages: ['en'] }]
            });
          } catch (_optsErr2) {
            try {
              status = await lm.availability({
                expectedOutputLanguages: ['en'],
                outputLanguage: 'en'
              });
            } catch (_optsErr3) {
              status = await lm.availability();
            }
          }
        }
        const isNative = status === 'available' || status === 'downloadable' || status === 'downloading';
        return {
          available: status,
          isNative,
          statusText: status === 'available'
            ? 'Gemini Nano Ready (On-device)'
            : (status === 'downloadable'
              ? 'Gemini Nano Ready to Download'
              : (status === 'downloading' ? 'Gemini Nano Downloading...' : 'Gemini Nano Unavailable'))
        };
      }

      // Legacy window.ai fallback (Chrome 127-128 early experiments)
      if (typeof ai !== 'undefined' && ai?.languageModel && typeof ai.languageModel.capabilities === 'function') {
        const caps = await ai.languageModel.capabilities();
        const mapped = caps.available === 'readily' ? 'available' : (caps.available === 'after-download' ? 'downloadable' : 'unavailable');
        return {
          available: mapped,
          isNative: mapped === 'available' || mapped === 'downloadable',
          statusText: mapped === 'available'
            ? 'Gemini Nano Ready (On-device)'
            : (mapped === 'downloadable' ? 'Gemini Nano Downloading...' : 'Gemini Nano Offline')
        };
      }
      if (typeof window !== 'undefined' && window.ai?.languageModel && typeof window.ai.languageModel.capabilities === 'function') {
        const caps = await window.ai.languageModel.capabilities();
        const mapped = caps.available === 'readily' ? 'available' : (caps.available === 'after-download' ? 'downloadable' : 'unavailable');
        return {
          available: mapped,
          isNative: mapped === 'available' || mapped === 'downloadable',
          statusText: mapped === 'available'
            ? 'Gemini Nano Ready (On-device)'
            : (mapped === 'downloadable' ? 'Gemini Nano Downloading...' : 'Gemini Nano Offline')
        };
      }
    } catch (_e) {
      // Prompt API availability call failed
    }
    return {
      available: 'unavailable',
      isNative: false,
      statusText: 'Gemini Nano Unavailable'
    };
  }

  /**
   * Build the structured prompt for the LLM based on user prompt / request.
   */
function buildNanoPrompt({ problem, pattern, code, lang, prompt: userPrompt = '', mode = 'intuition' }) {
    const title = problem?.title || 'Algorithmic Problem';
    const number = problem?.number || problem?.frontend_id || '';
    const patternTitle = pattern?.title || problem?.pattern_title || 'Algorithmic Pattern';
    const complexityTime = problem?.complexity?.time || 'N/A';
    const complexitySpace = problem?.complexity?.space || 'N/A';

    let taskInstruction = '';
    if (userPrompt && userPrompt.trim()) {
      taskInstruction = `User's question: "${userPrompt.trim()}". Answer specifically, clearly, and concisely for this solution without generic fluff.`;
    } else if (mode === 'walkthrough') {
      taskInstruction = `Provide a clean, step-by-step code walkthrough of how this ${lang} solution executes on an example input. Highlight variable updates, loops, and termination conditions.`;
    } else if (mode === 'edge_cases') {
      taskInstruction = `Identify the 3-4 most critical edge cases (e.g. empty inputs, duplicates, off-by-one bounds, overflows, recursion depth) for this problem and specifically explain how this code safely handles them.`;
    } else {
      taskInstruction = `Explain the core algorithmic intuition: what invariant or mathematical property makes this ${patternTitle} approach optimal, and why a naive brute-force approach fails. Provide 3-4 concise bullet points.`;
    }

    return `Problem: #${number} ${title}
Pattern: ${patternTitle}
Language: ${lang}
Target Complexity: Time ${complexityTime} | Space ${complexitySpace}

Verified Solution Code:
\`\`\`${lang}
${(code || '').trim()}
\`\`\`

Task:
${taskInstruction}

Format your response in concise, markdown bullet points. Do not include introductory conversational filler.`;
  }

  /**
   * Offline Deterministic Socratic Synthesizer
   * Used when Chrome's Gemini Nano is unavailable or disabled.
   * Synthesizes 4-level hints + complexity analysis into a coherent explanation.
   */
function synthesizeOfflineSocraticExplanation({ problem, pattern, code: _code, lang: _lang, prompt: userPrompt = '', mode = 'intuition' }) {
    const patternTitle = pattern?.title || problem?.pattern_title || 'Algorithmic Pattern';
    const complexity = problem?.complexity || {};
    const hints = problem?.hints || [];

    const h1 = hints[0]?.content || 'Analyze the constraints to avoid redundant computations.';
    const h2 = hints[1]?.content || 'Identify the structural invariant that preserves state across transitions.';
    const h3 = hints[2]?.content || 'Execute step-by-step state progression.';

    const q = (userPrompt || '').toLowerCase();

    if (mode === 'walkthrough' || q.includes('walkthrough') || q.includes('trace') || q.includes('step') || q.includes('how does')) {
      return `### Step-by-Step Code Walkthrough (${patternTitle})

1. **State Initialization**:
   - Establish initial pointers, collections, or accumulators according to the pattern invariant.
   
2. **Transition Execution**:
   - ${h3}

3. **Termination & Return**:
   - The loop or recursion terminates when boundary conditions are satisfied, returning the computed result in $O(${complexity.time || 'N'})$ time.`;
    }

    if (mode === 'edge_cases' || q.includes('edge') || q.includes('corner') || q.includes('overflow') || q.includes('bound') || q.includes('null') || q.includes('empty')) {
      return `### Critical Boundary Cases & Defenses

- **Boundary Constraints & Naive Bottleneck**:
  - ${complexity.whyNaiveFails || 'Brute-force nested traversals exceed execution time limits on large constraints.'}

- **Interviewer Expectations**:
  - ${complexity.interviewerExpectation || 'Verify clean invariant preservation, empty/null checks, and auxiliary space efficiency.'}

- **Space-Time Tradeoff**:
  - ${complexity.spaceTimeTradeoff || `Consumes auxiliary space of $O(${complexity.space || '1'})$ to achieve target runtime.`}`;
    }

    // Default: 'intuition' or custom user prompt
    const cleanTime = String(complexity.time || 'N').replace(/^O\((.*)\)$/i, '$1');
    const cleanSpace = String(complexity.space || '1').replace(/^O\((.*)\)$/i, '$1');
    const heading = userPrompt && userPrompt.trim()
      ? `### AI Explanation: "${userPrompt.trim().length > 60 ? userPrompt.trim().slice(0, 60) + '...' : userPrompt.trim()}"`
      : `### Core Algorithmic Intuition (${patternTitle})`;

    return `${heading}

- **The Core Obstacle**:
  - ${h1}

- **Key Invariant**:
  - ${h2}

- **Execution Procedure**:
  - ${h3}

- **Complexity Efficiency**:
  - **Runtime**: $O(${cleanTime})$ — avoids combinatorial explosion.
  - **Memory**: $O(${cleanSpace})$ auxiliary storage.
  - **Why Naive Fails**: ${complexity.whyNaiveFails || 'Naive iteration checks redundant subsets.'}`;
  }

  /**
   * Main entry point to explain a solution.
   * Attempts live on-device Gemini Nano streaming/generation if available;
   * seamlessly falls back to offline Socratic synthesis if unavailable.
   */
async function explainSolutionWithNano({
    problem,
    pattern,
    code,
    lang = 'python3',
    prompt = '',
    mode = 'intuition',
    onChunk = null
  }) {
    if (!problem) {
      throw new Error('explainSolutionWithNano requires a problem object');
    }

    const avail = await checkNanoAIAvailability();

    // 1. If Gemini Nano is native & available, run on-device prompt
    if (avail.isNative && (avail.available === 'available' || avail.available === 'readily')) {
      try {
        const lm = (typeof LanguageModel !== 'undefined')
          ? LanguageModel
          : (typeof globalThis !== 'undefined' && globalThis.LanguageModel ? globalThis.LanguageModel : null);

        const aiProvider = lm || ((typeof ai !== 'undefined' && ai?.languageModel)
          ? ai.languageModel
          : (typeof window !== 'undefined' && window.ai?.languageModel ? window.ai.languageModel : null));

        if (aiProvider) {
          const createOptions = {
            systemPrompt: 'You are Asymptote Socratic Mentor. You explain algorithmic patterns cleanly, concisely, and with precision using bullet points. Avoid filler.',
            expectedInputs: [{ type: 'text', languages: ['en'] }],
            expectedOutputs: [{ type: 'text', languages: ['en'] }],
            expectedOutputLanguages: ['en'],
            expectedInputLanguages: ['en'],
            outputLanguage: 'en'
          };
          let session;
          try {
            session = await aiProvider.create(createOptions);
          } catch (_createErr) {
            try {
              session = await aiProvider.create({
                systemPrompt: createOptions.systemPrompt,
                expectedInputs: [{ type: 'text', languages: ['en'] }],
                expectedOutputs: [{ type: 'text', languages: ['en'] }],
                expectedOutputLanguages: ['en'],
                outputLanguage: 'en'
              });
            } catch (_fallbackErr) {
              session = await aiProvider.create({
                systemPrompt: createOptions.systemPrompt,
                expectedOutputs: [{ type: 'text', languages: ['en'] }]
              });
            }
          }

          const fullPrompt = buildNanoPrompt({ problem, pattern, code, lang, prompt, mode });

          if (typeof onChunk === 'function' && typeof session.promptStreaming === 'function') {
            const stream = session.promptStreaming(fullPrompt);
            let fullText = '';
            for await (const chunk of stream) {
              fullText = chunk;
              onChunk(chunk);
            }
            return {
              success: true,
              text: fullText,
              html: renderMarkdownToHtml(fullText),
              provider: 'gemini-nano',
              mode,
              isNative: true
            };
          }

          const response = await session.prompt(fullPrompt);
          return {
            success: true,
            text: response,
            html: renderMarkdownToHtml(response),
            provider: 'gemini-nano',
            mode,
            isNative: true
          };
        }
      } catch (err) {
        console.warn('[NanoAI] Gemini Nano session error, falling back to deterministic synthesis:', err?.message);
      }
    }

    // 2. Fallback: Offline deterministic Socratic Synthesizer
    const fallbackText = synthesizeOfflineSocraticExplanation({ problem, pattern, code, lang, prompt, mode });
    const formattedHtml = renderMarkdownToHtml(fallbackText);
    if (typeof onChunk === 'function') {
      onChunk(fallbackText);
    }

    return {
      success: true,
      text: fallbackText,
      html: formattedHtml,
      provider: 'socratic-engine',
      mode,
      isNative: false
    };
  }

  const api = {
    renderMarkdownToHtml,
    checkNanoAIAvailability,
    buildNanoPrompt,
    synthesizeOfflineSocraticExplanation,
    explainSolutionWithNano
  };

  if (typeof globalThis !== 'undefined') {
    globalThis.NanoAIModule = api;
  }

})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
