/**
 * LeetCode Pattern Companion - Background Service Worker
 * Bridges communication between LeetCode web pages and the local Pattern Tracker server (http://localhost:3001)
 * Bypasses Chrome's Mixed Content & Private Network Access restrictions.
 */

const LOCAL_SERVER_URL = 'http://localhost:3001';

async function safeFetchJson(url, options = {}) {
  try {
    const res = await fetch(url, options);
    const text = await res.text();

    if (!res.ok) {
      try {
        const errObj = JSON.parse(text);
        throw new Error(errObj.error || `HTTP ${res.status}`);
      } catch (parseErr) {
        if (text.trim().startsWith('<')) {
          throw new Error(`Server returned HTML error (HTTP ${res.status}). Make sure Pattern Tracker server is running on port 3001.`);
        }
        throw new Error(`Server error (HTTP ${res.status}): ${text.slice(0, 100)}`);
      }
    }

    try {
      return JSON.parse(text);
    } catch (parseErr) {
      throw new Error(`Invalid JSON from server (${text.slice(0, 60)}...)`);
    }
  } catch (netErr) {
    if (netErr.message && netErr.message.includes('Failed to fetch')) {
      throw new Error('Pattern Tracker server is offline. Please start it with "npm start" in your terminal!');
    }
    throw netErr;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // 1. Batch sync of all solved problems
  if (request.action === 'send_to_server') {
    safeFetchJson(`${LOCAL_SERVER_URL}/api/sync/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: request.username,
        problems: request.problems
      })
    })
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.message }));

    return true; // Keep channel open for async response
  }

  // 2. Single submission capture
  if (request.action === 'save_submission') {
    safeFetchJson(`${LOCAL_SERVER_URL}/api/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titleSlug: request.titleSlug,
        code: request.code
      })
    })
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.message }));

    return true;
  }

  // 3. Fetch progressive hints for a problem
  if (request.action === 'fetch_hints') {
    safeFetchJson(`${LOCAL_SERVER_URL}/api/hints/${encodeURIComponent(request.slug)}`)
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.message }));

    return true;
  }

  // 4. Check server status
  if (request.action === 'check_server') {
    safeFetchJson(`${LOCAL_SERVER_URL}/api/stats`)
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.message }));

    return true;
  }
});
