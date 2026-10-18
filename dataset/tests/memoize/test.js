import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/memoize.json'), 'utf8'));
const solCode = prob.solutions[0].code;

const memoize = new Function(solCode + '; return memoize;')();

// Test 1: sum function call count tracking
let sumCallCount = 0;
const sum = memoize((a, b) => {
  sumCallCount++;
  return a + b;
});

assert.equal(sum(2, 2), 4);
assert.equal(sumCallCount, 1);
assert.equal(sum(2, 2), 4);
assert.equal(sumCallCount, 1); // cached!

assert.equal(sum(1, 2), 3);
assert.equal(sumCallCount, 2);
assert.equal(sum(1, 2), 3);
assert.equal(sumCallCount, 2); // cached!

// Test 2: factorial function
let factCallCount = 0;
const fact = memoize(n => {
  factCallCount++;
  return n <= 1 ? 1 : n * fact(n - 1);
});

assert.equal(fact(2), 2);
assert.equal(factCallCount, 2); // 2 and 1
assert.equal(fact(3), 6);
assert.equal(factCallCount, 3); // 3 (2 and 1 were already cached)
assert.equal(fact(2), 2);
assert.equal(factCallCount, 3); // completely cached

// Test 3: fib function
let fibCallCount = 0;
const fib = memoize(n => {
  fibCallCount++;
  return n <= 1 ? 1 : fib(n - 1) + fib(n - 2);
});

assert.equal(fib(5), 8);
const currentFibCount = fibCallCount;
assert.equal(fib(5), 8);
assert.equal(fibCallCount, currentFibCount);

// Test 4: Random calls with repeated arguments
let rndCount = 0;
const rndFn = memoize((x, y) => {
  rndCount++;
  return x * 100 + y;
});

const seen = new Set();
for (let i = 0; i < 50; i++) {
  const x = Math.floor(Math.random() * 5);
  const y = Math.floor(Math.random() * 5);
  seen.add(`${x},${y}`);
  const res = rndFn(x, y);
  assert.equal(res, x * 100 + y);
}
assert.equal(rndCount, seen.size);

// Scale test: 5,000 calls across 50 unique keys
let scaleCallCount = 0;
const scaleFn = memoize(x => {
  scaleCallCount++;
  return x * x;
});

for (let i = 0; i < 5000; i++) {
  const k = i % 50;
  assert.equal(scaleFn(k), k * k);
}
assert.equal(scaleCallCount, 50);

console.log('Passed all memoize call-count caching, factorial, fib, random, and scale tests');
