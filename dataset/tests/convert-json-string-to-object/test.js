import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/convert-json-string-to-object.json'), 'utf8'));
const parse = new Function(prob.solutions[0].code + '; return parse;')();

assert.deepEqual(parse('{"a":2,"b":[1,2,3]}'), { a: 2, b: [1, 2, 3] });
assert.deepEqual(parse('true'), true);
assert.deepEqual(parse('null'), null);
console.log('Passed all convert-json-string-to-object test cases');
