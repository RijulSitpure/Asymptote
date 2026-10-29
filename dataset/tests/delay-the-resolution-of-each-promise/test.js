import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/delay-the-resolution-of-each-promise.json'), 'utf8'));
const delayAll = new Function(prob.solutions[0].code + '; return delayAll;')();

async function run() {
  const fns = [() => Promise.resolve('res1'), () => Promise.resolve('res2')];
  const delayed = delayAll(fns, 10);
  const t0 = Date.now();
  const res = await delayed[0]();
  const elapsed = Date.now() - t0;
  assert.equal(res, 'res1');
  assert.ok(elapsed >= 8);
  console.log('Passed all delay-the-resolution-of-each-promise test cases');
}
run();
