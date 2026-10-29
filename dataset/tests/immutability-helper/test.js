import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/immutability-helper.json'), 'utf8'));
const Immutable = new Function(prob.solutions[0].code + '; return Immutable;')();

const original = { x: 1, y: 2 };
const helper = new Immutable(original);
const modified = helper.produce(proxy => {
    proxy.x = 10;
});
assert.equal(original.x, 1);
assert.equal(modified.x, 10);
assert.equal(modified.y, 2);
console.log('Passed all immutability-helper test cases');
