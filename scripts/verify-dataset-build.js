#!/usr/bin/env node
/**
 * Asymptote - Dataset Build & Distribution Integrity Verifier
 * Verifies that compiled extension/data shards, indexes, catalog, and manifest
 * are bit-for-bit cryptographically sound, conform to schema, and cross-reference accurately.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dataDir = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : path.resolve(rootDir, 'extension', 'data');

function sha256(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

function verifyBuild() {
  console.log(`\n=== Verifying Asymptote Dataset Distribution Build ===`);
  console.log(`Target Directory: ${dataDir}\n`);

  const errors = [];
  const warnings = [];

  // 1. Verify existence of manifest.json
  const manifestPath = path.join(dataDir, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.error(`FATAL: manifest.json missing in ${dataDir}`);
    process.exit(1);
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (err) {
    console.error(`FATAL: manifest.json is invalid JSON: ${err.message}`);
    process.exit(1);
  }

  console.log(`Manifest Metadata:`);
  console.log(`  • App Version:             ${manifest.version || 'unknown'}`);
  console.log(`  • Dataset Version:         ${manifest.datasetVersion || 'unknown'}`);
  console.log(`  • Declared Patterns:       ${manifest.totalPatterns}`);
  console.log(`  • Declared Curated:        ${manifest.totalProblems}`);
  console.log(`  • Declared Full Catalog:   ${manifest.totalCatalogProblems}\n`);

  if (!manifest.checksums || typeof manifest.checksums !== 'object') {
    errors.push('manifest.json is missing "checksums" dictionary');
  }

  // 2. Verify all declared shards and files against SHA-256 checksums
  const requiredFiles = [
    'algorithms.json',
    'database.json',
    'pandas.json',
    'shell.json',
    'concurrency.json',
    'javascript.json',
    'index.json',
    'catalog.json'
  ];

  console.log(`--- 1. Cryptographic Checksum Verification ---`);
  for (const filename of requiredFiles) {
    const filePath = path.join(dataDir, filename);
    if (!fs.existsSync(filePath)) {
      errors.push(`Required distribution file missing: ${filename}`);
      continue;
    }

    const content = fs.readFileSync(filePath);
    const actualHash = sha256(content);
    const expectedHash = manifest.checksums?.[filename];

    if (!expectedHash) {
      errors.push(`manifest.json has no checksum entry for: ${filename}`);
    } else if (actualHash !== expectedHash) {
      errors.push(`SHA-256 MISMATCH for ${filename}:\n  Expected: ${expectedHash}\n  Actual:   ${actualHash}`);
    } else {
      const sizeKb = (content.length / 1024).toFixed(1);
      console.log(`  ✓ ${filename.padEnd(18)} [${sizeKb.padStart(6)} KB] SHA-256 match: ${actualHash.slice(0, 16)}...`);
    }
  }

  // 3. Shard Schema & Deep Content Validation
  console.log(`\n--- 2. Domain Shards & Schema Validation ---`);
  const domainFiles = ['algorithms.json', 'database.json', 'pandas.json', 'shell.json', 'concurrency.json', 'javascript.json'];
  const allPatterns = new Map();
  const allProblems = new Map();

  for (const df of domainFiles) {
    const filePath = path.join(dataDir, df);
    if (!fs.existsSync(filePath)) continue;

    let shard;
    try {
      shard = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
      errors.push(`${df} is not valid JSON: ${err.message}`);
      continue;
    }

    const expectedDomain = df.replace('.json', '');
    if (shard.domain?.toLowerCase() !== expectedDomain) {
      errors.push(`${df} declared domain "${shard.domain}" does not match filename "${df}"`);
    }

    const patterns = Array.isArray(shard.patterns) ? shard.patterns : [];
    const problems = Array.isArray(shard.problems) ? shard.problems : [];

    // Verify patterns
    for (const p of patterns) {
      if (!p.id) errors.push(`[${df}] Pattern missing "id"`);
      if (allPatterns.has(p.id)) {
        errors.push(`Duplicate pattern ID across shards: "${p.id}"`);
      } else {
        allPatterns.set(p.id, p);
      }

      if (!p.title) errors.push(`[${df}] Pattern "${p.id}" missing title`);
      if (!p.difficulty) errors.push(`[${df}] Pattern "${p.id}" missing difficulty`);
      if (!Array.isArray(p.mental_triggers) && !Array.isArray(p.signals)) {
        warnings.push(`[${df}] Pattern "${p.id}" missing mental_triggers array`);
      }
    }

    // Verify problems
    for (const prob of problems) {
      const label = `${prob.number || '?'}-${prob.slug || 'unknown'}`;
      if (!prob.slug) errors.push(`[${df}] Problem missing slug: ${JSON.stringify(prob)}`);
      if (allProblems.has(prob.slug)) {
        errors.push(`Duplicate problem slug: "${prob.slug}"`);
      } else {
        allProblems.set(prob.slug, prob);
      }

      if (!prob.number || typeof prob.number !== 'number') {
        errors.push(`[${df}] Problem "${label}" missing numeric "number"`);
      }

      const validCategories = ['Algorithms', 'Database', 'pandas', 'Shell', 'Concurrency', 'JavaScript'];
      if (!prob.category || !validCategories.map(c => c.toLowerCase()).includes(prob.category.toLowerCase())) {
        errors.push(`[${df}] Problem "${label}" invalid category: "${prob.category}"`);
      }

      // Verify Socratic hints (exactly 4 progressive hints)
      const hints = prob.hints || prob.socratic_hints;
      if (!Array.isArray(hints) || hints.length !== 4) {
        errors.push(`[${df}] Problem "${label}" must have exactly 4 hints (has ${hints?.length})`);
      } else {
        for (let i = 0; i < 4; i++) {
          const h = hints[i];
          const lvl = h?.level || h?.clue_level;
          if (!lvl || lvl !== (i + 1)) {
            errors.push(`[${df}] Problem "${label}" hint ${i} has invalid level ${lvl}`);
          }
          const text = h?.text || h?.content;
          if (!text || typeof text !== 'string' || text.trim().length < 5) {
            errors.push(`[${df}] Problem "${label}" hint ${i + 1} has empty or trivial content`);
          }
        }
      }

      // Verify complexity targets
      if (!prob.complexity || typeof prob.complexity !== 'object') {
        errors.push(`[${df}] Problem "${label}" missing complexity object`);
      } else {
        const time = prob.complexity.time || prob.complexity.target_time;
        const space = prob.complexity.space || prob.complexity.target_space;
        if (!time) errors.push(`[${df}] Problem "${label}" missing complexity time`);
        if (!space) errors.push(`[${df}] Problem "${label}" missing complexity space`);
      }

      // Verify solutions
      const solutions = Array.isArray(prob.solutions) 
        ? prob.solutions 
        : (prob.solutions && typeof prob.solutions === 'object' ? Object.values(prob.solutions) : []);
      if (!solutions || solutions.length === 0) {
        errors.push(`[${df}] Problem "${label}" has no solutions`);
      }

      // Verify pattern linkage
      if (!Array.isArray(prob.patterns) || prob.patterns.length === 0) {
        errors.push(`[${df}] Problem "${label}" has no associated patterns`);
      }
    }

    console.log(`  ✓ ${df.padEnd(18)} verified: ${patterns.length} patterns, ${problems.length} problems`);
  }

  // Cross-reference problem patterns against all loaded patterns
  for (const [slug, prob] of allProblems.entries()) {
    for (const pid of (prob.patterns || [])) {
      if (!allPatterns.has(pid)) {
        errors.push(`Problem "${slug}" references non-existent pattern ID: "${pid}"`);
      }
    }
  }

  // 4. Index verification
  console.log(`\n--- 3. Index & Catalog Cross-Reference ---`);
  const indexPath = path.join(dataDir, 'index.json');
  if (fs.existsSync(indexPath)) {
    const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    const bySlug = index.bySlug || {};
    const byNumber = index.byNumber || {};

    for (const [slug, prob] of allProblems.entries()) {
      if (!bySlug[slug]) {
        errors.push(`index.json bySlug missing entry for problem "${slug}"`);
      }
      if (!byNumber[String(prob.number)]) {
        errors.push(`index.json byNumber missing entry for problem #${prob.number} ("${slug}")`);
      }
    }
    console.log(`  ✓ index.json maps ${Object.keys(bySlug).length} problem slugs and ${Object.keys(byNumber).length} problem numbers`);
  }

  // 5. Catalog verification
  const catalogPath = path.join(dataDir, 'catalog.json');
  if (fs.existsSync(catalogPath)) {
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    if (!Array.isArray(catalog) || catalog.length < 4000) {
      warnings.push(`catalog.json contains fewer than 4,000 problems (has ${catalog.length})`);
    } else {
      console.log(`  ✓ catalog.json verified: ${catalog.length} full LeetCode catalog entries`);
    }

    if (manifest.totalCatalogProblems && manifest.totalCatalogProblems !== catalog.length) {
      errors.push(`Manifest totalCatalogProblems (${manifest.totalCatalogProblems}) does not match catalog.json count (${catalog.length})`);
    }
  }

  // 6. Totals check
  if (manifest.totalPatterns !== allPatterns.size) {
    errors.push(`Manifest totalPatterns (${manifest.totalPatterns}) does not match actual patterns (${allPatterns.size})`);
  }
  if (manifest.totalProblems !== allProblems.size) {
    errors.push(`Manifest totalProblems (${manifest.totalProblems}) does not match actual curated problems (${allProblems.size})`);
  }

  // Report results
  console.log(`\n=== Verification Summary ===`);
  console.log(`Patterns Loaded:        ${allPatterns.size}`);
  console.log(`Curated Problems:       ${allProblems.size}`);
  console.log(`Warnings:               ${warnings.length}`);
  console.log(`Errors:                 ${errors.length}\n`);

  if (warnings.length > 0) {
    console.log(`Warnings (${warnings.length}):`);
    for (const w of warnings) {
      console.log(`  ⚠ ${w}`);
    }
    console.log('');
  }

  if (errors.length > 0) {
    console.error(`Verification FAILED with ${errors.length} error(s):`);
    for (const e of errors) {
      console.error(`  ✖ ${e}`);
    }
    process.exit(1);
  }

  console.log(`✓ All distribution files, cryptographic checksums, schemas, and references PASSED!\n`);
}

verifyBuild();
