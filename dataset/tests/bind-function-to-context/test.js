import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/bind-function-to-context.json'), 'utf8'));
new Function(prob.solutions[0].code)();

function greet(greeting) {
    return `${greeting}, ${this.name}`;
}
const bound = greet.bindPolyfill({ name: 'Alice' });
assert.equal(bound('Hello'), 'Hello, Alice');
console.log('Passed all bind-function-to-context test cases');
