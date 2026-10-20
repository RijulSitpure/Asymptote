/**
 * Asymptote - Extension Popup Controller
 * Connects directly to local server & active LeetCode sessions.
 */

const {
  getLanguageMeta,
  getSupportedLanguagesForProblem,
  getProblemSolutionCode
} = (globalThis.LanguagesModule || window.LanguagesModule || {});

function showMessage(text, type = 'info') {
  const msgEl = document.getElementById('sync-msg');
  if (!msgEl) return;
  msgEl.className = `msg-box msg-${type}`;
  msgEl.innerText = text;
  msgEl.style.display = 'block';
}

function hideMessage() {
  const msgEl = document.getElementById('sync-msg');
  if (msgEl) msgEl.style.display = 'none';
}

function updateServerStatus(isConnected, stats = null) {
  const statusEl = document.getElementById('server-status');
  const dotEl = document.getElementById('server-dot');

  if (isConnected && stats) {
    if (statusEl) statusEl.innerText = 'Local Engine Ready';
    if (dotEl) dotEl.style.background = '#10b981';

    const username = stats.username || 'LeetCode User';
    const totalSolved = stats.totalSolved ?? stats.solvedCount ?? 0;
    const coverage = stats.patternCoveragePercent ?? 0;
    const diff = stats.difficultyBreakdown || { Easy: 0, Medium: 0, Hard: 0 };

    const nameEl = document.getElementById('user-name');
    if (nameEl) nameEl.innerText = username;
    const avatarEl = document.getElementById('user-avatar');
    if (avatarEl) avatarEl.innerText = username.charAt(0).toUpperCase();
    const covEl = document.getElementById('user-coverage-pill');
    if (covEl) covEl.innerText = `${coverage}% Coverage`;
    const metaEl = document.getElementById('user-stats-meta');
    if (metaEl) metaEl.innerText = `${totalSolved} Solved • Synced`;

    const easyEl = document.getElementById('badge-easy');
    if (easyEl) easyEl.innerText = `${diff.Easy || 0} Easy`;
    const medEl = document.getElementById('badge-med');
    if (medEl) medEl.innerText = `${diff.Medium || 0} Med`;
    const hardEl = document.getElementById('badge-hard');
    if (hardEl) hardEl.innerText = `${diff.Hard || 0} Hard`;
  } else {
    if (statusEl) statusEl.innerText = 'Local Engine';
    if (dotEl) dotEl.style.background = '#10b981';
    const metaEl = document.getElementById('user-stats-meta');
    if (metaEl) metaEl.innerText = 'Local dataset ready';
  }
}

function checkServer() {
  chrome.runtime.sendMessage({ action: 'get_stats' }, (response) => {
    if (response && response.success && response.data) {
      updateServerStatus(true, response.data);
    } else {
      updateServerStatus(true, {
        username: 'LeetCode User',
        totalSolved: 0,
        patternCoveragePercent: 0,
        difficultyBreakdown: { Easy: 0, Medium: 0, Hard: 0 }
      });
    }
  });
}

let isLeetCodeLoggedIn = true;

async function checkLeetCodeLogin() {
  const syncBtn = document.getElementById('sync-all-btn');
  const loginHint = document.getElementById('sync-login-hint');

  const setLoggedOut = () => {
    isLeetCodeLoggedIn = false;
    if (syncBtn) {
      syncBtn.disabled = true;
      syncBtn.title = 'Please log in to LeetCode to sync your solved problems';
    }
    if (loginHint) {
      loginHint.style.display = 'block';
    }
  };

  const setLoggedIn = (username = null) => {
    isLeetCodeLoggedIn = true;
    if (syncBtn) {
      syncBtn.disabled = false;
      syncBtn.title = 'Sync all solved problems to local Asymptote Pattern Tracker';
    }
    if (loginHint) {
      loginHint.style.display = 'none';
    }
    if (username) {
      const nameEl = document.getElementById('user-name');
      if (nameEl) nameEl.innerText = username;
    }
  };

  try {
    if (typeof chrome !== 'undefined' && chrome.cookies) {
      chrome.cookies.get({ url: 'https://leetcode.com', name: 'LEETCODE_SESSION' }, (cookie) => {
        if (!cookie || !cookie.value) {
          if (chrome.tabs) {
            chrome.tabs.query({ url: '*://*.leetcode.com/*' }, (tabs) => {
              if (!tabs || tabs.length === 0) {
                setLoggedOut();
              } else {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'check_user_status' }, (resp) => {
                  if (resp && resp.isSignedIn) {
                    setLoggedIn(resp.username);
                  } else {
                    setLoggedOut();
                  }
                });
              }
            });
          } else {
            setLoggedOut();
          }
        } else {
          setLoggedIn();
        }
      });
    }
  } catch (_e) {
    // In preview context, fallback to server status
  }
}

