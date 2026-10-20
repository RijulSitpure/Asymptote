/**
 * Asymptote - Solution AI Chat Component (Vanilla JS)
 * Universal UI component mounted in both the extension popup and the Shadow DOM drawer.
 * Supports:
 *   - Global LanguageModel Prompt API integration via NanoChatService
 *   - Availability states: available (ready), downloadable (Enable button), downloading (progress bar), unavailable (honest notice)
 *   - Docked prompt bar pinned on Blueprint view with flex-shrink: 0 (disabled when unavailable)
 *   - Full-pane chat view filling all remaining vertical height as a flex column
 *   - Sub-bar: white background, 1px #e2e8f0 border, padding 10px 18px, nowrap items
 *   - Context chip row with small 28x28 icon-only trash button (Clear chat) shown only when history exists
 *   - Compact empty state with exactly 3 plain-text starter chips
 *   - Live token streaming with 7x15px emerald blinking caret and Stop generation button
 *   - Mid-stream error handling: preserves partial text with inline "Something went wrong. Retry" action
 *   - Regenerate button (removes last assistant turn & re-asks in freshly rebuilt session)
 *   - Output safety: all responses parsed through NanoAIModule.renderMarkdownToHtml with HTML escaping
 *   - Storage persistence via chrome.storage.local capped per problem slug
 */

