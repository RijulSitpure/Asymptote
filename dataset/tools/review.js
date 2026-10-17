import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultProblemsDir = path.resolve(__dirname, '../problems');
const validateScript = path.resolve(__dirname, 'validate.js');

export function listProblems(problemsDir = defaultProblemsDir) {
  if (!fs.existsSync(problemsDir)) {
    throw new Error(`Problems directory not found: ${problemsDir}`);
  }

  const files = fs.readdirSync(problemsDir).filter(f => f.endsWith('.json'));
  const rows = [];

  for (const file of files) {
    const fullPath = path.join(problemsDir, file);
    const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    rows.push({
      number: data.number != null ? data.number : '-',
      slug: data.slug || path.basename(file, '.json'),
      category: data.category || '-',
      status: (data.review && data.review.status) || 'draft',
      acceptedOnLeetCode: (data.review && data.review.acceptedOnLeetCode) || '-',
      reviewer: (data.review && data.review.reviewer) || '-'
    });
  }

  rows.sort((a, b) => {
    if (typeof a.number === 'number' && typeof b.number === 'number') {
      return a.number - b.number;
    }
    return String(a.slug).localeCompare(String(b.slug));
  });

  return rows;
}

export function formatTable(rows) {
  const headers = ['#', 'Slug', 'Category', 'Status', 'Accepted Date', 'Reviewer'];
  const keys = ['number', 'slug', 'category', 'status', 'acceptedOnLeetCode', 'reviewer'];

  const colWidths = headers.map((h, i) => {
    const maxValLen = rows.reduce((max, r) => Math.max(max, String(r[keys[i]]).length), 0);
    return Math.max(h.length, maxValLen);
  });

  const sep = colWidths.map(w => '-'.repeat(w)).join('  ');
  const headerLine = headers.map((h, i) => h.padEnd(colWidths[i])).join('  ');

  const lines = [headerLine, sep];
  for (const r of rows) {
    const line = keys.map((k, i) => String(r[k]).padEnd(colWidths[i])).join('  ');
    lines.push(line);
  }
  return lines.join('\n');
}

export function reviewProblem(slug, options = {}) {
  const {
    accepted,
    reviewer,
    problemsDir = defaultProblemsDir,
    runValidate = true
  } = options;

  if (!slug) {
    throw new Error('Problem slug is required');
  }
  if (!accepted || !/^\d{4}-\d{2}-\d{2}$/.test(accepted)) {
    throw new Error(`Invalid accepted date: "${accepted}". Expected YYYY-MM-DD format.`);
  }
  if (!reviewer || typeof reviewer !== 'string' || reviewer.trim().length === 0) {
    throw new Error('Reviewer name is required');
  }

  const probPath = path.join(problemsDir, `${slug}.json`);
  if (!fs.existsSync(probPath)) {
    throw new Error(`Problem file not found for slug "${slug}" at ${probPath}`);
  }

  const prob = JSON.parse(fs.readFileSync(probPath, 'utf8'));

  // Gate check: status must be currently "tested"
  const currentStatus = prob.review ? prob.review.status : null;
  if (currentStatus !== 'tested') {
    throw new Error(`cannot review before testing: problem "${slug}" has status "${currentStatus}", must be "tested"`);
  }

  const today = new Date().toISOString().slice(0, 10);

  prob.review = {
    ...prob.review,
    status: 'reviewed',
    acceptedOnLeetCode: accepted,
    reviewer: reviewer.trim()
  };
  prob.updated = today;

  fs.writeFileSync(probPath, JSON.stringify(prob, null, 2) + '\n', 'utf8');

  if (runValidate && problemsDir === defaultProblemsDir) {
    const valRun = spawnSync('node', [validateScript], { encoding: 'utf8' });
    if (valRun.status !== 0) {
      throw new Error(`Validation failed after review update:\n${valRun.stderr || valRun.stdout}`);
    }
  }

  return prob;
}

function parseCliArgs(args) {
  let list = false;
  let slug = null;
  let accepted = null;
  let reviewer = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--list' || arg === '-l') {
      list = true;
    } else if (arg === '--accepted') {
      accepted = args[++i];
    } else if (arg === '--reviewer') {
      reviewer = args[++i];
    } else if (!arg.startsWith('-') && !slug) {
      slug = arg;
    }
  }

  return { list, slug, accepted, reviewer };
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node dataset/tools/review.js --list');
    console.log('  node dataset/tools/review.js <slug> --accepted YYYY-MM-DD --reviewer <name>');
    process.exit(0);
  }

  const { list, slug, accepted, reviewer } = parseCliArgs(args);

  if (list) {
    const rows = listProblems();
    console.log(formatTable(rows));
    return;
  }

  if (slug) {
    if (!accepted || !reviewer) {
      console.error('Error: Both --accepted YYYY-MM-DD and --reviewer <name> are required when reviewing a problem.');
      process.exit(1);
    }
    try {
      const updated = reviewProblem(slug, { accepted, reviewer });
      console.log(`✓ Problem "${slug}" successfully reviewed by ${reviewer} (accepted on LeetCode: ${accepted}).`);
      console.log(`  review.status: ${updated.review.status}`);
      console.log(`  review.acceptedOnLeetCode: ${updated.review.acceptedOnLeetCode}`);
      console.log(`  review.reviewer: ${updated.review.reviewer}`);
      console.log(`  updated: ${updated.updated}`);
    } catch (err) {
      console.error(`✖ Error: ${err.message}`);
      process.exit(1);
    }
    return;
  }

  console.error('Invalid arguments. Use --list or <slug> --accepted YYYY-MM-DD --reviewer <name>');
  process.exit(1);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main();
}
