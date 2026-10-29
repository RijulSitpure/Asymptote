import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/chunk-array.json'), 'utf8'));
const chunk = new Function(prob.solutions[0].code + '; return chunk;')();

assert.deepEqual(chunk([1, 2, 3, 4, 5], 1), [[1], [2], [3], [4], [5]]);
assert.deepEqual(chunk([1, 9, 6, 3, 2], 3), [[1, 9, 6], [3, 2]]);
assert.deepEqual(chunk([], 1), []);
console.log('Passed all chunk-array test cases');
