import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/array-prototype-foreach.json'), 'utf8'));
new Function(prob.solutions[0].code)();

const arr = [10, 20, 30];
const collected = [];
const ctx = { mult: 2 };
arr.forEach(function(val, idx) {
  collected.push(val * this.mult + idx);
}, ctx);

assert.deepEqual(collected, [20, 41, 62]);
console.log('Passed all array-prototype-foreach test cases');
