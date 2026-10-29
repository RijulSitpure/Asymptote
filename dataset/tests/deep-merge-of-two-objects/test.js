import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/deep-merge-of-two-objects.json'), 'utf8'));
const deepMerge = new Function(prob.solutions[0].code + '; return deepMerge;')();

assert.deepEqual(deepMerge({ a: 1, c: 3 }, { a: 2, b: 2 }), { a: 2, c: 3, b: 2 });
assert.deepEqual(deepMerge([1, 2], { "0": 3 }), { "0": 3 });
console.log('Passed all deep-merge-of-two-objects test cases');
