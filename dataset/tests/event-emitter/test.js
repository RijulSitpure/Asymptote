import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, "../../problems/event-emitter.json"), "utf8"));
const solCode = prob.solutions[0].code;

const EventEmitter = new Function(solCode + "; return EventEmitter;")();

const emitter = new EventEmitter();

// Test 1: emit on non-existent event
assert.deepEqual(emitter.emit("firstEvent"), []);

// Test 2: single subscription and emit
const sub1 = emitter.subscribe("firstEvent", () => 5);
assert.deepEqual(emitter.emit("firstEvent"), [5]);

// Test 3: multiple subscriptions for same event
const sub2 = emitter.subscribe("firstEvent", () => 6);
assert.deepEqual(emitter.emit("firstEvent"), [5, 6]);

// Test 4: unsubscribe first listener
sub1.unsubscribe();
assert.deepEqual(emitter.emit("firstEvent"), [6]);

// Test 5: safe repeated unsubscribe
sub1.unsubscribe();
assert.deepEqual(emitter.emit("firstEvent"), [6]);

// Test 6: unsubscribe second listener
sub2.unsubscribe();
assert.deepEqual(emitter.emit("firstEvent"), []);

// Test 7: arguments passing to listeners
const _sub3 = emitter.subscribe("calc", (a, b) => a + b);
const _sub4 = emitter.subscribe("calc", (a, b) => a * b);
assert.deepEqual(emitter.emit("calc", [3, 4]), [7, 12]);
assert.deepEqual(emitter.emit("calc", [10, 20]), [30, 200]);

// Test 8: distinct event names isolation
const _subA = emitter.subscribe("eventA", (x) => `A:${x}`);
const _subB = emitter.subscribe("eventB", (x) => `B:${x}`);
assert.deepEqual(emitter.emit("eventA", ["hello"]), ["A:hello"]);
assert.deepEqual(emitter.emit("eventB", ["world"]), ["B:world"]);

console.log("Passed all EventEmitter tests (8 test suites, listeners, args, unsubscribe, isolation)");