async function triggerSync() {
  const btn = document.getElementById('sync-all-btn');
  if (!isLeetCodeLoggedIn) {
    showMessage('Please sign in to leetcode.com first!', 'error');
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url: 'https://leetcode.com/accounts/login/' });
    }
    return;
  }

  btn.disabled = true;
  showMessage('Connecting to active LeetCode session...', 'info');

  try {
    const tabs = await chrome.tabs.query({ url: '*://*.leetcode.com/*' });

    if (tabs && tabs.length > 0) {
      const targetTab = tabs[0];
      showMessage('Retrieving solved problem catalog via LeetCode...', 'info');

      chrome.tabs.sendMessage(targetTab.id, { action: 'sync_all_from_leetcode' }, (response) => {
        btn.disabled = false;
        if (chrome.runtime.lastError || !response) {
          showMessage('Please refresh (Cmd+R) your open LeetCode tab and click "Sync Solved to Asymptote" on the page!', 'error');
          return;
        }

        if (response.success) {
          showMessage(`Successfully synced ${response.count} solved questions for ${response.username}!`, 'success');
          checkServer();
        } else {
          showMessage(`Sync failed: ${response.error || 'Please sign in to leetcode.com'}`, 'error');
        }
      });
    } else {
      showMessage('Opening LeetCode tab... Click the "Sync Solved" pill on the page!', 'info');
      chrome.tabs.create({ url: 'https://leetcode.com/problemset/' });
      btn.disabled = false;
    }
  } catch (err) {
    btn.disabled = false;
    showMessage(`Sync error: ${err.message}`, 'error');
  }
}

// ==================== VIEW SWITCHING ====================
let lastProblemQuery = null;

function showSyncView() {
  hideMessage();
  const syncView = document.getElementById('sync-view');
  const problemView = document.getElementById('problem-view');
  const backToSyncBtn = document.getElementById('view-back-to-sync-btn');
  const backToProblemBtn = document.getElementById('view-back-to-problem-btn');
  const accountBackBar = document.getElementById('account-back-bar');

  if (syncView) syncView.style.display = 'block';
  if (problemView) problemView.style.display = 'none';
  if (backToSyncBtn) backToSyncBtn.style.display = 'none';

  if (lastProblemQuery || popupCachedData?.problem?.slug) {
    if (backToProblemBtn) backToProblemBtn.style.display = 'inline-flex';
    if (accountBackBar) accountBackBar.style.display = 'block';
  } else {
    if (backToProblemBtn) backToProblemBtn.style.display = 'none';
    if (accountBackBar) accountBackBar.style.display = 'none';
  }
}

function showProblemView(query) {
  if (query) lastProblemQuery = query;
  const syncView = document.getElementById('sync-view');
  const problemView = document.getElementById('problem-view');
  const backToSyncBtn = document.getElementById('view-back-to-sync-btn');
  const backToProblemBtn = document.getElementById('view-back-to-problem-btn');
  const accountBackBar = document.getElementById('account-back-bar');

  if (syncView) syncView.style.display = 'none';
  if (problemView) problemView.style.display = 'block';
  if (backToSyncBtn) backToSyncBtn.style.display = 'inline-flex';
  if (backToProblemBtn) backToProblemBtn.style.display = 'none';
  if (accountBackBar) accountBackBar.style.display = 'none';

  lookupProblem(query || lastProblemQuery);
}

