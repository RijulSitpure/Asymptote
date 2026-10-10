/**
 * LeetCode Pattern Companion - Content Script
 * Uses modern LeetCode GraphQL API with same-origin session authentication
 */

const LOCAL_SERVER_URL = 'http://localhost:3001';

// Extract problem slug from URL
function getProblemSlug() {
  const match = window.location.pathname.match(/\/problems\/([^/]+)/);
  return match ? match[1] : null;
}

// In-page Toast Notification
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
  return match ? match[1] : '';
}

/**
 * 1-Click Full Account Sync using Modern LeetCode GraphQL API
 */
async function syncAllSolvedFromLeetCode() {
  showToast('Connecting to your LeetCode session...', 'info');
  const csrfToken = getCsrfToken();

  try {
    // 1. Get current logged-in user
    let username = 'User';
    try {
      const userRes = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrftoken': csrfToken
        },
        body: JSON.stringify({
          query: `query userStatus { userStatus { isSignedIn username } }`
        })
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        if (userData?.data?.userStatus?.username) {
          username = userData.data.userStatus.username;
        }
      }
    } catch (e) {
      console.warn('Could not read userStatus query:', e);
    }

    // 2. Fetch all solved problems via questionList with status: "AC"
    showToast(`Fetching solved problems for ${username}...`, 'info');
    let allSolved = [];
    let skip = 0;
    const limit = 100;
    let hasMore = true;

    while (hasMore && skip < 2000) {
      const qRes = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrftoken': csrfToken
        },
        body: JSON.stringify({
          query: `
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
          `,
          variables: {
            categorySlug: '',
            limit,
            skip,
            filters: { status: 'AC' }
          }
        })
      });

      const contentType = qRes.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('LeetCode session expired. Please refresh the page and sign in.');
      }

      const qData = await qRes.json();
      const listObj = qData?.data?.problemsetQuestionList;
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

    // 3. Fallback: if questionList returned 0, try recentAcSubmissionList
    if (allSolved.length === 0 && username && username !== 'User') {
      try {
        const recentRes = await fetch('/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-csrftoken': csrfToken
          },
          body: JSON.stringify({
            query: `
              query recentAcSubmissions($username: String!, $limit: Int!) {
                recentAcSubmissionList(username: $username, limit: $limit) {
                  id
                  title
                  titleSlug
                }
              }
            `,
            variables: { username, limit: 50 }
          })
        });

        if (recentRes.ok) {
          const recentData = await recentRes.json();
          const list = recentData?.data?.recentAcSubmissionList || [];
          for (const item of list) {
            allSolved.push({
              frontend_id: '',
              title: item.title,
              title_slug: item.titleSlug,
              difficulty: 'Medium'
            });
          }
        }
      } catch (e) {
        console.warn('Fallback recentAcSubmissionList query failed:', e);
      }
    }

    if (allSolved.length === 0) {
      showToast('No solved problems found. Please make sure you are signed in on LeetCode!', 'error');
      return { success: false, count: 0 };
    }

    showToast(`Found ${allSolved.length} solved problems! Categorizing patterns...`, 'info');

    // 4. Send to local Pattern Tracker server
    const syncRes = await fetch(`${LOCAL_SERVER_URL}/api/sync/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        problems: allSolved
      })
    });

    if (!syncRes.ok) {
      const errJson = await syncRes.json().catch(() => ({}));
      throw new Error(errJson.error || `Pattern Tracker returned HTTP ${syncRes.status}`);
    }

    const result = await syncRes.json();
    showToast(`✅ Successfully synced all ${allSolved.length} solved questions (${result.newlySynced} new, ${result.updatedCount} updated)!`, 'success');
    return { success: true, count: allSolved.length, username };
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

  try {
    const res = await fetch(`${LOCAL_SERVER_URL}/api/hints/${slug}`);
    if (!res.ok) {
      document.getElementById('lc-drawer-content').innerHTML = `
        <div style="padding:10px; border-radius:10px; background:#1e293b; border:1px solid #334155;">
          <p style="color:#f59e0b; font-weight:600; margin:0 0 6px 0;">Problem not yet in local catalog</p>
          <p style="font-size:11px; color:#94a3b8; margin:0 0 10px 0;">Open Pattern Tracker to diagnose pattern or sync account.</p>
          <a href="${LOCAL_SERVER_URL}" target="_blank" style="display:inline-block; font-size:11px; background:#4f46e5; color:#fff; padding:6px 12px; border-radius:8px; text-decoration:none; font-weight:600;">
            Open Pattern Tracker Dashboard
          </a>
        </div>
      `;
      return;
    }
    cachedHintData = await res.json();
    currentLevel = 1;
    renderDrawerHints();
  } catch (err) {
    document.getElementById('lc-drawer-content').innerHTML = `
      <p style="color:#ef4444;">Make sure Pattern Tracker server is running at ${LOCAL_SERVER_URL}!</p>
    `;
  }
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

  try {
    const res = await fetch(`${LOCAL_SERVER_URL}/api/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titleSlug: slug,
        code
      })
    });
    const result = await res.json();
    showToast(`Synced ${slug} to Pattern Tracker!`, 'success');
  } catch (err) {
    console.warn('Pattern Tracker auto-sync failed (is server running?):', err);
  }
}

// Extension message listener from popup
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.action === 'sync_all_from_leetcode') {
      syncAllSolvedFromLeetCode().then(res => sendResponse(res));
      return true; // Keep response channel open for async
    }
  });
}

// Inject buttons on all LeetCode pages
setInterval(() => {
  injectFloatingButtons();
  detectAcceptedSubmission();
}, 2000);
