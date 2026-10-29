import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/repeat-string.json'), 'utf8'));
new Function(prob.solutions[0].code)();

assert.equal('hello'.replicate(3), 'hellohellohello');
assert.equal('code'.replicate(0), '');
console.log('Passed all repeat-string test cases');