// ==================== PROBLEM VIEW LOGIC ====================
let popupActiveTab = 'clues'; // 'clues' | 'solution' | 'complexity' | 'notes'
let popupActiveLang = 'python3';
let popupCurrentHintLevel = 1;
let popupCachedData = null;
let popupUserPrompt = '';
let popupNanoOutputHtml = null;
let popupNanoLoading = false;

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function switchPopupTab(tab) {
  popupActiveTab = tab;

  const tabs = ['clues', 'solution', 'complexity', 'notes'];
  tabs.forEach(t => {
    const btn = document.getElementById(`popup-tab-btn-${t}`);
    if (btn) {
      if (t === tab) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });

  renderPopupTabContent();
}

function renderPopupTabContent() {
  const contentEl = document.getElementById('popup-tab-content');
  if (!contentEl || !popupCachedData) return;

  const { problem, pattern, hints, complexity } = popupCachedData;
  const isVerified = Boolean(problem?.verified === 1 || problem?.verified === true);

  const hintTitles = [
    'Recognize the pattern',
    'Define the state',
    'Write the transition',
    'See the blueprint'
  ];

  if (popupActiveTab === 'clues') {
    if (!isVerified) {
      contentEl.innerHTML = `
        <div class="tab-content-pane" style="text-align:center; padding:28px 12px;">
          <div style="width:56px; height:56px; margin:0 auto 14px; background:#f1f5f9; border-radius:12px; display:flex; align-items:center; justify-content:center; color:#64748b;">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h3 style="font-family:'Space Grotesk', sans-serif; font-size:22px; font-weight:700; color:#1e2033; margin-bottom:6px;">
            No verified hints yet
          </h3>
          <p style="font-size:15px; color:#475569; line-height:1.5; margin-bottom:16px;">
            We have not written verified hints for this problem yet.
          </p>
          <div>
            <span style="font-size:12px; font-weight:500; color:#475569; padding:3px 10px; border-radius:9999px; background:#ffffff; border:1px solid #cbd5e1; display:inline-block;">
              ${problem?.category || 'Algorithms'}
            </span>
          </div>
        </div>
      `;
      return;
    }

    const rowsHtml = (hints || []).map((h, i) => {
      const isUnlocked = (i + 1) <= popupCurrentHintLevel;
      const title = hintTitles[i] || h.title;
      if (isUnlocked) {
        return `
          <div id="popup-hint-card-${i + 1}" style="background:#f0fdf4; border:1px solid #a7f3d0; border-radius:10px; padding:12px; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
              <span style="background:#1e2033; color:#ffffff; font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px; line-height:1;">
                L${i + 1}
              </span>
              <span style="font-weight:700; font-size:13px; color:#1e2033;">
                ${title}
              </span>
            </div>
            <div style="font-size:13px; color:#334155; line-height:1.5; white-space:pre-wrap;">${h.content.trim()}</div>
          </div>
        `;
      } else {
        return `
          <div id="popup-hint-card-${i + 1}" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:10px 12px; margin-bottom:8px; display:flex; align-items:center; justify-content:space-between;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#e2e8f0; color:#475569; font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px; line-height:1;">
                L${i + 1}
              </span>
              <span style="font-weight:500; font-size:13px; color:#64748b;">
                ${title}
              </span>
            </div>
            <span style="font-size:11px; font-weight:600; color:#94a3b8;">Locked</span>
          </div>
        `;
      }
    }).join('');

    const nextHintIdx = popupCurrentHintLevel;
    const nextTitle = hintTitles[nextHintIdx] || 'Next step';
    const hasMore = popupCurrentHintLevel < (hints?.length || 4);

    contentEl.innerHTML = `
      <div class="tab-content-pane">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <span style="font-size:13px; font-weight:700; color:#1e2033;">Hints</span>
          <span style="font-size:12px; color:#64748b;">${popupCurrentHintLevel} of ${hints?.length || 4} unlocked</span>
        </div>
        ${rowsHtml}
        ${hasMore ? `
          <button id="popup-reveal-hint-btn" class="btn-amber-reveal">
            Reveal hint ${popupCurrentHintLevel + 1}: ${nextTitle}
          </button>
        ` : `
          <div id="popup-all-hints-unlocked-banner" style="text-align:center; font-size:12px; color:#047857; font-weight:600; background:#f0fdf4; border:1px solid #a7f3d0; border-radius:8px; padding:8px; margin-top:8px; scroll-margin-bottom:24px;">
            All hints unlocked
          </div>
        `}
      </div>
    `;

    const revealBtn = document.getElementById('popup-reveal-hint-btn');
    if (revealBtn) {
      revealBtn.onclick = () => {
        popupCurrentHintLevel++;
        renderPopupTabContent();
        setTimeout(() => {
          const nextActionBtn = document.getElementById('popup-reveal-hint-btn');
          const allUnlockedEl = document.getElementById('popup-all-hints-unlocked-banner');
          const newlyUnlocked = document.getElementById(`popup-hint-card-${popupCurrentHintLevel}`);
          const targetEl = nextActionBtn || allUnlockedEl || newlyUnlocked;
          if (targetEl && typeof targetEl.scrollIntoView === 'function') {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 80);
      };
    }
  } else if (popupActiveTab === 'solution') {
    if (!isVerified) {
      contentEl.innerHTML = `
        <div class="tab-content-pane" style="text-align:center; padding:28px 12px;">
          <div style="width:52px; height:52px; margin:0 auto 12px; background:#f1f5f9; border-radius:12px; display:flex; align-items:center; justify-content:center; color:#64748b;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
          <h3 style="font-family:'Space Grotesk', sans-serif; font-size:20px; font-weight:700; color:#1e2033; margin-bottom:6px;">
            No verified solution yet
          </h3>
          <p style="font-size:14px; color:#475569; line-height:1.5; margin-bottom:14px;">
            Multi-language verified solutions are only published for curated problem archetypes.
          </p>
          <div>
            <span style="font-size:11px; font-weight:600; color:#1e2033; padding:2px 8px; border-radius:9999px; background:#e2e8f0;">
              ${problem?.category || 'Algorithms'}
            </span>
          </div>
        </div>
      `;
      return;
    }

    const supportedLangs = getSupportedLanguagesForProblem(problem);
    const primarySolLang = problem?.solutions?.[0]?.lang || 
      (problem?.category === 'Database' ? 'mysql' : 
       problem?.category === 'pandas' ? 'pythondata' : 
       problem?.category === 'Shell' ? 'bash' : 
       problem?.category === 'JavaScript' ? 'javascript' : 'python3');

    if (!supportedLangs.some(l => (l.langSlug || l.id) === popupActiveLang)) {
      popupActiveLang = supportedLangs.some(l => (l.langSlug || l.id) === primarySolLang) ? primarySolLang : (supportedLangs[0]?.langSlug || supportedLangs[0]?.id || 'python3');
    }
    const selectedMeta = (typeof getLanguageMeta === 'function' ? getLanguageMeta(popupActiveLang) : null) || { displayName: popupActiveLang, name: popupActiveLang };

    const code = getProblemSolutionCode(problem, popupActiveLang);
    const activeCode = code && code.trim() ? code : `No verified solution in ${selectedMeta.displayName || selectedMeta.name} yet`;
    const blueprintTitle = 'Blueprint';

    contentEl.innerHTML = `
      <div class="tab-content-pane">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:13px; font-weight:700; color:#1e2033;">
            ${blueprintTitle}
          </span>
          <div style="display:flex; align-items:center; gap:6px;">
            ${supportedLangs.length === 0 ? `
              <span style="font-size:11px; color:#64748b; font-style:italic;">Loading languages...</span>
            ` : `
              <select id="popup-lang-select" class="popup-select">
                ${supportedLangs.map(l => `<option value="${l.langSlug || l.id}" ${(l.langSlug || l.id) === popupActiveLang ? 'selected' : ''}>${l.displayName || l.name}</option>`).join('')}
              </select>
            `}
            <button id="popup-copy-btn" style="background:#ffffff; border:1px solid #e2e8f0; color:#1e2033; padding:3px 8px; border-radius:6px; font-size:11px; font-weight:500; cursor:pointer;">
              Copy
            </button>
          </div>
        </div>
        <pre class="code-preview"><code>${activeCode}</code></pre>
        <div style="margin-top:10px; background:#ffffff; border:1px solid #cbd5e1; border-radius:10px; padding:10px;">
          <div style="font-family:'Space Grotesk', sans-serif; font-size:13px; font-weight:700; color:#1e2033; margin-bottom:8px;">
            AI Explanation
          </div>

          <div style="display:flex; gap:6px; margin-bottom:6px;">
            <input id="popup-ai-prompt-input" type="text" placeholder="Ask anything about this solution..." value="${escapeHtml(popupUserPrompt)}" style="flex:1; min-width:0; background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:6px 10px; font-size:12px; color:#1e2033; outline:none; font-family:inherit;" />
            <button id="popup-nano-ask-btn" class="btn-amber-reveal" style="font-size:11px; font-weight:700; padding:6px 12px; margin-top:0; border-radius:6px; white-space:nowrap; width:auto; cursor:pointer;">Ask</button>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:8px;">
            <button type="button" class="popup-prompt-chip" data-prompt="Explain core intuition" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:4px; padding:2px 6px; font-size:10px; color:#475569; cursor:pointer;">💡 Intuition</button>
            <button type="button" class="popup-prompt-chip" data-prompt="Step-by-step code trace" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:4px; padding:2px 6px; font-size:10px; color:#475569; cursor:pointer;">🔍 Code trace</button>
            <button type="button" class="popup-prompt-chip" data-prompt="Critical edge cases" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:4px; padding:2px 6px; font-size:10px; color:#475569; cursor:pointer;">⚠️ Edge cases</button>
          </div>

          ${popupNanoLoading ? `
            <div style="text-align:center; padding:10px; font-size:11px; color:#64748b;">
              ⏳ Generating explanation...
            </div>
          ` : popupNanoOutputHtml ? `
            <div style="font-size:11px; color:#334155; line-height:1.55; background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px; max-height:160px; overflow-y:auto; margin-bottom:6px;">${popupNanoOutputHtml}</div>
          ` : ''}
        </div>

        <div style="text-align:center; margin-top:12px;">
          <button id="popup-open-editor-btn" type="button" style="background:none; border:none; padding:0; font-size:12px; color:#1e2033; font-weight:600; cursor:pointer; text-decoration:none; font-family:inherit;">
            Open in dashboard editor ↗
          </button>
        </div>
      </div>
    `;

    const editorBtn = document.getElementById('popup-open-editor-btn');
    if (editorBtn) {
      editorBtn.onclick = () => {
        chrome.tabs.create({
          url: chrome.runtime.getURL('dashboard/index.html?tab=solver&q=' + encodeURIComponent(problem?.slug || ''))
        });
      };
    }

    const langSelect = document.getElementById('popup-lang-select');
    if (langSelect) {
      langSelect.onchange = (e) => {
        popupActiveLang = e.target.value;
        renderPopupTabContent();
      };
    }

    const copyBtn = document.getElementById('popup-copy-btn');
    if (copyBtn) {
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(activeCode);
        copyBtn.innerText = 'Copied';
        setTimeout(() => {
          if (copyBtn) copyBtn.innerText = 'Copy';
        }, 1500);
      };
    }

    const askPopupPrompt = (promptText) => {
      const nanoModule = globalThis.NanoAIModule || window.NanoAIModule || null;
      if (!nanoModule) return;
      popupNanoLoading = true;
      popupUserPrompt = promptText || popupUserPrompt || 'Explain core intuition';
      renderPopupTabContent();

      nanoModule.explainSolutionWithNano({
        problem,
        pattern,
        code: activeCode,
        lang: popupActiveLang,
        prompt: popupUserPrompt
      }).then(res => {
        popupNanoLoading = false;
        popupNanoOutputHtml = res.html;
        renderPopupTabContent();
      }).catch(err => {
        popupNanoLoading = false;
        popupNanoOutputHtml = `<div style="color:#dc2626;">Error: ${escapeHtml(err.message)}</div>`;
        renderPopupTabContent();
      });
    };

    const askBtn = document.getElementById('popup-nano-ask-btn');
    const promptInput = document.getElementById('popup-ai-prompt-input');
    if (askBtn && promptInput) {
      askBtn.onclick = () => {
        askPopupPrompt(promptInput.value.trim());
      };
      promptInput.onkeydown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          askPopupPrompt(promptInput.value.trim());
        }
      };
    }

    const chips = document.querySelectorAll('.popup-prompt-chip');
    chips.forEach(chip => {
      chip.onclick = () => {
        const p = chip.getAttribute('data-prompt') || '';
        popupUserPrompt = p;
        askPopupPrompt(p);
      };
    });
  } else if (popupActiveTab === 'complexity') {
    if (!isVerified) {
      contentEl.innerHTML = `
        <div class="tab-content-pane" style="text-align:center; padding:28px 12px;">
          <div style="width:52px; height:52px; margin:0 auto 12px; background:#f1f5f9; border-radius:12px; display:flex; align-items:center; justify-content:center; color:#64748b;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h3 style="font-family:'Space Grotesk', sans-serif; font-size:20px; font-weight:700; color:#1e2033; margin-bottom:6px;">
            No verified complexity yet
          </h3>
          <p style="font-size:14px; color:#475569; line-height:1.5; margin-bottom:14px;">
            Target complexity and operational budgets are only provided for verified problem archetypes.
          </p>
          <div>
            <span style="font-size:11px; font-weight:600; color:#1e2033; padding:2px 8px; border-radius:9999px; background:#e2e8f0;">
              ${problem?.category || 'Algorithms'}
            </span>
          </div>
        </div>
      `;
      return;
    }

    const compKind = complexity?.kind || (problem?.category === 'Database' ? 'query-notes' : (problem?.category === 'Concurrency' ? 'none' : 'big-o'));

    let compHtml = '';
    if (compKind === 'query-notes') {
      const varsHtml = Array.isArray(complexity?.variables) && complexity.variables.length > 0
        ? `<div style="padding:6px 10px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; font-size:11px; color:#475569; margin-bottom:8px;">
             <strong style="color:#1e2033;">Variables:</strong> ${complexity.variables.join('; ')}
           </div>`
        : '';

      compHtml = `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:10px;">
          <div style="background:#ffffff; padding:10px; border-radius:8px; border:1px solid #e2e8f0;">
            <div style="font-size:11px; color:#64748b; font-weight:500;">Execution / Cost</div>
            <div style="font-size:16px; font-weight:700; color:#1e2033; font-family:'Space Grotesk',sans-serif; margin-top:2px;">
              ${complexity?.time || complexity?.targetTime || 'O(N)'}
            </div>
          </div>
          <div style="background:#ffffff; padding:10px; border-radius:8px; border:1px solid #e2e8f0;">
            <div style="font-size:11px; color:#64748b; font-weight:500;">Auxiliary memory</div>
            <div style="font-size:16px; font-weight:700; color:#1e2033; font-family:'Space Grotesk',sans-serif; margin-top:2px;">
              ${complexity?.space || complexity?.targetSpace || 'O(1)'}
            </div>
          </div>
        </div>
        ${varsHtml}
        ${complexity?.notes ? `
        <div style="padding:8px 10px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; font-size:11px; color:#475569; line-height:1.45; margin-bottom:8px;">
          <strong style="color:#1e2033;">Overview:</strong> ${complexity.notes}
        </div>` : ''}
        <div style="padding:10px 12px; background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; font-size:12px; color:#9f1239; line-height:1.45; margin-bottom:8px;">
          <div style="font-weight:700; font-size:12px; margin-bottom:2px;">Why Naive Fails / Query Bottlenecks</div>
          ${complexity?.whyNaiveFails || complexity?.notes || ''}
        </div>
        <div style="padding:10px 12px; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; font-size:12px; color:#334155; line-height:1.45; margin-bottom:8px;">
          <div style="font-weight:700; font-size:12px; color:#1e2033; margin-bottom:2px;">Space-Time Tradeoff</div>
          ${complexity?.spaceTimeTradeoff || 'Minimal auxiliary space used.'}
        </div>
        <div style="padding:10px 12px; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; font-size:12px; color:#334155; line-height:1.45;">
          <div style="font-weight:700; font-size:12px; color:#1e2033; margin-bottom:2px;">What Interviewers Look For</div>
          ${complexity?.interviewerExpectation || ''}
        </div>
      `;
    } else if (compKind === 'none') {
      compHtml = `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:10px;">
          <div style="background:#ffffff; padding:10px; border-radius:8px; border:1px solid #e2e8f0;">
            <div style="font-size:11px; color:#64748b; font-weight:500;">Coordination</div>
            <div style="font-size:16px; font-weight:700; color:#1e2033; font-family:'Space Grotesk',sans-serif; margin-top:2px;">
              Synchronized
            </div>
          </div>
          <div style="background:#ffffff; padding:10px; border-radius:8px; border:1px solid #e2e8f0;">
            <div style="font-size:11px; color:#64748b; font-weight:500;">Space overhead</div>
            <div style="font-size:16px; font-weight:700; color:#1e2033; font-family:'Space Grotesk',sans-serif; margin-top:2px;">
              ${complexity?.space || 'O(1)'}
            </div>
          </div>
        </div>
        ${complexity?.notes ? `
        <div style="padding:8px 10px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; font-size:11px; color:#475569; line-height:1.45; margin-bottom:8px;">
          <strong style="color:#1e2033;">Overview:</strong> ${complexity.notes}
        </div>` : ''}
        <div style="padding:10px 12px; background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; font-size:12px; color:#9f1239; line-height:1.45; margin-bottom:8px;">
          <div style="font-weight:700; font-size:12px; margin-bottom:2px;">Why Naive Fails / Concurrency Hazards</div>
          ${complexity?.whyNaiveFails || complexity?.notes || ''}
        </div>
        <div style="padding:10px 12px; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; font-size:12px; color:#334155; line-height:1.45; margin-bottom:8px;">
          <div style="font-weight:700; font-size:12px; color:#1e2033; margin-bottom:2px;">Coordination & Memory Tradeoff</div>
          ${complexity?.spaceTimeTradeoff || 'Minimal auxiliary space used.'}
        </div>
        <div style="padding:10px 12px; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; font-size:12px; color:#334155; line-height:1.45;">
          <div style="font-weight:700; font-size:12px; color:#1e2033; margin-bottom:2px;">What Interviewers Look For</div>
          ${complexity?.interviewerExpectation || ''}
        </div>
      `;
    } else {
      compHtml = `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:10px;">
          <div style="background:#ffffff; padding:10px; border-radius:8px; border:1px solid #e2e8f0;">
            <div style="font-size:11px; color:#64748b; font-weight:500;">Target time</div>
            <div style="font-size:16px; font-weight:700; color:#1e2033; font-family:'Space Grotesk',sans-serif; margin-top:2px;">
              ${complexity?.targetTime || complexity?.time || 'O(N)'}
            </div>
          </div>
          <div style="background:#ffffff; padding:10px; border-radius:8px; border:1px solid #e2e8f0;">
            <div style="font-size:11px; color:#64748b; font-weight:500;">Target space</div>
            <div style="font-size:16px; font-weight:700; color:#1e2033; font-family:'Space Grotesk',sans-serif; margin-top:2px;">
              ${complexity?.targetSpace || complexity?.space || 'O(1)'}
            </div>
          </div>
        </div>
        ${complexity?.notes ? `
        <div style="padding:8px 10px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; font-size:11px; color:#475569; line-height:1.45; margin-bottom:8px;">
          <strong style="color:#1e2033;">Overview:</strong> ${complexity.notes}
        </div>` : ''}
        <div style="padding:10px 12px; background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; font-size:12px; color:#9f1239; line-height:1.45; margin-bottom:8px;">
          <div style="font-weight:700; font-size:12px; margin-bottom:2px;">Why Naive Fails / Operations Budget</div>
          ${complexity?.whyNaiveFails || complexity?.opsBudgetExplanation || complexity?.notes || ''}
        </div>
        <div style="padding:10px 12px; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; font-size:12px; color:#334155; line-height:1.45; margin-bottom:8px;">
          <div style="font-weight:700; font-size:12px; color:#1e2033; margin-bottom:2px;">Space-Time Tradeoff</div>
          ${complexity?.spaceTimeTradeoff || 'Minimal auxiliary space used.'}
        </div>
        <div style="padding:10px 12px; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; font-size:12px; color:#334155; line-height:1.45;">
          <div style="font-weight:700; font-size:12px; color:#1e2033; margin-bottom:2px;">What Interviewers Look For</div>
          ${complexity?.interviewerExpectation || ''}
        </div>
      `;
    }

    contentEl.innerHTML = `
      <div class="tab-content-pane">
        ${compHtml}
      </div>
    `;
  } else if (popupActiveTab === 'notes') {
    renderPopupNotesTab();
  }
}

