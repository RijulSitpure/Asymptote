/**
 * Asymptote - Extension Popup Controller
 * Connects directly to local server & active LeetCode sessions.
 */

const {
  SHOW_HEURISTIC_PATTERNS = false,
  getLanguageMeta,
  getSupportedLanguagesForProblem,
  getProblemSolutionCode
} = (globalThis.LanguagesModule || window.LanguagesModule || {});

const LOCAL_SERVER_URL = 'http://localhost:3001';

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
    statusEl.innerText = 'Connected';
    dotEl.style.background = '#10b981';

    const username = stats.username || 'Rijul-Sitpure';
    const totalSolved = stats.totalSolved ?? stats.solvedCount ?? 0;
    const coverage = stats.patternCoveragePercent ?? 0;
    const diff = stats.difficultyBreakdown || { Easy: 0, Medium: 0, Hard: 0 };

    document.getElementById('user-name').innerText = username;
    document.getElementById('user-avatar').innerText = username.charAt(0).toUpperCase();
    document.getElementById('user-coverage-pill').innerText = `${coverage}% Coverage`;
    document.getElementById('user-stats-meta').innerText = `${totalSolved} Solved • Synced`;

    document.getElementById('badge-easy').innerText = `${diff.Easy || 0} Easy`;
    document.getElementById('badge-med').innerText = `${diff.Medium || 0} Med`;
    document.getElementById('badge-hard').innerText = `${diff.Hard || 0} Hard`;
  } else {
    statusEl.innerText = 'Offline';
    dotEl.style.background = '#ef4444';
    document.getElementById('user-stats-meta').innerText = 'Start server at port 3001';
  }
}

