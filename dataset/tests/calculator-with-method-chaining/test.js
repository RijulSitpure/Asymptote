import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/calculator-with-method-chaining.json'), 'utf8'));
const Calculator = new Function(prob.solutions[0].code + '; return Calculator;')();

const calc = new Calculator(10).add(5).subtract(7).multiply(2).divide(4).power(2);
assert.equal(calc.getResult(), 16);
assert.throws(() => new Calculator(10).divide(0), /Division by zero is not allowed/);
console.log('Passed all calculator-with-method-chaining test cases');
