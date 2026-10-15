/**
 * LeetCode Pattern Companion - Content Script
 * 1. Pulls solved problems using active LeetCode session
 * 2. Bridges data to local server via background service worker (avoiding Mixed Content / PNA blocks)
 */

function getProblemSlug() {
  const match = window.location.pathname.match(/\/problems\/([^/]+)/);
  return match ? match[1] : null;
}

function showToast(message, type = 'success') {
  let toast = document.getElementById('lc-pattern-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'lc-pattern-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      padding: 12px 18px;
      background: #0f172a;
      color: #f8fafc;
      border: 1px solid #334155;
      border-radius: 12px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      font-weight: 500;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
      z-index: 9999999;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(10px);
    `;
    document.body.appendChild(toast);
  }

  const icon = type === 'success' ? '⚡' : type === 'error' ? '❌' : '💡';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  toast.style.borderColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1';
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 5000);
}

function getCsrfToken() {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  if (match) return match[1];
  const meta = document.querySelector('meta[name="csrf-token"]');
  if (meta) return meta.getAttribute('content');
  return '';
}

/**
 * Safe GraphQL runner that tries /graphql/ first, then /graphql,
 * attaches credentials and CSRF tokens, and NEVER throws raw "Unexpected token".
 */
async function safeGraphqlQuery(query, variables = {}) {
  const csrfToken = getCsrfToken();
  const headers = {
    'Content-Type': 'application/json'
  };
  if (csrfToken) {
    headers['x-csrftoken'] = csrfToken;
  }

  // Always try /graphql/ first (canonical Django path with trailing slash!), then /graphql
  const endpoints = ['/graphql/', '/graphql'];
  let lastError = null;

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ query, variables })
      });

      const text = await res.text();
      if (!text || text.trim().startsWith('<')) {
        lastError = new Error(`LeetCode returned non-JSON (HTTP ${res.status}). Make sure you are signed into leetcode.com.`);
        continue;
      }

      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (parseErr) {
        lastError = new Error(`LeetCode response could not be parsed: ${text.slice(0, 60)}`);
        continue;
      }

      if (parsed.errors && !parsed.data) {
        lastError = new Error(parsed.errors[0]?.message || 'GraphQL query error');
        continue;
      }

      return parsed.data;
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Failed to query LeetCode GraphQL');
}

/**
 * 1-Click Full Account Sync via GraphQL + Multi-Stage Fallback
 */
async function syncAllSolvedFromLeetCode() {
  showToast('Connecting to your LeetCode session...', 'info');

  try {
    // 1. Get current logged-in username
    let username = 'User';
    try {
      const userData = await safeGraphqlQuery(`query userStatus { userStatus { isSignedIn username } }`);
      if (userData?.userStatus?.username) {
        username = userData.userStatus.username;
      }
    } catch (e) {
      const profileLink = document.querySelector('a[href^="/u/"]');
      if (profileLink) {
        const href = profileLink.getAttribute('href');
        const match = href.match(/\/u\/([^/]+)/);
        if (match) username = match[1];
      }
    }

    showToast(`Fetching solved problems for ${username}...`, 'info');
    let allSolved = [];

    // Method 1: problemsetQuestionList with status: "AC"
    try {
      let skip = 0;
      const limit = 100;
      let hasMore = true;

      while (hasMore && skip < 2500) {
        const qData = await safeGraphqlQuery(`
          query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
            problemsetQuestionList: questionList(
              categorySlug: $categorySlug
              limit: $limit
              skip: $skip
              filters: $filters
            ) {
              total: totalNum
              questions: data {
                frontendQuestionId: questionFrontendId
                status
                title
                titleSlug
                difficulty
                topicTags {
                  name
                  slug
                }
              }
            }
          }
        `, {
          categorySlug: '',
          limit,
          skip,
          filters: { status: 'AC' }
        });

        const listObj = qData?.problemsetQuestionList;
        const questions = listObj?.questions || [];
        const total = listObj?.total || 0;

        for (const q of questions) {
          allSolved.push({
            frontend_id: String(q.frontendQuestionId),
            title: q.title,
            title_slug: q.titleSlug,
            difficulty: q.difficulty || 'Medium',
            topicTags: (q.topicTags || []).map(t => t.name)
          });
        }

        if (allSolved.length >= total || questions.length === 0) {
          hasMore = false;
        } else {
          skip += limit;
        }
      }
    } catch (listErr) {
      console.warn('problemsetQuestionList query failed, trying recentAcSubmissions fallback:', listErr);
    }

    // Method 2: Fallback to recentAcSubmissions if Method 1 found nothing
    if (allSolved.length === 0 && username && username !== 'User') {
      try {
        const recentData = await safeGraphqlQuery(`
          query recentAcSubmissions($username: String!, $limit: Int!) {
            recentAcSubmissionList(username: $username, limit: $limit) {
              id
              title
              titleSlug
            }
          }
        `, { username, limit: 50 });

        const list = recentData?.recentAcSubmissionList || [];
        for (const item of list) {
          allSolved.push({
            frontend_id: '',
            title: item.title,
            title_slug: item.titleSlug,
            difficulty: 'Medium'
          });
        }
      } catch (recentErr) {
        console.warn('recentAcSubmissionList fallback failed:', recentErr);
      }
    }

    // Method 3: Fallback - Extract solved problems from current page DOM
    if (allSolved.length === 0) {
      const problemLinks = document.querySelectorAll('a[href*="/problems/"]');
      const seenSlugs = new Set();
      for (const link of problemLinks) {
        const href = link.getAttribute('href');
        const match = href.match(/\/problems\/([^/]+)/);
        if (!match) continue;
        const slug = match[1];
        if (seenSlugs.has(slug)) continue;
        seenSlugs.add(slug);

        const row = link.closest('tr') || link.closest('[role="row"]') || link.parentElement;
        const text = row ? row.innerText : '';
        const html = row ? row.innerHTML : '';
        if (text.includes('Solved') || html.includes('text-green') || html.includes('status-ac') || html.includes('CheckCircle') || html.includes('accepted')) {
          allSolved.push({
            frontend_id: '',
            title: link.innerText.trim() || slug.replace(/-/g, ' '),
            title_slug: slug,
            difficulty: 'Medium'
          });
        }
      }
    }

    // Deduplicate solved problems
    const uniqueMap = new Map();
    for (const item of allSolved) {
      if (item.title_slug && !uniqueMap.has(item.title_slug)) {
        uniqueMap.set(item.title_slug, item);
      }
    }
    const finalSolved = Array.from(uniqueMap.values());

    if (finalSolved.length === 0) {
      showToast('No solved problems found. Please make sure you are signed into LeetCode (visit leetcode.com/problemset/)!', 'error');
      return { success: false, error: 'No solved problems found. Please sign into LeetCode and refresh.' };
    }

    showToast(`Found ${finalSolved.length} solved problems! Uploading to Pattern Tracker...`, 'info');

    // Send to background service worker (bypasses Mixed Content / PNA blocks)
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({
        action: 'send_to_server',
        username: username,
        problems: finalSolved
      }, (response) => {
        if (response && response.success) {
          const result = response.data;
          showToast(`✅ Successfully synced all ${finalSolved.length} solved questions (${result.newlySynced} new, ${result.updatedCount} updated)!`, 'success');
          resolve({ success: true, count: finalSolved.length, username });
        } else {
          const errMsg = response?.error || 'Make sure Pattern Tracker is running (npm start at http://localhost:3001)';
          showToast(`Server sync error: ${errMsg}`, 'error');
          resolve({ success: false, error: errMsg });
        }
      });
    });

  } catch (err) {
    showToast(`Sync failed: ${err.message}`, 'error');
    return { success: false, error: err.message };
  }
}

window.syncAllSolvedFromLeetCode = syncAllSolvedFromLeetCode;

// Floating Widget & Shadow DOM Injected Panel
let activeDrawerTab = 'ai'; // 'ai' | 'solution' | 'complexity'
let currentLevel = 1;
let cachedHintData = null;
let shadowRoot = null;

function getShadowRoot() {
  let host = document.getElementById('openleet-extension-root');
  if (!host) {
    host = document.createElement('div');
    host.id = 'openleet-extension-root';
    document.body.appendChild(host);
  }
  if (!shadowRoot) {
    shadowRoot = host.shadowRoot || host.attachShadow({ mode: 'open' });
  }
  return shadowRoot;
}

function injectFloatingButtons() {
  const shadow = getShadowRoot();
  if (shadow.getElementById('lc-pattern-tracker-widget')) return;

  const isProblemPage = window.location.pathname.includes('/problems/');

  // Inject scoped styles into Shadow DOM
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif; }
    .widget-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 2147483647;
    }
    .btn-pill {
      background: linear-gradient(135deg, #09090b 0%, #18181b 100%);
      color: #fafafa;
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 9px 18px;
      border-radius: 9999px;
      font-size: 13px;
      cursor: pointer;
      box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(99, 102, 241, 0.3);
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .btn-pill:hover {
      transform: translateY(-2px) scale(1.02);
      border-color: rgba(99, 102, 241, 0.6);
      box-shadow: 0 14px 35px -5px rgba(79, 70, 229, 0.4);
    }
    .drawer-panel {
      position: fixed;
      top: 52px;
      right: 20px;
      width: 440px;
      max-height: 88vh;
      background: #09090b;
      border: 1px solid #27272a;
      border-radius: 16px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.05);
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      color: #fafafa;
      overflow: hidden;
      animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-8px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .drawer-header {
      padding: 14px 16px;
      border-bottom: 1px solid #27272a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #09090b;
    }
    .tabs-nav {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      padding: 4px;
      background: #18181b;
      border-bottom: 1px solid #27272a;
      gap: 4px;
    }
    .tab-btn {
      padding: 7px 10px;
      font-size: 11px;
      font-weight: 600;
      color: #a1a1aa;
      background: transparent;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.15s ease;
    }
    .tab-btn:hover {
      color: #fafafa;
      background: rgba(255, 255, 255, 0.05);
    }
    .tab-btn.active {
      color: #fafafa;
      background: #27272a;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }
    .drawer-body {
      padding: 16px;
      overflow-y: auto;
      flex: 1;
      font-size: 12px;
    }
    .drawer-body::-webkit-scrollbar {
      width: 5px;
    }
    .drawer-body::-webkit-scrollbar-thumb {
      background: #27272a;
      border-radius: 4px;
    }
    .code-preview {
      background: #121214;
      border: 1px solid #27272a;
      border-radius: 10px;
      padding: 12px;
      font-family: 'JetBrains Mono', Menlo, Consolas, monospace;
      font-size: 11px;
      line-height: 1.5;
      color: #e4e4e7;
      overflow-x: auto;
      white-space: pre;
    }
    .card-surface {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 12px;
      padding: 12px;
      margin-bottom: 12px;
    }
    .badge-diff {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 9999px;
    }
    .btn-action {
      background: #6366f1;
      color: #ffffff;
      border: none;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s;
    }
    .btn-action:hover {
      background: #4f46e5;
    }
  `;
  shadow.appendChild(styleEl);

  const container = document.createElement('div');
  container.id = 'lc-pattern-tracker-widget';
  container.className = 'widget-container';

  if (isProblemPage) {
    const clueBtn = document.createElement('button');
    clueBtn.className = 'btn-pill';
    clueBtn.innerHTML = `
      <span style="color:#818cf8; font-size:14px;">⚡</span>
      <span style="font-weight:700;">OpenLeet AI</span>
      <span style="font-size:10px; color:#818cf8; background:rgba(99,102,241,0.2); padding:1px 6px; border-radius:8px;">Coach</span>
    `;
    clueBtn.title = 'Open Socratic hints, complexity targeter, and algorithmic intuition';
    clueBtn.onclick = toggleHintsDrawer;
    container.appendChild(clueBtn);
  } else {
    const syncBtn = document.createElement('button');
    syncBtn.className = 'btn-pill';
    syncBtn.innerHTML = `
      <span style="color:#10b981;">⚡</span>
      <span style="font-weight:600;">Sync Solved to OpenLeet</span>
    `;
    syncBtn.title = 'Sync all solved problems to local OpenLeet Pattern Tracker';
    syncBtn.onclick = syncAllSolvedFromLeetCode;
    container.appendChild(syncBtn);
  }

  shadow.appendChild(container);
}

