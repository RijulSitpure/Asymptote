import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/convert-object-to-json-string.json'), 'utf8'));
const jsonStringify = new Function(prob.solutions[0].code + '; return jsonStringify;')();

assert.equal(jsonStringify({ y: 1, x: 2 }), '{"y":1,"x":2}');
assert.equal(jsonStringify({ a: "str", b: -12, c: true, d: null }), '{"a":"str","b":-12,"c":true,"d":null}');
assert.equal(jsonStringify([1, "false", false]), '[1,"false",false]');
console.log('Passed all convert-object-to-json-string test cases');
