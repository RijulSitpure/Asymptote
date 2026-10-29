import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/nested-array-generator.json'), 'utf8'));
const inorderTraversal = new Function(prob.solutions[0].code + '; return inorderTraversal;')();

const gen = inorderTraversal([[[6]], [1, 3], []]);
const res = [];
for (const val of gen) res.push(val);
assert.deepEqual(res, [6, 1, 3]);
console.log('Passed all nested-array-generator test cases');
