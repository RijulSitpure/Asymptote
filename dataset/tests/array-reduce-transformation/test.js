import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/array-reduce-transformation.json'), 'utf8'));
const reduce = new Function(prob.solutions[0].code + '; return reduce;')();

assert.equal(reduce([1, 2, 3, 4], (accum, curr) => accum + curr, 0), 10);
assert.equal(reduce([1, 2, 3, 4], (accum, curr) => accum + curr * curr, 100), 130);
assert.equal(reduce([], (accum, curr) => 0, 25), 25);
console.log('Passed all array-reduce-transformation test cases');
