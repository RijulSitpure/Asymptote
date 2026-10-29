import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { batch16Db1 } from './batch16-db-1.js';
import { batch16Db2 } from './batch16-db-2.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const problemsDir = path.resolve(__dirname, '../problems');
const testsDir = path.resolve(__dirname, '../tests');

console.log('--- Generating Batch 16: SQL 50 Mastery Sprint & 100% LeetCode #1-1000 (30 Problems) ---\n');

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

  if (prob.schemaSql) fs.writeFileSync(path.join(testProbDir, 'schema.sql'), prob.schemaSql + '\n', 'utf8');
  if (prob.referenceSql) fs.writeFileSync(path.join(testProbDir, 'reference.sql'), prob.referenceSql + '\n', 'utf8');
  if (prob.generatorPy) fs.writeFileSync(path.join(testProbDir, 'generator.py'), prob.generatorPy, 'utf8');

  console.log(`Generated: #${prob.number} ${prob.slug} [${prob.category}]`);
}

console.log('[1/2] Generating first 15 Database problems (#603 - #1070)...');
for (const p of batch16Db1) {
  writeProblem(p);
}

console.log('\n[2/2] Generating remaining 15 Database problems (#1075 - #1179)...');
for (const p of batch16Db2) {
  writeProblem(p);
}

console.log('\n✓ Successfully generated all 30 problems for Batch 16!');