(function (global) {
  const CHAT_STYLE_ID = 'asymptote-solution-chat-styles';

  /**
   * Scoped CSS rules for the chat component and docked bar
   */
  const CHAT_CSS = `
    .asymptote-chat-container {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      height: 100%;
      width: 100%;
      background: #ffffff;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }
    .asymptote-chat-container *,
    .asymptote-docked-bar-container * {
      box-sizing: border-box;
      box-shadow: none !important;
    }
    .asymptote-chat-subbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 18px;
      flex-shrink: 0;
      border-bottom: 1px solid #e2e8f0;
      background: #ffffff;
      white-space: nowrap;
      box-sizing: border-box;
      width: 100%;
    }
    .asymptote-chat-back-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
      font-weight: 500;
      color: #475569;
      background: none;
      border: none;
      cursor: pointer;
      padding: 2px 4px;
      border-radius: 6px;
      font-family: 'DM Sans', -apple-system, sans-serif;
      transition: color 0.15s ease, background 0.15s ease;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .asymptote-chat-back-btn:hover {
      color: #1e2033;
      background: #f1f5f9;
    }
    .asymptote-chat-nano-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 12.5px;
      font-weight: 500;
      color: #047857;
      background: #ecfdf5;
      border: 1px solid #6ee7b7;
      padding: 3px 10px;
      border-radius: 9999px;
      font-family: 'DM Sans', -apple-system, sans-serif;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .asymptote-chat-nano-dot {
      width: 7px;
      height: 7px;
      background: #10b981;
      border-radius: 50%;
      display: inline-block;
      flex-shrink: 0;
    }
    .asymptote-chat-log {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      overscroll-behavior: contain;
      padding: 12px 18px 10px 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      scroll-behavior: smooth;
    }
    .asymptote-chat-log::-webkit-scrollbar {
      width: 5px;
    }
    .asymptote-chat-log::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    .asymptote-chat-empty-state {
      padding: 12px 14px;
      text-align: center;
      background: #ffffff;
      border: 1px dashed #cbd5e1;
      border-radius: 10px;
      margin: auto 0;
      max-width: 320px;
      align-self: center;
      width: calc(100% - 24px);
    }
    .asymptote-chat-empty-title {
      font-family: 'Space Grotesk', -apple-system, sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: #1e2033;
      margin-bottom: 3px;
      line-height: 1.3;
    }
    .asymptote-chat-empty-subtitle {
      font-size: 11.5px;
      color: #64748b;
      margin-bottom: 10px;
      line-height: 1.35;
    }
    .asymptote-chat-chips-grid {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
      max-width: 260px;
      margin: 0 auto;
    }
    .asymptote-chat-chip {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 500;
      color: #334155;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s ease;
      font-family: 'DM Sans', sans-serif;
    }
    .asymptote-chat-chip:hover {
      background: #ffffff;
      border-color: #10b981;
      color: #047857;
    }
    .asymptote-chat-bubble-user {
      align-self: flex-end;
      background: #1e2033;
      color: #ffffff;
      border-radius: 14px 14px 4px 14px;
      padding: 9px 14px;
      max-width: 82%;
      font-size: 14px;
      line-height: 1.5;
      word-break: break-word;
      font-family: 'DM Sans', -apple-system, sans-serif;
    }
    .asymptote-chat-row-assistant {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      max-width: 100%;
    }
    .asymptote-chat-avatar {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      flex-shrink: 0;
      display: block;
      margin-top: 2px;
    }
    .asymptote-chat-card-assistant {
      flex: 1;
      min-width: 0;
      background: #ffffff;
      color: #334155;
      border: 1px solid #e2e8f0;
      border-radius: 4px 14px 14px 14px;
      padding: 10px 14px;
      font-size: 14px;
      line-height: 1.6;
      font-family: 'DM Sans', -apple-system, sans-serif;
      word-break: break-word;
    }
    .asymptote-chat-card-assistant code {
      background: #f1f5f9;
      padding: 2px 5px;
      border-radius: 4px;
      font-size: 12.5px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      color: #0f172a;
      border: 1px solid #e2e8f0;
    }
    .asymptote-code-block {
      background: #f6f8fa;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      margin: 10px 0;
      overflow: hidden;
    }
    .asymptote-code-block pre {
      margin: 0;
      padding: 10px 12px;
      overflow-x: auto;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
      color: #1e2033;
      line-height: 1.5;
    }
    .asymptote-reply-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 8px;
      font-size: 12px;
      color: #64748b;
    }
    .asymptote-action-link {
      background: none;
      border: none;
      padding: 0;
      color: #64748b;
      font-size: 12px;
      cursor: pointer;
      text-decoration: none;
      font-family: 'DM Sans', sans-serif;
      transition: color 0.15s ease;
    }
    .asymptote-action-link:hover {
      color: #1e2033;
    }
    .asymptote-streaming-caret {
      display: inline-block;
      width: 7px;
      height: 15px;
      background: #10b981;
      vertical-align: -2px;
      margin-left: 3px;
      animation: asymptoteCaretBlink 0.8s infinite;
    }
    @keyframes asymptoteCaretBlink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .asymptote-prompt-container {
      background: #ffffff;
      border-top: 1px solid #e2e8f0;
      padding: 12px 18px calc(14px + env(safe-area-inset-bottom, 0px));
      box-sizing: border-box;
      flex-shrink: 0;
    }
    .asymptote-prompt-context-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 8px;
    }
    .asymptote-context-chip {
      font-size: 12px;
      background: #f6f8fa;
      border: 1px solid #e2e8f0;
      border-radius: 9999px;
      padding: 2px 10px;
      color: #475569;
      display: inline-block;
      font-weight: 500;
      font-family: 'DM Sans', sans-serif;
      white-space: nowrap;
    }
    .asymptote-chat-clear-btn {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      color: #94a3b8;
      display: none;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
      transition: all 0.15s ease;
    }
    .asymptote-chat-clear-btn:hover {
      color: #1e2033;
      border-color: #cbd5e1;
      background: #f8fafc;
    }
    .asymptote-prompt-row {
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      padding: 8px 8px 8px 14px;
      background: #ffffff;
      transition: border-color 0.15s ease;
    }
    .asymptote-prompt-row:focus-within {
      border-color: #10b981;
    }
    .asymptote-prompt-sparkle {
      width: 18px;
      height: 18px;
      stroke: #047857;
      fill: none;
      stroke-width: 2;
      flex-shrink: 0;
      display: block;
    }
    .asymptote-prompt-input {
      flex: 1;
      min-width: 0;
      border: none;
      outline: none;
      font-size: 14px;
      color: #1e2033;
      background: transparent;
      font-family: 'DM Sans', -apple-system, sans-serif;
      line-height: 1.4;
      padding: 0;
    }
    .asymptote-prompt-input::placeholder {
      color: #94a3b8;
      font-size: 14px;
    }
    .asymptote-prompt-input:disabled {
      color: #94a3b8;
      cursor: not-allowed;
    }
    .asymptote-send-btn {
      width: 34px;
      height: 34px;
      border-radius: 9px;
      background: #10b981;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      padding: 0;
      transition: background 0.15s ease;
    }
    .asymptote-send-btn:hover:not(:disabled) {
      background: #059669;
    }
    .asymptote-send-btn:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    .asymptote-stop-btn {
      width: 34px;
      height: 34px;
      border-radius: 9px;
      background: #1e2033;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      padding: 0;
      transition: background 0.15s ease;
    }
    .asymptote-stop-btn:hover {
      background: #2b3046;
    }
    .asymptote-docked-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-top: 8px;
      margin-bottom: 0;
      font-size: 12px;
      color: #64748b;
      font-family: 'DM Sans', sans-serif;
    }
    .asymptote-chat-footer {
      text-align: center;
      margin-top: 8px;
      margin-bottom: 0;
      font-size: 12px;
      color: #64748b;
      font-family: 'DM Sans', sans-serif;
    }
    .asymptote-enable-box {
      margin-top: 10px;
      padding: 10px 12px;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      border-radius: 8px;
      text-align: center;
    }
    .asymptote-enable-nano-btn {
      background: #10b981;
      color: #1e2033;
      font-weight: 700;
      border: none;
      border-radius: 6px;
      padding: 7px 16px;
      font-size: 12px;
      cursor: pointer;
      font-family: inherit;
      transition: background 0.15s ease;
    }
    .asymptote-enable-nano-btn:hover {
      background: #059669;
    }
    .asymptote-download-progress-container {
      margin: auto 0;
      padding: 18px 20px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      max-width: 320px;
      align-self: center;
      text-align: center;
      width: calc(100% - 24px);
    }
    .asymptote-download-track {
      width: 100%;
      height: 8px;
      background: #e2e8f0;
      border-radius: 9999px;
      overflow: hidden;
      margin-bottom: 6px;
    }
    .asymptote-download-fill {
      width: 0%;
      height: 100%;
      background: #10b981;
      border-radius: 9999px;
      transition: width 0.2s ease;
    }
    .asymptote-chat-unavailable-notice {
      margin: auto 0;
      padding: 18px 20px;
      background: #ffffff;
      border: 1px solid #fecaca;
      border-radius: 12px;
      max-width: 330px;
      align-self: center;
      text-align: center;
      width: calc(100% - 24px);
    }
  `;

  /**
   * Helper: inject stylesheet into the document or shadow root if not already present
   */
  function ensureChatStyles(root) {
    if (!root) return;
    const target = root.shadowRoot || (root.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? root : document.head || document.documentElement);
    if (target.querySelector && target.querySelector(`#${CHAT_STYLE_ID}`)) {
      return;
    }
    const styleEl = document.createElement('style');
    styleEl.id = CHAT_STYLE_ID;
    styleEl.textContent = CHAT_CSS;
    target.appendChild(styleEl);
  }

  /**
   * Helper to escape HTML characters
   */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const ASYMPTOTE_AVATAR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="24" height="24" class="asymptote-chat-avatar"><rect width="120" height="120" rx="26" fill="#10b981"/><g transform="translate(-4 4)"><path d="M24 100 L53 33 Q60 16 67 33 C73 52 90 98 116 99" stroke="#1e2033" stroke-width="14" fill="none" stroke-linejoin="round" stroke-linecap="round"/></g></svg>`;

  const SPARKLE_SVG = `<svg class="asymptote-prompt-sparkle" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`;

  const SEND_ICON_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e2033" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`;

  const STOP_ICON_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="#ffffff"><rect x="3" y="3" width="18" height="18" rx="3"></rect></svg>`;

  /**
   * Mounts the Docked Prompt Bar pinned at the bottom of the Blueprint view.
   * Container: white, 1px #e2e8f0 top border, padding 12px 18px 14px (flex-shrink: 0).
   * Input row: 1px #cbd5e1 border, 12px radius, padding 8px 8px 8px 14px; 18px sparkle icon (#047857),
   * placeholder "Ask about this solution…" (14px, #94a3b8), 34x34 send button (#10b981 background, #1e2033 arrow-up icon).
   * Below it: centered 12px #64748b text with 7px emerald dot: "Gemini Nano · runs on-device".
   */
  function mountDockedBar(mountTarget, options = {}) {
    if (!mountTarget) return null;

    const {
      isShadowRoot = false,
      onOpenChat = null
    } = options;

    ensureChatStyles(isShadowRoot ? mountTarget.getRootNode() : document.head);

    mountTarget.innerHTML = `
      <div class="asymptote-docked-bar-container asymptote-prompt-container">
        <div class="asymptote-prompt-row">
          ${SPARKLE_SVG}
          <input
            type="text"
            class="asymptote-prompt-input asymptote-docked-input"
            placeholder="Ask about this solution…"
            aria-label="Ask about this solution"
          />
          <button type="button" class="asymptote-send-btn asymptote-docked-send-btn" title="Send message">
            ${SEND_ICON_SVG}
          </button>
        </div>
        <div class="asymptote-docked-footer">
          <span style="width:7px; height:7px; border-radius:50%; background:#10b981; display:inline-block; flex-shrink:0;"></span>
          <span>Gemini Nano · runs on-device</span>
        </div>
      </div>
    `;

    const inputEl = mountTarget.querySelector('.asymptote-docked-input');
    const sendBtn = mountTarget.querySelector('.asymptote-docked-send-btn');
    const footerEl = mountTarget.querySelector('.asymptote-docked-footer');

    const chatService = global?.NanoChatService || null;

    // Check availability on docked bar mount
    if (chatService && typeof chatService.checkAvailability === 'function') {
      chatService.checkAvailability().then((status) => {
        if (status === 'unavailable') {
          if (inputEl) {
            inputEl.disabled = true;
            inputEl.placeholder = 'Gemini Nano unavailable on this device';
          }
          if (sendBtn) {
            sendBtn.disabled = true;
          }
          if (footerEl) {
            footerEl.innerHTML = `
              <span style="width:7px; height:7px; border-radius:50%; background:#94a3b8; display:inline-block; flex-shrink:0;"></span>
              <span style="color:#94a3b8;">Gemini Nano · unavailable</span>
            `;
          }
        }
      }).catch(() => {});
    }

    const triggerOpen = (autoSend = false) => {
      const val = inputEl ? inputEl.value : '';
      if (typeof onOpenChat === 'function') {
        onOpenChat({ initialText: val, autoSend });
      }
    };

    if (inputEl) {
      inputEl.addEventListener('focus', () => {
        if (!inputEl.disabled) {
          triggerOpen(false);
        }
      });
      inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (!inputEl.disabled) {
            triggerOpen(!!inputEl.value.trim());
          }
        }
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener('click', () => {
        if (!sendBtn.disabled) {
          triggerOpen(!!inputEl?.value.trim());
        }
      });
    }

    return {
      destroy: () => {
        mountTarget.innerHTML = '';
      }
    };
  }

  /**
   * Mounts the full Chat View taking over the tab.
   * Fills all remaining height as a flex column:
   *   - sub-bar fixed at top (white background, 1px #e2e8f0 border, padding 10px 18px, nowrap items)
   *   - message/empty-state area flex: 1; min-height: 0; overflow-y: auto
   *   - prompt area fixed at bottom with context chip row + 28x28 icon-only trash button (shown when history exists)
   */
  function mountSolutionChat(mountTarget, options = {}) {
    if (!mountTarget) {
      console.warn('[SolutionChat] mountTarget is required');
      return null;
    }

    const {
      problem = {},
      pattern = {},
      code = '',
      lang = 'python3',
      isShadowRoot = false,
      initialText = '',
      autoSend = false,
      onBackToSolution = null
    } = options;

    const slug = problem?.slug || 'generic-problem';
    const problemNumber = problem?.number || problem?.frontend_id || '';
    const langMeta = global?.LanguagesModule?.getLanguageMeta ? global.LanguagesModule.getLanguageMeta(lang) : null;
    const langLabel = langMeta?.displayName || langMeta?.name || lang;

    // Inject styles
    ensureChatStyles(isShadowRoot ? mountTarget.getRootNode() : document.head);

    // Build chat container skeleton
    mountTarget.innerHTML = `
      <div class="asymptote-chat-container">
        <!-- Sub-bar (white, 1px #e2e8f0 bottom border, padding 10px 18px, single line nowrap) -->
        <div class="asymptote-chat-subbar">
          <button type="button" class="asymptote-chat-back-btn" title="Back to solution">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span>Back to solution</span>
          </button>
          <span class="asymptote-chat-nano-pill">
            <span class="asymptote-chat-nano-dot"></span>
            <span class="asymptote-chat-nano-text">Gemini Nano · On-device</span>
          </span>
        </div>

        <!-- Message List -->
        <div class="asymptote-chat-log" id="asymptote-chat-log-${escapeHtml(slug)}">
          <div style="text-align:center; padding:16px 0; color:#64748b; font-size:12px;">Loading conversation...</div>
        </div>

        <!-- Chat Prompt Container -->
        <div class="asymptote-prompt-container">
          <div class="asymptote-prompt-context-row">
            <div class="asymptote-context-chip">#${escapeHtml(String(problemNumber))} Blueprint · ${escapeHtml(String(langLabel))}</div>
            <button
              type="button"
              class="asymptote-chat-clear-btn"
              aria-label="Clear chat"
              title="Clear chat"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
          <div class="asymptote-prompt-row">
            ${SPARKLE_SVG}
            <input
              type="text"
              class="asymptote-prompt-input asymptote-chat-input"
              placeholder="Ask about this solution…"
              aria-label="Ask about this solution"
              value="${escapeHtml(initialText)}"
            />
            <button type="button" class="asymptote-send-btn asymptote-chat-action-btn" title="Send message">
              ${SEND_ICON_SVG}
            </button>
          </div>
          <div class="asymptote-chat-footer">Nothing leaves your browser</div>
        </div>
      </div>
    `;

    const chatLogEl = mountTarget.querySelector('.asymptote-chat-log');
    const inputEl = mountTarget.querySelector('.asymptote-chat-input');
    const actionBtn = mountTarget.querySelector('.asymptote-chat-action-btn');
    const clearBtn = mountTarget.querySelector('.asymptote-chat-clear-btn');
    const backBtn = mountTarget.querySelector('.asymptote-chat-back-btn');
    const pillEl = mountTarget.querySelector('.asymptote-chat-nano-pill');
    const pillTextEl = mountTarget.querySelector('.asymptote-chat-nano-text');
    const pillDotEl = mountTarget.querySelector('.asymptote-chat-nano-dot');

    let isGenerating = false;
    let currentAbortController = null;
    let lastUserQuery = '';
    let availabilityStatus = 'available';

    const chatService = global?.NanoChatService || {
      getStoredChat: async () => [],
      saveStoredChat: async () => {},
      appendChatMessage: async () => [],
      clearStoredChat: async () => {},
      checkAvailability: async () => 'available',
      sendMessage: async () => ({ success: true, text: 'Mock response' }),
      regenerateLastMessage: async () => ({ success: true, text: 'Regenerated' }),
      destroySession: () => {}
    };

    const markdownParser = global?.NanoAIModule?.renderMarkdownToHtml || ((t) => escapeHtml(t));

    function scrollToBottom() {
      if (chatLogEl) {
        chatLogEl.scrollTop = chatLogEl.scrollHeight;
      }
    }

    /**
     * Update pill visual styling based on model availability
     */
    function updatePillStatus(status) {
      availabilityStatus = status;
      if (status === 'unavailable') {
        if (pillDotEl) pillDotEl.style.background = '#94a3b8';
        if (pillTextEl) pillTextEl.textContent = 'Gemini Nano · Unavailable';
        if (pillEl) {
          pillEl.style.borderColor = '#cbd5e1';
          pillEl.style.color = '#64748b';
          pillEl.style.background = '#f1f5f9';
        }
      } else if (status === 'downloading') {
        if (pillDotEl) pillDotEl.style.background = '#3b82f6';
        if (pillTextEl) pillTextEl.textContent = 'Gemini Nano · Downloading...';
        if (pillEl) {
          pillEl.style.borderColor = '#93c5fd';
          pillEl.style.color = '#1d4ed8';
          pillEl.style.background = '#eff6ff';
        }
      } else if (status === 'downloadable') {
        if (pillDotEl) pillDotEl.style.background = '#10b981';
        if (pillTextEl) pillTextEl.textContent = 'Gemini Nano · Ready to download';
        if (pillEl) {
          pillEl.style.borderColor = '#6ee7b7';
          pillEl.style.color = '#047857';
          pillEl.style.background = '#ecfdf5';
        }
      } else {
        if (pillDotEl) pillDotEl.style.background = '#10b981';
        if (pillTextEl) pillTextEl.textContent = 'Gemini Nano · On-device';
        if (pillEl) {
          pillEl.style.borderColor = '#6ee7b7';
          pillEl.style.color = '#047857';
          pillEl.style.background = '#ecfdf5';
        }
      }
    }

    /**
     * Set action button to Stop (while streaming) or Send (idle)
     */
    function updateStreamingUI(streaming) {
      isGenerating = streaming;
      if (streaming) {
        inputEl.disabled = true;
        inputEl.placeholder = 'Gemini is replying…';
        actionBtn.className = 'asymptote-stop-btn asymptote-chat-action-btn';
        actionBtn.innerHTML = STOP_ICON_SVG;
        actionBtn.title = 'Stop generating';
      } else {
        if (availabilityStatus === 'unavailable') {
          inputEl.disabled = true;
          inputEl.placeholder = 'Gemini Nano is unavailable';
          actionBtn.disabled = true;
        } else {
          inputEl.disabled = false;
          inputEl.placeholder = 'Ask about this solution…';
          actionBtn.disabled = false;
        }
        actionBtn.className = 'asymptote-send-btn asymptote-chat-action-btn';
        actionBtn.innerHTML = SEND_ICON_SVG;
        actionBtn.title = 'Send message';
      }
    }

    /**
     * Render downloading progress card inside log
     */
    function renderDownloadProgress(percent = 0) {
      chatLogEl.innerHTML = `
        <div class="asymptote-download-progress-container">
          <div style="font-size:13px; font-weight:700; color:#1e2033; margin-bottom:4px;">Downloading Gemini Nano, this happens once</div>
          <div style="font-size:11.5px; color:#64748b; margin-bottom:12px;">Allocating on-device model files (~1.5 GB)...</div>
          <div class="asymptote-download-track">
            <div class="asymptote-download-fill" style="width:${Math.max(0, Math.min(100, percent))}%;"></div>
          </div>
          <div class="asymptote-download-percent" style="font-size:12px; font-weight:600; color:#047857;">${percent}%</div>
        </div>
      `;
    }

    /**
     * Render the compact empty state with exactly 3 plain text starter chips
     * If downloadable: shows "Enable on-device AI" button
     * If unavailable: shows honest unavailable notice
     */
    function renderEmptyState() {
      if (clearBtn) {
        clearBtn.style.display = 'none';
      }

      if (availabilityStatus === 'unavailable') {
        inputEl.disabled = true;
        inputEl.placeholder = 'Gemini Nano is unavailable';
        actionBtn.disabled = true;

        chatLogEl.innerHTML = `
          <div class="asymptote-chat-unavailable-notice">
            <div style="width:36px; height:36px; border-radius:50%; background:#fee2e2; color:#dc2626; display:flex; align-items:center; justify-content:center; margin:0 auto 10px auto;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <div style="font-family:'Space Grotesk', -apple-system, sans-serif; font-size:14px; font-weight:700; color:#991b1b; margin-bottom:6px;">
              Gemini Nano Unavailable
            </div>
            <div style="font-size:12px; color:#475569; line-height:1.5; margin-bottom:12px;">
              On-device AI is not enabled on this Chrome profile. Requires Chrome 131+ with <code>chrome://flags/#prompt-api-for-gemini-nano</code> and <code>chrome://flags/#optimization-guide-on-device-model</code> enabled, and sufficient GPU/disk headroom.
            </div>
            <div style="font-size:11.5px; color:#64748b; font-weight:500;">
              Docked bar and chat inputs are disabled.
            </div>
          </div>
        `;
        return;
      }

      chatLogEl.innerHTML = `
        <div class="asymptote-chat-empty-state">
          <div class="asymptote-chat-empty-title">Ask Gemini Nano about #${escapeHtml(String(problemNumber))} ${escapeHtml(problem?.title || 'this solution')}</div>
          <div class="asymptote-chat-empty-subtitle">Socratic algorithmic insights running fully on-device.</div>
          <div class="asymptote-chat-chips-grid">
            <button type="button" class="asymptote-chat-chip" data-prompt="Explain intuition">
              Explain intuition
            </button>
            <button type="button" class="asymptote-chat-chip" data-prompt="Walk through code">
              Walk through code
            </button>
            <button type="button" class="asymptote-chat-chip" data-prompt="Edge cases & bounds">
              Edge cases & bounds
            </button>
          </div>
          ${availabilityStatus === 'downloadable' ? `
            <div class="asymptote-enable-box">
              <div style="font-size:12px; font-weight:600; color:#047857; margin-bottom:3px;">Enable on-device Gemini Nano</div>
              <div style="font-size:11px; color:#065f46; margin-bottom:8px;">One-time model download (~1.5 GB). Runs 100% locally.</div>
              <button type="button" class="asymptote-enable-nano-btn">
                Enable on-device AI
              </button>
            </div>
          ` : ''}
        </div>
      `;

      const chips = chatLogEl.querySelectorAll('.asymptote-chat-chip');
      chips.forEach((chip) => {
        chip.onclick = () => {
          const prompt = chip.getAttribute('data-prompt');
          if (prompt && !isGenerating) {
            handleSendMessage(prompt);
          }
        };
      });

      const enableBtn = chatLogEl.querySelector('.asymptote-enable-nano-btn');
      if (enableBtn) {
        enableBtn.onclick = async () => {
          renderDownloadProgress(0);
          try {
            await chatService.ensureSession({
              problem,
              pattern,
              code,
              lang,
              onProgress: (percent) => {
                const fillEl = chatLogEl.querySelector('.asymptote-download-fill');
                const pctEl = chatLogEl.querySelector('.asymptote-download-percent');
                if (fillEl) fillEl.style.width = `${percent}%`;
                if (pctEl) pctEl.textContent = `${percent}%`;
              }
            });
            updatePillStatus('available');
            renderEmptyState();
          } catch (err) {
            console.error('[SolutionChat] Enable model failed:', err);
            updatePillStatus('unavailable');
            renderEmptyState();
          }
        };
      }
    }

    /**
     * Attaches Copy and Regenerate links under finished assistant cards
     */
    function appendReplyActions(cardEl, rawText) {
      const actionsEl = document.createElement('div');
      actionsEl.className = 'asymptote-reply-actions';
      actionsEl.innerHTML = `
        <button type="button" class="asymptote-action-link asymptote-copy-reply-btn">Copy</button>
        <button type="button" class="asymptote-action-link asymptote-regen-reply-btn">Regenerate</button>
      `;

      const copyBtn = actionsEl.querySelector('.asymptote-copy-reply-btn');
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(rawText);
        copyBtn.innerText = 'Copied';
        setTimeout(() => {
          if (copyBtn) copyBtn.innerText = 'Copy';
        }, 1500);
      };

      const regenBtn = actionsEl.querySelector('.asymptote-regen-reply-btn');
      regenBtn.onclick = () => {
        if (!isGenerating && lastUserQuery) {
          handleRegenerate();
        }
      };

      cardEl.appendChild(actionsEl);
    }

    /**
     * Delegate code copy button clicks inside rendered markdown blocks
     */
    chatLogEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.asymptote-code-copy-btn');
      if (btn) {
        const block = btn.closest('.asymptote-code-block');
        const codeEl = block ? block.querySelector('code') : null;
        if (codeEl) {
          navigator.clipboard.writeText(codeEl.textContent);
          btn.innerText = 'Copied';
          setTimeout(() => {
            if (btn) btn.innerText = 'Copy';
          }, 1500);
        }
      }
    });

    /**
     * Render a message list into the log
     */
    function renderMessages(messages) {
      if (!messages || messages.length === 0) {
        renderEmptyState();
        return;
      }

      if (clearBtn) {
        clearBtn.style.display = 'inline-flex';
      }

      chatLogEl.innerHTML = '';
      for (const msg of messages) {
        if (msg.role === 'user') {
          lastUserQuery = msg.text;
          const userBubble = document.createElement('div');
          userBubble.className = 'asymptote-chat-bubble-user';
          userBubble.textContent = msg.text;
          chatLogEl.appendChild(userBubble);
        } else {
          const row = document.createElement('div');
          row.className = 'asymptote-chat-row-assistant';
          row.innerHTML = `
            ${ASYMPTOTE_AVATAR_SVG}
            <div class="asymptote-chat-card-assistant">
              <div class="asymptote-chat-body">${markdownParser(msg.text)}</div>
            </div>
          `;
          const cardEl = row.querySelector('.asymptote-chat-card-assistant');
          appendReplyActions(cardEl, msg.text);
          chatLogEl.appendChild(row);
        }
      }
      scrollToBottom();
    }

    /**
     * Load stored conversation from chrome.storage.local
     */
    async function loadHistory() {
      try {
        const messages = await chatService.getStoredChat(slug);
        renderMessages(messages);
      } catch (err) {
        console.warn('[SolutionChat] Failed to load chat history:', err);
        renderEmptyState();
      }
    }

    /**
     * Regenerate the last assistant reply
     */
    async function handleRegenerate() {
      if (isGenerating || !lastUserQuery) return;

      // Pop last assistant row and last user bubble from DOM
      const assistantRows = chatLogEl.querySelectorAll('.asymptote-chat-row-assistant');
      if (assistantRows.length > 0) {
        assistantRows[assistantRows.length - 1].remove();
      }
      const userBubbles = chatLogEl.querySelectorAll('.asymptote-chat-bubble-user');
      if (userBubbles.length > 0) {
        userBubbles[userBubbles.length - 1].remove();
      }

      // Remove last assistant message from storage
      await chatService.removeLastAssistantMessage(slug);

      // Re-send the query
      await handleSendMessage(lastUserQuery);
    }

    /**
     * Send a prompt message via Prompt API
     */
    async function handleSendMessage(promptText) {
      const userText = (promptText || inputEl.value || '').trim();
      if (!userText || isGenerating) return;

      lastUserQuery = userText;
      updateStreamingUI(true);
      inputEl.value = '';

      // If empty state was showing, clear it
      if (chatLogEl.querySelector('.asymptote-chat-empty-state') || chatLogEl.querySelector('.asymptote-chat-unavailable-notice')) {
        chatLogEl.innerHTML = '';
      }

      if (clearBtn) {
        clearBtn.style.display = 'inline-flex';
      }

      // 1. Append User Bubble
      const userBubble = document.createElement('div');
      userBubble.className = 'asymptote-chat-bubble-user';
      userBubble.textContent = userText;
      chatLogEl.appendChild(userBubble);
      scrollToBottom();

      // 2. Append Assistant Row with Avatar, Card, and Caret
      const assistantRow = document.createElement('div');
      assistantRow.className = 'asymptote-chat-row-assistant';
      assistantRow.innerHTML = `
        ${ASYMPTOTE_AVATAR_SVG}
        <div class="asymptote-chat-card-assistant">
          <div class="asymptote-chat-body">
            <span class="asymptote-streaming-caret"></span>
          </div>
        </div>
      `;
      chatLogEl.appendChild(assistantRow);
      scrollToBottom();

      const bodyEl = assistantRow.querySelector('.asymptote-chat-body');
      const cardEl = assistantRow.querySelector('.asymptote-chat-card-assistant');

      currentAbortController = new AbortController();

      let finalReplyText = '';
      try {
        const res = await chatService.sendMessage({
          problem,
          pattern,
          code,
          lang,
          message: userText,
          signal: currentAbortController.signal,
          onProgress: (percent) => {
            bodyEl.innerHTML = `
              <div style="font-size:12px; color:#64748b; margin-bottom:4px;">Downloading Gemini Nano, this happens once (${percent}%)</div>
              <div class="asymptote-download-track">
                <div class="asymptote-download-fill" style="width:${percent}%;"></div>
              </div>
            `;
          },
          onChunk: (accumulated) => {
            finalReplyText = accumulated;
            bodyEl.innerHTML = markdownParser(accumulated) + '<span class="asymptote-streaming-caret"></span>';
            scrollToBottom();
          }
        });

        finalReplyText = res.text || finalReplyText;
        bodyEl.innerHTML = markdownParser(finalReplyText);

        if (res.aborted) {
          // If aborted by user, render reply actions on the partial text
          if (finalReplyText) {
            appendReplyActions(cardEl, finalReplyText);
          }
        } else if (res.error) {
          // Mid-stream error: keep partial text and show inline Retry action
          const errBanner = document.createElement('div');
          errBanner.style.cssText = 'margin-top:8px; padding:6px 10px; background:#fef2f2; border:1px solid #fecaca; border-radius:6px; font-size:12px; color:#991b1b; display:flex; align-items:center; justify-content:space-between; gap:8px;';
          errBanner.innerHTML = `
            <span>Something went wrong.</span>
            <button type="button" class="asymptote-action-link asymptote-retry-btn" style="color:#047857; font-weight:700; text-decoration:underline; cursor:pointer;">Retry</button>
          `;
          const retryBtn = errBanner.querySelector('.asymptote-retry-btn');
          retryBtn.onclick = () => {
            assistantRow.remove();
            handleSendMessage(lastUserQuery);
          };
          cardEl.appendChild(errBanner);
        } else {
          appendReplyActions(cardEl, finalReplyText);
        }
        scrollToBottom();
      } catch (err) {
        console.error('[SolutionChat] Error during message generation:', err);
        bodyEl.innerHTML = markdownParser(finalReplyText || '');
        const errBanner = document.createElement('div');
        errBanner.style.cssText = 'margin-top:8px; padding:6px 10px; background:#fef2f2; border:1px solid #fecaca; border-radius:6px; font-size:12px; color:#991b1b; display:flex; align-items:center; justify-content:space-between; gap:8px;';
        errBanner.innerHTML = `
          <span>Something went wrong.</span>
          <button type="button" class="asymptote-action-link asymptote-retry-btn" style="color:#047857; font-weight:700; text-decoration:underline; cursor:pointer;">Retry</button>
        `;
        const retryBtn = errBanner.querySelector('.asymptote-retry-btn');
        retryBtn.onclick = () => {
          assistantRow.remove();
          handleSendMessage(lastUserQuery);
        };
        cardEl.appendChild(errBanner);
      } finally {
        updateStreamingUI(false);
        currentAbortController = null;
        inputEl.focus();
      }
    }

    // Action button click (Send when idle, Stop when streaming)
    actionBtn.addEventListener('click', () => {
      if (isGenerating) {
        if (currentAbortController) {
          currentAbortController.abort();
        }
      } else {
        handleSendMessage();
      }
    });

    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!isGenerating) {
          handleSendMessage();
        }
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', async () => {
        if (isGenerating) {
          if (currentAbortController) currentAbortController.abort();
        }
        await chatService.clearStoredChat(slug);
        renderEmptyState();
        inputEl.value = '';
        inputEl.focus();
      });
    }

    if (backBtn && typeof onBackToSolution === 'function') {
      backBtn.addEventListener('click', () => {
        if (isGenerating && currentAbortController) {
          currentAbortController.abort();
        }
        onBackToSolution();
      });
    }

    // Initialize: check availability then load history
    chatService.checkAvailability().then((status) => {
      updatePillStatus(status);
      return loadHistory();
    }).then(() => {
      if (autoSend && initialText && initialText.trim() && availabilityStatus !== 'unavailable') {
        handleSendMessage(initialText.trim());
      } else if (inputEl && availabilityStatus !== 'unavailable') {
        inputEl.focus();
      }
    }).catch((err) => {
      console.warn('[SolutionChat] Init error:', err);
      updatePillStatus('unavailable');
      renderEmptyState();
    });

    return {
      destroy: () => {
        if (isGenerating && currentAbortController) {
          currentAbortController.abort();
        }
        if (typeof chatService.destroySession === 'function') {
          chatService.destroySession();
        }
        mountTarget.innerHTML = '';
      },
      sendMessage: handleSendMessage,
      clearHistory: async () => {
        await chatService.clearStoredChat(slug);
        renderEmptyState();
      }
    };
  }

  const api = {
    mount: mountSolutionChat,
    mountDockedBar,
    ensureChatStyles
  };

  if (typeof global !== 'undefined') {
    global.SolutionChat = api;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