function checkServer() {
  chrome.runtime.sendMessage({ action: 'check_server' }, (response) => {
    if (response && response.success && response.data) {
      updateServerStatus(true, response.data);
    } else {
      updateServerStatus(false);
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
  } catch (e) {
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
function showSyncView() {
  const syncView = document.getElementById('sync-view');
  const problemView = document.getElementById('problem-view');
  const backBtn = document.getElementById('view-back-to-sync-btn');

  if (syncView) syncView.style.display = 'block';
  if (problemView) problemView.style.display = 'none';
  if (backBtn) backBtn.style.display = 'none';
}

function showProblemView(query) {
  const syncView = document.getElementById('sync-view');
  const problemView = document.getElementById('problem-view');
  const backBtn = document.getElementById('view-back-to-sync-btn');

  if (syncView) syncView.style.display = 'none';
  if (problemView) problemView.style.display = 'block';
  if (backBtn) backBtn.style.display = 'inline-flex';

  lookupProblem(query);
}

// ==================== PROBLEM VIEW LOGIC ====================
let popupActiveTab = 'clues'; // 'clues' | 'solution' | 'complexity'
let popupActiveLang = 'python3';
let popupCurrentHintLevel = 1;
let popupCachedData = null;

function switchPopupTab(tab) {
  popupActiveTab = tab;

  const tabs = ['clues', 'solution', 'complexity'];
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

  const { problem, pattern, hints, complexity, suggested_pattern } = popupCachedData;
  const isVerified = Boolean(problem?.verified === 1 || problem?.verified === true);

  const hintTitles = [
    'Recognize the pattern',
    'Define the state',
    'Write the transition',
    'See the blueprint'
  ];

  if (popupActiveTab === 'clues') {
    if (!isVerified) {
      const sug = suggested_pattern || problem?.suggested_pattern;
      contentEl.innerHTML = `
        <div class="tab-content-pane" style="text-align:center; padding:28px 12px;">
          ${(SHOW_HEURISTIC_PATTERNS && sug) ? `
            <div style="margin-bottom:12px;">
              <span style="font-size:11px; font-weight:500; color:#475569; padding:3px 10px; border-radius:9999px; background:#f1f5f9; border:1px solid #e2e8f0; display:inline-block;">
                Suggested pattern: ${sug.title} (unverified)
              </span>
            </div>
          ` : ''}
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
          <div style="background:#f0fdf4; border:1px solid #a7f3d0; border-radius:10px; padding:12px; margin-bottom:8px;">
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
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:10px 12px; margin-bottom:8px; display:flex; align-items:center; justify-content:space-between;">
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
          <div style="text-align:center; font-size:12px; color:#047857; font-weight:600; background:#f0fdf4; border:1px solid #a7f3d0; border-radius:8px; padding:8px; margin-top:8px;">
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
      };
    }
  } else if (popupActiveTab === 'solution') {
    const supportedLangs = getSupportedLanguagesForProblem(problem);
    if (!supportedLangs.some(l => (l.langSlug || l.id) === popupActiveLang) && supportedLangs.length > 0) {
      popupActiveLang = supportedLangs[0].langSlug || supportedLangs[0].id;
    }
    const selectedMeta = (typeof getLanguageMeta === 'function' ? getLanguageMeta(popupActiveLang) : null) || { displayName: popupActiveLang, name: popupActiveLang };
    const code = getProblemSolutionCode(problem, popupActiveLang);
    const activeCode = code && code.trim() ? code : `No verified solution in ${selectedMeta.displayName || selectedMeta.name} yet`;

    contentEl.innerHTML = `
      <div class="tab-content-pane">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:13px; font-weight:700; color:#1e2033;">
            Blueprint
          </span>
          <div style="display:flex; align-items:center; gap:6px;">
            ${supportedLangs.length === 0 ? `
              <span style="font-size:11px; color:#64748b; font-style:italic;">Loading languages...</span>
            ` : `
              <select id="popup-lang-select" style="background:#ffffff; border:1px solid #cbd5e1; border-radius:6px; padding:3px 8px; font-size:11px; font-family:'DM Sans',sans-serif;">
                ${supportedLangs.map(l => `<option value="${l.langSlug || l.id}" ${(l.langSlug || l.id) === popupActiveLang ? 'selected' : ''}>${l.displayName || l.name}</option>`).join('')}
              </select>
            `}
            <button id="popup-copy-btn" style="background:#ffffff; border:1px solid #e2e8f0; color:#1e2033; padding:3px 8px; border-radius:6px; font-size:11px; font-weight:500; cursor:pointer;">
              Copy
            </button>
          </div>
        </div>
        <pre class="code-preview"><code>${activeCode}</code></pre>
        <div style="text-align:center; margin-top:12px;">
          <a href="${LOCAL_SERVER_URL}" target="_blank" style="font-size:12px; color:#1e2033; font-weight:600; text-decoration:none;">
            Open in dashboard editor ↗
          </a>
        </div>
      </div>
    `;

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

    contentEl.innerHTML = `
      <div class="tab-content-pane">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:10px;">
          <div style="background:#ffffff; padding:10px; border-radius:8px; border:1px solid #e2e8f0;">
            <div style="font-size:11px; color:#64748b; font-weight:500;">Target time</div>
            <div style="font-size:16px; font-weight:700; color:#1e2033; font-family:'Space Grotesk',sans-serif; margin-top:2px;">
              ${complexity?.targetTime || 'O(N)'}
            </div>
          </div>
          <div style="background:#ffffff; padding:10px; border-radius:8px; border:1px solid #e2e8f0;">
            <div style="font-size:11px; color:#64748b; font-weight:500;">Target space</div>
            <div style="font-size:16px; font-weight:700; color:#1e2033; font-family:'Space Grotesk',sans-serif; margin-top:2px;">
              ${complexity?.targetSpace || 'O(1)'}
            </div>
          </div>
        </div>
        <div style="padding:10px 12px; background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; font-size:12px; color:#9f1239; line-height:1.45; margin-bottom:8px;">
          <div style="font-weight:700; font-size:12px; margin-bottom:2px;">Time limit</div>
          ${complexity?.opsBudgetExplanation || 'LeetCode runtime limit is ~1.0s. Submissions execute cleanly within time bounds.'}
        </div>
        <div style="padding:10px 12px; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; font-size:12px; color:#334155; line-height:1.45; margin-bottom:8px;">
          <div style="font-weight:700; font-size:12px; color:#1e2033; margin-bottom:2px;">Space and time trade-off</div>
          ${complexity?.spaceTimeTradeoff || 'Optimal trade-off avoids redundant traversals with minimal auxiliary storage.'}
        </div>
        <div style="padding:10px 12px; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; font-size:12px; color:#334155; line-height:1.45;">
          <div style="font-weight:700; font-size:12px; color:#1e2033; margin-bottom:2px;">What interviewers look for</div>
          ${complexity?.interviewerExpectation || 'Articulate time and space tradeoffs and establish recurrence bounds clearly.'}
        </div>
      </div>
    `;
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

      const { problem, pattern, suggested_pattern } = popupCachedData;
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
        } else if (SHOW_HEURISTIC_PATTERNS && (suggested_pattern || problem.suggested_pattern)) {
          const sug = suggested_pattern || problem.suggested_pattern;
          patternBadge.innerText = `Suggested pattern: ${sug.title} (unverified)`;
          patternBadge.style.display = 'inline-block';
        } else {
          patternBadge.style.display = 'none';
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
            Could not find hints for "${query}". Ensure the local server is running on port 3001.
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
  } catch (e) {
    showSyncView();
  }
}

// ==================== EVENT LISTENERS ====================
document.getElementById('sync-all-btn').addEventListener('click', triggerSync);

document.getElementById('open-app-btn').addEventListener('click', async () => {
  const tabs = await chrome.tabs.query({ url: `${LOCAL_SERVER_URL}/*` });
  if (tabs && tabs.length > 0) {
    chrome.tabs.update(tabs[0].id, { active: true });
  } else {
    chrome.tabs.create({ url: LOCAL_SERVER_URL });
  }
});

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

// Tab Switcher Listeners
const cluesBtn = document.getElementById('popup-tab-btn-clues');
if (cluesBtn) cluesBtn.addEventListener('click', () => switchPopupTab('clues'));

const solBtn = document.getElementById('popup-tab-btn-solution');
if (solBtn) solBtn.addEventListener('click', () => switchPopupTab('solution'));

const compBtn = document.getElementById('popup-tab-btn-complexity');
if (compBtn) compBtn.addEventListener('click', () => switchPopupTab('complexity'));

// Initial check & auto-detect
checkServer();
checkLeetCodeLogin();
autoDetectActiveLeetCodeProblem();
