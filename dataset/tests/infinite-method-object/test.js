import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/infinite-method-object.json'), 'utf8'));
const createInfiniteObject = new Function(prob.solutions[0].code + '; return createInfiniteObject;')();

const obj = createInfiniteObject();
assert.equal(obj.someMethod(), 'someMethod');
assert.equal(obj.anotherMethod(), 'anotherMethod');
console.log('Passed all infinite-method-object test cases');
