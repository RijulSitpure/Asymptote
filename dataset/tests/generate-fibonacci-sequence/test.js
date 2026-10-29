import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/generate-fibonacci-sequence.json'), 'utf8'));
const fibGenerator = new Function(prob.solutions[0].code + '; return fibGenerator;')();

const gen = fibGenerator();
assert.equal(gen.next().value, 0);
assert.equal(gen.next().value, 1);
assert.equal(gen.next().value, 1);
assert.equal(gen.next().value, 2);
assert.equal(gen.next().value, 3);
assert.equal(gen.next().value, 5);
console.log('Passed all generate-fibonacci-sequence test cases');
