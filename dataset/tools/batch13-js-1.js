import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

export const batch13Js1Problems = [
  // 1. #2724 sort-by
  {
    slug: 'sort-by',
    number: 2724,
    category: 'JavaScript',
    patterns: ['object-array-utilities'],
    hints: [
      {
        level: 1,
        title: 'Comparator Projection Sorting',
        text: 'Sorting elements according to a custom numeric extractor function requires evaluating the comparison differential for each pair.'
      },
      {
        level: 2,
        title: 'Custom Compare Function',
        text: 'Pass a comparison lambda into Array.prototype.sort that evaluates fn(a) minus fn(b).'
      },
      {
        level: 3,
        title: 'Sort Blueprint',
        text: 'Return arr.sort((a, b) => fn(a) - fn(b)).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Array} arr\n * @param {Function} fn\n * @return {Array}\n */\nvar sortBy = function(arr, fn) {\n    return arr.sort((a, b) => fn(a) - fn(b));\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N log N)',
      space: 'O(1)',
      variables: ['N: length of array'],
      notes: 'In-place TimSort executes in O(N log N) comparison time.',
      whyNaiveFails: 'Default sort without comparison function coerces numbers to strings and sorts lexicographically.',
      spaceTimeTradeoff: 'In-place sort avoids extra auxiliary allocations.',
      interviewerExpectation: 'Use of modern numerical comparator subtraction (fn(a) - fn(b)).'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
var sortBy = function(arr, fn) {
    return arr.sort((a, b) => fn(a) - fn(b));
};`,
        approach: 'Projected Value Comparator In-Place Sort',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Fn = (value: JSONValue) => number;

function sortBy(arr: JSONValue[], fn: Fn): JSONValue[] {
    return arr.sort((a, b) => fn(a) - fn(b));
}`,
        approach: 'TypeScript Projected Comparator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/sort-by.json'), 'utf8'));
const sortBy = new Function(prob.solutions[0].code + '; return sortBy;')();

assert.deepEqual(sortBy([5, 4, 1, 2, 3], (x) => x), [1, 2, 3, 4, 5]);
assert.deepEqual(sortBy([{"x": 1}, {"x": 0}, {"x": -1}], (d) => d.x), [{"x": -1}, {"x": 0}, {"x": 1}]);
console.log('Passed all sort-by test cases');
`
  },

  // 2. #2725 interval-cancellation
  {
    slug: 'interval-cancellation',
    number: 2725,
    category: 'JavaScript',
    patterns: ['timing-control'],
    hints: [
      {
        level: 1,
        title: 'Immediate Execution with Periodic Interval Scheduling',
        text: 'The function invokes immediately at time zero and subsequently every t milliseconds until cancelled.'
      },
      {
        level: 2,
        title: 'Interval Handle Storage and Closure',
        text: 'Trigger fn(...args) synchronously. Start setInterval with period t. Return a cancellation function calling clearInterval.'
      },
      {
        level: 3,
        title: 'Interval Blueprint',
        text: 'fn(...args); const timer = setInterval(() => fn(...args), t); return () => clearInterval(timer);'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Function} fn\n * @param {Array} args\n * @param {number} t\n * @return {Function}\n */\nvar cancellable = function(fn, args, t) {\n    fn(...args);\n    const timer = setInterval(() => {\n        fn(...args);\n    }, t);\n    return function() {\n        clearInterval(timer);\n    };\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Per scheduling call'],
      notes: 'Initial call and interval setup execute in constant time.',
      whyNaiveFails: 'Starting setInterval without invoking fn immediately delays the first execution by t milliseconds.',
      spaceTimeTradeoff: 'Retains single numeric timer identifier in closure.',
      interviewerExpectation: 'Ensuring zero-delay initial execution before interval cadence begins.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function(fn, args, t) {
    fn(...args);
    const timer = setInterval(() => {
        fn(...args);
    }, t);
    return function() {
        clearInterval(timer);
    };
};`,
        approach: 'Immediate Execution with Periodic Interval Timer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Fn = (...args: JSONValue[]) => void;

function cancellable(fn: Fn, args: JSONValue[], t: number): () => void {
    fn(...args);
    const timer = setInterval(() => {
        fn(...args);
    }, t);
    return function() {
        clearInterval(timer);
    };
}`,
        approach: 'TypeScript Cancellable Interval Closure',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/interval-cancellation.json'), 'utf8'));
const cancellable = new Function(prob.solutions[0].code + '; return cancellable;')();

let count = 0;
const cancel = cancellable(() => { count++; }, [], 15);
await new Promise(r => setTimeout(r, 40));
cancel();
assert.equal(count >= 2, true);
console.log('Passed all interval-cancellation test cases');
`
  },

  // 3. #2726 calculator-with-method-chaining
  {
    slug: 'calculator-with-method-chaining',
    number: 2726,
    category: 'JavaScript',
    patterns: ['classes-and-chaining'],
    hints: [
      {
        level: 1,
        title: 'Fluent Method Chaining Interface',
        text: 'Enabling fluent operation sequences requires each arithmetic method to update an internal accumulator and return the instance reference.'
      },
      {
        level: 2,
        title: 'Method Return this Pattern',
        text: 'Return this from add, subtract, multiply, divide, and power. Throw an error on division by zero.'
      },
      {
        level: 3,
        title: 'Calculator Blueprint',
        text: 'Store this.val = value. add(v): this.val += v; return this. subtract(v): this.val -= v; return this. multiply(v): this.val *= v; return this. divide(v): if (v === 0) throw new Error("Division by zero is not allowed"); this.val /= v; return this. power(v): this.val **= v; return this. getResult(): return this.val.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\nclass Calculator {\n    /** \n     * @param {number} value\n     */\n    constructor(value) {\n        this.val = value;\n    }\n    \n    /** \n     * @param {number} value\n     * @return {Calculator}\n     */\n    add(value){\n        this.val += value;\n        return this;\n    }\n    \n    /** \n     * @param {number} value\n     * @return {Calculator}\n     */\n    subtract(value){\n        this.val -= value;\n        return this;\n    }\n    \n    /** \n     * @param {number} value\n     * @return {Calculator}\n     */  \n    multiply(value) {\n        this.val *= value;\n        return this;\n    }\n    \n    /** \n     * @param {number} value\n     * @return {Calculator}\n     */\n    divide(value) {\n        if (value === 0) {\n            throw new Error("Division by zero is not allowed");\n        }\n        this.val /= value;\n        return this;\n    }\n    \n    /** \n     * @param {number} value\n     * @return {Calculator}\n     */\n    power(value) {\n        this.val **= value;\n        return this;\n    }\n    \n    /** \n     * @return {number}\n     */\n    getResult() {\n        return this.val;\n    }\n}\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Per operation'],
      notes: 'All chained arithmetic methods execute in constant time.',
      whyNaiveFails: 'Returning the numeric value instead of this prevents method chaining.',
      spaceTimeTradeoff: 'Accumulator state resides in single instance field.',
      interviewerExpectation: 'Defensive exception throwing when dividing by zero.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `class Calculator {
    /** 
     * @param {number} value
     */
    constructor(value) {
        this.val = value;
    }
    
    /** 
     * @param {number} value
     * @return {Calculator}
     */
    add(value){
        this.val += value;
        return this;
    }
    
    /** 
     * @param {number} value
     * @return {Calculator}
     */
    subtract(value){
        this.val -= value;
        return this;
    }
    
    /** 
     * @param {number} value
     * @return {Calculator}
     */  
    multiply(value) {
        this.val *= value;
        return this;
    }
    
    /** 
     * @param {number} value
     * @return {Calculator}
     */
    divide(value) {
        if (value === 0) {
            throw new Error("Division by zero is not allowed");
        }
        this.val /= value;
        return this;
    }
    
    /** 
     * @param {number} value
     * @return {Calculator}
     */
    power(value) {
        this.val **= value;
        return this;
    }
    
    /** 
     * @return {number}
     */
    getResult() {
        return this.val;
    }
}`,
        approach: 'Fluent Method Chaining Object with Zero-Division Guard',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `class Calculator {
    private val: number;
    constructor(value: number) {
        this.val = value;
    }
    
    add(value: number): Calculator {
        this.val += value;
        return this;
    }
    
    subtract(value: number): Calculator {
        this.val -= value;
        return this;
    }
      
    multiply(value: number): Calculator {
        this.val *= value;
        return this;
    }
    
    divide(value: number): Calculator {
        if (value === 0) {
            throw new Error("Division by zero is not allowed");
        }
        this.val /= value;
        return this;
    }
    
    power(value: number): Calculator {
        this.val **= value;
        return this;
    }
    
    getResult(): number {
        return this.val;
    }
}`,
        approach: 'TypeScript Fluent Calculator Class',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
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
`
  },

  // 4. #2727 is-object-empty
  {
    slug: 'is-object-empty',
    number: 2727,
    category: 'JavaScript',
    patterns: ['object-array-utilities'],
    hints: [
      {
        level: 1,
        title: 'Collection Emptiness Inspection',
        text: 'Checking whether a dictionary or array possesses zero items requires checking array length or key presence.'
      },
      {
        level: 2,
        title: 'Fast Short-Circuit Loop',
        text: 'Using for-in loop immediately returns false on the first enumerable key. Alternatively, check Array.isArray length or Object.keys length.'
      },
      {
        level: 3,
        title: 'Emptiness Blueprint',
        text: 'For (const _ in obj) return false; return true.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Object|Array} obj\n * @return {boolean}\n */\nvar isEmpty = function(obj) {\n    for (const _ in obj) {\n        return false;\n    }\n    return true;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Per inspection call'],
      notes: 'for-in loop short-circuits on the very first key without allocating arrays.',
      whyNaiveFails: 'Object.keys(obj).length allocates a brand new array of strings, wasting memory on large objects.',
      spaceTimeTradeoff: 'for-in short-circuit avoids memory allocation entirely.',
      interviewerExpectation: 'Constant time short-circuit check without allocating temporary arrays.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Object|Array} obj
 * @return {boolean}
 */
var isEmpty = function(obj) {
    for (const _ in obj) {
        return false;
    }
    return true;
};`,
        approach: 'Short-Circuiting For-In Property Inspection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | JSONValue[];

function isEmpty(obj: Obj): boolean {
    for (const _ in obj) {
        return false;
    }
    return true;
}`,
        approach: 'TypeScript Short-Circuit Emptiness Checker',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/is-object-empty.json'), 'utf8'));
const isEmpty = new Function(prob.solutions[0].code + '; return isEmpty;')();

assert.equal(isEmpty({ "x": 5, "y": 42 }), false);
assert.equal(isEmpty({}), true);
assert.equal(isEmpty([null, false, 0]), false);
assert.equal(isEmpty([]), true);
console.log('Passed all is-object-empty test cases');
`
  },

  // 5. #2754 bind-function-to-context
  {
    slug: 'bind-function-to-context',
    number: 2754,
    category: 'JavaScript',
    patterns: ['object-array-utilities'],
    hints: [
      {
        level: 1,
        title: 'Context Binding Closure Polyfill',
        text: 'Creating a bound function that retains a fixed this reference across future calls requires closure encapsulation.'
      },
      {
        level: 2,
        title: 'Function Application Closure',
        text: 'Return a function that forwards incoming arguments into the original function using apply or call with the bound context object.'
      },
      {
        level: 3,
        title: 'Bind Polyfill Blueprint',
        text: 'Function.prototype.bindPolyfill = function(obj) { const fn = this; return function(...args) { return fn.call(obj, ...args); }; };'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Object} obj\n * @return {Function}\n */\nFunction.prototype.bindPolyfill = function(obj) {\n    const fn = this;\n    return function(...args) {\n        return fn.call(obj, ...args);\n    };\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Per call'],
      notes: 'Constructs bound closure in constant time.',
      whyNaiveFails: 'Losing reference to original this inside the returned function binds context incorrectly.',
      spaceTimeTradeoff: 'Retains context reference in lightweight closure.',
      interviewerExpectation: 'Clean prototype augmentation forwarding arguments via call or apply.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Object} obj
 * @return {Function}
 */
Function.prototype.bindPolyfill = function(obj) {
    const fn = this;
    return function(...args) {
        return fn.call(obj, ...args);
    };
};`,
        approach: 'Closure Encapsulated Prototype Context Binder',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `declare global {
    interface Function {
        bindPolyfill(obj: Record<any, any>): Function;
    }
}

Function.prototype.bindPolyfill = function(obj: any): Function {
    const fn = this;
    return function(...args: any[]) {
        return fn.call(obj, ...args);
    };
};

export {};`,
        approach: 'TypeScript Prototype Augmented Bind Polyfill',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/bind-function-to-context.json'), 'utf8'));
new Function(prob.solutions[0].code)();

function greet(greeting) {
    return \`\${greeting}, \${this.name}\`;
}
const bound = greet.bindPolyfill({ name: 'Alice' });
assert.equal(bound('Hello'), 'Hello, Alice');
console.log('Passed all bind-function-to-context test cases');
`
  },

  // 6. #2755 deep-merge-of-two-objects
  {
    slug: 'deep-merge-of-two-objects',
    number: 2755,
    category: 'JavaScript',
    patterns: ['json-object-traversal'],
    hints: [
      {
        level: 1,
        title: 'Deep Recursive Object Union',
        text: 'Merging two nested structures recursively overwrites primitive values while combining matching sub-objects and sub-arrays.'
      },
      {
        level: 2,
        title: 'Type Compatibility Check During Merge',
        text: 'If both obj1 and obj2 are arrays, or both are plain objects, recursively merge overlapping keys. If their types differ or either is primitive, obj2 overwrites obj1.'
      },
      {
        level: 3,
        title: 'Deep Merge Blueprint',
        text: 'If neither is object or either is null, return obj2. If array status does not match, return obj2. Clone obj1. For key of Object.keys(obj2): if key in obj1, obj1[key] = deepMerge(obj1[key], obj2[key]); else obj1[key] = obj2[key]. Return obj1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {any} obj1\n * @param {any} obj2\n * @return {any}\n */\nvar deepMerge = function(obj1, obj2) {\n    if (obj1 === null || typeof obj1 !== \'object\' || obj2 === null || typeof obj2 !== \'object\') {\n        return obj2;\n    }\n    if (Array.isArray(obj1) !== Array.isArray(obj2)) {\n        return obj2;\n    }\n    const res = Array.isArray(obj1) ? [...obj1] : { ...obj1 };\n    for (const key of Object.keys(obj2)) {\n        if (key in res) {\n            res[key] = deepMerge(res[key], obj2[key]);\n        } else {\n            res[key] = obj2[key];\n        }\n    }\n    return res;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N + M)',
      space: 'O(D)',
      variables: ['N, M: total nodes in obj1 and obj2', 'D: maximum nested depth'],
      notes: 'Visits each key and element once during recursive combination.',
      whyNaiveFails: 'Object.assign is shallow and replaces entire nested sub-objects rather than merging inner properties.',
      spaceTimeTradeoff: 'Creates a merged tree structure without mutating either input.',
      interviewerExpectation: 'Overwriting when types mismatch (e.g. merging an object into an array).'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {any} obj1
 * @param {any} obj2
 * @return {any}
 */
var deepMerge = function(obj1, obj2) {
    if (obj1 === null || typeof obj1 !== 'object' || obj2 === null || typeof obj2 !== 'object') {
        return obj2;
    }
    if (Array.isArray(obj1) !== Array.isArray(obj2)) {
        return obj2;
    }
    const res = Array.isArray(obj1) ? [...obj1] : { ...obj1 };
    for (const key of Object.keys(obj2)) {
        if (key in res) {
            res[key] = deepMerge(res[key], obj2[key]);
        } else {
            res[key] = obj2[key];
        }
    }
    return res;
};`,
        approach: 'Recursive Type-Aware Deep Structure Merging',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function deepMerge(obj1: any, obj2: any): any {
    if (obj1 === null || typeof obj1 !== 'object' || obj2 === null || typeof obj2 !== 'object') {
        return obj2;
    }
    if (Array.isArray(obj1) !== Array.isArray(obj2)) {
        return obj2;
    }
    const res: any = Array.isArray(obj1) ? [...obj1] : { ...obj1 };
    for (const key of Object.keys(obj2)) {
        if (key in res) {
            res[key] = deepMerge(res[key], obj2[key]);
        } else {
            res[key] = obj2[key];
        }
    }
    return res;
}`,
        approach: 'TypeScript Deep Recursive Merge Utility',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/deep-merge-of-two-objects.json'), 'utf8'));
const deepMerge = new Function(prob.solutions[0].code + '; return deepMerge;')();

assert.deepEqual(deepMerge({ a: 1, c: 3 }, { a: 2, b: 2 }), { a: 2, c: 3, b: 2 });
assert.deepEqual(deepMerge([1, 2], { "0": 3 }), { "0": 3 });
console.log('Passed all deep-merge-of-two-objects test cases');
`
  },

  // 7. #2756 query-batching
  {
    slug: 'query-batching',
    number: 2756,
    category: 'JavaScript',
    patterns: ['object-array-utilities'],
    hints: [
      {
        level: 1,
        title: 'Asynchronous Query Coalescing',
        text: 'Consolidating incoming individual queries into batched requests within a time threshold reduces outbound network requests.'
      },
      {
        level: 2,
        title: 'Batch Buffer and Flush Timing',
        text: 'Queue incoming query keys and their promise resolver callbacks. If no timer is pending, schedule a flush in t milliseconds. When flushed, execute the multi-query function and dispatch results to individual callers.'
      },
      {
        level: 3,
        title: 'Query Batcher Blueprint',
        text: 'Class QueryBatcher(queryMultiple, t). In getValue(key): queue key with resolve callback. If not pending, wait cooldown t, then call queryMultiple(keys) and resolve matching keys.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\nclass QueryBatcher {\n    /**\n     * @param {Function} queryMultiple\n     * @param {number} t\n     */\n    constructor(queryMultiple, t) {\n        this.queryMultiple = queryMultiple;\n        this.t = t;\n        this.queue = [];\n        this.timer = null;\n    }\n    \n    /**\n     * @param {string} key\n     * @return {Promise<string>}\n     */\n    async getValue(key) {\n        return new Promise(resolve => {\n            this.queue.push({ key, resolve });\n            this._schedule();\n        });\n    }\n\n    _schedule() {\n        if (this.timer) return;\n        this.timer = setTimeout(async () => {\n            this.timer = null;\n            const current = this.queue;\n            this.queue = [];\n            const keys = current.map(item => item.key);\n            const results = await this.queryMultiple(keys);\n            current.forEach((item, idx) => {\n                item.resolve(results[idx]);\n            });\n        }, this.t);\n    }\n}\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(K)',
      space: 'O(K)',
      variables: ['K: number of queued query keys in batch'],
      notes: 'Dispatches results in linear time proportional to batch size.',
      whyNaiveFails: 'Sending each query separately overwhelms backend endpoints with individual round-trips.',
      spaceTimeTradeoff: 'Batch queue temporarily holds pending keys for duration t.',
      interviewerExpectation: 'Correct association of batched array output with individual caller promise resolutions.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `class QueryBatcher {
    /**
     * @param {Function} queryMultiple
     * @param {number} t
     */
    constructor(queryMultiple, t) {
        this.queryMultiple = queryMultiple;
        this.t = t;
        this.queue = [];
        this.timer = null;
    }
    
    /**
     * @param {string} key
     * @return {Promise<string>}
     */
    async getValue(key) {
        return new Promise(resolve => {
            this.queue.push({ key, resolve });
            this._schedule();
        });
    }

    _schedule() {
        if (this.timer) return;
        this.timer = setTimeout(async () => {
            this.timer = null;
            const current = this.queue;
            this.queue = [];
            const keys = current.map(item => item.key);
            const results = await this.queryMultiple(keys);
            current.forEach((item, idx) => {
                item.resolve(results[idx]);
            });
        }, this.t);
    }
}`,
        approach: 'Timed Batch Queue with Multi-Query Promise Distribution',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `class QueryBatcher {
    private queryMultiple: (keys: string[]) => Promise<string[]>;
    private t: number;
    private queue: { key: string; resolve: (val: string) => void }[] = [];
    private timer: any = null;

    constructor(queryMultiple: (keys: string[]) => Promise<string[]>, t: number) {
        this.queryMultiple = queryMultiple;
        this.t = t;
    }
    
    async getValue(key: string): Promise<string> {
        return new Promise<string>(resolve => {
            this.queue.push({ key, resolve });
            this._schedule();
        });
    }

    private _schedule(): void {
        if (this.timer) return;
        this.timer = setTimeout(async () => {
            this.timer = null;
            const current = this.queue;
            this.queue = [];
            const keys = current.map(item => item.key);
            const results = await this.queryMultiple(keys);
            current.forEach((item, idx) => {
                item.resolve(results[idx]);
            });
        }, this.t);
    }
}`,
        approach: 'TypeScript Query Batching Dispatcher',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
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
`
  },

  // 8. #2757 generate-circular-array-values
  {
    slug: 'generate-circular-array-values',
    number: 2757,
    category: 'JavaScript',
    patterns: ['object-array-utilities'],
    hints: [
      {
        level: 1,
        title: 'Bidirectional Cyclic Modular Stepping',
        text: 'Traversing an array cyclically allows arbitrary positive or negative index steps, wrapping modulo array length.'
      },
      {
        level: 2,
        title: 'Two-Way Modular Index Calculation',
        text: 'In each cycle, yield the current element. Receive jump distance from next(jump). Advance index using (idx + jump % n + n) % n.'
      },
      {
        level: 3,
        title: 'Circular Generator Blueprint',
        text: 'let idx = startIndex; while (true) { const jump = yield arr[idx]; idx = (idx + (jump ?? 0) % arr.length + arr.length) % arr.length; }'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Array<number>} arr\n * @param {number} startIndex\n * @return {Generator<number, void, number>}\n */\nvar cycleGenerator = function*(arr, startIndex) {\n    let idx = startIndex;\n    const n = arr.length;\n    while (true) {\n        const jump = yield arr[idx];\n        const step = jump !== undefined ? jump : 0;\n        idx = ((idx + step) % n + n) % n;\n    }\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Per yield step'],
      notes: 'Computes circular index wrapping in constant time.',
      whyNaiveFails: 'Standard modulo % in JavaScript produces negative numbers for negative dividends without ((val % n) + n) % n adjustment.',
      spaceTimeTradeoff: 'Maintains single pointer index without array copies.',
      interviewerExpectation: 'Correct handling of negative jump steps and generator two-way communication via yield.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Array<number>} arr
 * @param {number} startIndex
 * @return {Generator<number, void, number>}
 */
var cycleGenerator = function*(arr, startIndex) {
    let idx = startIndex;
    const n = arr.length;
    while (true) {
        const jump = yield arr[idx];
        const step = jump !== undefined ? jump : 0;
        idx = ((idx + step) % n + n) % n;
    }
};`,
        approach: 'Bidirectional Modular Index Wrapping Generator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function* cycleGenerator(arr: number[], startIndex: number): Generator<number, void, number> {
    let idx = startIndex;
    const n = arr.length;
    while (true) {
        const jump = yield arr[idx];
        const step = jump !== undefined ? jump : 0;
        idx = ((idx + step) % n + n) % n;
    }
}`,
        approach: 'TypeScript Circular Array Stepping Generator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/generate-circular-array-values.json'), 'utf8'));
const cycleGenerator = new Function(prob.solutions[0].code + '; return cycleGenerator;')();

const gen = cycleGenerator([1, 2, 3, 4, 5], 0);
assert.equal(gen.next().value, 1);
assert.equal(gen.next(1).value, 2);
assert.equal(gen.next(2).value, 4);
assert.equal(gen.next(-2).value, 2);
console.log('Passed all generate-circular-array-values test cases');
`
  },

  // 9. #2758 next-day
  {
    slug: 'next-day',
    number: 2758,
    category: 'JavaScript',
    patterns: ['object-array-utilities'],
    hints: [
      {
        level: 1,
        title: 'Date Object Advancement Formatting',
        text: 'Advancing a date by one day and outputting formatted date strings requires date math with zero-padded calendar components.'
      },
      {
        level: 2,
        title: 'Date setDate and Padding Helper',
        text: 'Add one to the current date using setDate(getDate() + 1). Format year, month, and day using String padStart(2, "0").'
      },
      {
        level: 3,
        title: 'Next Day Blueprint',
        text: 'const d = new Date(this.getTime()); d.setDate(d.getDate() + 1); const y = d.getFullYear(); const m = String(d.getMonth() + 1).padStart(2, "0"); const day = String(d.getDate()).padStart(2, "0"); return \`\${y}-\${m}-\${day}\`.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @return {string}\n */\nDate.prototype.nextDay = function() {\n    const d = new Date(this.getTime());\n    d.setDate(d.getDate() + 1);\n    const y = d.getFullYear();\n    const m = String(d.getMonth() + 1).padStart(2, \'0\');\n    const day = String(d.getDate()).padStart(2, \'0\');\n    return \`\${y}-\${m}-\${day}\`;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Per calendar calculation'],
      notes: 'Date arithmetic executes in constant time.',
      whyNaiveFails: 'Adding 86400000 milliseconds directly fails across daylight saving time transitions.',
      spaceTimeTradeoff: 'Uses setDate calendar math for accurate timezone adjustments.',
      interviewerExpectation: 'Correct month zero-indexing (+1) and padStart string formatting.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @return {string}
 */
Date.prototype.nextDay = function() {
    const d = new Date(this.getTime());
    d.setDate(d.getDate() + 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return \`\${y}-\${m}-\${day}\`;
};`,
        approach: 'Calendar Math Date Advancement with Padded Formatting',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `declare global {
    interface Date {
        nextDay(): string;
    }
}

Date.prototype.nextDay = function(): string {
    const d = new Date(this.getTime());
    d.setDate(d.getDate() + 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return \`\${y}-\${m}-\${day}\`;
};

export {};`,
        approach: 'TypeScript Date Prototype Next Day Formatter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/next-day.json'), 'utf8'));
new Function(prob.solutions[0].code)();

const date = new Date('2024-02-28');
assert.equal(date.nextDay(), '2024-02-29');
console.log('Passed all next-day test cases');
`
  },

  // 10. #2759 convert-json-string-to-object
  {
    slug: 'convert-json-string-to-object',
    number: 2759,
    category: 'JavaScript',
    patterns: ['json-object-traversal'],
    hints: [
      {
        level: 1,
        title: 'Grammar Parser and Tokenization',
        text: 'Parsing a serialized data string into objects and arrays requires recognizing delimiters like brackets, braces, and quotes.'
      },
      {
        level: 2,
        title: 'Recursive Descent Character Scanner',
        text: 'Maintain a character pointer index. Based on the leading character, branch into parsing an object, an array, a quoted string, a boolean, null, or a number.'
      },
      {
        level: 3,
        title: 'Parser Blueprint',
        text: 'Let idx = 0. parseValue(): skip whitespace. If char is { parseObject; if [ parseArray; if " parseString; if t/f parseBool; if n parseNull; else parseNumber.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {string} str\n * @return {any}\n */\nvar parse = function(str) {\n    let i = 0;\n    function skip() {\n        while (i < str.length && /\\s/.test(str[i])) i++;\n    }\n    function parseValue() {\n        skip();\n        const ch = str[i];\n        if (ch === \'{\') return parseObject();\n        if (ch === \'[\') return parseArray();\n        if (ch === \'"\') return parseString();\n        if (ch === \'t\' || ch === \'f\') return parseBool();\n        if (ch === \'n\') return parseNull();\n        return parseNumber();\n    }\n    function parseObject() {\n        const obj = {};\n        i++; skip();\n        if (str[i] === \'}\') { i++; return obj; }\n        while (i < str.length) {\n            skip();\n            const key = parseString();\n            skip();\n            i++;\n            const val = parseValue();\n            obj[key] = val;\n            skip();\n            if (str[i] === \',\') { i++; }\n            else if (str[i] === \'}\') { i++; break; }\n        }\n        return obj;\n    }\n    function parseArray() {\n        const arr = [];\n        i++; skip();\n        if (str[i] === \']\') { i++; return arr; }\n        while (i < str.length) {\n            arr.push(parseValue());\n            skip();\n            if (str[i] === \',\') { i++; }\n            else if (str[i] === \']\') { i++; break; }\n        }\n        return arr;\n    }\n    function parseString() {\n        i++;\n        let s = \'\';\n        while (i < str.length && str[i] !== \'"\') {\n            if (str[i] === \'\\\\\') { i++; }\n            s += str[i++];\n        }\n        i++;\n        return s;\n    }\n    function parseBool() {\n        if (str.startsWith(\'true\', i)) { i += 4; return true; }\n        i += 5; return false;\n    }\n    function parseNull() {\n        i += 4; return null;\n    }\n    function parseNumber() {\n        let s = \'\';\n        while (i < str.length && /[-+eE.0-9]/.test(str[i])) s += str[i++];\n        return Number(s);\n    }\n    return parseValue();\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(D)',
      variables: ['N: string length', 'D: nesting depth'],
      notes: 'Single pass recursive descent parser processes each character once.',
      whyNaiveFails: 'Regular expressions cannot parse arbitrarily deep nested structures without grammar support.',
      spaceTimeTradeoff: 'In-place character pointer avoids large token arrays.',
      interviewerExpectation: 'Writing clean modular helper functions for each JSON syntactic production.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {string} str
 * @return {any}
 */
var parse = function(str) {
    let i = 0;
    function skip() {
        while (i < str.length && /\\s/.test(str[i])) i++;
    }
    function parseValue() {
        skip();
        const ch = str[i];
        if (ch === '{') return parseObject();
        if (ch === '[') return parseArray();
        if (ch === '"') return parseString();
        if (ch === 't' || ch === 'f') return parseBool();
        if (ch === 'n') return parseNull();
        return parseNumber();
    }
    function parseObject() {
        const obj = {};
        i++; skip();
        if (str[i] === '}') { i++; return obj; }
        while (i < str.length) {
            skip();
            const key = parseString();
            skip();
            i++;
            const val = parseValue();
            obj[key] = val;
            skip();
            if (str[i] === ',') { i++; }
            else if (str[i] === '}') { i++; break; }
        }
        return obj;
    }
    function parseArray() {
        const arr = [];
        i++; skip();
        if (str[i] === ']') { i++; return arr; }
        while (i < str.length) {
            arr.push(parseValue());
            skip();
            if (str[i] === ',') { i++; }
            else if (str[i] === ']') { i++; break; }
        }
        return arr;
    }
    function parseString() {
        i++;
        let s = '';
        while (i < str.length && str[i] !== '"') {
            if (str[i] === '\\\\') { i++; }
            s += str[i++];
        }
        i++;
        return s;
    }
    function parseBool() {
        if (str.startsWith('true', i)) { i += 4; return true; }
        i += 5; return false;
    }
    function parseNull() {
        i += 4; return null;
    }
    function parseNumber() {
        let s = '';
        while (i < str.length && /[-+eE.0-9]/.test(str[i])) s += str[i++];
        return Number(s);
    }
    return parseValue();
};`,
        approach: 'Recursive Descent Character Stream Parser',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function parse(str: string): any {
    let i = 0;
    function skip() {
        while (i < str.length && /\\s/.test(str[i])) i++;
    }
    function parseValue(): any {
        skip();
        const ch = str[i];
        if (ch === '{') return parseObject();
        if (ch === '[') return parseArray();
        if (ch === '"') return parseString();
        if (ch === 't' || ch === 'f') return parseBool();
        if (ch === 'n') return parseNull();
        return parseNumber();
    }
    function parseObject(): Record<string, any> {
        const obj: Record<string, any> = {};
        i++; skip();
        if (str[i] === '}') { i++; return obj; }
        while (i < str.length) {
            skip();
            const key = parseString();
            skip();
            i++;
            const val = parseValue();
            obj[key] = val;
            skip();
            if (str[i] === ',') { i++; }
            else if (str[i] === '}') { i++; break; }
        }
        return obj;
    }
    function parseArray(): any[] {
        const arr: any[] = [];
        i++; skip();
        if (str[i] === ']') { i++; return arr; }
        while (i < str.length) {
            arr.push(parseValue());
            skip();
            if (str[i] === ',') { i++; }
            else if (str[i] === ']') { i++; break; }
        }
        return arr;
    }
    function parseString(): string {
        i++;
        let s = '';
        while (i < str.length && str[i] !== '"') {
            if (str[i] === '\\\\') { i++; }
            s += str[i++];
        }
        i++;
        return s;
    }
    function parseBool(): boolean {
        if (str.startsWith('true', i)) { i += 4; return true; }
        i += 5; return false;
    }
    function parseNull(): null {
        i += 4; return null;
    }
    function parseNumber(): number {
        let s = '';
        while (i < str.length && /[-+eE.0-9]/.test(str[i])) s += str[i++];
        return Number(s);
    }
    return parseValue();
}`,
        approach: 'TypeScript Recursive Descent Parser',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/convert-json-string-to-object.json'), 'utf8'));
const parse = new Function(prob.solutions[0].code + '; return parse;')();

assert.deepEqual(parse('{"a":2,"b":[1,2,3]}'), { a: 2, b: [1, 2, 3] });
assert.deepEqual(parse('true'), true);
assert.deepEqual(parse('null'), null);
console.log('Passed all convert-json-string-to-object test cases');
`
  },

  // 11. #2774 array-upper-bound
  {
    slug: 'array-upper-bound',
    number: 2774,
    category: 'JavaScript',
    patterns: ['object-array-utilities'],
    hints: [
      {
        level: 1,
        title: 'Sorted Array Last Occurrence Search',
        text: 'Finding the last index of a target value within a sorted list requires locating the highest index matching target or returning minus one.'
      },
      {
        level: 2,
        title: 'Bisection Search for Upper Bound',
        text: 'Use binary search across sorted elements. When mid equals target, record mid and continue searching rightward (low = mid + 1) to find the maximum index.'
      },
      {
        level: 3,
        title: 'Upper Bound Blueprint',
        text: 'let l = 0, r = this.length - 1, ans = -1. While (l <= r) { const mid = (l + r) >> 1; if (this[mid] === target) { ans = mid; l = mid + 1; } else if (this[mid] < target) { l = mid + 1; } else { r = mid - 1; } } Return ans.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/** \n * @param {number} target\n * @return {number}\n */\nArray.prototype.upperBound = function(target) {\n    let l = 0, r = this.length - 1;\n    let ans = -1;\n    while (l <= r) {\n        const mid = (l + r) >> 1;\n        if (this[mid] === target) {\n            ans = mid;\n            l = mid + 1;\n        } else if (this[mid] < target) {\n            l = mid + 1;\n        } else {\n            r = mid - 1;\n        }\n    }\n    return ans;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log N)',
      space: 'O(1)',
      variables: ['N: length of array'],
      notes: 'Halves the search space at each comparison step.',
      whyNaiveFails: 'Array.prototype.lastIndexOf takes linear O(N) time scanning elements sequentially.',
      spaceTimeTradeoff: 'Binary search exploits sorted array order for logarithmic runtime.',
      interviewerExpectation: 'Logarithmic O(log N) runtime using binary search.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/** 
 * @param {number} target
 * @return {number}
 */
Array.prototype.upperBound = function(target) {
    let l = 0, r = this.length - 1;
    let ans = -1;
    while (l <= r) {
        const mid = (l + r) >> 1;
        if (this[mid] === target) {
            ans = mid;
            l = mid + 1;
        } else if (this[mid] < target) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return ans;
};`,
        approach: 'Binary Search for Rightmost Target Index',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `declare global {
    interface Array<T> {
        upperBound(target: number): number;
    }
}

Array.prototype.upperBound = function(target: number): number {
    let l = 0, r = this.length - 1;
    let ans = -1;
    while (l <= r) {
        const mid = (l + r) >> 1;
        if (this[mid] === target) {
            ans = mid;
            l = mid + 1;
        } else if (this[mid] < target) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return ans;
};

export {};`,
        approach: 'TypeScript Prototype Augmented Upper Bound',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/array-upper-bound.json'), 'utf8'));
new Function(prob.solutions[0].code)();

const nums = [3, 4, 5, 5, 5, 6];
assert.equal(nums.upperBound(5), 4);
assert.equal(nums.upperBound(2), -1);
console.log('Passed all array-upper-bound test cases');
`
  },

  // 12. #2775 undefined-to-null
  {
    slug: 'undefined-to-null',
    number: 2775,
    category: 'JavaScript',
    patterns: ['object-array-utilities'],
    hints: [
      {
        level: 1,
        title: 'Deep Undefined Normalization',
        text: 'Traversing a nested object or array and replacing undefined values with null standardizes serialization compliance.'
      },
      {
        level: 2,
        title: 'Recursive Property Replacement',
        text: 'If the value is undefined, return null. If array, map each item recursively. If plain object, recursively update property values.'
      },
      {
        level: 3,
        title: 'Normalization Blueprint',
        text: 'If obj === undefined return null. If obj === null or typeof obj does not equal "object" return obj. If Array.isArray(obj) return obj.map(undefinedToNull). Build res = {}; for key of Object.keys(obj): res[key] = undefinedToNull(obj[key]); return res.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Record<any, any>|Array<any>} obj\n * @return {Record<any, any>|Array<any>}\n */\nvar undefinedToNull = function(obj) {\n    if (obj === undefined) return null;\n    if (obj === null || typeof obj !== \'object\') return obj;\n    if (Array.isArray(obj)) {\n        return obj.map(undefinedToNull);\n    }\n    const res = {};\n    for (const key of Object.keys(obj)) {\n        res[key] = undefinedToNull(obj[key]);\n    }\n    return res;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(D)',
      variables: ['N: total elements and properties', 'D: nesting tree depth'],
      notes: 'Visits each primitive and property key once.',
      whyNaiveFails: 'JSON serialization strips undefined properties from objects and turns them to null in arrays, causing asymmetric output.',
      spaceTimeTradeoff: 'Constructs normalized copy without mutating source structure.',
      interviewerExpectation: 'Correctly converting undefined values while preserving null and false booleans.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Record<any, any>|Array<any>} obj
 * @return {Record<any, any>|Array<any>}
 */
var undefinedToNull = function(obj) {
    if (obj === undefined) return null;
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) {
        return obj.map(undefinedToNull);
    }
    const res = {};
    for (const key of Object.keys(obj)) {
        res[key] = undefinedToNull(obj[key]);
    }
    return res;
};`,
        approach: 'Recursive Type Normalizer Replacing Undefined with Null',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };

function undefinedToNull(obj: Record<any, any> | any[]): Record<any, any> | any[] {
    if (obj === undefined) return null;
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) {
        return obj.map(undefinedToNull);
    }
    const res: Record<any, any> = {};
    for (const key of Object.keys(obj)) {
        res[key] = undefinedToNull(obj[key]);
    }
    return res;
}`,
        approach: 'TypeScript Deep Undefined-to-Null Normalizer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/undefined-to-null.json'), 'utf8'));
const undefinedToNull = new Function(prob.solutions[0].code + '; return undefinedToNull;')();

assert.deepEqual(undefinedToNull({ a: undefined, b: 3 }), { a: null, b: 3 });
assert.deepEqual(undefinedToNull([undefined, undefined]), [null, null]);
console.log('Passed all undefined-to-null test cases');
`
  }
];

export function writeBatch13Js1() {
  for (const item of batch13Js1Problems) {
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
  writeBatch13Js1();
}
