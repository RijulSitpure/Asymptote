import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/counter-ii.json'), 'utf8'));
const createCounter = new Function(prob.solutions[0].code + '; return createCounter;')();

const counter = createCounter(5);
assert.equal(counter.increment(), 6);
assert.equal(counter.reset(), 5);
assert.equal(counter.decrement(), 4);

const c2 = createCounter(0);
assert.equal(c2.increment(), 1);
assert.equal(c2.increment(), 2);
assert.equal(c2.decrement(), 1);
assert.equal(c2.reset(), 0);
assert.equal(c2.reset(), 0);
console.log('Passed all counter-ii test cases');
