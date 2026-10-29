import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/execute-asynchronous-functions-in-parallel.json'), 'utf8'));
const promiseAll = new Function(prob.solutions[0].code + '; return promiseAll;')();

const fns = [
    () => new Promise(resolve => setTimeout(() => resolve(5), 20)),
    () => new Promise(resolve => setTimeout(() => resolve(10), 10))
];
const res = await promiseAll(fns);
assert.deepEqual(res, [5, 10]);
console.log('Passed all execute-asynchronous-functions-in-parallel test cases');
