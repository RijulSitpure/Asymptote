import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const EXTENSION_DIR = path.join(ROOT_DIR, 'extension');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const OUTPUT_ZIP = path.join(DIST_DIR, 'asymptote-extension.zip');

console.log('=== Packaging Asymptote Extension ===');

// 1. Verify critical artifacts exist
const criticalFiles = [
  path.join(EXTENSION_DIR, 'manifest.json'),
  path.join(EXTENSION_DIR, 'background.js'),
  path.join(EXTENSION_DIR, 'content.js'),
  path.join(EXTENSION_DIR, 'popup.html'),
  path.join(EXTENSION_DIR, 'data', 'dataset-metadata.json'),
  path.join(EXTENSION_DIR, 'dashboard', 'index.html')
];

for (const f of criticalFiles) {
  if (!fs.existsSync(f)) {
    console.error(`Error: Missing required build artifact: ${path.relative(ROOT_DIR, f)}`);
    process.exit(1);
  }
}

// Ensure no duplicate manifest.json exists in extension/ to prevent Chrome Web Store rejection
const legacyDataManifest = path.join(EXTENSION_DIR, 'data', 'manifest.json');
if (fs.existsSync(legacyDataManifest)) {
  fs.unlinkSync(legacyDataManifest);
}
const legacyDatasetManifest = path.join(EXTENSION_DIR, 'data', 'dataset-manifest.json');
if (fs.existsSync(legacyDatasetManifest)) {
  fs.unlinkSync(legacyDatasetManifest);
}

// 2. Ensure dist/ exists and remove stale zip
fs.mkdirSync(DIST_DIR, { recursive: true });
if (fs.existsSync(OUTPUT_ZIP)) {
  fs.unlinkSync(OUTPUT_ZIP);
}

// 3. Create zip from extension/ directory root
try {
  execSync(`zip -r "${OUTPUT_ZIP}" . -x "*.DS_Store*" "*__MACOSX*"`, {
    cwd: EXTENSION_DIR,
    stdio: 'pipe'
  });
} catch (err) {
  console.error('Failed to create zip bundle:', err);
  process.exit(1);
}

const stats = fs.statSync(OUTPUT_ZIP);
const sizeKb = (stats.size / 1024).toFixed(1);
console.log(`✓ Created: ${path.relative(ROOT_DIR, OUTPUT_ZIP)} (${sizeKb} KB)`);

// 4. Verify zip contents and enforce exactly ONE manifest.json for Chrome Web Store
const listOutput = execSync(`unzip -l "${OUTPUT_ZIP}"`, { encoding: 'utf8' });
const manifestMatches = listOutput.split('\n')
  .map(l => l.trim().split(/\s+/).pop())
  .filter(name => name && (name === 'manifest.json' || name.endsWith('/manifest.json')));

if (manifestMatches.length !== 1 || manifestMatches[0] !== 'manifest.json') {
  console.error(`FATAL: Chrome Web Store requires exactly one manifest.json at zip root! Found ${manifestMatches.length}:`, manifestMatches);
  process.exit(1);
}
console.log('\n--- Zip Archive Contents (Top 15 files) ---');
const lines = listOutput.trim().split('\n');
console.log(lines.slice(0, 18).join('\n'));
console.log('...\n✓ Verified exactly 1 manifest.json is at zip root (Chrome Web Store compliant).');
console.log('✓ Extension packaging completed successfully.');
