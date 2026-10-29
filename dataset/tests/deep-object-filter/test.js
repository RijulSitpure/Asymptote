import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/deep-object-filter.json'), 'utf8'));
const deepFilter = new Function(prob.solutions[0].code + '; return deepFilter;')();

const input1 = [-5, 0, 5, [2, -3], { a: 10, b: -10 }];
const fn1 = x => x > 0;
assert.deepEqual(deepFilter(input1, fn1), [5, [2], { a: 10 }]);

const input2 = { a: 1, b: { c: 2, d: [3, 4] } };
const fn2 = x => x > 10;
assert.equal(deepFilter(input2, fn2), undefined);
console.log('Passed all deep-object-filter test cases');
