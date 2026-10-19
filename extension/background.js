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
import { silentlySyncDataset } from './dataset-sync.js';

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

        case 'export_user_data': {
          const data = await engine.exportUserData();
          sendResponse({ success: true, data });
          break;
        }

        case 'import_user_data': {
          const data = await engine.importUserData(request.backupData);
          sendResponse({ success: true, data });
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

// ==============================================================================
// Silent Over-The-Air (OTA) Dataset Synchronizer
// Operates completely silently in the background: zero user alerts, zero popups.
// When new problem batches or hints are pushed to the repository, the extension
// automatically and silently updates local storage and hot-applies to the engine.
// ==============================================================================
const ALARM_SILENT_DATASET_SYNC = 'asymptote_silent_dataset_sync';

async function performSilentDatasetSync() {
  try {
    const engine = await getEngine();
    const manifestUrl = chrome.runtime.getURL('data/manifest.json');
    const localManifestRes = await fetch(manifestUrl).catch(() => null);
    if (!localManifestRes || !localManifestRes.ok) return;
    const localManifest = await localManifestRes.json();
    const storage = createChromeStorageAdapter();

    const result = await silentlySyncDataset({
      storage,
      localManifest,
      engine
    });

    if (result && result.updated) {
      console.debug('[Background] Dataset silently updated to version', result.version, 'with', result.newProblemsCount, 'curated problems.');
    }
  } catch (err) {
    // Fails completely silently without any user disruption or popup errors
    console.debug('[Background] Silent dataset sync check skipped/failed:', err?.message);
  }
}

// Set up periodic background alarm (checks every 6 hours)
if (typeof chrome !== 'undefined' && chrome.alarms) {
  chrome.alarms.get(ALARM_SILENT_DATASET_SYNC, (alarm) => {
    if (!alarm) {
      chrome.alarms.create(ALARM_SILENT_DATASET_SYNC, {
        periodInMinutes: 360 // every 6 hours
      });
    }
  });

  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === ALARM_SILENT_DATASET_SYNC) {
      performSilentDatasetSync();
    }
  });
}

// Run a silent background check when extension starts or installs
if (typeof chrome !== 'undefined' && chrome.runtime) {
  if (chrome.runtime.onStartup) {
    chrome.runtime.onStartup.addListener(() => {
      performSilentDatasetSync();
    });
  }
  if (chrome.runtime.onInstalled) {
    chrome.runtime.onInstalled.addListener(() => {
      performSilentDatasetSync();
    });
  }
}

