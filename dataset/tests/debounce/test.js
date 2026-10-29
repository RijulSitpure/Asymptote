import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/debounce.json'), 'utf8'));
const debounce = new Function(prob.solutions[0].code + '; return debounce;')();

const log = [];
const d = debounce((x) => log.push(x), 50);
d(1);
d(2);
d(3);

setTimeout(() => {
    assert.deepEqual(log, [3]);
    console.log('Passed all debounce test cases');
}, 100);
