#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const datasetDir = path.resolve(rootDir, 'dataset');
const outDir = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : path.resolve(rootDir, 'extension', 'data');

function sha256(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

function build() {
  console.log(`=== Compiling Dataset to ${outDir} ===\n`);

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. Load patterns
  const patternsDir = path.join(datasetDir, 'patterns');
  const patternFiles = fs.readdirSync(patternsDir).filter(f => f.endsWith('.json'));

  const domainPatterns = {
    algorithms: [],
    database: [],
    pandas: [],
    shell: [],
    concurrency: [],
    javascript: []
  };

  for (const f of patternFiles) {
    const key = path.basename(f, '.json').toLowerCase();
    const data = JSON.parse(fs.readFileSync(path.join(patternsDir, f), 'utf8'));
    if (domainPatterns[key]) {
      domainPatterns[key] = data;
    }
  }

  // 2. Load problems
  const problemsDir = path.join(datasetDir, 'problems');
  const problemFiles = fs.existsSync(problemsDir) ? fs.readdirSync(problemsDir).filter(f => f.endsWith('.json')).sort() : [];

  const domainProblems = {
    algorithms: [],
    database: [],
    pandas: [],
    shell: [],
    concurrency: [],
    javascript: []
  };

  const slugIndex = {};
  const bySlug = {};
  const byNumber = {};

  for (const f of problemFiles) {
    const prob = JSON.parse(fs.readFileSync(path.join(problemsDir, f), 'utf8'));
    const catKey = prob.category.toLowerCase();
    const targetKey = catKey === 'algorithms' ? 'algorithms'
      : catKey === 'database' ? 'database'
      : catKey === 'pandas' ? 'pandas'
      : catKey === 'shell' ? 'shell'
      : catKey === 'concurrency' ? 'concurrency'
      : catKey === 'javascript' ? 'javascript'
      : 'algorithms';

    domainProblems[targetKey].push(prob);
    const entry = {
      slug: prob.slug,
      number: prob.number,
      category: prob.category,
      patterns: prob.patterns,
      shard: `${targetKey}.json`
    };
    slugIndex[prob.slug] = entry;
    bySlug[prob.slug] = entry;
    byNumber[String(prob.number)] = prob.slug;
  }

  const checksums = {};
  const categories = Object.keys(domainPatterns);

  // Write category shards
  for (const cat of categories) {
    const shardData = {
      domain: cat,
      patterns: domainPatterns[cat] || [],
      problems: domainProblems[cat] || []
    };
    const minified = JSON.stringify(shardData);
    const fileName = `${cat}.json`;
    const targetFile = path.join(outDir, fileName);
    fs.writeFileSync(targetFile, minified);
    checksums[fileName] = sha256(minified);
    console.log(`✓ Sharded ${fileName}: ${shardData.patterns.length} patterns, ${shardData.problems.length} problems`);
  }

  // Write index with bySlug and byNumber mappings
  const indexObject = {
    bySlug,
    byNumber,
    ...slugIndex
  };
  const indexMinified = JSON.stringify(indexObject);
  fs.writeFileSync(path.join(outDir, 'index.json'), indexMinified);
  checksums['index.json'] = sha256(indexMinified);
  console.log(`✓ Generated index.json: ${Object.keys(slugIndex).length} problems indexed by slug and number`);

  // Write full LeetCode catalog if available
  const catalogSource = path.join(datasetDir, 'catalog', 'leetcode-catalog.json');
  let totalCatalogProblems = 0;
  if (fs.existsSync(catalogSource)) {
    const catalogData = JSON.parse(fs.readFileSync(catalogSource, 'utf8'));
    totalCatalogProblems = catalogData.length;
    const catalogMinified = JSON.stringify(catalogData);
    fs.writeFileSync(path.join(outDir, 'catalog.json'), catalogMinified);
    checksums['catalog.json'] = sha256(catalogMinified);
    console.log(`✓ Generated catalog.json: ${totalCatalogProblems} full catalog problems`);
  }

  // Read package.json for version
  const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));

  // Write manifest
  const manifestData = {
    version: pkg.version || '2.0.0',
    datasetVersion: '1.0.0',
    totalPatterns: Object.values(domainPatterns).reduce((acc, p) => acc + p.length, 0),
    totalProblems: Object.values(domainProblems).reduce((acc, p) => acc + p.length, 0),
    totalCatalogProblems,
    checksums
  };
  const manifestMinified = JSON.stringify(manifestData, null, 2);
  fs.writeFileSync(path.join(outDir, 'manifest.json'), manifestMinified + '\n');
  console.log(`✓ Generated manifest.json with SHA-256 checksums\n`);
  console.log('Build completed successfully.');
}

build();
