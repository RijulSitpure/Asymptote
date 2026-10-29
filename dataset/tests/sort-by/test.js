import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/sort-by.json'), 'utf8'));
const sortBy = new Function(prob.solutions[0].code + '; return sortBy;')();

assert.deepEqual(sortBy([5, 4, 1, 2, 3], (x) => x), [1, 2, 3, 4, 5]);
assert.deepEqual(sortBy([{"x": 1}, {"x": 0}, {"x": -1}], (d) => d.x), [{"x": -1}, {"x": 0}, {"x": 1}]);
console.log('Passed all sort-by test cases');
