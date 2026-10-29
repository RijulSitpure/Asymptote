import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/inversion-of-object.json'), 'utf8'));
const invertObject = new Function(prob.solutions[0].code + '; return invertObject;')();

assert.deepEqual(invertObject({ a: '1', b: '2' }), { '1': 'a', '2': 'b' });
assert.deepEqual(invertObject({ a: '1', b: '1', c: '1' }), { '1': ['a', 'b', 'c'] });
assert.deepEqual(invertObject(['apple', 'banana', 'apple']), { 'apple': ['0', '2'], 'banana': '1' });
console.log('Passed all inversion-of-object test cases');
