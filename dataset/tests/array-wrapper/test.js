import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/array-wrapper.json'), 'utf8'));
const ArrayWrapper = new Function(prob.solutions[0].code + '; return ArrayWrapper;')();

const obj1 = new ArrayWrapper([1, 2]);
const obj2 = new ArrayWrapper([3, 4]);
assert.equal(obj1 + obj2, 10);
assert.equal(String(obj1), '[1,2]');
assert.equal(String(obj2), '[3,4]');
console.log('Passed all array-wrapper test cases');
