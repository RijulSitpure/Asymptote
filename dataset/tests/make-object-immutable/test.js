import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/make-object-immutable.json'), 'utf8'));
const makeImmutable = new Function(prob.solutions[0].code + '; return makeImmutable;')();

const original = { x: 5, arr: [1, 2] };
const imm = makeImmutable(original);
assert.equal(imm.x, 5);
assert.throws(() => { imm.x = 10; });
assert.throws(() => { imm.arr.push(3); });
console.log('Passed all make-object-immutable test cases');
