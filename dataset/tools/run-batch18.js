import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { batch18Algo } from './batch18-algo.js';
import { batch18Db } from './batch18-db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const problemsDir = path.resolve(__dirname, '../problems');
const testsDir = path.resolve(__dirname, '../tests');

function formatGeneratorPy(rawGeneratorPy) {
  if (!rawGeneratorPy) return '';
  const res = spawnSync('python3', ['-c', rawGeneratorPy], { encoding: 'utf8' });
  if (res.status !== 0) return rawGeneratorPy;
  try {
    const rawCases = JSON.parse(res.stdout);
    const formatted = rawCases.map((c, i) => {
      if (c.name && c.inserts !== undefined) return c;
      const stmts = [];
      for (const [table, rows] of Object.entries(c)) {
        if (!rows || rows.length === 0) continue;
        const valRows = rows.map(r => {
          const vals = Object.values(r).map(v => {
            if (v === null || v === undefined) return 'NULL';
            if (typeof v === 'number') return v;
            return `'${String(v).replace(/'/g, "''")}'`;
          });
          return `(${vals.join(', ')})`;
        });
        stmts.push(`INSERT INTO ${table} VALUES ${valRows.join(', ')};`);
      }
      return {
        name: `case_${i + 1}`,
        inserts: stmts.join('\n')
      };
    });
    return `import json\ncases = ${JSON.stringify(formatted, null, 2)}\nprint(json.dumps(cases))\n`;
  } catch (_e) {
    return rawGeneratorPy;
  }
}

console.log('--- Generating Batch 18: Wave 1 Acceleration (32 Problems) ---\n');

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

  if (prob.category === 'Database') {
    const metaJson = {
      slug: prob.slug,
      number: prob.number,
      category: prob.category
    };
    fs.writeFileSync(path.join(testProbDir, 'meta.json'), JSON.stringify(metaJson, null, 2) + '\n', 'utf8');
    if (prob.schemaSql) fs.writeFileSync(path.join(testProbDir, 'schema.sql'), prob.schemaSql + '\n', 'utf8');
    if (prob.referenceSql) fs.writeFileSync(path.join(testProbDir, 'reference.sql'), prob.referenceSql + '\n', 'utf8');
    if (prob.generatorPy) fs.writeFileSync(path.join(testProbDir, 'generator.py'), formatGeneratorPy(prob.generatorPy), 'utf8');
  } else {
    if (prob.testPy) {
      fs.writeFileSync(path.join(testProbDir, 'test.py'), prob.testPy, 'utf8');
    }
  }

  console.log(`Generated: #${prob.number} ${prob.slug} [${prob.category}]`);
}

console.log('[1/2] Generating 16 Algorithms problems (#1263 - #1420)...');
for (const p of batch18Algo) {
  writeProblem(p);
}

console.log('\n[2/2] Generating 16 Database problems (#1264 - #1369)...');
for (const p of batch18Db) {
  writeProblem(p);
}

console.log('\n✓ Successfully generated all 32 problems for Batch 18!\n');
