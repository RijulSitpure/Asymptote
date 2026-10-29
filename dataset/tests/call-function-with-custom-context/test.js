import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/call-function-with-custom-context.json'), 'utf8'));
new Function(prob.solutions[0].code)();

function tax(price, taxRate) {
    return `${this.item} costs ${price * (1 + taxRate)}`;
}
const ctx = { item: 'Burger' };
const res = tax.callPolyfill(ctx, 10, 0.1);
assert.equal(res, 'Burger costs 11');
console.log('Passed all call-function-with-custom-context test cases');
