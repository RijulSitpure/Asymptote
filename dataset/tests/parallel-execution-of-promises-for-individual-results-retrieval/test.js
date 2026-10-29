import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/parallel-execution-of-promises-for-individual-results-retrieval.json'), 'utf8'));
const promiseAllSettled = new Function(prob.solutions[0].code + '; return promiseAllSettled;')();

async function run() {
  const fns = [
    () => new Promise(res => setTimeout(() => res(42), 20)),
    () => new Promise((_, rej) => setTimeout(() => rej('err'), 10))
  ];
  const results = await promiseAllSettled(fns);
  assert.deepEqual(results, [
    { status: 'fulfilled', value: 42 },
    { status: 'rejected', reason: 'err' }
  ]);
  console.log('Passed all parallel-execution-of-promises-for-individual-results-retrieval test cases');
}
run();
