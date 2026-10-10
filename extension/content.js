/**
 * LeetCode Pattern Companion - Content Script
 * 1. Adds in-page progressive hints button on LeetCode
 * 2. Auto-detects Accepted submissions and syncs code + pattern to local server
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
      background: #111827;
      color: #f8fafc;
      border: 1px solid #334155;
      border-radius: 12px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      font-weight: 500;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
      z-index: 999999;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(10px);
    `;
    document.body.appendChild(toast);
  }

  const icon = type === 'success' ? '⚡' : '💡';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  toast.style.borderColor = type === 'success' ? '#10b981' : '#6366f1';
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 4000);
}

// Floating "Pattern Clue" Button on LeetCode
function injectFloatingButton() {
  if (document.getElementById('lc-pattern-clue-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'lc-pattern-clue-btn';
  btn.innerHTML = '💡 Pattern Clue';
  btn.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 80px;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: #ffffff;
    border: none;
    padding: 9px 15px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    z-index: 99999;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    transition: transform 0.2s, box-shadow 0.2s;
  `;

  btn.onmouseover = () => {
    btn.style.transform = 'scale(1.04)';
    btn.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.6)';
  };
  btn.onmouseout = () => {
    btn.style.transform = 'scale(1)';
    btn.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.4)';
  };

  btn.onclick = toggleHintsDrawer;
  document.body.appendChild(btn);
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
    width: 380px;
    max-height: 80vh;
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    z-index: 999999;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #e2e8f0;
    overflow-y: auto;
  `;

  drawer.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
      <h3 style="font-size:14px; font-weight:700; color:#fff; margin:0;">💡 Socratic Pattern Clues</h3>
      <button id="lc-close-drawer" style="background:none; border:none; color:#94a3b8; cursor:pointer; font-size:16px;">✕</button>
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
        <p style="color:#f59e0b;">Problem not yet indexed locally.</p>
        <p style="margin-top:8px;">Open <a href="${LOCAL_SERVER_URL}" target="_blank" style="color:#818cf8; text-decoration:underline;">Pattern Tracker</a> to diagnose pattern via constraints.</p>
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
      <div style="margin-bottom:10px; padding:10px; border-radius:8px; background:${isUnlocked ? '#1e293b' : '#111827'}; border:1px solid ${isUnlocked ? '#475569' : '#1e293b'};">
        <div style="display:flex; justify-content:space-between; font-weight:600; font-size:12px; color:${isUnlocked ? '#fff' : '#64748b'}; margin-bottom:4px;">
          <span>Level ${i + 1}: ${h.title}</span>
          ${!isUnlocked ? `<button onclick="window.unlockLevel(${i + 1})" style="background:none; border:none; color:#818cf8; cursor:pointer; font-size:11px;">Unlock</button>` : `<span style="color:#10b981; font-size:10px;">UNLOCKED</span>`}
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

  // Also check general status banners
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

  // Extract code from Monaco editor DOM or window
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

// Polling observer for submissions and DOM load
setInterval(() => {
  if (window.location.pathname.includes('/problems/')) {
    injectFloatingButton();
    detectAcceptedSubmission();
  }
}, 2000);
