import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/convert-callback-based-function-to-promise-based-function.json'), 'utf8'));
const promisify = new Function(prob.solutions[0].code + '; return promisify;')();

async function run() {
  const successFn = (a, b, cb) => cb(null, a + b);
  const failureFn = (cb) => cb(new Error('fail'), null);

  const pSuccess = promisify(successFn);
  const pFailure = promisify(failureFn);

  const res = await pSuccess(2, 3);
  assert.equal(res, 5);

  let caught = false;
  try {
    await pFailure();
  } catch (e) {
    caught = true;
    assert.equal(e.message, 'fail');
  }
  assert.equal(caught, true);
  console.log('Passed all convert-callback-based-function-to-promise-based-function test cases');
}
run();
