import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/design-cancellable-function.json'), 'utf8'));
const cancellable = new Function(prob.solutions[0].code + '; return cancellable;')();

function* tasks() {
    const val = yield new Promise(r => setTimeout(() => r(42), 10));
    return val * 2;
}
const [cancel, promise] = cancellable(tasks());
const res = await promise;
assert.equal(res, 84);
console.log('Passed all design-cancellable-function test cases');
