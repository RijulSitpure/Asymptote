import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/create-hello-world-function.json'), 'utf8'));
const createHelloWorld = new Function(prob.solutions[0].code + '; return createHelloWorld;')();

const f = createHelloWorld();
assert.equal(f(), "Hello World");
assert.equal(f({}, null, 42), "Hello World");
console.log('Passed all create-hello-world-function test cases');
