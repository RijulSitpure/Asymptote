import {
  createAsymptoteEngine,
  loadDatasetFromFetch,
  createChromeStorageAdapter,
  createLocalStorageAdapter
} from './asymptote-engine.js';
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
      let dataUrl = '/data';
      if (typeof chrome !== 'undefined' && chrome.runtime?.getURL) {
        dataUrl = chrome.runtime.getURL('data');
      }

      const storage = (typeof chrome !== 'undefined' && chrome.storage?.local)
        ? createChromeStorageAdapter()
        : createLocalStorageAdapter();

      const dataset = await loadDatasetFromFetch(dataUrl);
      engineInstance = createAsymptoteEngine({ dataset, storage });
      return engineInstance;
    })();
  }
  return engineInitPromise;
}

export async function fetchPatterns() {
  const engine = await getClientEngine();
  return engine.getPatterns();
}

export async function fetchProblems(filters = null) {
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
