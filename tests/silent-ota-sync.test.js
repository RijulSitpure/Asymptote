import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  checkForDatasetUpdates,
  silentlySyncDataset,
  computeSha256,
  clearOtaDataset,
  STORAGE_KEY_OTA_DATASET,
  STORAGE_KEY_LAST_CHECK
} from '../shared/dataset-sync.js';
import {
  createAsymptoteEngine,
  createMemoryStorage
} from '../shared/asymptote-engine.js';

describe('Silent Over-The-Air (OTA) Dataset Synchronizer', () => {
  let mockStorage;
  let localManifest;

  beforeEach(() => {
    vi.restoreAllMocks();
    mockStorage = createMemoryStorage();
    localManifest = {
      version: '2.0.0',
      datasetVersion: '1.0.0',
      totalProblems: 105,
      checksums: {
        'algorithms.json': 'hash_local_algo',
        'database.json': 'hash_local_db'
      }
    };
  });

  // 1. Checksum Computation
  it('1. Computes valid SHA-256 hex string', async () => {
    const hash = await computeSha256('test-content');
    expect(hash).toBe('0a3666a0710c08aa6d0de92ce72beeb5b93124cce1bf3701c9d6cdeb543cb73e');
  });

  // 2. Detection of Remote Updates
  it('2. Detects when remote manifest has newer version or modified shard hashes', async () => {
    const remoteManifest = {
      version: '2.0.0',
      datasetVersion: '1.1.0',
      totalProblems: 120,
      checksums: {
        'algorithms.json': 'hash_remote_algo_new',
        'database.json': 'hash_local_db'
      }
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => remoteManifest
    });

    const check = await checkForDatasetUpdates({
      localManifest,
      remoteBaseUrl: 'https://raw.githubusercontent.com/test/data'
    });

    expect(check.hasUpdate).toBe(true);
    expect(check.changedShards).toContain('algorithms.json');
    expect(check.changedShards).not.toContain('database.json');
    expect(check.remoteVersion).toBe('1.1.0');
  });

  it('3. Reports no updates when local checksums match remote', async () => {
    const remoteManifest = {
      version: '2.0.0',
      datasetVersion: '1.0.0',
      totalProblems: 105,
      checksums: {
        'algorithms.json': 'hash_local_algo',
        'database.json': 'hash_local_db'
      }
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => remoteManifest
    });

    const check = await checkForDatasetUpdates({
      localManifest,
      remoteBaseUrl: 'https://raw.githubusercontent.com/test/data'
    });

    expect(check.hasUpdate).toBe(false);
    expect(check.changedShards.length).toBe(0);
  });

  // 3. Silent Synchronization & Hot-Reloading
  it('4. Silently downloads updated shard, verifies SHA-256, commits to storage, and hot-applies to engine', async () => {
    const newProblem = {
      number: 1001,
      title: 'Newly Released Algorithmic Problem',
      slug: 'newly-released-algorithmic-problem',
      difficulty: 'Medium',
      category: 'Algorithms',
      patterns: ['hash-map-lookup'],
      verified: 1,
      review: { status: 'tested' },
      hints: [
        { level: 1, text: 'Analyze the frequency table.' },
        { level: 2, text: 'Use a single-pass hash map.' },
        { level: 3, text: 'Store complements in map.' },
        { level: 4, text: '```python\nclass Solution:\n    pass\n```' }
      ]
    };

    const shardPayload = JSON.stringify({
      domain: 'algorithms',
      patterns: [],
      problems: [newProblem]
    });

    const shardHash = await computeSha256(shardPayload);

    const remoteManifest = {
      version: '2.0.0',
      datasetVersion: '1.1.0',
      totalProblems: 106,
      checksums: {
        'algorithms.json': shardHash
      }
    };

    // Mock fetch for manifest and shard
    globalThis.fetch = vi.fn().mockImplementation((url) => {
      if (url.endsWith('manifest.json')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => remoteManifest
        });
      }
      if (url.endsWith('algorithms.json')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          text: async () => shardPayload
        });
      }
      return Promise.reject(new Error('Unknown URL: ' + url));
    });

    const baseDataset = {
      manifest: localManifest,
      index: { bySlug: {}, byNumber: {} },
      catalog: [],
      shards: {
        algorithms: { domain: 'algorithms', patterns: [], problems: [] },
        database: { domain: 'database', patterns: [], problems: [] },
        pandas: { domain: 'pandas', patterns: [], problems: [] },
        shell: { domain: 'shell', patterns: [], problems: [] },
        concurrency: { domain: 'concurrency', patterns: [], problems: [] },
        javascript: { domain: 'javascript', patterns: [], problems: [] }
      }
    };

    const engine = createAsymptoteEngine({ dataset: baseDataset, storage: mockStorage });

    // Initial state: Problem does not exist
    const initialHint = await engine.getProblemHints('newly-released-algorithmic-problem');
    expect(initialHint.verified).toBe(0);

    // Run silent background sync
    const res = await silentlySyncDataset({
      storage: mockStorage,
      localManifest,
      remoteBaseUrl: 'https://raw.githubusercontent.com/test/data',
      force: true,
      engine
    });

    expect(res.updated).toBe(true);
    expect(res.newProblemsCount).toBe(1);
    expect(res.version).toBe('1.1.0');

    // Verify storage was populated
    const storedOta = await mockStorage.get(STORAGE_KEY_OTA_DATASET);
    expect(storedOta).toBeDefined();
    expect(storedOta.problems.length).toBe(1);
    expect(storedOta.problems[0].slug).toBe('newly-released-algorithmic-problem');

    // Hot-reload verification: Engine immediately resolves newly synced problem!
    const updatedHint = await engine.getProblemHints('newly-released-algorithmic-problem');
    expect(updatedHint.problem).toBeDefined();
    expect(updatedHint.problem.title).toBe('Newly Released Algorithmic Problem');
    expect(updatedHint.hints.length).toBe(4);
  });

  // 4. Integrity Check & Tamper Rejection
  it('5. Discards shard download if SHA-256 hash does not match expected checksum', async () => {
    const tamperedPayload = JSON.stringify({
      domain: 'algorithms',
      problems: [{ slug: 'tampered-problem' }]
    });

    const remoteManifest = {
      version: '2.0.0',
      datasetVersion: '1.2.0',
      checksums: {
        'algorithms.json': 'expected_legitimate_sha256_hash_here'
      }
    };

    globalThis.fetch = vi.fn().mockImplementation((url) => {
      if (url.endsWith('manifest.json')) {
        return Promise.resolve({ ok: true, json: async () => remoteManifest });
      }
      return Promise.resolve({ ok: true, text: async () => tamperedPayload });
    });

    const res = await silentlySyncDataset({
      storage: mockStorage,
      localManifest,
      force: true
    });

    // Integrity check failed: Nothing committed to storage
    expect(res.updated).toBe(false);
    const storedOta = await mockStorage.get(STORAGE_KEY_OTA_DATASET);
    expect(storedOta).toBeNull();
  });

  // 5. Offline Safety
  it('6. Fails completely silently without throwing on network failure or 404', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network unavailable'));

    const res = await silentlySyncDataset({
      storage: mockStorage,
      localManifest,
      force: true
    });

    expect(res.updated).toBe(false);
  });

  // 6. Cooldown Skipping
  it('7. Skips network check when checked recently within cooldown period', async () => {
    await mockStorage.set(STORAGE_KEY_LAST_CHECK, Date.now() - 1000); // 1 second ago

    const fetchSpy = vi.fn();
    globalThis.fetch = fetchSpy;

    const res = await silentlySyncDataset({
      storage: mockStorage,
      localManifest,
      force: false
    });

    expect(res.updated).toBe(false);
    expect(res.reason).toBe('cooldown_active');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  // 7. Clear OTA
  it('8. Clears OTA dataset when clearOtaDataset is called', async () => {
    await mockStorage.set(STORAGE_KEY_OTA_DATASET, { version: '1.1.0' });
    await clearOtaDataset(mockStorage);
    const result = await mockStorage.get(STORAGE_KEY_OTA_DATASET);
    expect(result).toBeNull();
  });
});
