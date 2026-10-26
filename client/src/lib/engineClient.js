import {
  createAsymptoteEngine,
  loadDatasetFromFetch,
  createChromeStorageAdapter,
  createLocalStorageAdapter
} from './asymptote-engine.js';
import { silentlySyncDataset } from './dataset-sync.js';
import './languages.js';

let engineInstance = null;
let engineInitPromise = null;

export function resetClientEngine() {
  engineInstance = null;
  engineInitPromise = null;
}

export function setClientEngine(engine) {
  engineInstance = engine;
  engineInitPromise = Promise.resolve(engine);
}

export async function getClientEngine() {
  if (engineInstance) return engineInstance;
  if (!engineInitPromise) {
    engineInitPromise = (async () => {
      try {
        let dataUrl = '/data';
        if (typeof chrome !== 'undefined' && chrome.runtime?.getURL) {
          dataUrl = chrome.runtime.getURL('data');
        }

        const storage = (typeof chrome !== 'undefined' && chrome.storage?.local)
          ? createChromeStorageAdapter()
          : createLocalStorageAdapter();

        const dataset = await loadDatasetFromFetch(dataUrl, storage);
        engineInstance = createAsymptoteEngine({ dataset, storage });

        // Silent background dataset update check:
        // Completely transparent to user, zero prompts, zero alerts.
        if (typeof window !== 'undefined') {
          setTimeout(async () => {
            try {
              const syncRes = await silentlySyncDataset({
                storage,
                localManifest: dataset.manifest,
                engine: engineInstance
              });
              if (syncRes && syncRes.updated) {
                window.dispatchEvent(new CustomEvent('asymptote:dataset_updated', { detail: syncRes }));
              }
            } catch {
              // Fail completely silently
            }
          }, 1500);
        }

        return engineInstance;
      } catch (err) {
        engineInitPromise = null;
        throw err;
      }
    })();
  }
  return engineInitPromise;
}

export async function fetchPatterns() {
  const engine = await getClientEngine();
  return engine.getPatterns();
}

export async function fetchProblems(filters = {}) {
  const engine = await getClientEngine();
  return engine.getProblems(filters);
}

export async function fetchStats() {
  const engine = await getClientEngine();
  return engine.getStats();
}

export async function fetchProblemHints(query) {
  const engine = await getClientEngine();
  return engine.getProblemHints(query);
}

export async function updateProblem(idOrSlug, updates) {
  const engine = await getClientEngine();
  return engine.updateProblemUserState(idOrSlug, updates);
}

export async function diagnoseWizard(payload) {
  const engine = await getClientEngine();
  return engine.diagnoseWizard(payload);
}

export async function syncBatch(payload) {
  const engine = await getClientEngine();
  return engine.syncBatch(payload);
}

export async function recordSubmission(payload) {
  const engine = await getClientEngine();
  return engine.recordSubmission(payload);
}

export async function exportUserData() {
  const engine = await getClientEngine();
  return engine.exportUserData();
}

export async function importUserData(backupData) {
  const engine = await getClientEngine();
  return engine.importUserData(backupData);
}

export async function downloadUserDataBackup() {
  const data = await exportUserData();
  const dateStr = new Date().toISOString().split('T')[0];
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `asymptote-backup-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return data;
}

export async function importUserDataFromFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file selected'));
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target.result;
        const json = JSON.parse(text);
        const result = await importUserData(json);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export function subscribeToStorageChanges(callback) {
  const cleanups = [];

  if (typeof chrome !== 'undefined' && chrome.storage?.onChanged) {
    const listener = (changes, areaName) => {
      if (areaName === 'local') {
        callback(changes);
      }
    };
    chrome.storage.onChanged.addListener(listener);
    cleanups.push(() => chrome.storage.onChanged.removeListener(listener));
  }

  if (typeof window !== 'undefined') {
    const listener = (event) => {
      if (!event.key || event.key.startsWith('asymptote:')) {
        callback({ [event.key]: { oldValue: event.oldValue, newValue: event.newValue } });
      }
    };
    window.addEventListener('storage', listener);
    cleanups.push(() => window.removeEventListener('storage', listener));
  }

  return () => {
    for (const cleanup of cleanups) {
      try {
        cleanup();
      } catch {}
    }
  };
}
