import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/memoize-ii.json'), 'utf8'));
const memoize = new Function(prob.solutions[0].code + '; return memoize;')();

let callCount = 0;
const add = (a, b) => { callCount++; return a + b; };
const memAdd = memoize(add);

assert.equal(memAdd(2, 2), 4);
assert.equal(callCount, 1);
assert.equal(memAdd(2, 2), 4);
assert.equal(callCount, 1);
assert.equal(memAdd(1, 2), 3);
assert.equal(callCount, 2);
console.log('Passed all memoize-ii test cases');
