import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/add-two-promises.json'), 'utf8'));
const addTwoPromises = new Function(prob.solutions[0].code + '; return addTwoPromises;')();

const p1 = new Promise(r => setTimeout(() => r(2), 10));
const p2 = new Promise(r => setTimeout(() => r(5), 15));
const sum = await addTwoPromises(p1, p2);
assert.equal(sum, 7);
console.log('Passed all add-two-promises test cases');
