import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/array-prototype-last.json'), 'utf8'));
new Function(prob.solutions[0].code)();

assert.equal([null, {}, 3].last(), 3);
assert.equal([].last(), -1);
assert.equal([2].last(), 2);
assert.equal([1, 2, 'hello'].last(), 'hello');
assert.equal([false].last(), false);
console.log('Passed all array-prototype-last test cases');
