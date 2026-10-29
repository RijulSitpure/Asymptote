import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/allow-one-function-call.json'), 'utf8'));
const once = new Function(prob.solutions[0].code + '; return once;')();

let callCount = 0;
const fn = (a, b, c) => {
    callCount++;
    return a + b + c;
};
const onceFn = once(fn);

assert.equal(onceFn(1, 2, 3), 6);
assert.equal(callCount, 1);
assert.equal(onceFn(2, 3, 6), undefined);
assert.equal(callCount, 1);
assert.equal(onceFn(), undefined);
assert.equal(callCount, 1);
console.log('Passed all allow-one-function-call test cases');
