/**
 * Asymptote - Background Service Worker
 * Powered by the embedded serverless data engine.
 * Fully offline & independent of a local backend server.
 */

import {
  createAsymptoteEngine,
  loadDatasetFromFetch,
  createChromeStorageAdapter
} from './asymptote-engine.js';

let engineInstance = null;
let engineInitPromise = null;

async function getEngine() {
  if (engineInstance) return engineInstance;
  if (!engineInitPromise) {
    engineInitPromise = (async () => {
      const baseUrl = chrome.runtime.getURL('data');
      const dataset = await loadDatasetFromFetch(baseUrl);
      const storage = createChromeStorageAdapter();
      engineInstance = createAsymptoteEngine({ dataset, storage });
      return engineInstance;
    })();
  }
  return engineInitPromise;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!request || !request.action) return false;

  (async () => {
    try {
      const engine = await getEngine();

      switch (request.action) {
        case 'fetch_hints': {
          const data = await engine.getProblemHints(request.slug);
          sendResponse({ success: true, data });
          break;
        }

        case 'save_submission': {
          const data = await engine.recordSubmission(request);
          sendResponse({ success: true, data });
          break;
        }

        case 'send_to_server':
        case 'sync_batch': {
          if (Array.isArray(request.problems)) {
            const data = await engine.syncBatch({
              username: request.username,
              problems: request.problems
            });
            sendResponse({ success: true, data });
          } else {
            const data = await engine.recordSubmission(request);
            sendResponse({ success: true, data });
          }
          break;
        }

        case 'check_server':
        case 'get_stats': {
          const data = await engine.getStats();
          sendResponse({ success: true, data });
          break;
        }

        case 'get_patterns': {
          const data = engine.getPatterns();
          sendResponse({ success: true, data });
          break;
        }

        case 'get_problems': {
          const data = await engine.getProblems(request.filters);
          sendResponse({ success: true, data });
          break;
        }

        case 'update_problem': {
          const data = await engine.updateProblemUserState(request.id, request.updates);
          sendResponse({ success: true, data });
          break;
        }

        case 'diagnose_wizard': {
          const data = engine.diagnoseWizard(request.payload);
          sendResponse({ success: true, data });
          break;
        }

        case 'open_dashboard': {
          const query = request.query || '';
          const url = chrome.runtime.getURL('dashboard/index.html' + query);
          chrome.tabs.create({ url });
          sendResponse({ success: true, url });
          break;
        }

        default:
          sendResponse({ success: false, error: `Unknown action: ${request.action}` });
          break;
      }
    } catch (err) {
      console.error(`[Background] Error handling action "${request.action}":`, err);
      sendResponse({ success: false, error: err.message });
    }
  })();

  return true; // Keep channel open for async response
});

// Monitor SPA navigation on LeetCode tabs and notify content script immediately
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url && changeInfo.url.includes('leetcode.com')) {
    chrome.tabs.sendMessage(tabId, {
      action: 'url_changed',
      url: changeInfo.url
    }).catch(() => {
      // Content script may not be loaded yet or tab is inactive; safe to ignore
    });
  }
});
