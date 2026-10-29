import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { batch15Algo1 } from './batch15-algo-1.js';
import { batch15Algo2 } from './batch15-algo-2.js';
import { batch15Db } from './batch15-db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const problemsDir = path.resolve(__dirname, '../problems');
const testsDir = path.resolve(__dirname, '../tests');

console.log('--- Generating Batch 15: The LeetCode 1-1000 Grand Slam (30 Problems) ---\n');

function writeProblem(prob) {
  const problemJson = {
    slug: prob.slug,
    number: prob.number,
    category: prob.category,
    patterns: prob.patterns,
    review: {
      status: 'tested',
      acceptedOnLeetCode: null,
      reviewer: null
    },
    updated: '2026-10-30T00:00:00.000Z',
    hints: prob.hints,
    complexity: prob.complexity,
    solutions: prob.solutions
  };

  const probPath = path.join(problemsDir, `${prob.slug}.json`);
  fs.writeFileSync(probPath, JSON.stringify(problemJson, null, 2) + '\n', 'utf8');

  const testProbDir = path.join(testsDir, prob.slug);
  if (!fs.existsSync(testProbDir)) {
    fs.mkdirSync(testProbDir, { recursive: true });
  }

  const metaJson = {
    slug: prob.slug,
    number: prob.number,
    category: prob.category
  };
  fs.writeFileSync(path.join(testProbDir, 'meta.json'), JSON.stringify(metaJson, null, 2) + '\n', 'utf8');

  if (prob.category === 'Database') {
    if (prob.schemaSql) fs.writeFileSync(path.join(testProbDir, 'schema.sql'), prob.schemaSql + '\n', 'utf8');
    if (prob.referenceSql) fs.writeFileSync(path.join(testProbDir, 'reference.sql'), prob.referenceSql + '\n', 'utf8');
    if (prob.generatorPy) fs.writeFileSync(path.join(testProbDir, 'generator.py'), prob.generatorPy, 'utf8');
  } else {
    if (prob.testPy) {
      fs.writeFileSync(path.join(testProbDir, 'test.py'), prob.testPy, 'utf8');
    }
  }

  console.log(`Generated: #${prob.number} ${prob.slug} [${prob.category}]`);
}

console.log('[1/3] Generating first 12 Algorithms problems (#559 - #800)...');
for (const p of batch15Algo1) {
  writeProblem(p);
}

console.log('\n[2/3] Generating remaining 12 Algorithms problems (#843 - #981)...');
for (const p of batch15Algo2) {
  writeProblem(p);
}

console.log('\n[3/3] Generating 6 Database problems (#569 - #602)...');
for (const p of batch15Db) {
  writeProblem(p);
}

console.log('\n✓ Successfully generated all 30 problems for Batch 15!');
