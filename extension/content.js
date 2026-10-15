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

// Floating Widget on LeetCode
function injectFloatingButtons() {
  if (document.getElementById('lc-pattern-tracker-widget')) return;

  const isProblemPage = window.location.pathname.includes('/problems/');

  const container = document.createElement('div');
  container.id = 'lc-pattern-tracker-widget';
  container.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  `;

  // On problem pages: Show sleek OpenLeet AI button
  if (isProblemPage) {
    const clueBtn = document.createElement('button');
    clueBtn.id = 'lc-pattern-clue-btn';
    clueBtn.innerHTML = `
      <span style="font-size:14px;">⚡</span>
      <span style="font-weight:700; letter-spacing:0.3px;">OpenLeet AI</span>
      <span style="font-size:10px; opacity:0.8; background:rgba(255,255,255,0.2); padding:1px 6px; border-radius:10px;">Hints & Big-O</span>
    `;
    clueBtn.title = 'Open Socratic hints, complexity targeter, and algorithmic intuition';
    clueBtn.style.cssText = `
      background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%);
      color: #ffffff;
      border: 1px solid rgba(129, 140, 248, 0.4);
      padding: 8px 16px;
      border-radius: 9999px;
      font-size: 12px;
      cursor: pointer;
      box-shadow: 0 8px 25px rgba(67, 56, 202, 0.4);
      display: flex;
      align-items: center;
      gap: 7px;
      transition: all 0.2s ease;
    `;
    clueBtn.onmouseover = () => {
      clueBtn.style.transform = 'translateY(-2px) scale(1.03)';
      clueBtn.style.boxShadow = '0 12px 30px rgba(67, 56, 202, 0.6)';
    };
    clueBtn.onmouseout = () => {
      clueBtn.style.transform = 'translateY(0) scale(1)';
      clueBtn.style.boxShadow = '0 8px 25px rgba(67, 56, 202, 0.4)';
    };
    clueBtn.onclick = toggleHintsDrawer;
    container.appendChild(clueBtn);
  } else {
    // Non-problem pages (e.g. /problemset/): Show clean sync button
    const syncBtn = document.createElement('button');
    syncBtn.innerHTML = '<span>⚡</span> <span>Sync Solved to OpenLeet</span>';
    syncBtn.title = 'Sync all solved problems to local OpenLeet Pattern Tracker';
    syncBtn.style.cssText = `
      background: #0f172a;
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.4);
      padding: 8px 14px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    `;
    syncBtn.onmouseover = () => { syncBtn.style.background = '#047857'; syncBtn.style.color = '#fff'; };
    syncBtn.onmouseout = () => { syncBtn.style.background = '#0f172a'; syncBtn.style.color = '#34d399'; };
    syncBtn.onclick = syncAllSolvedFromLeetCode;
    container.appendChild(syncBtn);
  }

  document.body.appendChild(container);
}

// In-Page Socratic Hints & Complexity Drawer
let currentLevel = 1;
let cachedHintData = null;

async function toggleHintsDrawer() {
  let drawer = document.getElementById('lc-pattern-drawer');
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
  drawer.style.cssText = `
    position: fixed;
    top: 52px;
    right: 18px;
    width: 420px;
    max-height: 88vh;
    background: linear-gradient(180deg, #0b0f19 0%, #0f172a 100%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 20px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.75), 0 0 1px 1px rgba(255, 255, 255, 0.05);
    z-index: 9999999;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #e2e8f0;
    overflow-y: auto;
    backdrop-filter: blur(16px);
  `;

  drawer.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; border-b:1px solid #1e293b; padding-bottom:10px;">
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:16px;">⚡</span>
        <span style="font-size:14px; font-weight:800; color:#fff; letter-spacing:0.3px;">OpenLeet AI</span>
        <span style="font-size:10px; background:rgba(99,102,241,0.2); color:#a5b4fc; padding:2px 7px; border-radius:12px; font-weight:600;">Socratic Coach</span>
      </div>
      <button id="lc-close-drawer" style="background:none; border:none; color:#64748b; cursor:pointer; font-size:18px; line-height:1; padding:4px;">✕</button>
    </div>
    <div id="lc-drawer-content" style="font-size:12px; color:#94a3b8; text-align:center; padding:30px 0;">
      <div style="display:inline-block; animation: spin 1s linear infinite; font-size:20px; margin-bottom:8px;">⏳</div>
      <div>Analyzing problem constraints & Socratic hints...</div>
    </div>
  `;
  document.body.appendChild(drawer);

  document.getElementById('lc-close-drawer').onclick = () => drawer.remove();

  chrome.runtime.sendMessage({ action: 'fetch_hints', slug }, (response) => {
    if (response && response.success) {
      cachedHintData = response.data;
      currentLevel = 1;
      renderDrawerHints();
    } else {
      document.getElementById('lc-drawer-content').innerHTML = `
        <div style="padding:14px; border-radius:12px; background:#1e293b; border:1px solid #334155; text-align:left;">
          <p style="color:#f59e0b; font-weight:600; margin:0 0 6px 0;">Could not connect to OpenLeet server</p>
          <p style="font-size:11px; color:#94a3b8; margin:0 0 10px 0;">Make sure your Pattern Tracker server is running on port 3001.</p>
          <a href="http://localhost:3001" target="_blank" style="display:inline-block; font-size:11px; background:#4f46e5; color:#fff; padding:6px 14px; border-radius:8px; text-decoration:none; font-weight:600;">
            Open Pattern Dashboard ↗
          </a>
        </div>
      `;
    }
  });
}

