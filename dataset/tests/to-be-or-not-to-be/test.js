import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/to-be-or-not-to-be.json'), 'utf8'));
const expect = new Function(prob.solutions[0].code + '; return expect;')();

assert.equal(expect(5).toBe(5), true);
assert.throws(() => expect(5).toBe(null), /Not Equal/);
assert.equal(expect(5).notToBe(null), true);
assert.throws(() => expect(5).notToBe(5), /Equal/);
console.log('Passed all to-be-or-not-to-be test cases');
