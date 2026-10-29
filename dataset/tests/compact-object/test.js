import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/compact-object.json'), 'utf8'));
const compactObject = new Function(prob.solutions[0].code + '; return compactObject;')();

assert.deepEqual(compactObject([null, 0, 5, [0], [false, 16]]), [5, [], [16]]);
assert.deepEqual(compactObject({ a: null, b: [false, 1] }), { b: [1] });
console.log('Passed all compact-object test cases');
