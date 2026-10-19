// generated, do not edit - source: shared/dataset-sync.js
/**
 * Asymptote - Silent Over-The-Air (OTA) Dataset Synchronizer
 * 
 * Automatically checks and updates the problem hints, patterns, and complexity datasets
 * in the background. Operates completely silently: zero user prompts, zero manual intervention,
 * zero UI blocking.
 */

export const STORAGE_KEY_OTA_DATASET = 'asymptote_ota_dataset';
export const STORAGE_KEY_LAST_CHECK = 'asymptote_last_ota_check';
export const SYNC_COOLDOWN_MS = 1000 * 60 * 60 * 6; // 6 hours

// Remote repository base URL where updated dataset shards and manifest are published
export const DEFAULT_REMOTE_BASE_URL = 'https://raw.githubusercontent.com/RijulSitpure/asymptote/main/extension/data';

/**
 * Calculates SHA-256 hash across Node.js, Web Worker, and Browser environments.
 */
export async function computeSha256(text) {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Node.js fallback
  try {
    const crypto = await import('node:crypto');
    return crypto.createHash('sha256').update(text).digest('hex');
  } catch {
    return '';
  }
}

/**
 * Checks if a newer dataset version or modified shard is available remotely.
 * Returns { hasUpdate: boolean, remoteManifest, changedShards: string[] }
 */
export async function checkForDatasetUpdates({ localManifest, remoteBaseUrl = DEFAULT_REMOTE_BASE_URL }) {
  if (!localManifest) return { hasUpdate: false, reason: 'missing_local_manifest' };

  const cleanBase = String(remoteBaseUrl).replace(/\/+$/, '');
  const manifestUrl = `${cleanBase}/manifest.json`;

  let remoteManifest;
  try {
    const res = await fetch(manifestUrl, { cache: 'no-cache' });
    if (!res.ok) {
      return { hasUpdate: false, reason: `http_${res.status}` };
    }
    remoteManifest = await res.json();
  } catch (err) {
    // Fail completely silently on network error/offline
    return { hasUpdate: false, reason: 'network_offline', error: err.message };
  }

  if (!remoteManifest || !remoteManifest.checksums) {
    return { hasUpdate: false, reason: 'invalid_remote_manifest' };
  }

  const localChecksums = localManifest.checksums || {};
  const remoteChecksums = remoteManifest.checksums || {};

  const changedShards = [];
  for (const [file, remoteHash] of Object.entries(remoteChecksums)) {
    const localHash = localChecksums[file];
    if (localHash !== remoteHash) {
      changedShards.push(file);
    }
  }

  const isVersionNewer = remoteManifest.datasetVersion !== localManifest.datasetVersion;
  const hasUpdate = changedShards.length > 0 || isVersionNewer;

  return {
    hasUpdate,
    remoteManifest,
    changedShards,
    localVersion: localManifest.datasetVersion || '1.0.0',
    remoteVersion: remoteManifest.datasetVersion || '1.0.0'
  };
}

/**
 * Executes a silent background dataset sync.
 * Downloads changed shards, verifies SHA-256 integrity, commits to storage,
 * and hot-applies to the running engine without any user intervention or alerts.
 */