function renderDrawerHints() {
  if (!cachedHintData) return;
  const { problem, pattern, hints, complexity } = cachedHintData;
  const content = document.getElementById('lc-drawer-content');
  if (!content) return;

  const diffColor = problem.difficulty === 'Easy' ? '#10b981' : problem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444';
  const diffBg = problem.difficulty === 'Easy' ? 'rgba(16,185,129,0.15)' : problem.difficulty === 'Medium' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)';

  // 1. Complexity Targeter Card
  const complexityHtml = complexity ? `
    <div style="background:#0f172a; border:1px solid #1e293b; border-radius:14px; padding:12px; margin-bottom:14px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:#38bdf8;">🎯 Target Complexity</span>
        <span style="font-size:10px; color:#64748b; font-family:monospace;">${complexity.boundsSummary}</span>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:10px;">
        <div style="background:#1e293b; padding:8px 10px; border-radius:8px; border:1px solid rgba(56,189,248,0.2);">
          <div style="font-size:10px; color:#94a3b8;">Target Time</div>
          <div style="font-size:12px; font-weight:700; color:#38bdf8; font-family:monospace; margin-top:2px;">${complexity.targetTime}</div>
        </div>
        <div style="background:#1e293b; padding:8px 10px; border-radius:8px; border:1px solid rgba(168,85,247,0.2);">
          <div style="font-size:10px; color:#94a3b8;">Target Space</div>
          <div style="font-size:12px; font-weight:700; color:#c084fc; font-family:monospace; margin-top:2px;">${complexity.targetSpace}</div>
        </div>
      </div>
      <div style="font-size:11px; color:#cbd5e1; line-height:1.45; margin-bottom:6px;">
        <strong style="color:#f87171;">Why Brute Force Fails:</strong> ${complexity.whyNaiveFails}
      </div>
      <div style="font-size:11px; color:#94a3b8; line-height:1.4;">
        <strong style="color:#34d399;">Trade-off:</strong> ${complexity.spaceTimeTradeoff}
      </div>
    </div>
  ` : '';

  // 2. Socratic Hint Ladder
  const hintItems = (hints || []).map((h, i) => {
    const isUnlocked = (i + 1) <= currentLevel;
    const levelColors = ['#38bdf8', '#818cf8', '#a855f7', '#ec4899'];
    const color = levelColors[i % levelColors.length];

    return `
      <div style="margin-bottom:8px; border-radius:12px; background:${isUnlocked ? '#1e293b' : '#0b0f19'}; border:1px solid ${isUnlocked ? '#334155' : '#1e293b'}; overflow:hidden; transition:all 0.2s;">
        <div style="padding:9px 12px; display:flex; justify-content:space-between; align-items:center; background:${isUnlocked ? 'rgba(255,255,255,0.02)' : 'transparent'};">
          <div style="display:flex; align-items:center; gap:7px;">
            <span style="font-size:10px; font-weight:700; padding:1px 6px; border-radius:6px; background:${isUnlocked ? color : '#334155'}; color:${isUnlocked ? '#000' : '#94a3b8'};">
              L${i + 1}
            </span>
            <span style="font-weight:600; font-size:12px; color:${isUnlocked ? '#fff' : '#64748b'};">
              ${h.title}
            </span>
          </div>
          ${!isUnlocked ? `
            <button onclick="window.unlockLevel(${i + 1})" style="background:rgba(99,102,241,0.15); border:1px solid rgba(99,102,241,0.3); color:#a5b4fc; cursor:pointer; font-size:10px; font-weight:700; padding:3px 8px; border-radius:6px;">
              Unlock
            </button>
          ` : `
            <span style="color:#10b981; font-size:10px; font-weight:700;">REVEALED</span>
          `}
        </div>
        ${isUnlocked ? `
          <div style="padding:10px 12px; font-size:11px; color:#cbd5e1; line-height:1.5; border-top:1px solid #334155; background:#0f172a; white-space:pre-wrap;">${h.content}</div>
        ` : ''}
      </div>
    `;
  }).join('');

  // 3. The Twist / Trap Callout
  const twistHtml = problem.twist_type ? `
    <div style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); border-radius:12px; padding:10px 12px; margin-bottom:12px;">
      <div style="font-size:10px; font-weight:700; text-transform:uppercase; color:#fbbf24; margin-bottom:3px;">
        ⚠️ The Twist / Interview Trap
      </div>
      <div style="font-size:11px; color:#fde68a; line-height:1.4;">
        ${problem.twist_type}
      </div>
    </div>
  ` : '';

  content.innerHTML = `
    <!-- Problem Header -->
    <div style="margin-bottom:12px; text-align:left;">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
        <span style="font-family:monospace; font-size:11px; font-weight:700; color:#818cf8;">#${problem.frontend_id || ''}</span>
        <span style="font-size:10px; font-weight:700; padding:1px 7px; border-radius:10px; background:${diffBg}; color:${diffColor};">
          ${problem.difficulty}
        </span>
        <span style="font-size:10px; padding:1px 7px; border-radius:10px; background:rgba(99,102,241,0.15); color:#a5b4fc;">
          ${pattern?.title || 'Algorithmic Pattern'}
        </span>
      </div>
      <div style="font-size:15px; font-weight:800; color:#fff; line-height:1.25;">
        ${problem.title}
      </div>
    </div>

    <!-- Complexity Targeter -->
    ${complexityHtml}

    <!-- The Twist -->
    ${twistHtml}

    <!-- Hints Header -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; text-align:left;">
      <span style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:#94a3b8;">
        💡 Socratic Hint Ladder
      </span>
      <span style="font-size:10px; color:#64748b;">
        Step ${currentLevel} of ${hints?.length || 4}
      </span>
    </div>

    <!-- Hints List -->
    ${hintItems}

    <!-- Progressive Reveal Button -->
    ${currentLevel < (hints?.length || 0) ? `
      <button onclick="window.unlockLevel(${currentLevel + 1})" style="width:100%; margin-top:8px; padding:10px; background:linear-gradient(135deg, #4f46e5 0%, #6366f1 100%); color:#fff; border:none; border-radius:10px; font-weight:700; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(79,70,229,0.3); transition:transform 0.1s;">
        Reveal Next Hint (Level ${currentLevel + 1}: ${hints[currentLevel]?.title || 'Next Step'})
      </button>
    ` : ''}

    <!-- Footer Links -->
    <div style="margin-top:14px; pt:10px; border-top:1px solid #1e293b; display:flex; justify-content:space-between; align-items:center; font-size:10px; color:#64748b;">
      <span style="display:flex; align-items:center; gap:5px;">
        <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#10b981;"></span> Auto-sync active
      </span>
      <a href="http://localhost:3001" target="_blank" style="color:#818cf8; text-decoration:none; font-weight:600;">
        Open Dashboard ↗
      </a>
    </div>
  `;
}

window.unlockLevel = (lvl) => {
  currentLevel = lvl;
  renderDrawerHints();
};

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
