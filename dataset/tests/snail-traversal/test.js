import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/snail-traversal.json'), 'utf8'));
new Function(prob.solutions[0].code)();

const nums = [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15];
const res = nums.snail(5, 4);
assert.equal(res.length, 5);
assert.equal(res[0].length, 4);
assert.deepEqual(res[0], [19, 17, 16, 15]);
assert.deepEqual(nums.snail(1, 4), []);
console.log('Passed all snail-traversal test cases');
