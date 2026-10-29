import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/check-if-object-instance-of-class.json'), 'utf8'));
const checkIfInstanceOf = new Function(prob.solutions[0].code + '; return checkIfInstanceOf;')();

assert.equal(checkIfInstanceOf(new Date(), Date), true);
assert.equal(checkIfInstanceOf(Date, Date), false);
assert.equal(checkIfInstanceOf(5, Number), true);
assert.equal(checkIfInstanceOf([], Array), true);
assert.equal(checkIfInstanceOf([], Object), true);
assert.equal(checkIfInstanceOf(null, Object), false);
console.log('Passed all check-if-object-instance-of-class test cases');
