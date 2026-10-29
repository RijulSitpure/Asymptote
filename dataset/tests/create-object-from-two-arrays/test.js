import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/create-object-from-two-arrays.json'), 'utf8'));
const createObject = new Function(prob.solutions[0].code + '; return createObject;')();

assert.deepEqual(createObject(['a', 'b', 'a'], [1, 2, 3]), { a: 1, b: 2 });
assert.deepEqual(createObject([1, '1'], ['num', 'str']), { '1': 'num' });
console.log('Passed all create-object-from-two-arrays test cases');
