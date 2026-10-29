import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/is-object-empty.json'), 'utf8'));
const isEmpty = new Function(prob.solutions[0].code + '; return isEmpty;')();

assert.equal(isEmpty({ "x": 5, "y": 42 }), false);
assert.equal(isEmpty({}), true);
assert.equal(isEmpty([null, false, 0]), false);
assert.equal(isEmpty([]), true);
console.log('Passed all is-object-empty test cases');
