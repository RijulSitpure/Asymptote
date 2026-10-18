import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/filter-elements-from-array.json'), 'utf8'));
const solCode = prob.solutions[0].code;

const filter = new Function(solCode + '; return filter;')();

// Test 1: fn = function greaterThan10(n) { return n > 10; }
assert.deepEqual(filter([0, 10, 20, 30], n => n > 10), [20, 30]);

// Test 2: fn = function firstIndex(n, i) { return i === 0; }
assert.deepEqual(filter([1, 2, 3], (n, i) => i === 0), [1]);

// Test 3: fn = function plusOne(n) { return n + 1 } (truthy testing: 0+1=1 true, -1+1=0 false)
assert.deepEqual(filter([-2, -1, 0, 1, 2], n => n + 1), [-2, 0, 1, 2]);

// Test 4: empty array
assert.deepEqual(filter([], () => true), []);

// Random cases: 25 cases
for (let i = 0; i < 25; i++) {
  const sz = Math.floor(Math.random() * 40);
  const arr = Array.from({ length: sz }, () => Math.floor(Math.random() * 100) - 50);
  const threshold = Math.floor(Math.random() * 50) - 25;
  const pred = (n, idx) => (idx % 2 === 0 ? n > threshold : Boolean(n));
  
  const actual = filter(arr, pred);
  const expected = [];
  for (let j = 0; j < arr.length; j++) {
    if (pred(arr[j], j)) expected.push(arr[j]);
  }
  assert.deepEqual(actual, expected, `Mismatch in random test ${i}`);
}

// Scale test: 10,000 elements
const bigArr = Array.from({ length: 10000 }, (_, i) => i);
const bigFiltered = filter(bigArr, n => n % 2 === 0);
assert.equal(bigFiltered.length, 5000);

console.log('Passed all filter-elements-from-array fixed, truthy, random, and scale tests');
