import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/next-day.json'), 'utf8'));
new Function(prob.solutions[0].code)();

const date = new Date('2024-02-28');
assert.equal(date.nextDay(), '2024-02-29');
console.log('Passed all next-day test cases');
