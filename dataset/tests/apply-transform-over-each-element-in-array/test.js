import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/apply-transform-over-each-element-in-array.json'), 'utf8'));
const map = new Function(prob.solutions[0].code + '; return map;')();

assert.deepEqual(map([1, 2, 3], (n) => n + 1), [2, 3, 4]);
assert.deepEqual(map([1, 2, 3], (n, i) => n + i), [1, 3, 5]);
assert.deepEqual(map([10, 20, 30], () => 42), [42, 42, 42]);
console.log('Passed all apply-transform-over-each-element-in-array test cases');
