import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/array-upper-bound.json'), 'utf8'));
new Function(prob.solutions[0].code)();

const nums = [3, 4, 5, 5, 5, 6];
assert.equal(nums.upperBound(5), 4);
assert.equal(nums.upperBound(2), -1);
console.log('Passed all array-upper-bound test cases');
