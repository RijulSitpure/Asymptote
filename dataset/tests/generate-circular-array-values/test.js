import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/generate-circular-array-values.json'), 'utf8'));
const cycleGenerator = new Function(prob.solutions[0].code + '; return cycleGenerator;')();

const gen = cycleGenerator([1, 2, 3, 4, 5], 0);
assert.equal(gen.next().value, 1);
assert.equal(gen.next(1).value, 2);
assert.equal(gen.next(2).value, 4);
assert.equal(gen.next(-2).value, 2);
console.log('Passed all generate-circular-array-values test cases');
