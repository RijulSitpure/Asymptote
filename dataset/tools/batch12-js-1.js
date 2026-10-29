import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

export const batch12Part1Problems = [
  // 1. #2618 check-if-object-instance-of-class
  {
    slug: 'check-if-object-instance-of-class',
    number: 2618,
    category: 'JavaScript',
    patterns: ['classes-and-chaining'],
    hints: [
      {
        level: 1,
        title: 'Prototype Chain Iterative Verification',
        text: 'Determining whether an item is an instance of a constructor requires checking its prototype inheritance link recursively until finding a match or reaching the end of the chain.'
      },
      {
        level: 2,
        title: 'Traversing the Prototype Linkage',
        text: 'Validate that the target constructor is a valid callable function. Use Object.getPrototypeOf repeatedly on the object, comparing against the constructor prototype property.'
      },
      {
        level: 3,
        title: 'Step-by-Step Prototype Loop Blueprint',
        text: 'If obj is null or undefined or classFunction is not function, return false. Let curr = Object(obj). While curr is not null: if Object.getPrototypeOf(curr) === classFunction.prototype return true; curr = Object.getPrototypeOf(curr). Return false.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {any} obj\n * @param {any} classFunction\n * @return {boolean}\n */\nvar checkIfInstanceOf = function(obj, classFunction) {\n    if (obj === null || obj === undefined || typeof classFunction !== \'function\') {\n        return false;\n    }\n    let curr = Object(obj);\n    while (curr !== null) {\n        if (Object.getPrototypeOf(curr) === classFunction.prototype) {\n            return true;\n        }\n        curr = Object.getPrototypeOf(curr);\n    }\n    return false;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(D)',
      space: 'O(1)',
      variables: ['D: prototype chain depth'],
      notes: 'Traverses prototype links linearly in constant extra memory.',
      whyNaiveFails: 'The native instanceof operator returns false for primitive values like numbers or strings even when checking against Number or String.',
      spaceTimeTradeoff: 'Object(obj) wrapping normalizes primitives into prototype-bearing instances without memory overhead.',
      interviewerExpectation: 'Correct handling of primitive values and defensive checks against null or non-function constructors.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {any} obj
 * @param {any} classFunction
 * @return {boolean}
 */
var checkIfInstanceOf = function(obj, classFunction) {
    if (obj === null || obj === undefined || typeof classFunction !== 'function') {
        return false;
    }
    let curr = Object(obj);
    while (curr !== null) {
        if (Object.getPrototypeOf(curr) === classFunction.prototype) {
            return true;
        }
        curr = Object.getPrototypeOf(curr);
    }
    return false;
};`,
        approach: 'Iterative Prototype Chain Walking with Primitive Boxing',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function checkIfInstanceOf(obj: any, classFunction: any): boolean {
    if (obj === null || obj === undefined || typeof classFunction !== 'function') {
        return false;
    }
    let curr: any = Object(obj);
    while (curr !== null) {
        if (Object.getPrototypeOf(curr) === classFunction.prototype) {
            return true;
        }
        curr = Object.getPrototypeOf(curr);
    }
    return false;
}`,
        approach: 'TypeScript Prototype Chain Verification',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/check-if-object-instance-of-class.json'), 'utf8'));
const checkIfInstanceOf = new Function(prob.solutions[0].code + '; return checkIfInstanceOf;')();

assert.equal(checkIfInstanceOf(new Date(), Date), true);
assert.equal(checkIfInstanceOf(Date, Date), false);
assert.equal(checkIfInstanceOf(5, Number), true);
assert.equal(checkIfInstanceOf([], Array), true);
assert.equal(checkIfInstanceOf([], Object), true);
assert.equal(checkIfInstanceOf(null, Object), false);
console.log('Passed all check-if-object-instance-of-class test cases');
`
  },

  // 2. #2630 memoize-ii
  {
    slug: 'memoize-ii',
    number: 2630,
    category: 'JavaScript',
    patterns: ['closures'],
    hints: [
      {
        level: 1,
        title: 'Multi-Argument Reference Tree Caching',
        text: 'Caching function results where parameters include arbitrary objects and primitive types requires establishing an argument tree rather than stringifying keys.'
      },
      {
        level: 2,
        title: 'Trie Structure Over Argument References',
        text: 'Model arguments as a sequence of path transitions in a tree. Each node in the tree holds transitions to next argument nodes using map instances keyed by argument identities.'
      },
      {
        level: 3,
        title: 'Trie Node Traversal Blueprint',
        text: 'Maintain root map and a unique symbol marker for leaf values. In wrapper(...args): traverse node starting from root; for each arg, look up in current map; if absent, create new Map; at end of args, check if leaf symbol exists; if not, compute fn(...args) and store. Return stored leaf value.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Function} fn\n * @return {Function}\n */\nfunction memoize(fn) {\n    const root = new Map();\n    const RESULT = Symbol(\'result\');\n\n    return function(...args) {\n        let curr = root;\n        for (const arg of args) {\n            if (!curr.has(arg)) {\n                curr.set(arg, new Map());\n            }\n            curr = curr.get(arg);\n        }\n        if (curr.has(RESULT)) {\n            return curr.get(RESULT);\n        }\n        const val = fn(...args);\n        curr.set(RESULT, val);\n        return val;\n    };\n}\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(K)',
      space: 'O(N * K)',
      variables: ['K: number of arguments per call', 'N: distinct argument combinations cached'],
      notes: 'Lookup and insertion in the argument trie takes O(K) average time.',
      whyNaiveFails: 'JSON.stringify serializes distinct object references with identical contents into the same string and throws errors on circular references.',
      spaceTimeTradeoff: 'Map keys preserve distinct object identity references by address.',
      interviewerExpectation: 'Handling heterogeneous types including objects and primitives without collision.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
    const root = new Map();
    const RESULT = Symbol('result');

    return function(...args) {
        let curr = root;
        for (const arg of args) {
            if (!curr.has(arg)) {
                curr.set(arg, new Map());
            }
            curr = curr.get(arg);
        }
        if (curr.has(RESULT)) {
            return curr.get(RESULT);
        }
        const val = fn(...args);
        curr.set(RESULT, val);
        return val;
    };
}`,
        approach: 'Argument-Path Tree with Identity Maps and Symbol Result Storage',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type Fn = (...params: any[]) => any;

function memoize(fn: Fn): Fn {
    const root = new Map<any, any>();
    const RESULT = Symbol('result');

    return function(...args: any[]) {
        let curr = root;
        for (const arg of args) {
            if (!curr.has(arg)) {
                curr.set(arg, new Map<any, any>());
            }
            curr = curr.get(arg);
        }
        if (curr.has(RESULT)) {
            return curr.get(RESULT);
        }
        const val = fn(...args);
        curr.set(RESULT, val);
        return val;
    };
}`,
        approach: 'TypeScript Trie Node Memoization',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/memoize-ii.json'), 'utf8'));
const memoize = new Function(prob.solutions[0].code + '; return memoize;')();

let callCount = 0;
const add = (a, b) => { callCount++; return a + b; };
const memAdd = memoize(add);

assert.equal(memAdd(2, 2), 4);
assert.equal(callCount, 1);
assert.equal(memAdd(2, 2), 4);
assert.equal(callCount, 1);
assert.equal(memAdd(1, 2), 3);
assert.equal(callCount, 2);
console.log('Passed all memoize-ii test cases');
`
  },

  // 3. #2632 curry
  {
    slug: 'curry',
    number: 2632,
    category: 'JavaScript',
    patterns: ['higher-order-functions'],
    hints: [
      {
        level: 1,
        title: 'Partial Arity Accumulation',
        text: 'Transforming a multi-parameter function into a sequence of unary or partial invocations accumulates incoming arguments until the formal parameter count is reached.'
      },
      {
        level: 2,
        title: 'Comparing Arity Against Target Length',
        text: 'Inspect the length property of the original target function. If the collected arguments count meets or exceeds arity, invoke the original function; otherwise, return a new closure collecting subsequent arguments.'
      },
      {
        level: 3,
        title: 'Recursive Currying Blueprint',
        text: 'Return curried function that gathers (...args). If args.length >= fn.length, return fn(...args). Else return (...nextArgs) => curried(...args, ...nextArgs).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Function} fn\n * @return {Function}\n */\nvar curry = function(fn) {\n    return function curried(...args) {\n        if (args.length >= fn.length) {\n            return fn(...args);\n        }\n        return function(...nextArgs) {\n            return curried(...args, ...nextArgs);\n        };\n    };\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(A)',
      variables: ['A: total arity parameter count'],
      notes: 'Each invocation performs constant-time argument concatenation.',
      whyNaiveFails: 'Fixed single-argument currying fails when callers pass multiple arguments in a single intermediate call.',
      spaceTimeTradeoff: 'Closures retain collected arguments until the final evaluation executes.',
      interviewerExpectation: 'Inspecting fn.length correctly and allowing variable argument counts per intermediate step.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Function} fn
 * @return {Function}
 */
var curry = function(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return function(...nextArgs) {
            return curried(...args, ...nextArgs);
        };
    };
};`,
        approach: 'Recursive Arity Accumulation with Variadic Closures',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function curry(fn: Function): Function {
    return function curried(...args: any[]): any {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return function(...nextArgs: any[]): any {
            return curried(...args, ...nextArgs);
        };
    };
}`,
        approach: 'TypeScript Variadic Function Currying',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/curry.json'), 'utf8'));
const curry = new Function(prob.solutions[0].code + '; return curry;')();

function sum(a, b, c) { return a + b + c; }
const cSum = curry(sum);
assert.equal(cSum(1)(2)(3), 6);
assert.equal(cSum(1, 2)(3), 6);
assert.equal(cSum(1)(2, 3), 6);
assert.equal(cSum(1, 2, 3), 6);
console.log('Passed all curry test cases');
`
  },

  // 4. #2633 convert-object-to-json-string
  {
    slug: 'convert-object-to-json-string',
    number: 2633,
    category: 'JavaScript',
    patterns: ['json-object-traversal'],
    hints: [
      {
        level: 1,
        title: 'Recursive Serialization Tree Traversal',
        text: 'Converting arbitrary data structures into standard serialized text strings requires discriminating primitives, arrays, and nested dictionaries.'
      },
      {
        level: 2,
        title: 'Type-Specific String Serialization',
        text: 'Format null, booleans, and numbers directly. Wrap strings in double quotes. For arrays, recursively serialize each element separated by commas. For objects, map key-value pairs formatted with colon delimiters.'
      },
      {
        level: 3,
        title: 'Recursive Stringify Blueprint',
        text: 'If obj === null return "null". If typeof obj === "string" return \`"\${obj}"\`. If boolean or number return String(obj). If Array.isArray(obj), map items with jsonStringify and join inside brackets. Otherwise iterate Object.keys(obj) mapping \`"\${k}":\${jsonStringify(obj[k])}\` inside braces.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {any} object\n * @return {string}\n */\nvar jsonStringify = function(object) {\n    if (object === null) return \'null\';\n    if (typeof object === \'string\') return \`"\${object}"\`;\n    if (typeof object === \'number\' || typeof object === \'boolean\') return String(object);\n    if (Array.isArray(object)) {\n        const elements = object.map(item => jsonStringify(item));\n        return \`[\${elements.join(\',\')}]\`;\n    }\n    if (typeof object === \'object\') {\n        const pairs = Object.keys(object).map(key => \`"\${key}":\${jsonStringify(object[key])}\`);\n        return \`{\${pairs.join(\',\')}}\`;\n    }\n    return \'\';\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(D)',
      variables: ['N: total characters/nodes in structure', 'D: recursion call stack depth'],
      notes: 'Visits each key and primitive value once during serialization.',
      whyNaiveFails: 'Generic toString methods produce [object Object] instead of valid double-quoted key-value syntax.',
      spaceTimeTradeoff: 'Direct string concatenation scales with output string size without intermediate buffering.',
      interviewerExpectation: 'Correctly escaping strings and handling null properly since typeof null is object.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {any} object
 * @return {string}
 */
var jsonStringify = function(object) {
    if (object === null) return 'null';
    if (typeof object === 'string') return \`"\${object}"\`;
    if (typeof object === 'number' || typeof object === 'boolean') return String(object);
    if (Array.isArray(object)) {
        const elements = object.map(item => jsonStringify(item));
        return \`[\${elements.join(',')}]\`;
    }
    if (typeof object === 'object') {
        const pairs = Object.keys(object).map(key => \`"\${key}":\${jsonStringify(object[key])}\`);
        return \`{\${pairs.join(',')}}\`;
    }
    return '';
};`,
        approach: 'Recursive Type-Discriminated String Serializer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function jsonStringify(object: any): string {
    if (object === null) return 'null';
    if (typeof object === 'string') return \`"\${object}"\`;
    if (typeof object === 'number' || typeof object === 'boolean') return String(object);
    if (Array.isArray(object)) {
        const elements = object.map(item => jsonStringify(item));
        return \`[\${elements.join(',')}]\`;
    }
    if (typeof object === 'object') {
        const pairs = Object.keys(object).map(key => \`"\${key}":\${jsonStringify(object[key])}\`);
        return \`{\${pairs.join(',')}}\`;
    }
    return '';
}`,
        approach: 'TypeScript Recursive Structural Serializer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
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
`
  },

  // 5. #2636 promise-pool
  {
    slug: 'promise-pool',
    number: 2636,
    category: 'JavaScript',
    patterns: ['promises-async'],
    hints: [
      {
        level: 1,
        title: 'Bounded Concurrency Pipeline Scheduling',
        text: 'Executing an array of asynchronous tasks with a maximum concurrent limit requires launching initial workers and pulling the next task whenever any active worker finishes.'
      },
      {
        level: 2,
        title: 'Worker Thread Emulation with Shared Cursor',
        text: 'Maintain a shared pointer index across workers. Launch n concurrent worker loops. Each worker executes the function at the current index, advances the index, and recursively proceeds until tasks are exhausted.'
      },
      {
        level: 3,
        title: 'Promise Pool Blueprint',
        text: 'Let idx = 0. Define worker function: if idx >= functions.length return; const fn = functions[idx++]; await fn(); return worker(). Launch n workers with Promise.all(Array.from({length: n}, () => worker())).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Function[]} functions\n * @param {number} n\n * @return {Promise<any>}\n */\nvar promisePool = async function(functions, n) {\n    let idx = 0;\n    async function worker() {\n        while (idx < functions.length) {\n            const fn = functions[idx++];\n            await fn();\n        }\n    }\n    const workers = Array.from({ length: Math.min(n, functions.length) }, () => worker());\n    await Promise.all(workers);\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(T)',
      space: 'O(N)',
      variables: ['T: total execution time of all tasks', 'N: concurrency pool capacity'],
      notes: 'Keeps at most N asynchronous tasks concurrently pending in memory.',
      whyNaiveFails: 'Promise.all on all functions launches everything simultaneously, exhausting network or system resources.',
      spaceTimeTradeoff: 'Bounded worker pool maintains high throughput without unbound memory growth.',
      interviewerExpectation: 'Clean worker loop abstraction using async/await with Promise.all.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Function[]} functions
 * @param {number} n
 * @return {Promise<any>}
 */
var promisePool = async function(functions, n) {
    let idx = 0;
    async function worker() {
        while (idx < functions.length) {
            const fn = functions[idx++];
            await fn();
        }
    }
    const workers = Array.from({ length: Math.min(n, functions.length) }, () => worker());
    await Promise.all(workers);
};`,
        approach: 'Concurrent Worker Loops with Shared Task Index',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type F = () => Promise<any>;

async function promisePool(functions: F[], n: number): Promise<any> {
    let idx = 0;
    async function worker(): Promise<void> {
        while (idx < functions.length) {
            const fn = functions[idx++];
            await fn();
        }
    }
    const workers = Array.from({ length: Math.min(n, functions.length) }, () => worker());
    await Promise.all(workers);
}`,
        approach: 'TypeScript Asynchronous Pool Dispatcher',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/promise-pool.json'), 'utf8'));
const promisePool = new Function(prob.solutions[0].code + '; return promisePool;')();

let active = 0;
let maxActive = 0;
const makeTask = (ms) => async () => {
    active++;
    maxActive = Math.max(maxActive, active);
    await new Promise(r => setTimeout(r, ms));
    active--;
};

const tasks = [makeTask(10), makeTask(10), makeTask(10), makeTask(10)];
await promisePool(tasks, 2);
assert.equal(maxActive, 2);
console.log('Passed all promise-pool test cases');
`
  },

  // 6. #2648 generate-fibonacci-sequence
  {
    slug: 'generate-fibonacci-sequence',
    number: 2648,
    category: 'JavaScript',
    patterns: ['higher-order-functions'],
    hints: [
      {
        level: 1,
        title: 'Infinite State Machine Iterator',
        text: 'Generating an unbounded sequence on demand requires a generator function that yields successive terms while maintaining running recurrence state.'
      },
      {
        level: 2,
        title: 'State Transition with Two Variables',
        text: 'Initialize two state variables to zero and one. In an infinite loop, yield the current leading value and advance the pair by setting the next value to their sum.'
      },
      {
        level: 3,
        title: 'Fibonacci Generator Blueprint',
        text: 'Define generator function fibGenerator(). Let a = 0, b = 1. While true: yield a; [a, b] = [b, a + b].'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @return {Generator<number>}\n */\nvar fibGenerator = function*() {\n    let a = 0;\n    let b = 1;\n    while (true) {\n        yield a;\n        [a, b] = [b, a + b];\n    }\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Per-yield step'],
      notes: 'Each yield operation executes in constant time using two numeric registers.',
      whyNaiveFails: 'Precomputing an array of numbers exhausts heap capacity for infinite sequences.',
      spaceTimeTradeoff: 'Lazy evaluation produces values on demand with zero buffer memory.',
      interviewerExpectation: 'Proficiency with generator syntax function* and the yield keyword.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @return {Generator<number>}
 */
var fibGenerator = function*() {
    let a = 0;
    let b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
};`,
        approach: 'Infinite State Generator with Destructured Tuple Reassignment',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function* fibGenerator(): Generator<number, any, number> {
    let a = 0;
    let b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}`,
        approach: 'TypeScript Generator Typed Iterator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/generate-fibonacci-sequence.json'), 'utf8'));
const fibGenerator = new Function(prob.solutions[0].code + '; return fibGenerator;')();

const gen = fibGenerator();
assert.equal(gen.next().value, 0);
assert.equal(gen.next().value, 1);
assert.equal(gen.next().value, 1);
assert.equal(gen.next().value, 2);
assert.equal(gen.next().value, 3);
assert.equal(gen.next().value, 5);
console.log('Passed all generate-fibonacci-sequence test cases');
`
  },

  // 7. #2649 nested-array-generator
  {
    slug: 'nested-array-generator',
    number: 2649,
    category: 'JavaScript',
    patterns: ['object-array-utilities'],
    hints: [
      {
        level: 1,
        title: 'Recursive Tree Stream Flattening',
        text: 'Yielding elements from arbitrarily nested arrays sequentially emulates depth-first in-order leaf traversal.'
      },
      {
        level: 2,
        title: 'Delegating Yield with Recursion',
        text: 'Loop through elements of the active array. If an element is another array, delegate control using yield*; if it is a primitive number, yield it directly.'
      },
      {
        level: 3,
        title: 'Generator Delegation Blueprint',
        text: 'Define function* inorderTraversal(arr). For each item of arr: if Array.isArray(item) yield* inorderTraversal(item); else yield item.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Array} arr\n * @return {Generator}\n */\nvar inorderTraversal = function*(arr) {\n    for (const item of arr) {\n        if (Array.isArray(item)) {\n            yield* inorderTraversal(item);\n        } else {\n            yield item;\n        }\n    }\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(D)',
      variables: ['N: total leaf numbers in array', 'D: maximum nesting depth'],
      notes: 'Each leaf number is yielded once with generator call stack bounded by nesting depth.',
      whyNaiveFails: 'Flattening the array upfront into memory with Array.flat(Infinity) creates unnecessary full copies.',
      spaceTimeTradeoff: 'Lazy yield* delegation consumes zero memory beyond the active traversal stack.',
      interviewerExpectation: 'Use of yield* delegation for recursive sub-generator execution.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Array} arr
 * @return {Generator}
 */
var inorderTraversal = function*(arr) {
    for (const item of arr) {
        if (Array.isArray(item)) {
            yield* inorderTraversal(item);
        } else {
            yield item;
        }
    }
};`,
        approach: 'Recursive Generator with Delegated Yield Star',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type MultidimensionalArray = (MultidimensionalArray | number)[];

function* inorderTraversal(arr: MultidimensionalArray): Generator<number, void, unknown> {
    for (const item of arr) {
        if (Array.isArray(item)) {
            yield* inorderTraversal(item);
        } else {
            yield item;
        }
    }
}`,
        approach: 'TypeScript Recursive Multidimensional Array Generator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/nested-array-generator.json'), 'utf8'));
const inorderTraversal = new Function(prob.solutions[0].code + '; return inorderTraversal;')();

const gen = inorderTraversal([[[6]], [1, 3], []]);
const res = [];
for (const val of gen) res.push(val);
assert.deepEqual(res, [6, 1, 3]);
console.log('Passed all nested-array-generator test cases');
`
  },

  // 8. #2650 design-cancellable-function
  {
    slug: 'design-cancellable-function',
    number: 2650,
    category: 'JavaScript',
    patterns: ['promises-async'],
    hints: [
      {
        level: 1,
        title: 'Cooperative Coroutine Cancellation',
        text: 'Controlling an asynchronous generator with cancellation support requires driving its step progression while listening for an external cancel signal.'
      },
      {
        level: 2,
        title: 'Driving Generator Steps with Throw Handling',
        text: 'Await each yielded promise. If the cancel function is invoked before completion, inject an error into the generator via generator.throw("Cancelled") so it can run catch/finally blocks.'
      },
      {
        level: 3,
        title: 'Step Progression Blueprint',
        text: 'Create promise with resolve/reject. Define step(nextFn, arg): try { res = nextFn(arg) } catch (err) { reject(err); return; } if (res.done) resolve(res.value); else Promise.resolve(res.value).then(v => step(() => generator.next(v)), e => step(() => generator.throw(e))). In cancel(): step(() => generator.throw("Cancelled")). Return [cancel, promise].'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Generator}\n * @return {[Function, Promise]}\n */\nvar cancellable = function(generator) {\n    let cancel;\n    const promise = new Promise((resolve, reject) => {\n        cancel = () => {\n            step(() => generator.throw(\'Cancelled\'));\n        };\n        function step(fn) {\n            let res;\n            try {\n                res = fn();\n            } catch (err) {\n                reject(err);\n                return;\n            }\n            if (res.done) {\n                resolve(res.value);\n                return;\n            }\n            Promise.resolve(res.value).then(\n                val => step(() => generator.next(val)),\n                err => step(() => generator.throw(err))\n            );\n        }\n        step(() => generator.next());\n    });\n    return [cancel, promise];\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(S)',
      space: 'O(1)',
      variables: ['S: number of generator yield steps'],
      notes: 'Each yield step advances the coroutine asynchronously in constant memory.',
      whyNaiveFails: 'Simply rejecting the outer promise leaves the inner generator dangling without executing its finally cleanup blocks.',
      spaceTimeTradeoff: 'generator.throw cleanly unwinds generator state according to standard language semantics.',
      interviewerExpectation: 'Correctly handling generator.throw to allow internal try/catch/finally execution.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Generator}
 * @return {[Function, Promise]}
 */
var cancellable = function(generator) {
    let cancel;
    const promise = new Promise((resolve, reject) => {
        cancel = () => {
            step(() => generator.throw('Cancelled'));
        };
        function step(fn) {
            let res;
            try {
                res = fn();
            } catch (err) {
                reject(err);
                return;
            }
            if (res.done) {
                resolve(res.value);
                return;
            }
            Promise.resolve(res.value).then(
                val => step(() => generator.next(val)),
                err => step(() => generator.throw(err))
            );
        }
        step(() => generator.next());
    });
    return [cancel, promise];
};`,
        approach: 'Async Coroutine Runner with Generator Throw Delegation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function cancellable<T>(generator: Generator<Promise<any>, T, unknown>): [() => void, Promise<T>] {
    let cancel: () => void = () => {};
    const promise = new Promise<T>((resolve, reject) => {
        cancel = () => {
            step(() => generator.throw('Cancelled'));
        };
        function step(fn: () => IteratorResult<Promise<any>, T>) {
            let res: IteratorResult<Promise<any>, T>;
            try {
                res = fn();
            } catch (err) {
                reject(err);
                return;
            }
            if (res.done) {
                resolve(res.value);
                return;
            }
            Promise.resolve(res.value).then(
                val => step(() => generator.next(val)),
                err => step(() => generator.throw(err))
            );
        }
        step(() => generator.next());
    });
    return [cancel, promise];
}`,
        approach: 'TypeScript Cancellable Generator Runner',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/design-cancellable-function.json'), 'utf8'));
const cancellable = new Function(prob.solutions[0].code + '; return cancellable;')();

function* tasks() {
    const val = yield new Promise(r => setTimeout(() => r(42), 10));
    return val * 2;
}
const [cancel, promise] = cancellable(tasks());
const res = await promise;
assert.equal(res, 84);
console.log('Passed all design-cancellable-function test cases');
`
  },

  // 9. #2667 create-hello-world-function
  {
    slug: 'create-hello-world-function',
    number: 2667,
    category: 'JavaScript',
    patterns: ['closures'],
    hints: [
      {
        level: 1,
        title: 'Constant Value Factory Closure',
        text: 'The factory function returns an inner function that always produces the identical greeting string irrespective of passed arguments.'
      },
      {
        level: 2,
        title: 'Rest Parameter Closure',
        text: 'Accept any number of variadic arguments in the inner arrow function and return the literal string.'
      },
      {
        level: 3,
        title: 'Factory Blueprint',
        text: 'Return function(...args) { return "Hello World"; }.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @return {Function}\n */\nvar createHelloWorld = function() {\n    return function(...args) {\n        return "Hello World";\n    };\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Fixed constant return'],
      notes: 'Produces greeting in constant time and space.',
      whyNaiveFails: 'Returning a string directly from createHelloWorld fails because the caller expects a callable function.',
      spaceTimeTradeoff: 'Closure encapsulates static string reference.',
      interviewerExpectation: 'Understanding higher-order function return types and closure encapsulation.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @return {Function}
 */
var createHelloWorld = function() {
    return function(...args) {
        return "Hello World";
    };
};`,
        approach: 'Closure Returning Constant Greeting',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function createHelloWorld() {
    return function(...args: any[]): string {
        return "Hello World";
    };
}`,
        approach: 'TypeScript Higher-Order Constant Function',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/create-hello-world-function.json'), 'utf8'));
const createHelloWorld = new Function(prob.solutions[0].code + '; return createHelloWorld;')();

const f = createHelloWorld();
assert.equal(f(), "Hello World");
assert.equal(f({}, null, 42), "Hello World");
console.log('Passed all create-hello-world-function test cases');
`
  },

  // 10. #2675 array-of-objects-to-matrix
  {
    slug: 'array-of-objects-to-matrix',
    number: 2675,
    category: 'JavaScript',
    patterns: ['object-array-utilities'],
    hints: [
      {
        level: 1,
        title: 'Nested Key Path Flattening and Matrix Alignment',
        text: 'Converting nested dictionaries into tabular format requires gathering all dot-delimited key paths, sorting column names, and generating rows with empty string fallbacks.'
      },
      {
        level: 2,
        title: 'Recursive Path Extraction and Lexicographic Ordering',
        text: 'Recursively extract leaf paths for each object. Collect all distinct paths into a sorted array of column headers. Construct output rows by mapping each column key.'
      },
      {
        level: 3,
        title: 'Matrix Generation Blueprint',
        text: 'For each item in arr, extract map of path -> primitive. Union all unique path keys and sort lexicographically. Build first row from keys. For each item map, append row where cell is map.get(k) ?? "".'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Array} arr\n * @return {Matrix}\n */\nvar jsonToMatrix = function(arr) {\n    function getKeys(obj, prefix = \'\') {\n        if (obj === null || typeof obj !== \'object\') {\n            return { [prefix]: obj };\n        }\n        const res = {};\n        for (const key of Object.keys(obj)) {\n            const p = prefix ? \`\${prefix}.\${key}\` : key;\n            Object.assign(res, getKeys(obj[key], p));\n        }\n        return res;\n    }\n\n    const keyMaps = arr.map(item => getKeys(item));\n    const allKeysSet = new Set();\n    keyMaps.forEach(map => {\n        Object.keys(map).forEach(k => allKeysSet.add(k));\n    });\n    const sortedKeys = Array.from(allKeysSet).sort();\n\n    const matrix = [sortedKeys];\n    for (const map of keyMaps) {\n        const row = sortedKeys.map(k => (k in map ? map[k] : \'\'));\n        matrix.push(row);\n    }\n    return matrix;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N * K + K log K)',
      space: 'O(N * K)',
      variables: ['N: number of objects in input array', 'K: total distinct leaf key paths'],
      notes: 'Extracts leaf paths for each object and sorts unique column headers.',
      whyNaiveFails: 'Top-level Object.keys fails to traverse nested objects and arrays, missing deeply nested column headers.',
      spaceTimeTradeoff: 'Lexicographically sorted header set aligns sparse rows with constant lookup.',
      interviewerExpectation: 'Correct dot-separated path concatenation and handling of null as a primitive.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Array} arr
 * @return {Matrix}
 */
var jsonToMatrix = function(arr) {
    function getKeys(obj, prefix = '') {
        if (obj === null || typeof obj !== 'object') {
            return { [prefix]: obj };
        }
        const res = {};
        for (const key of Object.keys(obj)) {
            const p = prefix ? \`\${prefix}.\${key}\` : key;
            Object.assign(res, getKeys(obj[key], p));
        }
        return res;
    }

    const keyMaps = arr.map(item => getKeys(item));
    const allKeysSet = new Set();
    keyMaps.forEach(map => {
        Object.keys(map).forEach(k => allKeysSet.add(k));
    });
    const sortedKeys = Array.from(allKeysSet).sort();

    const matrix = [sortedKeys];
    for (const map of keyMaps) {
        const row = sortedKeys.map(k => (k in map ? map[k] : ''));
        matrix.push(row);
    }
    return matrix;
};`,
        approach: 'Recursive Path Flattening with Lexicographical Column Alignment',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function jsonToMatrix(arr: any[]): (string | number | boolean | null)[][] {
    function getKeys(obj: any, prefix = ''): Record<string, any> {
        if (obj === null || typeof obj !== 'object') {
            return { [prefix]: obj };
        }
        const res: Record<string, any> = {};
        for (const key of Object.keys(obj)) {
            const p = prefix ? \`\${prefix}.\${key}\` : key;
            Object.assign(res, getKeys(obj[key], p));
        }
        return res;
    }

    const keyMaps = arr.map(item => getKeys(item));
    const allKeysSet = new Set<string>();
    keyMaps.forEach(map => {
        Object.keys(map).forEach(k => allKeysSet.add(k));
    });
    const sortedKeys = Array.from(allKeysSet).sort();

    const matrix: any[][] = [sortedKeys];
    for (const map of keyMaps) {
        const row = sortedKeys.map(k => (k in map ? map[k] : ''));
        matrix.push(row);
    }
    return matrix;
}`,
        approach: 'TypeScript Recursive Key Path Normalizer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/array-of-objects-to-matrix.json'), 'utf8'));
const jsonToMatrix = new Function(prob.solutions[0].code + '; return jsonToMatrix;')();

const input = [{ b: 1, a: 2 }, { b: 3, c: 4 }];
const res = jsonToMatrix(input);
assert.deepEqual(res, [
    ['a', 'b', 'c'],
    [2, 1, ''],
    ['', 3, 4]
]);
console.log('Passed all array-of-objects-to-matrix test cases');
`
  },

  // 11. #2676 throttle
  {
    slug: 'throttle',
    number: 2676,
    category: 'JavaScript',
    patterns: ['timing-control'],
    hints: [
      {
        level: 1,
        title: 'Rate-Limited Invocations with Trailing Execution',
        text: 'Throttling ensures that a target function is triggered at most once per time window, executing immediately on the leading edge and postponing the most recent call to the trailing edge.'
      },
      {
        level: 2,
        title: 'Timer Flag and Trailing Arguments Staging',
        text: 'If no timer is active, execute immediately and set a cooldown timer. If calls arrive during cooldown, save the latest arguments. When cooldown expires, execute with saved arguments if present.'
      },
      {
        level: 3,
        title: 'Throttle Blueprint',
        text: 'Variables: timeoutId = null, nextArgs = null. In wrapper(...args): if timeoutId is null, execute fn(...args) and schedule helper after delay t; otherwise store latest arguments in nextArgs. helper(): if nextArgs exists, invoke fn(...nextArgs), clear nextArgs, and reschedule helper; else reset timeoutId to null.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Function} fn\n * @param {number} t\n * @return {Function}\n */\nvar throttle = function(fn, t) {\n    let timeoutId = null;\n    let nextArgs = null;\n\n    const helper = () => {\n        if (nextArgs) {\n            fn(...nextArgs);\n            nextArgs = null;\n            timeoutId = setTimeout(helper, t);\n        } else {\n            timeoutId = null;\n        }\n    };\n\n    return function(...args) {\n        if (!timeoutId) {\n            fn(...args);\n            timeoutId = setTimeout(helper, t);\n        } else {\n            nextArgs = args;\n        }\n    };\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Per function call'],
      notes: 'Timer scheduling and argument swapping execute in constant time.',
      whyNaiveFails: 'Simple debouncing postpones execution indefinitely while bursts continue, whereas throttling guarantees periodic execution.',
      spaceTimeTradeoff: 'Retaining only the latest arguments avoids memory queues for intermediate suppressed invocations.',
      interviewerExpectation: 'Handling both leading execution and trailing execution with the most recent argument payload.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var throttle = function(fn, t) {
    let timeoutId = null;
    let nextArgs = null;

    const helper = () => {
        if (nextArgs) {
            fn(...nextArgs);
            nextArgs = null;
            timeoutId = setTimeout(helper, t);
        } else {
            timeoutId = null;
        }
    };

    return function(...args) {
        if (!timeoutId) {
            fn(...args);
            timeoutId = setTimeout(helper, t);
        } else {
            nextArgs = args;
        }
    };
};`,
        approach: 'Leading Edge Execution with Trailing Argument Timer Scheduling',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type F = (...args: any[]) => void;

function throttle(fn: F, t: number): F {
    let timeoutId: any = null;
    let nextArgs: any[] | null = null;

    const helper = () => {
        if (nextArgs) {
            fn(...nextArgs);
            nextArgs = null;
            timeoutId = setTimeout(helper, t);
        } else {
            timeoutId = null;
        }
    };

    return function(...args: any[]) {
        if (!timeoutId) {
            fn(...args);
            timeoutId = setTimeout(helper, t);
        } else {
            nextArgs = args;
        }
    };
}`,
        approach: 'TypeScript Rate Limiter with Trailing Queue',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/throttle.json'), 'utf8'));
const throttle = new Function(prob.solutions[0].code + '; return throttle;')();

let calls = [];
const fn = (x) => calls.push(x);
const throttled = throttle(fn, 20);

throttled(1);
throttled(2);
assert.deepEqual(calls, [1]);
await new Promise(r => setTimeout(r, 30));
assert.deepEqual(calls, [1, 2]);
console.log('Passed all throttle test cases');
`
  },

  // 12. #2677 chunk-array
  {
    slug: 'chunk-array',
    number: 2677,
    category: 'JavaScript',
    patterns: ['array-prototype-methods'],
    hints: [
      {
        level: 1,
        title: 'Partitioning Array by Window Spans',
        text: 'Segmenting a list into consecutive chunks of maximum length size requires advancing a step index by size across the array.'
      },
      {
        level: 2,
        title: 'Step Slicing Loop',
        text: 'Iterate index i from zero to array length stepping by size. Extract subarray slice from i to i + size and append to the result container.'
      },
      {
        level: 3,
        title: 'Chunk Loop Blueprint',
        text: 'Initialize chunks = []. For (let i = 0; i < arr.length; i += size) { chunks.push(arr.slice(i, i + size)); } Return chunks.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Array} arr\n * @param {number} size\n * @return {Array}\n */\nvar chunk = function(arr, size) {\n    const chunks = [];\n    for (let i = 0; i < arr.length; i += size) {\n        chunks.push(arr.slice(i, i + size));\n    }\n    return chunks;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: length of array', 'Size: chunk size'],
      notes: 'Slices and shallow-copies each element into a subarray exactly once.',
      whyNaiveFails: 'Pushing individual elements with conditional index checks incurs extra branch evaluations compared to slice.',
      spaceTimeTradeoff: 'Pre-chunking creates a 2D array representation in linear time.',
      interviewerExpectation: 'Correct handling of the trailing chunk when array length is not evenly divisible by size.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
var chunk = function(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};`,
        approach: 'Step Slicing Iteration',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | Array<JSONValue>;

function chunk(arr: Obj[], size: number): Obj[][] {
    const chunks: Obj[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}`,
        approach: 'TypeScript Array Chunk Partitioner',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/chunk-array.json'), 'utf8'));
const chunk = new Function(prob.solutions[0].code + '; return chunk;')();

assert.deepEqual(chunk([1, 2, 3, 4, 5], 1), [[1], [2], [3], [4], [5]]);
assert.deepEqual(chunk([1, 9, 6, 3, 2], 3), [[1, 9, 6], [3, 2]]);
assert.deepEqual(chunk([], 1), []);
console.log('Passed all chunk-array test cases');
`
  },

  // 13. #2690 infinite-method-object
  {
    slug: 'infinite-method-object',
    number: 2690,
    category: 'JavaScript',
    patterns: ['classes-and-chaining'],
    hints: [
      {
        level: 1,
        title: 'Dynamic Property Interception with Proxies',
        text: 'Creating an object that dynamically answers any arbitrary method invocation requires intercepting property lookups.'
      },
      {
        level: 2,
        title: 'Proxy Get Trap Returning Key Names',
        text: 'Wrap an empty target inside a Proxy. In the get trap, return a function that returns the queried property name as a string.'
      },
      {
        level: 3,
        title: 'Proxy Trap Blueprint',
        text: 'Return new Proxy({}, { get(target, prop) { return () => String(prop); } }).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @return {Object}\n */\nvar createInfiniteObject = function() {\n    return new Proxy({}, {\n        get(target, prop) {\n            return () => String(prop);\n        }\n    });\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Per property access'],
      notes: 'Proxy interception evaluates dynamically in constant time.',
      whyNaiveFails: 'Static objects cannot anticipate unknown method identifiers requested at runtime.',
      spaceTimeTradeoff: 'Virtualizing properties via Proxy eliminates upfront property allocation.',
      interviewerExpectation: 'Use of JavaScript Proxy get trap returning closure.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @return {Object}
 */
var createInfiniteObject = function() {
    return new Proxy({}, {
        get(target, prop) {
            return () => String(prop);
        }
    });
};`,
        approach: 'Proxy Get Trap Method Interception',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function createInfiniteObject(): Record<string, () => string> {
    return new Proxy({}, {
        get(target, prop: string) {
            return () => String(prop);
        }
    });
}`,
        approach: 'TypeScript Infinite Proxy Method Interceptor',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/infinite-method-object.json'), 'utf8'));
const createInfiniteObject = new Function(prob.solutions[0].code + '; return createInfiniteObject;')();

const obj = createInfiniteObject();
assert.equal(obj.someMethod(), 'someMethod');
assert.equal(obj.anotherMethod(), 'anotherMethod');
console.log('Passed all infinite-method-object test cases');
`
  }
];

export function writeBatch12Part1() {
  for (const item of batch12Part1Problems) {
    const probData = {
      slug: item.slug,
      number: item.number,
      category: item.category,
      patterns: item.patterns,
      hints: item.hints,
      complexity: item.complexity,
      solutions: item.solutions,
      review: {
        status: 'tested',
        acceptedOnLeetCode: null,
        reviewer: null
      },
      updated: '2026-10-30T00:00:00.000Z'
    };

    const probPath = path.join(rootDir, 'dataset/problems', `${item.slug}.json`);
    fs.writeFileSync(probPath, JSON.stringify(probData, null, 2) + '\n', 'utf8');

    const testDir = path.join(rootDir, 'dataset/tests', item.slug);
    if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

    const metaData = { runner: 'node', testKind: 'deterministic' };
    fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(metaData, null, 2) + '\n', 'utf8');
    fs.writeFileSync(path.join(testDir, 'test.js'), item.testJs, 'utf8');

    console.log(`Generated: #${item.number} ${item.slug} [${item.category}]`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  writeBatch12Part1();
}
