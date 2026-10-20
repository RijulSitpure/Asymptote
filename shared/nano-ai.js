/**
 * Asymptote - On-Device AI Mentor Module (Gemini Nano Prompt API)
 * Universal module: works in browser, Node.js, and Chrome Extension content script / popup.
 * Provides live on-device LLM explanations using Chrome's built-in Gemini Nano (window.ai.languageModel),
 * with deterministic Socratic fallback when Gemini Nano is not enabled.
 */

(function (global) {
  /**
   * Checks availability of Chrome's built-in Gemini Nano Prompt API.
   * Returns: { available: 'readily' | 'after-download' | 'no', isNative: boolean }
   */
  async function checkNanoAIAvailability() {
    try {
      if (typeof ai !== 'undefined' && ai.languageModel && typeof ai.languageModel.capabilities === 'function') {
        const caps = await ai.languageModel.capabilities();
        return {
          available: caps.available || 'no',
          isNative: caps.available === 'readily' || caps.available === 'after-download',
          statusText: caps.available === 'readily' 
            ? 'Gemini Nano Ready (On-device)' 
            : (caps.available === 'after-download' ? 'Gemini Nano Downloading...' : 'Gemini Nano Offline')
        };
      }
      if (typeof window !== 'undefined' && window.ai && window.ai.languageModel && typeof window.ai.languageModel.capabilities === 'function') {
        const caps = await window.ai.languageModel.capabilities();
        return {
          available: caps.available || 'no',
          isNative: caps.available === 'readily' || caps.available === 'after-download',
          statusText: caps.available === 'readily' 
            ? 'Gemini Nano Ready (On-device)' 
            : (caps.available === 'after-download' ? 'Gemini Nano Downloading...' : 'Gemini Nano Offline')
        };
      }
    } catch (_e) {
      // Prompt API capabilities call failed or unsupported
    }
    return {
      available: 'no',
      isNative: false,
      statusText: 'Asymptote Socratic Engine (Deterministic)'
    };
  }

  /**
   * Build the structured prompt for the LLM based on user mode.
   */
  function buildNanoPrompt({ problem, pattern, code, lang, mode = 'intuition' }) {
    const title = problem?.title || 'Algorithmic Problem';
    const number = problem?.number || problem?.frontend_id || '';
    const patternTitle = pattern?.title || problem?.pattern_title || 'Algorithmic Pattern';
    const complexityTime = problem?.complexity?.time || 'N/A';
    const complexitySpace = problem?.complexity?.space || 'N/A';

    let taskInstruction = '';
    if (mode === 'walkthrough') {
      taskInstruction = `Provide a clean, step-by-step code walkthrough of how this ${lang} solution executes on an example input. Highlight variable updates, loops, and termination conditions.`;
    } else if (mode === 'edge_cases') {
      taskInstruction = `Identify the 3-4 most critical edge cases (e.g. empty inputs, duplicates, off-by-one bounds, overflows, recursion depth) for this problem and specifically explain how this code safely handles them.`;
    } else {
      // default: intuition
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
  function synthesizeOfflineSocraticExplanation({ problem, pattern, code: _code, lang: _lang, mode = 'intuition' }) {
    const patternTitle = pattern?.title || problem?.pattern_title || 'Algorithmic Pattern';
    const complexity = problem?.complexity || {};
    const hints = problem?.hints || [];

    const h1 = hints[0]?.content || 'Analyze the constraints to avoid redundant computations.';
    const h2 = hints[1]?.content || 'Identify the structural invariant that preserves state across transitions.';
    const h3 = hints[2]?.content || 'Execute step-by-step state progression.';

    if (mode === 'walkthrough') {
      return `### Step-by-Step Code Walkthrough (${patternTitle})

1. **State Initialization**:
   - Establish initial pointers, collections, or accumulators according to the pattern invariant.
   
2. **Transition Execution**:
   - ${h3}

3. **Termination & Return**:
   - The loop or recursion terminates when boundary conditions are satisfied, returning the computed result in $O(${complexity.time || 'N'})$ time.`;
    }

    if (mode === 'edge_cases') {
      return `### Critical Boundary Cases & Defenses

- **Boundary Constraints & Naive Bottleneck**:
  - ${complexity.whyNaiveFails || 'Brute-force nested traversals exceed execution time limits on large constraints.'}

- **Interviewer Expectations**:
  - ${complexity.interviewerExpectation || 'Verify clean invariant preservation, empty/null checks, and auxiliary space efficiency.'}

- **Space-Time Tradeoff**:
  - ${complexity.spaceTimeTradeoff || `Consumes auxiliary space of $O(${complexity.space || '1'})$ to achieve target runtime.`}`;
    }

    // Default: 'intuition'
    return `### Core Algorithmic Intuition (${patternTitle})

- **The Core Obstacle**:
  - ${h1}

- **Key Invariant**:
  - ${h2}

- **Complexity Efficiency**:
  - **Runtime**: $O(${complexity.time || 'N'})$ — avoids combinatorial explosion.
  - **Memory**: $O(${complexity.space || '1'})$ auxiliary storage.
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
    mode = 'intuition',
    onChunk = null
  }) {
    if (!problem) {
      throw new Error('explainSolutionWithNano requires a problem object');
    }

    const avail = await checkNanoAIAvailability();

    // 1. If Gemini Nano is native & available, run on-device prompt
    if (avail.isNative && avail.available === 'readily') {
      try {
        const aiProvider = (typeof ai !== 'undefined' && ai.languageModel) 
          ? ai.languageModel 
          : (typeof window !== 'undefined' && window.ai?.languageModel ? window.ai.languageModel : null);

        if (aiProvider) {
          const session = await aiProvider.create({
            systemPrompt: 'You are Asymptote Socratic Mentor. You explain algorithmic patterns cleanly, concisely, and with precision using bullet points. Avoid filler.'
          });

          const prompt = buildNanoPrompt({ problem, pattern, code, lang, mode });

          if (typeof onChunk === 'function' && typeof session.promptStreaming === 'function') {
            const stream = session.promptStreaming(prompt);
            let fullText = '';
            for await (const chunk of stream) {
              fullText = chunk;
              onChunk(chunk);
            }
            return {
              success: true,
              text: fullText,
              provider: 'gemini-nano',
              mode,
              isNative: true
            };
          }

          const response = await session.prompt(prompt);
          return {
            success: true,
            text: response,
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
    const fallbackText = synthesizeOfflineSocraticExplanation({ problem, pattern, code, lang, mode });
    if (typeof onChunk === 'function') {
      onChunk(fallbackText);
    }

    return {
      success: true,
      text: fallbackText,
      provider: 'socratic-engine',
      mode,
      isNative: false,
      note: 'Generated offline via verified pattern dataset. Enable chrome://flags/#prompt-api-for-gemini-nano in Chrome 128+ for live neural streaming.'
    };
  }

  const api = {
    checkNanoAIAvailability,
    buildNanoPrompt,
    synthesizeOfflineSocraticExplanation,
    explainSolutionWithNano
  };

  if (typeof global !== 'undefined') {
    global.NanoAIModule = api;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
