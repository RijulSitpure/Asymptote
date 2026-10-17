import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PATTERNS } from '../server/src/db/patternsSeed.js';
import { PROBLEMS } from '../server/src/db/problemsSeed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

describe('Dataset Agreement with Seed Files', () => {
  it('dataset/patterns/algorithms.json agrees with server/src/db/patternsSeed.js', () => {
    const algorithmsPath = path.join(rootDir, 'dataset', 'patterns', 'algorithms.json');
    expect(fs.existsSync(algorithmsPath)).toBe(true);

    const datasetPatterns = JSON.parse(fs.readFileSync(algorithmsPath, 'utf8'));
    expect(datasetPatterns).toHaveLength(PATTERNS.length);
    expect(datasetPatterns).toHaveLength(37);

    for (let i = 0; i < PATTERNS.length; i++) {
      const seedP = PATTERNS[i];
      const datasetP = datasetPatterns[i];

      expect(datasetP.id).toBe(seedP.id);
      expect(datasetP.category).toBe(seedP.category);
      expect(datasetP.title).toBe(seedP.title);
      expect(datasetP.short_description).toBe(seedP.short_description);
      expect(datasetP.complexity).toBe(seedP.complexity);
      expect(datasetP.mental_triggers).toEqual(seedP.mental_triggers);
      expect(datasetP.constraint_signals).toEqual(seedP.constraint_signals);
    }
  });

  it('dataset/problems/<slug>.json agrees with the 7 curated seed problems', () => {
    expect(PROBLEMS).toHaveLength(7);

    for (const seedProb of PROBLEMS) {
      const problemPath = path.join(rootDir, 'dataset', 'problems', `${seedProb.title_slug}.json`);
      expect(fs.existsSync(problemPath)).toBe(true);

      const datasetProb = JSON.parse(fs.readFileSync(problemPath, 'utf8'));
      expect(datasetProb.slug).toBe(seedProb.title_slug);
      expect(datasetProb.number).toBe(parseInt(seedProb.frontend_id, 10));
      expect(datasetProb.category).toBe('Algorithms');
      expect(datasetProb.patterns).toContain(seedProb.pattern_id);
      expect(datasetProb.hints).toHaveLength(4);

      // Verify hint levels
      for (let lvl = 1; lvl <= 4; lvl++) {
        const h = datasetProb.hints.find(item => item.level === lvl);
        expect(h).toBeDefined();
        expect(h.title).toBeTruthy();
        expect(h.text).toBeTruthy();
      }

      // Verify solutions
      expect(datasetProb.solutions.length).toBeGreaterThanOrEqual(1);
      const pySol = datasetProb.solutions.find(s => s.lang === 'python3');
      expect(pySol).toBeDefined();
      expect(pySol.code).toBe(seedProb.solution_python.trim());
    }
  });
});
