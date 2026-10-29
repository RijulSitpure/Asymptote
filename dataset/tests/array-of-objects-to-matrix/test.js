import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/array-of-objects-to-matrix.json'), 'utf8'));
const jsonToMatrix = new Function(prob.solutions[0].code + '; return jsonToMatrix;')();

const input = [{ b: 1, a: 2 }, { b: 3, c: 4 }];
const res = jsonToMatrix(input);
assert.deepEqual(res, [
    ['a', 'b', 'c'],
    [2, 1, ''],
    ['', 3, 4]
]);
console.log('Passed all array-of-objects-to-matrix test cases');
