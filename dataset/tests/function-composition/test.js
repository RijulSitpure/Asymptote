import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/function-composition.json'), 'utf8'));
const solCode = prob.solutions[0].code;

const compose = new Function(solCode + '; return compose;')();

// Test 1: [x => x + 1, x => x * x, x => 2 * x], x = 4 -> 4*2=8 -> 8*8=64 -> 64+1=65
const fn1 = compose([x => x + 1, x => x * x, x => 2 * x]);
assert.equal(fn1(4), 65);

// Test 2: [x => 10 * x, x => 10 * x, x => 10 * x], x = 1 -> 1000
const fn2 = compose([x => 10 * x, x => 10 * x, x => 10 * x]);
assert.equal(fn2(1), 1000);

// Test 3: empty functions array -> identity
const fn3 = compose([]);
assert.equal(fn3(42), 42);
assert.equal(fn3(-10), -10);

// Random cases: 25 random chains
for (let i = 0; i < 25; i++) {
  const funcs = [];
  const len = Math.floor(Math.random() * 8) + 1;
  for (let j = 0; j < len; j++) {
    const op = Math.random();
    if (op < 0.33) funcs.push(x => x + 2);
    else if (op < 0.66) funcs.push(x => x - 3);
    else funcs.push(x => x * 2);
  }
  const composed = compose(funcs);
  const input = Math.floor(Math.random() * 20);
  let expected = input;
  for (let k = funcs.length - 1; k >= 0; k--) {
    expected = funcs[k](expected);
  }
  assert.equal(composed(input), expected, `Mismatch in random composition ${i}`);
}

// Scale test: 1,000 chained increments
const largeFns = Array.from({ length: 1000 }, () => (x => x + 1));
const largeComposed = compose(largeFns);
assert.equal(largeComposed(0), 1000);

console.log('Passed all function-composition fixed, random, and scale tests');
