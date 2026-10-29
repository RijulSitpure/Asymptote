import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/partial-function-with-placeholders.json'), 'utf8'));
const partial = new Function(prob.solutions[0].code + '; return partial;')();

const fn = (...args) => args;
const p = partial(fn, ['_', 2, '_']);
assert.deepEqual(p(1, 3, 4), [1, 2, 3, 4]);
console.log('Passed all partial-function-with-placeholders test cases');
