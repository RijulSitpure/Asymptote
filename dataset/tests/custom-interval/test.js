import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/custom-interval.json'), 'utf8'));
const mod = new Function(prob.solutions[0].code + '; return { customInterval, customClearInterval };')();

let count = 0;
const id = mod.customInterval(() => { count++; }, 10, 10);
setTimeout(() => {
  mod.customClearInterval(id);
  const frozen = count;
  setTimeout(() => {
    assert.equal(count, frozen);
    assert.ok(count >= 1);
    console.log('Passed all custom-interval test cases');
  }, 40);
}, 25);
