import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/json-deep-equal.json'), 'utf8'));
const areDeeplyEqual = new Function(prob.solutions[0].code + '; return areDeeplyEqual;')();

assert.equal(areDeeplyEqual({"y":2,"x":1}, {"x":1,"y":2}), true);
assert.equal(areDeeplyEqual({"x":null,"L":[1,2,3]}, {"x":null,"L":["1","2","3"]}), false);
assert.equal(areDeeplyEqual(true, false), false);
assert.equal(areDeeplyEqual([1, 2, 3], [1, 2, 3]), true);
assert.equal(areDeeplyEqual([1, 2, 3], [1, 3, 2]), false);
console.log('Passed all json-deep-equal test cases');
