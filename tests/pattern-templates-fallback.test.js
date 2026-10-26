import { describe, it, expect, beforeAll } from 'vitest';
import path from 'node:path';
import fs from 'node:fs';
import {
  createAsymptoteEngine,
  loadDatasetFromFs,
  createMemoryStorage
} from '../shared/asymptote-engine.js';
import '../shared/languages.js';

const {
  getSupportedLanguagesForPattern,
  getPatternCode
} = globalThis.LanguagesModule;

describe('Pattern Atlas Boilerplate Templates & Uncurated Catalog Fallback UX', () => {
  let dataset;
  let engine;
  let storage;
  const allPatterns = [];

  beforeAll(async () => {
    const dataDir = path.resolve(process.cwd(), 'extension', 'data');
    dataset = await loadDatasetFromFs(dataDir);
    storage = createMemoryStorage();
    engine = createAsymptoteEngine({ dataset, storage });

    const patternFiles = [
      'algorithms.json',
      'database.json',
      'pandas.json',
      'javascript.json',
      'concurrency.json',
      'shell.json'
    ];
    for (const f of patternFiles) {
      const pPath = path.resolve(process.cwd(), 'dataset', 'patterns', f);
      const list = JSON.parse(fs.readFileSync(pPath, 'utf8'));
      allPatterns.push(...list);
    }
  });

  it('1. Confirms all 99 patterns have complete metadata and starter templates in their primary languages', () => {
    expect(allPatterns.length).toBe(99);

    for (const pattern of allPatterns) {
      expect(pattern.id).toBeTruthy();
      expect(pattern.title).toBeTruthy();
      expect(pattern.domain || pattern.category).toBeTruthy();
      expect(pattern.short_description).toBeTruthy();
      expect(pattern.complexity).toBeDefined();

      const supportedLangs = getSupportedLanguagesForPattern(pattern);
      expect(supportedLangs.length).toBeGreaterThan(0);

      // Verify each supported language yields a genuine starter template
      for (const lang of supportedLangs) {
        const code = getPatternCode(pattern, lang.id);
        expect(code).toBeTruthy();
        expect(code.length).toBeGreaterThan(15);
        expect(code).not.toContain('No verified blueprint');
      }
    }
  });

  it('2. Confirms domain-adaptive language mapping across all 6 domains', () => {
    const algoPat = allPatterns.find(p => p.id === 'two-pointers-opposite');
    const dbPat = allPatterns.find(p => p.id === 'join-filter');
    const pandasPat = allPatterns.find(p => p.id === 'filter-select');
    const jsPat = allPatterns.find(p => p.id === 'promises-async');
    const concPat = allPatterns.find(p => p.id === 'ordering-signals');
    const shellPat = allPatterns.find(p => p.id === 'text-filter');

    expect(algoPat).toBeDefined();
    expect(dbPat).toBeDefined();
    expect(pandasPat).toBeDefined();
    expect(jsPat).toBeDefined();
    expect(concPat).toBeDefined();
    expect(shellPat).toBeDefined();

    const algoLangs = getSupportedLanguagesForPattern(algoPat).map(l => l.id);
    expect(algoLangs).toContain('python3');
    expect(algoLangs).toContain('cpp');
    expect(algoLangs).toContain('java');
    expect(algoLangs).toContain('javascript');

    const dbLangs = getSupportedLanguagesForPattern(dbPat).map(l => l.id);
    expect(dbLangs).toContain('mysql');
    expect(dbLangs).toContain('pythondata');

    const pdLangs = getSupportedLanguagesForPattern(pandasPat).map(l => l.id);
    expect(pdLangs).toContain('pythondata');
    expect(pdLangs).toContain('python3');

    const jsLangs = getSupportedLanguagesForPattern(jsPat).map(l => l.id);
    expect(jsLangs).toContain('javascript');
    expect(jsLangs).toContain('typescript');

    const concLangs = getSupportedLanguagesForPattern(concPat).map(l => l.id);
    expect(concLangs).toContain('cpp');
    expect(concLangs).toContain('java');
    expect(concLangs).toContain('python3');

    const shellLangs = getSupportedLanguagesForPattern(shellPat).map(l => l.id);
    expect(shellLangs).toContain('bash');
  });

  it('3. Confirms uncurated catalog problem returns suggested pattern blueprint, recognition signals, and templates', async () => {
    // #31 Next Permutation is in catalog (4,086 problems) but not in curated set
    const result = await engine.getProblemHints('31');
    expect(result).toBeDefined();
    expect(result.problem).toBeDefined();
    expect(result.problem.verified).toBe(0);
    expect(result.verification_tier).toBe('unverified');

    // Must return the catalog-mapped suggested pattern
    expect(result.suggested_pattern).toBeDefined();
    expect(result.suggested_pattern.id).toBe('two-pointers-opposite');
    expect(result.suggested_pattern.title).toBeTruthy();
    expect(result.suggested_pattern.mental_triggers.length).toBeGreaterThan(0);
    expect(result.suggested_pattern.constraint_signals.length).toBeGreaterThan(0);

    // Starter template in Python 3, C++, Java, and JavaScript must be non-empty
    const pyCode = getPatternCode(result.suggested_pattern, 'python3');
    expect(pyCode).toBeTruthy();
    expect(pyCode).not.toContain('No verified blueprint');

    const cppCode = getPatternCode(result.suggested_pattern, 'cpp');
    expect(cppCode).toBeTruthy();
    expect(cppCode).not.toContain('No verified blueprint');

    const javaCode = getPatternCode(result.suggested_pattern, 'java');
    expect(javaCode).toBeTruthy();
    expect(javaCode).not.toContain('No verified blueprint');

    const jsCode = getPatternCode(result.suggested_pattern, 'javascript');
    expect(jsCode).toBeTruthy();
    expect(jsCode).not.toContain('No verified blueprint');
  });

  it('4. Confirms curated problems retain full 4-level hints and multi-language solutions', async () => {
    const result = await engine.getProblemHints('two-sum');
    expect(result.problem.verified).toBe(1);
    expect(result.pattern).toBeDefined();
    expect(result.hints.length).toBe(4);
    expect(result.complexity).toBeDefined();
    expect(result.complexity.whyNaiveFails).toBeTruthy();
    expect(result.complexity.spaceTimeTradeoff).toBeTruthy();
    expect(result.complexity.interviewerExpectation).toBeTruthy();
  });
});