export async function silentlySyncDataset({
  storage,
  localManifest,
  remoteBaseUrl = DEFAULT_REMOTE_BASE_URL,
  force = false,
  engine = null
}) {
  if (!storage) return { updated: false, reason: 'missing_storage' };

  // 1. Cooldown check: Do not query network excessively in background
  if (!force) {
    try {
      const lastCheck = await storage.get(STORAGE_KEY_LAST_CHECK);
      if (lastCheck && (Date.now() - Number(lastCheck)) < SYNC_COOLDOWN_MS) {
        return { updated: false, reason: 'cooldown_active' };
      }
    } catch {
      // Ignore storage read error
    }
  }

  // 2. Check for remote updates
  const updateCheck = await checkForDatasetUpdates({ localManifest, remoteBaseUrl });
  if (!updateCheck.hasUpdate) {
    try {
      await storage.set(STORAGE_KEY_LAST_CHECK, Date.now());
    } catch {}
    return { updated: false, reason: updateCheck.reason || 'up_to_date' };
  }

  const { remoteManifest, changedShards } = updateCheck;
  const cleanBase = String(remoteBaseUrl).replace(/\/+$/, '');

  // 3. Fetch changed shards and verify checksums
  const downloadedShards = {};
  const newProblems = [];
  const newPatterns = [];

  for (const file of changedShards) {
    // Only process category domain shards
    const isShard = ['algorithms.json', 'database.json', 'pandas.json', 'shell.json', 'concurrency.json', 'javascript.json'].includes(file);
    if (!isShard) continue;

    try {
      const res = await fetch(`${cleanBase}/${file}`, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();

      // Integrity verification
      const expectedHash = remoteManifest.checksums[file];
      if (expectedHash) {
        const actualHash = await computeSha256(text);
        if (actualHash && actualHash !== expectedHash) {
          console.warn(`[OTA Sync] Hash mismatch for ${file}. Download aborted.`);
          continue;
        }
      }

      const json = JSON.parse(text);
      downloadedShards[file] = json;
      if (Array.isArray(json.problems)) {
        newProblems.push(...json.problems);
      }
      if (Array.isArray(json.patterns)) {
        newPatterns.push(...json.patterns);
      }
    } catch (err) {
      console.debug(`[OTA Sync] Failed to download shard ${file}:`, err.message);
      // Abort gracefully; retain existing dataset
      return { updated: false, reason: 'shard_download_error' };
    }
  }

  if (newProblems.length === 0 && newPatterns.length === 0) {
    await storage.set(STORAGE_KEY_LAST_CHECK, Date.now());
    return { updated: false, reason: 'no_shard_problems' };
  }

  // 4. Merge with existing OTA dataset if present
  let existingOta = null;
  try {
    existingOta = await storage.get(STORAGE_KEY_OTA_DATASET);
  } catch {}

  const mergedProblemsMap = new Map();
  if (existingOta && Array.isArray(existingOta.problems)) {
    for (const p of existingOta.problems) {
      if (p && p.slug) mergedProblemsMap.set(p.slug, p);
    }
  }
  for (const p of newProblems) {
    if (p && p.slug) mergedProblemsMap.set(p.slug, p);
  }

  const mergedPatternsMap = new Map();
  if (existingOta && Array.isArray(existingOta.patterns)) {
    for (const pat of existingOta.patterns) {
      if (pat && pat.id) mergedPatternsMap.set(pat.id, pat);
    }
  }
  for (const pat of newPatterns) {
    if (pat && pat.id) mergedPatternsMap.set(pat.id, pat);
  }

  const otaData = {
    datasetVersion: remoteManifest.datasetVersion || '1.1.0',
    syncedAt: new Date().toISOString(),
    totalProblems: mergedProblemsMap.size,
    problems: Array.from(mergedProblemsMap.values()),
    patterns: Array.from(mergedPatternsMap.values())
  };

  // 5. Persist to storage
  try {
    await storage.set(STORAGE_KEY_OTA_DATASET, otaData);
    await storage.set(STORAGE_KEY_LAST_CHECK, Date.now());
  } catch (err) {
    console.debug('[OTA Sync] Failed to commit OTA dataset to storage:', err.message);
    return { updated: false, reason: 'storage_commit_error' };
  }

  // 6. Hot-apply to active in-memory engine if provided
  if (engine && typeof engine.applyOtaDataset === 'function') {
    engine.applyOtaDataset(otaData);
  }

  return {
    updated: true,
    newProblemsCount: otaData.problems.length,
    version: otaData.datasetVersion,
    otaData
  };
}

/**
 * Resets the OTA dataset cache in storage.
 */
export async function clearOtaDataset(storage) {
  if (!storage) return;
  try {
    await storage.remove(STORAGE_KEY_OTA_DATASET);
    await storage.remove(STORAGE_KEY_LAST_CHECK);
  } catch {}
}
