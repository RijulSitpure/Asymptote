import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import {
  fetchPatterns,
  fetchProblems,
  fetchStats,
  fetchProblemHints,
  updateProblem,
  diagnoseWizard,
  syncBatch,
  recordSubmission,
  subscribeToStorageChanges,
  setClientEngine
} from '../client/src/lib/engineClient.js';
import {
  createAsymptoteEngine,
  loadDatasetFromFs,
  createMemoryStorage
} from '../shared/asymptote-engine.js';

describe('React Dashboard Serverless Wiring & Bundle Verification', () => {
  // 1. Zero-Localhost and Zero-/api Scan
  it('1. Asserts zero fetch(/api or localhost:3001 calls across client/src/', () => {
    const clientSrcDir = path.resolve(process.cwd(), 'client', 'src');

    function scanFiles(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      const files = [];
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          files.push(...scanFiles(fullPath));
        } else if (entry.isFile() && /\.(jsx?|tsx?)$/.test(entry.name)) {
          files.push(fullPath);
        }
      }
      return files;
    }

    const files = scanFiles(clientSrcDir);
    expect(files.length).toBeGreaterThan(0);

    const apiViolations = [];
    const localhostViolations = [];

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('/api/')) {
        apiViolations.push(path.relative(process.cwd(), file));
      }
      if (content.includes('localhost:3001')) {
        localhostViolations.push(path.relative(process.cwd(), file));
      }
    }

    expect(apiViolations).toEqual([]);
    expect(localhostViolations).toEqual([]);
  });

  // 2. Build Bundle Artifacts & Relative Paths
  it('2. Verifies build output in extension/dashboard/ has relative ./assets paths', () => {
    const dashboardHtmlPath = path.resolve(process.cwd(), 'extension', 'dashboard', 'index.html');
    if (!fs.existsSync(dashboardHtmlPath)) {
      execSync('npm run build', { stdio: 'pipe' });
    }
    expect(fs.existsSync(dashboardHtmlPath)).toBe(true);

    const html = fs.readFileSync(dashboardHtmlPath, 'utf8');
    // Must use relative base "./" for chrome extension dashboard
    expect(html).toContain('src="./assets/');
    expect(html).toContain('href="./assets/');
    expect(html).toContain('href="./favicon.ico"');
    expect(html).toContain('href="./asymptote-icon-small.svg"');
    expect(html).not.toContain('src="/assets/');
    expect(html).not.toContain('href="/assets/');
    expect(html).not.toContain('href="/favicon.ico"');

    // Public media files copied to extension/dashboard/
    expect(fs.existsSync(path.resolve(process.cwd(), 'extension', 'dashboard', 'sync-demo.gif'))).toBe(true);
    expect(fs.existsSync(path.resolve(process.cwd(), 'extension', 'dashboard', 'sync-demo-poster.png'))).toBe(true);
    expect(fs.existsSync(path.resolve(process.cwd(), 'extension', 'dashboard', 'asymptote-icon-small.svg'))).toBe(true);

    // Extension data manifest
    const extManifestPath = path.resolve(process.cwd(), 'extension', 'data', 'manifest.json');
    expect(fs.existsSync(extManifestPath)).toBe(true);
    const manifest = JSON.parse(fs.readFileSync(extManifestPath, 'utf8'));
    expect(manifest.version).toBe('2.0.0');
    expect(manifest.checksums).toBeDefined();

    // Client dist dataset
    const distManifestPath = path.resolve(process.cwd(), 'client', 'dist', 'data', 'manifest.json');
    expect(fs.existsSync(distManifestPath)).toBe(true);
  });

  // 3. Engine Client Exported API Surface & Diagnostics
  it('3. Verifies engineClient convenience async wrappers and wizard diagnosis', async () => {
    expect(typeof fetchPatterns).toBe('function');
    expect(typeof fetchProblems).toBe('function');
    expect(typeof fetchStats).toBe('function');
    expect(typeof fetchProblemHints).toBe('function');
    expect(typeof updateProblem).toBe('function');
    expect(typeof diagnoseWizard).toBe('function');
    expect(typeof syncBatch).toBe('function');
    expect(typeof recordSubmission).toBe('function');
    expect(typeof subscribeToStorageChanges).toBe('function');

    // Initialize in-memory test engine for engineClient
    const dataDir = path.resolve(process.cwd(), 'extension', 'data');
    const dataset = await loadDatasetFromFs(dataDir);
    const storage = createMemoryStorage();
    const testEngine = createAsymptoteEngine({ dataset, storage });
    setClientEngine(testEngine);

    // Test wizard diagnosis
    const diagnosis = await diagnoseWizard({
      structure: 'tree',
      goal: 'all_roots'
    });
    expect(Array.isArray(diagnosis)).toBe(true);
    expect(diagnosis.length).toBeGreaterThan(0);
    expect(diagnosis[0].pattern_id).toBe('graph-tree-rerooting');

    // Test problem hints resolution through engineClient
    const hints = await fetchProblemHints('sum-of-distances-in-tree');
    expect(hints.problem).toBeDefined();
    expect(hints.problem.number).toBe(834);
    expect(hints.verified).toBe(1);
    expect(hints.hints.length).toBe(4);
  });

  // 4. Locked Hint Title Spoiler Guard
  it('4. Asserts that locked hint titles never reveal the true algorithmic pattern or invariant', async () => {
    const dataDir = path.resolve(process.cwd(), 'extension', 'data');
    const dataset = await loadDatasetFromFs(dataDir);
    const storage = createMemoryStorage();
    const testEngine = createAsymptoteEngine({ dataset, storage });
    setClientEngine(testEngine);

    const problemData = await fetchProblemHints('daily-temperatures');
    expect(problemData.hints.length).toBe(4);

    // Each hint has genericTitle and realTitle
    for (const h of problemData.hints) {
      expect(h.genericTitle).toBeDefined();
      expect(h.realTitle).toBeDefined();
      expect(h.genericTitle).not.toBe(h.realTitle);
    }

    // Generic hint titles rubric
    expect(problemData.hints[0].genericTitle).toBe('Recognize the obstacle');
    expect(problemData.hints[1].genericTitle).toBe('Identify the core insight');
    expect(problemData.hints[2].genericTitle).toBe('Outline the procedure');
    expect(problemData.hints[3].genericTitle).toBe('See the blueprint');

    // Real titles contain pattern clues that must be hidden while locked
    expect(problemData.hints[0].realTitle).toBe('Forward Scanning Obstacle');
    expect(problemData.hints[1].realTitle).toBe('Monotonic Stack of Unresolved Days');
  });
});
