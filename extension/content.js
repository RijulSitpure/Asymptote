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
    bottom: 24px;
    right: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  `;

  // Sync All Button
  const syncBtn = document.createElement('button');
  syncBtn.innerHTML = '⚡ Sync All Solved';
  syncBtn.title = 'Sync all your solved LeetCode problems to local Pattern Tracker';
  syncBtn.style.cssText = `
    background: #059669;
    color: #ffffff;
    border: none;
    padding: 8px 14px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(5, 150, 105, 0.4);
    display: flex;
    align-items: center;
    gap: 6px;
    transition: transform 0.2s, background 0.2s;
  `;
  syncBtn.onmouseover = () => { syncBtn.style.background = '#047857'; syncBtn.style.transform = 'scale(1.04)'; };
  syncBtn.onmouseout = () => { syncBtn.style.background = '#059669'; syncBtn.style.transform = 'scale(1)'; };
  syncBtn.onclick = syncAllSolvedFromLeetCode;
  container.appendChild(syncBtn);

  // Pattern Clue Button (if on problem page)
  if (isProblemPage) {
    const clueBtn = document.createElement('button');
    clueBtn.id = 'lc-pattern-clue-btn';
    clueBtn.innerHTML = '💡 Pattern Clue';
    clueBtn.title = 'View progressive Socratic hints without spoilers';
    clueBtn.style.cssText = `
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      color: #ffffff;
      border: none;
      padding: 8px 14px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
      display: flex;
      align-items: center;
      gap: 6px;
      transition: transform 0.2s;
    `;
    clueBtn.onmouseover = () => { clueBtn.style.transform = 'scale(1.04)'; };
    clueBtn.onmouseout = () => { clueBtn.style.transform = 'scale(1)'; };
    clueBtn.onclick = toggleHintsDrawer;
    container.appendChild(clueBtn);
  }

  document.body.appendChild(container);
}

// In-Page Socratic Hints Drawer
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
    top: 60px;
    right: 20px;
    width: 390px;
    max-height: 82vh;
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    z-index: 9999999;
    padding: 18px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #e2e8f0;
    overflow-y: auto;
  `;

  drawer.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
      <h3 style="font-size:14px; font-weight:700; color:#fff; margin:0;">💡 Socratic Pattern Clues</h3>
      <button id="lc-close-drawer" style="background:none; border:none; color:#94a3b8; cursor:pointer; font-size:16px;">✕</button>
    </div>
    <div style="margin-bottom:12px;">
      <button onclick="window.syncAllSolvedFromLeetCode()" style="width:100%; padding:7px 12px; background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.3); border-radius:10px; color:#34d399; font-size:11px; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px;">
        <span>⚡</span> Sync All My Solved Questions Now
      </button>
    </div>
    <div id="lc-drawer-content" style="font-size:12px; color:#94a3b8;">
      Fetching clues from local Pattern Tracker...
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
        <div style="padding:10px; border-radius:10px; background:#1e293b; border:1px solid #334155;">
          <p style="color:#f59e0b; font-weight:600; margin:0 0 6px 0;">Problem not yet in local catalog</p>
          <p style="font-size:11px; color:#94a3b8; margin:0 0 10px 0;">Open Pattern Tracker to diagnose pattern or sync account.</p>
          <a href="http://localhost:3001" target="_blank" style="display:inline-block; font-size:11px; background:#4f46e5; color:#fff; padding:6px 12px; border-radius:8px; text-decoration:none; font-weight:600;">
            Open Pattern Tracker Dashboard
          </a>
        </div>
      `;
    }
  });
}

function renderDrawerHints() {
  if (!cachedHintData) return;
  const { problem, pattern, hints } = cachedHintData;
  const content = document.getElementById('lc-drawer-content');
  if (!content) return;

  const hintItems = (hints || []).map((h, i) => {
    const isUnlocked = (i + 1) <= currentLevel;
    return `
      <div style="margin-bottom:10px; padding:10px; border-radius:10px; background:${isUnlocked ? '#1e293b' : '#111827'}; border:1px solid ${isUnlocked ? '#475569' : '#1e293b'};">
        <div style="display:flex; justify-content:space-between; font-weight:600; font-size:12px; color:${isUnlocked ? '#fff' : '#64748b'}; margin-bottom:4px;">
          <span>Level ${i + 1}: ${h.title}</span>
          ${!isUnlocked ? `<button onclick="window.unlockLevel(${i + 1})" style="background:none; border:none; color:#818cf8; cursor:pointer; font-size:11px; font-weight:600;">Unlock</button>` : `<span style="color:#10b981; font-size:10px;">UNLOCKED</span>`}
        </div>
        ${isUnlocked ? `<div style="font-size:11px; color:#cbd5e1; line-height:1.4; white-space:pre-wrap;">${h.content}</div>` : ''}
      </div>
    `;
  }).join('');

  content.innerHTML = `
    <div style="margin-bottom:12px;">
      <span style="display:inline-block; font-size:11px; padding:2px 8px; border-radius:12px; background:rgba(99,102,241,0.15); color:#a5b4fc; margin-bottom:4px;">
        ${pattern?.title || 'Algorithmic Pattern'}
      </span>
      <div style="font-size:13px; font-weight:700; color:#fff;">${problem.title}</div>
      ${problem.twist_type ? `<div style="font-size:11px; color:#f59e0b; margin-top:2px;">Twist: ${problem.twist_type}</div>` : ''}
    </div>
    ${hintItems}
    ${currentLevel < (hints?.length || 0) ? `
      <button onclick="window.unlockLevel(${currentLevel + 1})" style="width:100%; margin-top:8px; padding:8px; background:#4f46e5; color:#fff; border:none; border-radius:8px; font-weight:600; font-size:12px; cursor:pointer;">
        Reveal Next Clue (Level ${currentLevel + 1})
      </button>
    ` : ''}
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
