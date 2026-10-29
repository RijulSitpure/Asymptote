import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/cache-with-time-limit.json'), 'utf8'));
const TimeLimitedCache = new Function(prob.solutions[0].code + '; return TimeLimitedCache;')();

const cache = new TimeLimitedCache();
assert.equal(cache.set(1, 42, 100), false);
assert.equal(cache.get(1), 42);
assert.equal(cache.count(), 1);
assert.equal(cache.set(1, 50, 100), true);
assert.equal(cache.get(1), 50);

setTimeout(() => {
    assert.equal(cache.get(1), -1);
    assert.equal(cache.count(), 0);
    console.log('Passed all cache-with-time-limit test cases');
}, 150);
