import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/group-by.json'), 'utf8'));
new Function(prob.solutions[0].code)();

const arr1 = [{ id: '1' }, { id: '1' }, { id: '2' }];
assert.deepEqual(arr1.groupBy(item => item.id), {
    '1': [{ id: '1' }, { id: '1' }],
    '2': [{ id: '2' }]
});

const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
assert.deepEqual(arr2.groupBy(n => String(n > 5)), {
    'false': [1, 2, 3, 4, 5],
    'true': [6, 7, 8, 9, 10]
});
console.log('Passed all group-by test cases');
