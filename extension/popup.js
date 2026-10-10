const SERVER_URL = 'http://localhost:3001';

async function checkServer() {
  const statusEl = document.getElementById('server-status');
  const dotEl = document.getElementById('server-dot');

  try {
    const res = await fetch(`${SERVER_URL}/api/stats`);
    if (res.ok) {
      const data = await res.json();
      statusEl.innerText = `Connected (${data.solvedCount || 0} solved)`;
      dotEl.style.background = '#10b981';
    } else {
      throw new Error();
    }
  } catch (e) {
    statusEl.innerText = 'Server offline (run npm start)';
    dotEl.style.background = '#ef4444';
  }
}

async function triggerSync() {
  const msgEl = document.getElementById('sync-msg');
  const btn = document.getElementById('sync-all-btn');

  msgEl.style.display = 'block';
  msgEl.style.background = '#1e293b';
  msgEl.style.color = '#94a3b8';
  msgEl.innerText = 'Finding LeetCode tab...';
  btn.disabled = true;

  try {
    // Check if an existing tab is on leetcode.com
    const tabs = await chrome.tabs.query({ url: '*://*.leetcode.com/*' });

    if (tabs && tabs.length > 0) {
      const targetTab = tabs[0];
      msgEl.innerText = 'Syncing from active LeetCode tab...';

      chrome.tabs.sendMessage(targetTab.id, { action: 'sync_all_from_leetcode' }, (response) => {
        if (chrome.runtime.lastError || !response) {
          // Fallback to direct fetch
          fallbackDirectSync();
          return;
        }
        if (response.success) {
          msgEl.style.background = 'rgba(16, 185, 129, 0.2)';
          msgEl.style.color = '#6ee7b7';
          msgEl.innerText = `✅ Successfully synced all ${response.count} solved questions for ${response.username}!`;
          checkServer();
        } else {
          msgEl.style.background = 'rgba(239, 68, 68, 0.2)';
          msgEl.style.color = '#fca5a5';
          msgEl.innerText = `Sync error: ${response.error || 'Failed'}`;
        }
        btn.disabled = false;
      });
    } else {
      // No LeetCode tab open: prompt to open LeetCode
      msgEl.style.background = 'rgba(99, 102, 241, 0.2)';
      msgEl.style.color = '#c7d2fe';
      msgEl.innerText = 'Opening LeetCode to access your signed-in session...';

      chrome.tabs.create({ url: 'https://leetcode.com/problemset/' }, (newTab) => {
        msgEl.innerText = 'Please click "⚡ Sync All Solved" on the opened LeetCode tab!';
        btn.disabled = false;
      });
    }
  } catch (err) {
    fallbackDirectSync();
  }
}

async function fallbackDirectSync() {
  const msgEl = document.getElementById('sync-msg');
  const btn = document.getElementById('sync-all-btn');
  msgEl.innerText = 'Attempting direct session fetch...';

  try {
    const res = await fetch('https://leetcode.com/api/problems/all/', {
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Could not connect to LeetCode');
    const data = await res.json();
    const username = data.user_name || 'User';

    const solved = (data.stat_status_pairs || [])
      .filter(p => p.status === 'ac')
      .map(p => ({
        frontend_id: String(p.stat.frontend_question_id || p.stat.question_id),
        title: p.stat.question__title,
        title_slug: p.stat.question__title_slug,
        difficulty: p.difficulty.level === 1 ? 'Easy' : p.difficulty.level === 2 ? 'Medium' : 'Hard'
      }));

    if (!solved.length) {
      msgEl.style.background = 'rgba(239, 68, 68, 0.2)';
      msgEl.style.color = '#fca5a5';
      msgEl.innerText = 'No solved questions found. Please ensure you are logged into leetcode.com';
      btn.disabled = false;
      return;
    }

    msgEl.innerText = `Found ${solved.length} solved problems! Uploading...`;

    const syncRes = await fetch(`${SERVER_URL}/api/sync/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        problems: solved
      })
    });

    const result = await syncRes.json();
    msgEl.style.background = 'rgba(16, 185, 129, 0.2)';
    msgEl.style.color = '#6ee7b7';
    msgEl.innerText = `✅ Successfully synced ${solved.length} questions (${result.newlySynced} new, ${result.updatedCount} updated)!`;
    await checkServer();
  } catch (e) {
    msgEl.style.background = 'rgba(239, 68, 68, 0.2)';
    msgEl.style.color = '#fca5a5';
    msgEl.innerText = `Sync failed: ${e.message}`;
  } finally {
    btn.disabled = false;
  }
}

document.getElementById('sync-all-btn').addEventListener('click', triggerSync);

document.getElementById('open-app-btn').addEventListener('click', () => {
  if (typeof chrome !== 'undefined' && chrome.tabs) {
    chrome.tabs.create({ url: SERVER_URL });
  } else {
    window.open(SERVER_URL, '_blank');
  }
});

checkServer();
