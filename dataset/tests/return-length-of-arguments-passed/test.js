import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/return-length-of-arguments-passed.json'), 'utf8'));
const argumentsLength = new Function(prob.solutions[0].code + '; return argumentsLength;')();

assert.equal(argumentsLength(5), 1);
assert.equal(argumentsLength({}, null, "3"), 3);
assert.equal(argumentsLength(), 0);
console.log('Passed all return-length-of-arguments-passed test cases');
