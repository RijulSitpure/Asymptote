import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, "../../problems/counter.json"), "utf8"));
const solCode = prob.solutions[0].code;

const fn = new Function(solCode + "; return createCounter;")();

// Test Case 1: Initial positive count
const c1 = fn(10);
assert.equal(c1(), 10);
assert.equal(c1(), 11);
assert.equal(c1(), 12);

// Test Case 2: Initial negative count
const c2 = fn(-2);
assert.equal(c2(), -2);
assert.equal(c2(), -1);
assert.equal(c2(), 0);
assert.equal(c2(), 1);
assert.equal(c2(), 2);

// Test Case 3: Initial zero
const c3 = fn(0);
assert.equal(c3(), 0);
assert.equal(c3(), 1);

// Test Case 4: Independent state encapsulation
const a = fn(100);
const b = fn(500);
assert.equal(a(), 100);
assert.equal(b(), 500);
assert.equal(a(), 101);
assert.equal(b(), 501);

// Test Case 5: 1000 iterations
const c5 = fn(0);
for (let i = 0; i < 1000; i++) {
  assert.equal(c5(), i);
}

console.log("Passed all counter deterministic test cases (5 suites, 1010 assertions)");
