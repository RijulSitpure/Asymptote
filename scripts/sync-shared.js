import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const SOURCE_FILE = path.join(ROOT_DIR, 'shared', 'languages.js');
const TARGETS = [
  path.join(ROOT_DIR, 'client', 'src', 'lib', 'languages.js'),
  path.join(ROOT_DIR, 'extension', 'languages.js')
];

const HEADER = '// generated, do not edit - source: shared/languages.js\n';

const isCheckMode = process.argv.includes('--check');

if (!fs.existsSync(SOURCE_FILE)) {
  console.error(`Source file not found: ${SOURCE_FILE}`);
  process.exit(1);
}

const sourceContent = fs.readFileSync(SOURCE_FILE, 'utf8');
const generatedContent = HEADER + sourceContent;

let hasDifference = false;

for (const target of TARGETS) {
  const targetDir = path.dirname(target);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  if (isCheckMode) {
    if (!fs.existsSync(target)) {
      console.error(`[CI Check] Missing target file: ${path.relative(ROOT_DIR, target)}`);
      hasDifference = true;
    } else {
      const existing = fs.readFileSync(target, 'utf8');
      if (existing !== generatedContent) {
        console.error(`[CI Check] Out of sync: ${path.relative(ROOT_DIR, target)} differs from ${path.relative(ROOT_DIR, SOURCE_FILE)}`);
        hasDifference = true;
      }
    }
  } else {
    fs.writeFileSync(target, generatedContent, 'utf8');
    console.log(`Synced: ${path.relative(ROOT_DIR, target)}`);
  }
}

if (isCheckMode) {
  if (hasDifference) {
    console.error('Shared files check failed. Run "npm run sync-shared" to update copies.');
    process.exit(1);
  } else {
    console.log('Shared files are in sync.');
  }
}
