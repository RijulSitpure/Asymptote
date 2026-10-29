import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/date-range-generator.json'), 'utf8'));
const dateRangeGenerator = new Function(prob.solutions[0].code + '; return dateRangeGenerator;')();

const gen = dateRangeGenerator('2023-02-26', '2023-03-03', 2);
assert.equal(gen.next().value, '2023-02-26');
assert.equal(gen.next().value, '2023-02-28');
assert.equal(gen.next().value, '2023-03-02');
assert.equal(gen.next().done, true);
console.log('Passed all date-range-generator test cases');