function renderPopupNotesTab() {
  const contentEl = document.getElementById('popup-tab-content');
  if (!contentEl || !popupCachedData) return;

  const { problem } = popupCachedData;
  if (!problem) return;

  let currentRating = Number(problem.user_rating || 3);
  let isReview = Boolean(problem.review_needed);
  let currentNotes = problem.user_notes || '';

  const renderStars = (rating) => {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      const active = i <= rating;
      starsHtml += `
        <span class="star-btn" data-star="${i}" style="font-size:18px; color:${active ? '#f59e0b' : '#cbd5e1'}; cursor:pointer; padding:0 2px; user-select:none; transition:color 0.15s ease;">
          ★
        </span>
      `;
    }
    return starsHtml;
  };

  contentEl.innerHTML = `
    <div class="tab-content-pane" style="text-align:left; font-family:'DM Sans', sans-serif;">
      <!-- Confidence Rating Card -->
      <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:12px 14px; margin-bottom:12px; display:flex; align-items:center; justify-content:space-between;">
        <div>
          <div style="font-size:12px; font-weight:700; color:#1e2033; text-transform:uppercase; letter-spacing:0.04em;">CONFIDENCE RATING</div>
          <div style="font-size:11px; color:#64748b; margin-top:2px;">Rate your mastery of this problem</div>
        </div>
        <div style="display:flex; align-items:center; gap:6px;">
          <div id="popup-notes-stars" style="display:flex; align-items:center;">
            ${renderStars(currentRating)}
          </div>
          <span id="popup-notes-rating-text" style="font-size:12px; font-weight:600; color:#475569; width:36px; text-align:right;">
            ${currentRating}/5
          </span>
        </div>
      </div>

      <!-- Flag for Review Queue -->
      <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:10px 14px; margin-bottom:12px; display:flex; align-items:center; justify-content:space-between;">
        <label for="popup-notes-review-toggle" style="font-size:13px; font-weight:600; color:#1e2033; cursor:pointer; display:flex; align-items:center; gap:8px;">
          <input type="checkbox" id="popup-notes-review-toggle" ${isReview ? 'checked' : ''} style="accent-color:#d97706; width:15px; height:15px; cursor:pointer;" />
          <span>Flag for spaced repetition review</span>
        </label>
        <span id="popup-notes-review-badge" style="font-size:11px; font-weight:600; padding:2px 8px; border-radius:9999px; ${isReview ? 'background:#fef3c7; color:#92400e; border:1px solid #fde68a;' : 'background:#f1f5f9; color:#64748b; border:1px solid #e2e8f0;'}">
          ${isReview ? 'Review Due' : 'Mastered'}
        </span>
      </div>

      <!-- Notes Textarea -->
      <div style="margin-bottom:12px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
          <label for="popup-notes-input" style="font-size:12px; font-weight:700; color:#1e2033; text-transform:uppercase; letter-spacing:0.04em;">
            Personal Notes & Takeaways
          </label>
          <span id="popup-notes-status" style="font-size:11px; font-weight:600; color:#059669; opacity:0; transition:opacity 0.2s ease;">
            Saved ✓
          </span>
        </div>
        <textarea 
          id="popup-notes-input" 
          rows="6" 
          placeholder="Jot down the core intuition, edge cases, tricky constraints, or patterns to remember..."
          style="width:100%; border:1px solid #cbd5e1; border-radius:8px; padding:10px; font-family:'DM Sans', sans-serif; font-size:13px; color:#1e2033; line-height:1.5; resize:vertical; outline:none; box-sizing:border-box; background:#ffffff;"
        >${escapeHtml(currentNotes)}</textarea>
      </div>

      <!-- Action Buttons -->
      <div style="display:flex; align-items:center; gap:8px;">
        <button id="popup-notes-save-btn" class="btn-primary" style="flex:1; padding:9px 14px; font-size:13px; font-weight:600; border-radius:8px; cursor:pointer;">
          Save Notes
        </button>
      </div>
    </div>
  `;

  // Attach event handlers
  const starsContainer = document.getElementById('popup-notes-stars');
  const ratingText = document.getElementById('popup-notes-rating-text');
  const reviewToggle = document.getElementById('popup-notes-review-toggle');
  const reviewBadge = document.getElementById('popup-notes-review-badge');
  const notesInput = document.getElementById('popup-notes-input');
  const saveBtn = document.getElementById('popup-notes-save-btn');
  const statusEl = document.getElementById('popup-notes-status');

  let debounceTimer = null;

  const saveUpdates = (showToast = true) => {
    const nextNotes = notesInput ? notesInput.value : currentNotes;
    const nextRating = currentRating;
    const nextReview = reviewToggle ? (reviewToggle.checked ? 1 : 0) : (isReview ? 1 : 0);

    // Update in local cached object
    popupCachedData.problem.user_notes = nextNotes;
    popupCachedData.problem.user_rating = nextRating;
    popupCachedData.problem.review_needed = nextReview;

    chrome.runtime.sendMessage({
      action: 'update_problem',
      id: problem.slug || problem.id,
      updates: {
        user_notes: nextNotes,
        user_rating: nextRating,
        review_needed: nextReview
      }
    }, (res) => {
      if (res && res.success && showToast && statusEl) {
        statusEl.style.opacity = '1';
        setTimeout(() => {
          if (statusEl) statusEl.style.opacity = '0';
        }, 1800);
      }
    });
  };

  if (starsContainer) {
    starsContainer.addEventListener('click', (e) => {
      const starEl = e.target.closest('.star-btn');
      if (!starEl) return;
      currentRating = parseInt(starEl.getAttribute('data-star'), 10) || 3;
      starsContainer.innerHTML = renderStars(currentRating);
      if (ratingText) ratingText.innerText = `${currentRating}/5`;
      saveUpdates(true);
    });
  }

  if (reviewToggle) {
    reviewToggle.addEventListener('change', () => {
      isReview = reviewToggle.checked;
      if (reviewBadge) {
        reviewBadge.innerText = isReview ? 'Review Due' : 'Mastered';
        reviewBadge.style.background = isReview ? '#fef3c7' : '#f1f5f9';
        reviewBadge.style.color = isReview ? '#92400e' : '#64748b';
        reviewBadge.style.border = isReview ? '1px solid #fde68a' : '1px solid #e2e8f0';
      }
      saveUpdates(true);
    });
  }

  if (notesInput) {
    notesInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        saveUpdates(true);
      }, 1000);
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      clearTimeout(debounceTimer);
      saveUpdates(true);
    });
  }
}

