import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const SHARED_FILES = [
  'languages.js',
  'wizard.js',
  'classifier.js',
  'asymptote-engine.js',
  'dataset-sync.js',
  'nano-ai.js',
  'nano-chat-service.js',
  'curriculum-roadmap.js'
];

const isCheckMode = process.argv.includes('--check');
let hasDifference = false;

// Manifest V3 content scripts and classic popup scripts cannot contain ES module 'export' statements.
// Strip top-level export statements for scripts loaded as classic scripts in the extension.
const EXTENSION_CLASSIC_SCRIPTS = new Set([
  'nano-ai.js',
  'curriculum-roadmap.js'
]);

function transformForExtensionClassicScript(code) {
  const stripped = code
    .replace(/^\s*export\s+default\s+[^;]+;?\s*$/gm, '')
    .replace(/^\s*export\s+\{[^}]+\};?\s*$/gm, '')
    .replace(/^\s*export\s+(async\s+function\b)/gm, '$1')
    .replace(/^\s*export\s+(function\b)/gm, '$1')
    .replace(/^\s*export\s+(const\b)/gm, '$1')
    .replace(/^\s*export\s+(let\b)/gm, '$1')
    .replace(/^\s*export\s+(class\b)/gm, '$1');
  return `(function (global) {\n${stripped}\n})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);\n`;
}

for (const fileName of SHARED_FILES) {
  const sourceFile = path.join(ROOT_DIR, 'shared', fileName);
  if (!fs.existsSync(sourceFile)) {
    console.error(`Source file not found: ${sourceFile}`);
    process.exit(1);
  }

  const sourceContent = fs.readFileSync(sourceFile, 'utf8');
  const header = `// generated, do not edit - source: shared/${fileName}\n`;

  const targets = [
    {
      target: path.join(ROOT_DIR, 'client', 'src', 'lib', fileName),
      generatedContent: header + sourceContent
    },
    {
      target: path.join(ROOT_DIR, 'extension', fileName),
      generatedContent: EXTENSION_CLASSIC_SCRIPTS.has(fileName)
        ? header + transformForExtensionClassicScript(sourceContent)
        : header + sourceContent
    }
  ];

  for (const { target, generatedContent } of targets) {
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
          console.error(`[CI Check] Out of sync: ${path.relative(ROOT_DIR, target)} differs from ${path.relative(ROOT_DIR, sourceFile)}`);
          hasDifference = true;
        }
      }
    } else {
      fs.writeFileSync(target, generatedContent, 'utf8');
      console.log(`Synced: ${path.relative(ROOT_DIR, target)}`);
    }
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
