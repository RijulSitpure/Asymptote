import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/promise-time-limit.json'), 'utf8'));
const timeLimit = new Function(prob.solutions[0].code + '; return timeLimit;')();

async function run() {
    const fast = timeLimit(async (n) => {
        await new Promise(r => setTimeout(r, 20));
        return n * n;
    }, 100);
    const res = await fast(5);
    assert.equal(res, 25);

    const slow = timeLimit(async () => {
        await new Promise(r => setTimeout(r, 100));
        return 'done';
    }, 20);
    try {
        await slow();
        assert.fail('Should have rejected');
    } catch (err) {
        assert.equal(err, 'Time Limit Exceeded');
    }
    console.log('Passed all promise-time-limit test cases');
}
run();
