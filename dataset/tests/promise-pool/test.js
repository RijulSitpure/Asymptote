import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/promise-pool.json'), 'utf8'));
const promisePool = new Function(prob.solutions[0].code + '; return promisePool;')();

let active = 0;
let maxActive = 0;
const makeTask = (ms) => async () => {
    active++;
    maxActive = Math.max(maxActive, active);
    await new Promise(r => setTimeout(r, ms));
    active--;
};

const tasks = [makeTask(10), makeTask(10), makeTask(10), makeTask(10)];
await promisePool(tasks, 2);
assert.equal(maxActive, 2);
console.log('Passed all promise-pool test cases');
