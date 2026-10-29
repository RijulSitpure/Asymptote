import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/factorial-generator.json'), 'utf8'));
const factorial = new Function(prob.solutions[0].code + '; return factorial;')();

const gen3 = factorial(3);
assert.equal(gen3.next().value, 1);
assert.equal(gen3.next().value, 2);
assert.equal(gen3.next().value, 6);
assert.equal(gen3.next().done, true);

const gen0 = factorial(0);
assert.equal(gen0.next().value, 1);
assert.equal(gen0.next().done, true);
console.log('Passed all factorial-generator test cases');
