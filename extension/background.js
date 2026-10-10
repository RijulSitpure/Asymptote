/**
 * LeetCode Pattern Companion - Background Service Worker
 * Bridges communication between LeetCode web pages and the local Pattern Tracker server (http://localhost:3001)
 * Bypasses Chrome's Mixed Content & Private Network Access restrictions.
 */

const LOCAL_SERVER_URL = 'http://localhost:3001';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // 1. Batch sync of all solved problems
  if (request.action === 'send_to_server') {
    fetch(`${LOCAL_SERVER_URL}/api/sync/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: request.username,
        problems: request.problems
      })
    })
      .then(res => {
        if (!res.ok) throw new Error(`Server returned HTTP ${res.status}`);
        return res.json();
      })
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.message }));

    return true; // Keep channel open for async response
  }

  // 2. Single submission capture
  if (request.action === 'save_submission') {
    fetch(`${LOCAL_SERVER_URL}/api/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titleSlug: request.titleSlug,
        code: request.code
      })
    })
      .then(res => res.json())
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.message }));

    return true;
  }

  // 3. Fetch progressive hints for a problem
  if (request.action === 'fetch_hints') {
    fetch(`${LOCAL_SERVER_URL}/api/hints/${encodeURIComponent(request.slug)}`)
      .then(res => {
        if (!res.ok) throw new Error(`Not found (${res.status})`);
        return res.json();
      })
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.message }));

    return true;
  }

  // 4. Check server status
  if (request.action === 'check_server') {
    fetch(`${LOCAL_SERVER_URL}/api/stats`)
      .then(res => res.json())
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.message }));

    return true;
  }
});
