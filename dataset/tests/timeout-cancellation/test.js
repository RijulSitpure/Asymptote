import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/timeout-cancellation.json'), 'utf8'));
const cancellable = new Function(prob.solutions[0].code + '; return cancellable;')();

let executed = false;
const cancel = cancellable(() => { executed = true; }, [], 20);
cancel();
await new Promise(r => setTimeout(r, 40));
assert.equal(executed, false);
console.log('Passed all timeout-cancellation test cases');
