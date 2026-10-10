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

document.getElementById('open-app-btn').addEventListener('click', () => {
  chrome.tabs.create({ url: SERVER_URL });
});

checkServer();