// In-Page Socratic Hints & Complexity Drawer inside Shadow DOM
async function toggleHintsDrawer() {
  const shadow = getShadowRoot();
  let drawer = shadow.getElementById('lc-pattern-drawer');
  if (drawer) {
    drawer.remove();
    return;
  }

  const slug = getProblemSlug();
  if (!slug) {
    showToast('Not on a LeetCode problem page', 'info');
    return;
  }

  drawer = document.createElement('div');
  drawer.id = 'lc-pattern-drawer';
  drawer.className = 'drawer-panel';

  drawer.innerHTML = `
    <div class="drawer-header">
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="color:#818cf8; font-size:16px;">⚡</span>
        <span style="font-size:13px; font-weight:800; color:#fafafa; letter-spacing:0.2px;">OpenLeet AI</span>
        <span style="font-size:10px; background:rgba(99,102,241,0.15); color:#a5b4fc; padding:2px 6px; border-radius:6px; font-weight:600;">Socratic Coach</span>
      </div>
      <button id="lc-close-drawer" style="background:none; border:none; color:#a1a1aa; cursor:pointer; font-size:16px; padding:4px;">✕</button>
    </div>

    <!-- TABS NAV: [ Ask AI ] | [ Solution ] | [ Complexity ] -->
    <div class="tabs-nav">
      <button id="tab-btn-ai" class="tab-btn active">
        <span>💡</span> Ask AI
      </button>
      <button id="tab-btn-solution" class="tab-btn">
        <span>📝</span> Solution
      </button>
      <button id="tab-btn-complexity" class="tab-btn">
        <span>🎯</span> Complexity
      </button>
    </div>

    <div id="lc-drawer-content" class="drawer-body">
      <div style="text-align:center; padding:32px 0; color:#a1a1aa;">
        <div style="font-size:22px; margin-bottom:10px;">⏳</div>
        <div>Deriving complexity target & Socratic clues...</div>
      </div>
    </div>
  `;

  shadow.appendChild(drawer);

  shadow.getElementById('lc-close-drawer').onclick = () => drawer.remove();
  shadow.getElementById('tab-btn-ai').onclick = () => switchDrawerTab('ai');
  shadow.getElementById('tab-btn-solution').onclick = () => switchDrawerTab('solution');
  shadow.getElementById('tab-btn-complexity').onclick = () => switchDrawerTab('complexity');

  chrome.runtime.sendMessage({ action: 'fetch_hints', slug }, (response) => {
    if (response && response.success) {
      cachedHintData = response.data;
      currentLevel = 1;
      renderDrawerTabContent();
    } else {
      const content = shadow.getElementById('lc-drawer-content');
      if (content) {
        content.innerHTML = `
          <div class="card-surface" style="text-align:left;">
            <p style="color:#fbbf24; font-weight:600; margin:0 0 6px 0;">Could not connect to OpenLeet server</p>
            <p style="font-size:11px; color:#a1a1aa; margin:0 0 10px 0;">Ensure OpenLeet server is running on port 3001.</p>
            <a href="http://localhost:3001" target="_blank" style="display:inline-block; font-size:11px; background:#4f46e5; color:#fff; padding:6px 12px; border-radius:6px; text-decoration:none; font-weight:600;">
              Open Pattern Dashboard ↗
            </a>
          </div>
        `;
      }
    }
  });
}

