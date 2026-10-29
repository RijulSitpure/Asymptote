import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/differences-between-two-objects.json'), 'utf8'));
const objDiff = new Function(prob.solutions[0].code + '; return objDiff;')();

const o1 = { a: 1, b: 2, c: { d: 3 } };
const o2 = { a: 1, b: 3, c: { d: 4 }, e: 5 };
assert.deepEqual(objDiff(o1, o2), { b: [2, 3], c: { d: [3, 4] } });
console.log('Passed all differences-between-two-objects test cases');