async function lookupProblem(query) {
  if (!query) {
    const input = document.getElementById('lookup-input');
    query = input?.value?.trim();
  }
  if (!query) return;

  const contentEl = document.getElementById('popup-tab-content');
  if (contentEl) {
    contentEl.innerHTML = `<div style="text-align:center; padding:20px; color:#64748b; font-size:12px;">Loading problem clues...</div>`;
  }

  chrome.runtime.sendMessage({ action: 'fetch_hints', slug: query }, (response) => {
    if (response && response.success && response.data) {
      popupCachedData = response.data;
      popupCurrentHintLevel = 1;

      const { problem, pattern } = popupCachedData;
      const isVerified = Boolean(problem.verified === 1 || problem.verified === true);
      
      const idEl = document.getElementById('prob-id-badge');
      if (idEl) idEl.innerText = problem.frontend_id ? `#${problem.frontend_id}` : '#';

      const diffBadge = document.getElementById('prob-diff-badge');
      if (diffBadge && problem.difficulty) {
        diffBadge.innerText = problem.difficulty;
        if (problem.difficulty === 'Easy') {
          diffBadge.style.background = '#ecfdf5';
          diffBadge.style.color = '#047857';
          diffBadge.style.border = '1px solid #a7f3d0';
        } else if (problem.difficulty === 'Medium') {
          diffBadge.style.background = '#fffbeb';
          diffBadge.style.color = '#b45309';
          diffBadge.style.border = '1px solid #fcd34d';
        } else {
          diffBadge.style.background = '#fff1f2';
          diffBadge.style.color = '#be123c';
          diffBadge.style.border = '1px solid #fda4af';
        }
      }

      const catBadge = document.getElementById('prob-cat-badge');
      if (catBadge) {
        catBadge.innerText = problem.category || 'Algorithms';
      }

      const patternBadge = document.getElementById('prob-pattern-badge');
      if (patternBadge) {
        if (isVerified) {
          patternBadge.innerText = pattern?.title || 'Algorithmic Pattern';
          patternBadge.style.display = 'inline-block';
        } else {
          patternBadge.style.display = 'none';
        }
      }

      const solvedBadge = document.getElementById('prob-solved-badge');
      if (solvedBadge) {
        if (problem.is_solved === 1 || problem.is_solved === true) {
          solvedBadge.style.display = 'inline-block';
        } else {
          solvedBadge.style.display = 'none';
        }
      }

      const titleEl = document.getElementById('prob-title');
      if (titleEl) {
        titleEl.innerText = problem.title || query;
      }

      renderPopupTabContent();
    } else {
      popupCachedData = null;
      if (contentEl) {
        contentEl.innerHTML = `
          <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; padding:12px; color:#9f1239; font-size:12px;">
            Could not find hints for "${query}".
          </div>
        `;
      }
    }
  });
}

