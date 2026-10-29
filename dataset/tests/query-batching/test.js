import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/query-batching.json'), 'utf8'));
const QueryBatcher = new Function(prob.solutions[0].code + '; return QueryBatcher;')();

const mockQuery = async (keys) => keys.map(k => 'res_' + k);
const batcher = new QueryBatcher(mockQuery, 10);
const p1 = batcher.getValue('a');
const p2 = batcher.getValue('b');
const [r1, r2] = await Promise.all([p1, p2]);
assert.equal(r1, 'res_a');
assert.equal(r2, 'res_b');
console.log('Passed all query-batching test cases');