function switchDrawerTab(tab) {
  activeDrawerTab = tab;
  const shadow = getShadowRoot();
  ['ai', 'solution', 'complexity'].forEach(t => {
    const btn = shadow.getElementById(`tab-btn-${t}`);
    if (btn) {
      if (t === tab) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });
  renderDrawerTabContent();
}

function renderDrawerTabContent() {
  if (!cachedHintData) return;
  const shadow = getShadowRoot();
  const content = shadow.getElementById('lc-drawer-content');
  if (!content) return;

  const { problem, pattern, hints, complexity } = cachedHintData;
  const diffColor = problem.difficulty === 'Easy' ? '#10b981' : problem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444';
  const diffBg = problem.difficulty === 'Easy' ? 'rgba(16,185,129,0.15)' : problem.difficulty === 'Medium' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)';

  // Problem Header info
  const headerHtml = `
    <div style="margin-bottom:14px; text-align:left;">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
        <span style="font-family:monospace; font-size:11px; font-weight:700; color:#818cf8;">#${problem.frontend_id || ''}</span>
        <span class="badge-diff" style="background:${diffBg}; color:${diffColor};">${problem.difficulty}</span>
        <span style="font-size:10px; padding:2px 7px; border-radius:9999px; background:#27272a; color:#d4d4d8;">${pattern?.title || 'Algorithmic Pattern'}</span>
      </div>
      <div style="font-size:14px; font-weight:700; color:#fafafa; line-height:1.3;">
        ${problem.title}
      </div>
    </div>
  `;

  // TAB 1: [ Ask AI ] (Socratic Hints Ladder)
  if (activeDrawerTab === 'ai') {
    const hintItems = (hints || []).map((h, i) => {
      const isUnlocked = (i + 1) <= currentLevel;
      const levelColors = ['#38bdf8', '#818cf8', '#a855f7', '#ec4899'];
      const color = levelColors[i % levelColors.length];

      return `
        <div style="margin-bottom:8px; border-radius:10px; background:${isUnlocked ? '#18181b' : '#121214'}; border:1px solid ${isUnlocked ? '#27272a' : '#1e1e22'}; overflow:hidden;">
          <div style="padding:9px 12px; display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:7px;">
              <span style="font-size:10px; font-weight:700; padding:1px 6px; border-radius:4px; background:${isUnlocked ? color : '#27272a'}; color:${isUnlocked ? '#000' : '#71717a'};">
                L${i + 1}
              </span>
              <span style="font-weight:600; font-size:12px; color:${isUnlocked ? '#fafafa' : '#71717a'};">
                ${h.title}
              </span>
            </div>
            ${!isUnlocked ? `
              <button id="btn-unlock-${i + 1}" style="background:rgba(99,102,241,0.15); border:1px solid rgba(99,102,241,0.3); color:#a5b4fc; cursor:pointer; font-size:10px; font-weight:600; padding:2px 8px; border-radius:4px;">
                Unlock
              </button>
            ` : `
              <span style="color:#10b981; font-size:10px; font-weight:700;">UNLOCKED</span>
            `}
          </div>
          ${isUnlocked ? `
            <div style="padding:10px 12px; font-size:11px; color:#d4d4d8; line-height:1.5; border-top:1px solid #27272a; background:#121214; white-space:pre-wrap;">${h.content}</div>
          ` : ''}
        </div>
      `;
    }).join('');

    content.innerHTML = `
      ${headerHtml}
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:#a1a1aa;">
          💡 Socratic Hint Ladder
        </span>
        <span style="font-size:10px; color:#71717a;">
          Level ${currentLevel} of ${hints?.length || 4}
        </span>
      </div>
      <div>${hintItems}</div>
      ${currentLevel < (hints?.length || 0) ? `
        <button id="btn-reveal-next" class="btn-action" style="width:100%; margin-top:8px; padding:10px; font-size:12px;">
          Reveal Next Hint (Level ${currentLevel + 1}: ${hints[currentLevel]?.title || 'Next Step'})
        </button>
      ` : ''}
    `;

    // Bind unlock handlers inside Shadow DOM
    for (let i = 1; i <= (hints?.length || 0); i++) {
      const btn = shadow.getElementById(`btn-unlock-${i}`);
      if (btn) btn.onclick = () => { currentLevel = i; renderDrawerTabContent(); };
    }
    const nextBtn = shadow.getElementById('btn-reveal-next');
    if (nextBtn) nextBtn.onclick = () => { currentLevel++; renderDrawerTabContent(); };
  }

  // TAB 2: [ Solution ] (Code Skeleton, Blueprint, and Gotchas)
  else if (activeDrawerTab === 'solution') {
    const skeletonCode = hints && hints[3]?.content ? hints[3].content : (pattern?.base_template_py || problem.solution_python || 'No template code available');
    const twistHtml = problem.twist_type ? `
      <div class="card-surface" style="border-left:3px solid #fbbf24; margin-bottom:12px;">
        <div style="font-size:10px; font-weight:700; text-transform:uppercase; color:#fbbf24; margin-bottom:3px;">
          ⚠️ Critical Interview Twist
        </div>
        <div style="font-size:11px; color:#fef3c7; line-height:1.4;">
          ${problem.twist_type}
        </div>
      </div>
    ` : '';

    content.innerHTML = `
      ${headerHtml}
      ${twistHtml}
      <div class="card-surface">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:11px; font-weight:700; text-transform:uppercase; color:#a1a1aa;">
            Blueprint Scaffold
          </span>
          <button id="btn-copy-code" style="background:#27272a; border:none; color:#a1a1aa; padding:3px 8px; border-radius:4px; font-size:10px; cursor:pointer;">
            Copy
          </button>
        </div>
        <pre class="code-preview"><code>${skeletonCode}</code></pre>
      </div>
      ${problem.user_notes ? `
        <div class="card-surface" style="border-left:3px solid #6366f1;">
          <div style="font-size:10px; font-weight:700; text-transform:uppercase; color:#818cf8; margin-bottom:3px;">Your Saved Notes</div>
          <div style="font-size:11px; color:#d4d4d8; line-height:1.4;">${problem.user_notes}</div>
        </div>
      ` : ''}
    `;

    const copyBtn = shadow.getElementById('btn-copy-code');
    if (copyBtn) {
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(skeletonCode);
        copyBtn.innerText = 'Copied!';
        setTimeout(() => copyBtn.innerText = 'Copy', 2000);
      };
    }
  }

  // TAB 3: [ Complexity ] (Target Time/Space, Ops Budget, Naive Flaw)
  else if (activeDrawerTab === 'complexity') {
    if (!complexity) {
      content.innerHTML = `${headerHtml}<div class="card-surface">No complexity metrics available for this problem.</div>`;
      return;
    }

    content.innerHTML = `
      ${headerHtml}
      <div class="card-surface">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <span style="font-size:11px; font-weight:700; text-transform:uppercase; color:#38bdf8;">
            🎯 Target Big-O
          </span>
          <span style="font-size:10px; color:#a1a1aa; font-family:monospace;">${complexity.boundsSummary}</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px;">
          <div style="background:#121214; padding:8px 10px; border-radius:8px; border:1px solid #27272a;">
            <div style="font-size:10px; color:#a1a1aa;">Target Time</div>
            <div style="font-size:12px; font-weight:700; color:#38bdf8; font-family:monospace; margin-top:2px;">${complexity.targetTime}</div>
          </div>
          <div style="background:#121214; padding:8px 10px; border-radius:8px; border:1px solid #27272a;">
            <div style="font-size:10px; color:#a1a1aa;">Target Space</div>
            <div style="font-size:12px; font-weight:700; color:#c084fc; font-family:monospace; margin-top:2px;">${complexity.targetSpace}</div>
          </div>
        </div>

        <div style="margin-bottom:10px;">
          <div style="font-size:10px; font-weight:700; color:#f87171; margin-bottom:2px; text-transform:uppercase;">
            ⚡ Operational CPU Budget
          </div>
          <div style="font-size:11px; color:#d4d4d8; line-height:1.45;">
            ${complexity.opsBudgetExplanation || complexity.whyNaiveFails}
          </div>
        </div>

        <div style="margin-bottom:10px;">
          <div style="font-size:10px; font-weight:700; color:#34d399; margin-bottom:2px; text-transform:uppercase;">
            ⚖️ Space-Time Trade-off
          </div>
          <div style="font-size:11px; color:#d4d4d8; line-height:1.45;">
            ${complexity.spaceTimeTradeoff}
          </div>
        </div>

        ${complexity.interviewerExpectation ? `
          <div>
            <div style="font-size:10px; font-weight:700; color:#a5b4fc; margin-bottom:2px; text-transform:uppercase;">
              🗣️ Interviewer Expectation
            </div>
            <div style="font-size:11px; color:#d4d4d8; line-height:1.45;">
              ${complexity.interviewerExpectation}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

// Monitor for Submissions and "Accepted" Status
let lastSyncedSubmission = null;

function detectAcceptedSubmission() {
  const resultElements = document.querySelectorAll('[data-e2e-locator="submission-result"]');
  for (const el of resultElements) {
    if (el.innerText.includes('Accepted')) {
      handleAccepted();
      return;
    }
  }

  const banners = document.querySelectorAll('span, div');
  for (const b of banners) {
    if (b.innerText === 'Accepted' && (b.className.includes('text-green') || b.className.includes('success'))) {
      handleAccepted();
      return;
    }
  }
}

async function handleAccepted() {
  const slug = getProblemSlug();
  if (!slug || slug === lastSyncedSubmission) return;
  lastSyncedSubmission = slug;

  let code = '';
  const lines = document.querySelectorAll('.view-lines .view-line');
  if (lines && lines.length > 0) {
    code = Array.from(lines).map(l => l.innerText).join('\n');
  }

  chrome.runtime.sendMessage({
    action: 'save_submission',
    titleSlug: slug,
    code
  }, (res) => {
    if (res && res.success) {
      showToast(`Synced ${slug} to Pattern Tracker!`, 'success');
    }
  });
}

// Extension message listener from popup
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.action === 'sync_all_from_leetcode') {
      syncAllSolvedFromLeetCode().then(res => sendResponse(res));
      return true;
    }
  });
}

// Inject buttons on all LeetCode pages
setInterval(() => {
  injectFloatingButtons();
  detectAcceptedSubmission();
}, 2000);
