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

async function syncAllSolved() {
  const msgEl = document.getElementById('sync-msg');
  const btn = document.getElementById('sync-all-btn');

  msgEl.style.display = 'block';
  msgEl.style.background = '#1e293b';
  msgEl.style.color = '#94a3b8';
  msgEl.innerText = 'Connecting to LeetCode session...';
  btn.disabled = true;

  try {
    // Fetch directly using browser cookies
    const res = await fetch('https://leetcode.com/api/problems/all/');
    if (!res.ok) throw new Error('Please make sure you are logged into leetcode.com');
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
      msgEl.innerText = 'No solved questions found. Are you logged in on leetcode.com?';
      btn.disabled = false;
      return;
    }

    msgEl.innerText = `Found ${solved.length} solved questions! Uploading to Pattern Tracker...`;

    const syncRes = await fetch(`${SERVER_URL}/api/sync/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        problems: solved
      })
    });

    if (!syncRes.ok) throw new Error('Pattern Tracker server error');
    const result = await syncRes.json();

    msgEl.style.background = 'rgba(16, 185, 129, 0.2)';
    msgEl.style.color = '#6ee7b7';
    msgEl.innerText = `✅ Successfully synced ${solved.length} questions (${result.newlySynced} new, ${result.updatedCount} updated)!`;
    await checkServer();
  } catch (err) {
    msgEl.style.background = 'rgba(239, 68, 68, 0.2)';
    msgEl.style.color = '#fca5a5';
    msgEl.innerText = `Sync failed: ${err.message}`;
  } finally {
    btn.disabled = false;
  }
}

document.getElementById('sync-all-btn').addEventListener('click', syncAllSolved);

document.getElementById('open-app-btn').addEventListener('click', () => {
  if (typeof chrome !== 'undefined' && chrome.tabs) {
    chrome.tabs.create({ url: SERVER_URL });
  } else {
    window.open(SERVER_URL, '_blank');
  }
});

checkServer();
