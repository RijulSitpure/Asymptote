import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/join-two-arrays-by-id.json'), 'utf8'));
const join = new Function(prob.solutions[0].code + '; return join;')();

const a1 = [{ id: 1, x: 1 }, { id: 2, x: 9 }];
const a2 = [{ id: 2, x: 5 }, { id: 3, x: 5 }];
assert.deepEqual(join(a1, a2), [
    { id: 1, x: 1 },
    { id: 2, x: 5 },
    { id: 3, x: 5 }
]);
console.log('Passed all join-two-arrays-by-id test cases');
