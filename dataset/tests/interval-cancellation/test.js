import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/interval-cancellation.json'), 'utf8'));
const cancellable = new Function(prob.solutions[0].code + '; return cancellable;')();

let count = 0;
const cancel = cancellable(() => { count++; }, [], 15);
await new Promise(r => setTimeout(r, 40));
cancel();
assert.equal(count >= 2, true);
console.log('Passed all interval-cancellation test cases');
