import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {
  createAsymptoteEngine,
  loadDatasetFromFs,
  createMemoryStorage,
  formatHintsForDisplay,
  getProblemSolutionCode
} from '../shared/asymptote-engine.js';
import '../shared/languages.js';

describe('Chrome Extension Wiring & Offline Contract', () => {
  let dataset;
  let engine;

  beforeAll(async () => {
    const dataDir = path.resolve(process.cwd(), 'extension', 'data');
    dataset = await loadDatasetFromFs(dataDir);
    const storage = createMemoryStorage();
    engine = createAsymptoteEngine({ dataset, storage });
  });

  // 1. Manifest Contract
  it('1. Verifies extension/manifest.json conforms to serverless requirements', () => {
    const manifestPath = path.resolve(process.cwd(), 'extension', 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    // Manifest V3 module background
    expect(manifest.manifest_version).toBe(3);
    expect(manifest.background.service_worker).toBe('background.js');
    expect(manifest.background.type).toBe('module');

    // No localhost in host_permissions
    const hostPerms = manifest.host_permissions || [];
    for (const perm of hostPerms) {
      expect(perm).not.toContain('localhost');
      expect(perm).not.toContain('127.0.0.1');
    }

    // Web accessible resources includes data/*.json
    const webRes = manifest.web_accessible_resources || [];
    const hasDataJson = webRes.some(entry => 
      Array.isArray(entry.resources) && entry.resources.some(r => r.includes('data/*.json') || r.includes('data/'))
    );
    expect(hasDataJson).toBe(true);
  });

  // 2. Zero-Localhost Scan across all extension/ files
  it('2. Asserts zero occurrences of localhost or 127.0.0.1 across extension/ source files', () => {
    const extensionDir = path.resolve(process.cwd(), 'extension');

    function scanFiles(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      const files = [];
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name !== 'node_modules' && entry.name !== '.git') {
            files.push(...scanFiles(fullPath));
          }
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name);
          if (['.js', '.html', '.json', '.css'].includes(ext)) {
            files.push(fullPath);
          }
        }
      }
      return files;
    }

    const filesToScan = scanFiles(extensionDir);
    expect(filesToScan.length).toBeGreaterThan(0);

    const violations = [];
    for (const file of filesToScan) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('localhost') || content.includes('127.0.0.1')) {
        violations.push(path.relative(process.cwd(), file));
      }
    }

    expect(violations).toEqual([]);
  });

  // 3. Locked Hint Title Spoiler Guard
  it('3. Enforces that locked hints never leak real titles in the UI', () => {
    const rawHints = [
      { level: 1, title: 'Check complementary pairs', content: 'Use complement map' },
      { level: 2, title: 'Store indices in hash table', content: 'Map key = num, val = idx' },
      { level: 3, title: 'One-pass hash invariant', content: 'Check then insert' },
      { level: 4, title: 'Python solution implementation', content: 'return [seen[comp], i]' }
    ];

    // Level 0: all hints locked -> all must use generic titles
    const lockedAll = formatHintsForDisplay(rawHints, 0);
    expect(lockedAll.length).toBe(4);
    for (const h of lockedAll) {
      expect(h.locked).toBe(true);
      expect(h.content).toBeNull();
      expect(h.text).toBeNull();
      expect(h.title).toBe(h.genericTitle);
      expect(h.title).not.toBe(h.realTitle);
    }
    expect(lockedAll[0].title).toBe('Recognize the obstacle');
    expect(lockedAll[1].title).toBe('Identify the core insight');
    expect(lockedAll[2].title).toBe('Outline the procedure');
    expect(lockedAll[3].title).toBe('See the blueprint');

    // Level 1: hint 1 unlocked -> hint 1 gets realTitle, hints 2-4 keep genericTitle
    const step1 = formatHintsForDisplay(rawHints, 1);
    expect(step1[0].locked).toBe(false);
    expect(step1[0].title).toBe('Check complementary pairs');
    expect(step1[0].content).toBe('Use complement map');

    expect(step1[1].locked).toBe(true);
    expect(step1[1].title).toBe('Identify the core insight');
    expect(step1[1].content).toBeNull();

    expect(step1[2].locked).toBe(true);
    expect(step1[2].title).toBe('Outline the procedure');
    expect(step1[2].content).toBeNull();

    expect(step1[3].locked).toBe(true);
    expect(step1[3].title).toBe('See the blueprint');
    expect(step1[3].content).toBeNull();

    // Level 4: all unlocked -> all get realTitle and non-null content
    const step4 = formatHintsForDisplay(rawHints, 4);
    for (const h of step4) {
      expect(h.locked).toBe(false);
      expect(h.title).toBe(h.realTitle);
      expect(h.content).not.toBeNull();
    }
  });

  // 4. Multi-language Solution Code Resolution across all 27 Curated Problems
  it('4. Resolves solution code and supported languages for every curated problem across domains', async () => {
    const problems = await engine.getProblems();
    const curated = problems.filter(p => p.verified === 1);
    expect(curated.length).toBe(Object.keys(dataset.index.bySlug).length);

    for (const prob of curated) {
      const hintData = await engine.getProblemHints(prob.slug);
      expect(hintData.problem).not.toBeNull();
      expect(hintData.verified).toBe(1);

      // Verify supported_languages
      const langs = hintData.supported_languages;
      expect(Array.isArray(langs)).toBe(true);
      expect(langs.length).toBeGreaterThan(0);

      // Verify that every solution has retrievable code
      for (const lang of langs) {
        const code = getProblemSolutionCode(hintData.problem, lang.id);
        expect(typeof code).toBe('string');
        expect(code.trim().length).toBeGreaterThan(0);
        expect(code).not.toContain('No verified solution in');
      }
    }
  });

  // 5. Kind-Aware Complexity Models
  it('5. Returns domain-correct complexity representations for big-o, query-notes, and none', async () => {
    // Algorithms problem (Big-O)
    const twoSum = await engine.getProblemHints('two-sum');
    expect(twoSum.complexity).not.toBeNull();
    expect(twoSum.complexity.kind).toBe('big-o');
    expect(twoSum.complexity.time).toBe('O(N)');
    expect(twoSum.complexity.space).toBe('O(N)');

    // Database problem (query-notes)
    const sqlProb = await engine.getProblemHints('combine-two-tables');
    expect(sqlProb.complexity).not.toBeNull();
    expect(sqlProb.complexity.kind).toBe('query-notes');
    expect(sqlProb.complexity.time).toBe('O(P + A)');
    expect(sqlProb.complexity.space).toBe('O(P)');
    expect(Array.isArray(sqlProb.complexity.variables)).toBe(true);
    expect(sqlProb.complexity.variables).toContain('P: rows in Person');
    expect(sqlProb.complexity.notes).toContain('Single pass outer hash or index join');

    // Concurrency problem (none)
    const concProb = await engine.getProblemHints('print-foobar-alternately');
    expect(concProb.complexity).not.toBeNull();
    expect(concProb.complexity.kind).toBe('none');
    expect(concProb.complexity.time).toBe('n/a');
    expect(concProb.complexity.space).toBe('n/a');
    expect(concProb.complexity.notes).toContain('Ping-pong synchronization');
  });

  // 6. Classic Script Compatibility (No export/import in content scripts or popup scripts)
  it('6. Asserts zero ES module exports/imports in Manifest V3 classic content scripts and popup scripts', () => {
    const manifestPath = path.resolve(process.cwd(), 'extension', 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    const contentScripts = (manifest.content_scripts || []).flatMap(cs => cs.js || []);
    expect(contentScripts.length).toBeGreaterThan(0);

    const popupHtmlPath = path.resolve(process.cwd(), 'extension', 'popup.html');
    const popupHtml = fs.readFileSync(popupHtmlPath, 'utf8');
    const popupScriptMatches = [...popupHtml.matchAll(/<script\s+src="([^"]+)"><\/script>/g)].map(m => m[1]);
    expect(popupScriptMatches.length).toBeGreaterThan(0);

    const classicScripts = Array.from(new Set([...contentScripts, ...popupScriptMatches]));

    for (const scriptName of classicScripts) {
      const scriptPath = path.resolve(process.cwd(), 'extension', scriptName);
      expect(fs.existsSync(scriptPath)).toBe(true);

      const content = fs.readFileSync(scriptPath, 'utf8');
      const forbiddenExportMatch = content.match(/^\s*(export|import)\b/m);
      expect(
        forbiddenExportMatch,
        `Forbidden ES module statement '${forbiddenExportMatch?.[0]}' found in classic script ${scriptName}. Chrome Manifest V3 classic scripts will fail with Uncaught SyntaxError!`
      ).toBeNull();
    }
  });

  // 7. Sequential Execution and Scope Isolation
  it('7. Verifies that all content scripts execute in shared page context without identifier collisions', async () => {
    const vm = await import('node:vm');
    const manifestPath = path.resolve(process.cwd(), 'extension', 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const contentScripts = manifest.content_scripts[0].js;

    const mockEl = () => ({
      setAttribute: () => {},
      appendChild: () => {},
      style: {},
      addEventListener: () => {},
      attachShadow: () => mockEl(),
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => []
    });

    const context = {
      console,
      setTimeout: () => {},
      clearTimeout: () => {},
      setInterval: () => {},
      clearInterval: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      MutationObserver: class { observe() {} disconnect() {} },
      location: { href: 'https://leetcode.com/problems/two-sum/', pathname: '/problems/two-sum/' },
      document: {
        readyState: 'complete',
        head: { appendChild: () => {} },
        body: { appendChild: () => {} },
        getElementById: () => null,
        createElement: () => mockEl(),
        querySelector: () => null,
        querySelectorAll: () => [],
        addEventListener: () => {}
      },
      chrome: {
        runtime: {
          getURL: (p) => 'chrome-extension://dummy-id/' + p,
          sendMessage: (_msg, cb) => cb && cb({ success: true }),
          onMessage: { addListener: () => {} }
        },
        storage: {
          local: {
            get: (_k, cb) => cb && cb({}),
            set: (_d, cb) => cb && cb()
          }
        }
      }
    };
    context.window = context;
    context.globalThis = context;
    context.self = context;

    vm.createContext(context);

    for (const scriptName of contentScripts) {
      const scriptPath = path.resolve(process.cwd(), 'extension', scriptName);
      const code = fs.readFileSync(scriptPath, 'utf8');
      expect(() => {
        vm.runInContext(code, context);
      }).not.toThrow();
    }

    expect(typeof context.LanguagesModule).toBe('object');
    expect(typeof context.NanoAIModule).toBe('object');
    expect(typeof context.NanoChatService).toBe('object');
    expect(typeof context.CurriculumRoadmapModule).toBe('object');
  });
});
