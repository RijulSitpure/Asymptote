import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/undefined-to-null.json'), 'utf8'));
const undefinedToNull = new Function(prob.solutions[0].code + '; return undefinedToNull;')();

assert.deepEqual(undefinedToNull({ a: undefined, b: 3 }), { a: null, b: 3 });
assert.deepEqual(undefinedToNull([undefined, undefined]), [null, null]);
console.log('Passed all undefined-to-null test cases');