// Auto-detect active LeetCode problem if popup opened on a problem page
async function autoDetectActiveLeetCodeProblem() {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs && tabs[0]?.url && tabs[0].url.includes('/problems/')) {
      const match = tabs[0].url.match(/\/problems\/([^/?#]+)/);
      if (match && match[1]) {
        showProblemView(match[1]);
        return;
      }
    }
    // Default to sync view if not on a problem page
    showSyncView();
  } catch (_e) {
    showSyncView();
  }
}

// ==================== EVENT LISTENERS ====================
document.getElementById('sync-all-btn').addEventListener('click', triggerSync);

document.getElementById('open-app-btn').addEventListener('click', async () => {
  const dashboardUrl = chrome.runtime.getURL('dashboard/index.html');
  const tabs = await chrome.tabs.query({ url: `${dashboardUrl}*` });
  if (tabs && tabs.length > 0) {
    chrome.tabs.update(tabs[0].id, { active: true });
  } else {
    chrome.tabs.create({ url: dashboardUrl });
  }
});

const exportBackupBtn = document.getElementById('btn-export-backup');
if (exportBackupBtn) {
  exportBackupBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'export_user_data' }, (response) => {
      if (response && response.success && response.data) {
        const dateStr = new Date().toISOString().split('T')[0];
        const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `asymptote-backup-${dateStr}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showMessage(`Exported backup with ${response.data.total_problems || 0} problems!`, 'success');
      } else {
        showMessage('Export failed', 'error');
      }
    });
  });
}

const importBackupInput = document.getElementById('input-import-backup');
if (importBackupInput) {
  importBackupInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const backupData = JSON.parse(evt.target.result);
        chrome.runtime.sendMessage({ action: 'import_user_data', backupData }, (response) => {
          if (response && response.success) {
            showMessage(`Restored ${response.data.importedCount} problems from backup!`, 'success');
            checkServer();
          } else {
            showMessage(response?.error || 'Import failed', 'error');
          }
        });
      } catch (_err) {
        showMessage('Invalid JSON backup file', 'error');
      } finally {
        importBackupInput.value = '';
      }
    };
    reader.readAsText(file);
  });
}

const lookupBtn = document.getElementById('lookup-btn');
if (lookupBtn) {
  lookupBtn.addEventListener('click', () => {
    const input = document.getElementById('lookup-input');
    if (input && input.value.trim()) {
      showProblemView(input.value.trim());
    }
  });
}

const lookupInput = document.getElementById('lookup-input');
if (lookupInput) {
  lookupInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && lookupInput.value.trim()) {
      showProblemView(lookupInput.value.trim());
    }
  });
}

const backToSyncBtn = document.getElementById('view-back-to-sync-btn');
if (backToSyncBtn) {
  backToSyncBtn.addEventListener('click', showSyncView);
}

const backToProblemBtn = document.getElementById('view-back-to-problem-btn');
if (backToProblemBtn) {
  backToProblemBtn.addEventListener('click', () => {
    if (lastProblemQuery || popupCachedData?.problem?.slug) {
      showProblemView(lastProblemQuery || popupCachedData?.problem?.slug);
    }
  });
}

const btnBackToProblemBar = document.getElementById('btn-back-to-problem-bar');
if (btnBackToProblemBar) {
  btnBackToProblemBar.addEventListener('click', () => {
    if (lastProblemQuery || popupCachedData?.problem?.slug) {
      showProblemView(lastProblemQuery || popupCachedData?.problem?.slug);
    }
  });
}

// Tab Switcher Listeners
const cluesBtn = document.getElementById('popup-tab-btn-clues');
if (cluesBtn) cluesBtn.addEventListener('click', () => switchPopupTab('clues'));

const solBtn = document.getElementById('popup-tab-btn-solution');
if (solBtn) solBtn.addEventListener('click', () => switchPopupTab('solution'));

const compBtn = document.getElementById('popup-tab-btn-complexity');
if (compBtn) compBtn.addEventListener('click', () => switchPopupTab('complexity'));

const notesBtn = document.getElementById('popup-tab-btn-notes');
if (notesBtn) notesBtn.addEventListener('click', () => switchPopupTab('notes'));

// Dashboard Openers (Header & Footer)
function openFullDashboard() {
  const slug = popupCachedData?.problem?.slug || lastProblemQuery || '';
  const query = slug ? `?tab=solver&q=${encodeURIComponent(slug)}` : '';
  const dashboardUrl = chrome.runtime.getURL(`dashboard/index.html${query}`);
  chrome.tabs.create({ url: dashboardUrl });
}

const headerDashBtn = document.getElementById('btn-popup-header-dashboard');
if (headerDashBtn) {
  headerDashBtn.addEventListener('click', openFullDashboard);
}

const footerDashBtn = document.getElementById('btn-popup-footer-dashboard');
if (footerDashBtn) {
  footerDashBtn.addEventListener('click', openFullDashboard);
}

// Initial check & auto-detect
checkServer();
checkLeetCodeLogin();
autoDetectActiveLeetCodeProblem();
