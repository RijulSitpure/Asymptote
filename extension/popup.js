function checkServer() {
  const statusEl = document.getElementById('server-status');
  const dotEl = document.getElementById('server-dot');

  chrome.runtime.sendMessage({ action: 'check_server' }, (response) => {
    if (response && response.success) {
      const solved = response.data.totalSolved ?? response.data.solvedCount ?? 0;
      statusEl.innerText = `Connected (${solved} solved)`;
      dotEl.style.background = '#10b981';
    } else {
      statusEl.innerText = 'Server offline (run npm start)';
      dotEl.style.background = '#ef4444';
    }
  });
}

async function triggerSync() {
  const msgEl = document.getElementById('sync-msg');
  const btn = document.getElementById('sync-all-btn');

  msgEl.style.display = 'block';
  msgEl.style.background = '#1e293b';
  msgEl.style.color = '#94a3b8';
  msgEl.innerText = 'Connecting to LeetCode tab...';
  btn.disabled = true;

  try {
    const tabs = await chrome.tabs.query({ url: '*://*.leetcode.com/*' });

    if (tabs && tabs.length > 0) {
      const targetTab = tabs[0];
      msgEl.innerText = 'Syncing your solved problems via LeetCode session...';

      chrome.tabs.sendMessage(targetTab.id, { action: 'sync_all_from_leetcode' }, (response) => {
        if (chrome.runtime.lastError || !response) {
          msgEl.style.background = 'rgba(239, 68, 68, 0.2)';
          msgEl.style.color = '#fca5a5';
          msgEl.innerText = 'Please refresh (Cmd+R) your open LeetCode tab and click "⚡ Sync All Solved" on the page!';
          btn.disabled = false;
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
          msgEl.innerText = `Sync failed: ${response.error || 'Please make sure you are signed in on LeetCode'}`;
        }
        btn.disabled = false;
      });
    } else {
      msgEl.style.background = 'rgba(99, 102, 241, 0.2)';
      msgEl.style.color = '#c7d2fe';
      msgEl.innerText = 'Opening LeetCode tab... Click the green "⚡ Sync All Solved" button on the page!';

      chrome.tabs.create({ url: 'https://leetcode.com/problemset/' });
      btn.disabled = false;
    }
  } catch (err) {
    msgEl.style.background = 'rgba(239, 68, 68, 0.2)';
    msgEl.style.color = '#fca5a5';
    msgEl.innerText = `Sync error: ${err.message}`;
    btn.disabled = false;
  }
}

document.getElementById('sync-all-btn').addEventListener('click', triggerSync);

document.getElementById('open-app-btn').addEventListener('click', () => {
  chrome.tabs.create({ url: 'http://localhost:3001' });
});

checkServer();
