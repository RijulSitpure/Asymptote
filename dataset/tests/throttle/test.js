import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/throttle.json'), 'utf8'));
const throttle = new Function(prob.solutions[0].code + '; return throttle;')();

let calls = [];
const fn = (x) => calls.push(x);
const throttled = throttle(fn, 20);

throttled(1);
throttled(2);
assert.deepEqual(calls, [1]);
await new Promise(r => setTimeout(r, 30));
assert.deepEqual(calls, [1, 2]);
console.log('Passed all throttle test cases');
