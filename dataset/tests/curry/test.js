import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/curry.json'), 'utf8'));
const curry = new Function(prob.solutions[0].code + '; return curry;')();

function sum(a, b, c) { return a + b + c; }
const cSum = curry(sum);
assert.equal(cSum(1)(2)(3), 6);
assert.equal(cSum(1, 2)(3), 6);
assert.equal(cSum(1)(2, 3), 6);
assert.equal(cSum(1, 2, 3), 6);
console.log('Passed all curry test cases');
