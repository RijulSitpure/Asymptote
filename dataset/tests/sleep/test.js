import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, "../../problems/sleep.json"), "utf8"));
const solCode = prob.solutions[0].code;

const sleep = new Function(solCode + "; return sleep;")();

async function runTests() {
  // Test 1: 50ms
  const t0 = Date.now();
  await sleep(50);
  const elapsed1 = Date.now() - t0;
  assert.ok(elapsed1 >= 45, `Elapsed ${elapsed1}ms is less than 45ms for 50ms sleep`);
  assert.ok(elapsed1 <= 150, `Elapsed ${elapsed1}ms is greater than 150ms for 50ms sleep`);

  // Test 2: 100ms
  const t1 = Date.now();
  await sleep(100);
  const elapsed2 = Date.now() - t1;
  assert.ok(elapsed2 >= 95, `Elapsed ${elapsed2}ms is less than 95ms for 100ms sleep`);
  assert.ok(elapsed2 <= 250, `Elapsed ${elapsed2}ms is greater than 250ms for 100ms sleep`);

  // Test 3: 10ms
  const t2 = Date.now();
  await sleep(10);
  const elapsed3 = Date.now() - t2;
  assert.ok(elapsed3 >= 8, `Elapsed ${elapsed3}ms is less than 8ms for 10ms sleep`);
  assert.ok(elapsed3 <= 80, `Elapsed ${elapsed3}ms is greater than 80ms for 10ms sleep`);

  // Test 4: Concurrent non-blocking promises
  const t3 = Date.now();
  await Promise.all([sleep(50), sleep(50), sleep(50)]);
  const elapsed4 = Date.now() - t3;
  assert.ok(elapsed4 >= 45 && elapsed4 <= 150, `Concurrent 50ms sleeps took ${elapsed4}ms`);

  console.log(`Passed all sleep timing tests: 50ms (${elapsed1}ms), 100ms (${elapsed2}ms), 10ms (${elapsed3}ms), concurrent (${elapsed4}ms)`);
}

runTests().catch(err => {
  console.error("Sleep test failure:", err);
  process.exit(1);
});
