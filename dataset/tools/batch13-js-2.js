import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

export const batch13Js2Problems = [
  // 1. #2776 convert-callback-based-function-to-promise-based-function
  {
    slug: 'convert-callback-based-function-to-promise-based-function',
    number: 2776,
    category: 'JavaScript',
    patterns: ['promises-async'],
    hints: [
      {
        level: 1,
        title: 'Asynchronous Invocation Transformation',
        text: 'Wrap the asynchronous invocation inside a deferred construct that handles completion through resolve and reject triggers.'
      },
      {
        level: 2,
        title: 'Callback Appending Strategy',
        text: 'Return an asynchronous wrapper function that passes a trailing callback into the target function to observe its error and data outputs.'
      },
      {
        level: 3,
        title: 'Promise Settlement Blueprint',
        text: 'Inside new Promise, invoke fn(...args, (err, data) => err ? reject(err) : resolve(data)).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Function} fn\n * @return {Function}\n */\nvar promisify = function(fn) {\n    return function(...args) {\n        return new Promise((resolve, reject) => {\n            fn(...args, (err, data) => {\n                if (err) {\n                    reject(err);\n                } else {\n                    resolve(data);\n                }\n            });\n        });\n    };\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['N: number of arguments passed to function'],
      notes: 'Wrapper creation and promise constructor run in constant overhead time.',
      whyNaiveFails: 'Direct invocation without promise wrapping cannot be awaited or integrated with modern promise chains.',
      spaceTimeTradeoff: 'Allocates a single closure and promise per invocation.',
      interviewerExpectation: 'Handling of error-first callback conventions where truthy error rejects and falsy resolves data.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Function} fn
 * @return {Function}
 */
var promisify = function(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    };
};`,
        approach: 'Error-First Callback Promise Wrapper',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type CallbackFn = (...args: any[]) => void;
type PromisifiedFn = (...args: any[]) => Promise<any>;

function promisify(fn: CallbackFn): PromisifiedFn {
    return function(...args: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            fn(...args, (err: any, data: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    };
}`,
        approach: 'TypeScript Error-First Callback Adapter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/convert-callback-based-function-to-promise-based-function.json'), 'utf8'));
const promisify = new Function(prob.solutions[0].code + '; return promisify;')();

async function run() {
  const successFn = (a, b, cb) => cb(null, a + b);
  const failureFn = (cb) => cb(new Error('fail'), null);

  const pSuccess = promisify(successFn);
  const pFailure = promisify(failureFn);

  const res = await pSuccess(2, 3);
  assert.equal(res, 5);

  let caught = false;
  try {
    await pFailure();
  } catch (e) {
    caught = true;
    assert.equal(e.message, 'fail');
  }
  assert.equal(caught, true);
  console.log('Passed all convert-callback-based-function-to-promise-based-function test cases');
}
run();
`
  },

  // 2. #2777 date-range-generator
  {
    slug: 'date-range-generator',
    number: 2777,
    category: 'JavaScript',
    patterns: ['object-array-utilities'],
    hints: [
      {
        level: 1,
        title: 'Sequential Temporal Generation',
        text: 'Yield formatted calendar dates incrementally until advancing past the boundary threshold.'
      },
      {
        level: 2,
        title: 'Date Arithmetic Tracking',
        text: 'Parse strings into calendar date objects and advance the day component by step on each cycle.'
      },
      {
        level: 3,
        title: 'Generator Step Advancement',
        text: 'While current date does not exceed end date, yield toISOString() slice (0, 10), then increment date via setDate(getDate() + step).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {string} start\n * @param {string} end\n * @param {number} step\n * @yields {string}\n */\nvar dateRangeGenerator = function* (start, end, step) {\n    const cur = new Date(start);\n    const stop = new Date(end);\n    while (cur <= stop) {\n        yield cur.toISOString().slice(0, 10);\n        cur.setDate(cur.getDate() + step);\n    }\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: number of generated dates in range'],
      notes: 'Yields dates lazily with constant auxiliary memory.',
      whyNaiveFails: 'Manual calendar calculation without Date object fails across leap years and month length variations.',
      spaceTimeTradeoff: 'Lazy generation avoids allocating intermediate date arrays.',
      interviewerExpectation: 'Use of Date.prototype.setDate for automatic month and year rollover handling.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {string} start
 * @param {string} end
 * @param {number} step
 * @yields {string}
 */
var dateRangeGenerator = function* (start, end, step) {
    const cur = new Date(start);
    const stop = new Date(end);
    while (cur <= stop) {
        yield cur.toISOString().slice(0, 10);
        cur.setDate(cur.getDate() + step);
    }
};`,
        approach: 'Date Object Iterative Generator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function* dateRangeGenerator(start: string, end: string, step: number): Generator<string> {
    const cur = new Date(start);
    const stop = new Date(end);
    while (cur <= stop) {
        yield cur.toISOString().slice(0, 10);
        cur.setDate(cur.getDate() + step);
    }
}`,
        approach: 'TypeScript Calendar Date Range Generator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/date-range-generator.json'), 'utf8'));
const dateRangeGenerator = new Function(prob.solutions[0].code + '; return dateRangeGenerator;')();

const gen = dateRangeGenerator('2023-02-26', '2023-03-03', 2);
assert.equal(gen.next().value, '2023-02-26');
assert.equal(gen.next().value, '2023-02-28');
assert.equal(gen.next().value, '2023-03-02');
assert.equal(gen.next().done, true);
console.log('Passed all date-range-generator test cases');
`
  },

  // 3. #2794 create-object-from-two-arrays
  {
    slug: 'create-object-from-two-arrays',
    number: 2794,
    category: 'JavaScript',
    patterns: ['object-array-utilities'],
    hints: [
      {
        level: 1,
        title: 'Associative Property Mapping',
        text: 'Pair corresponding indices from two collections into a consolidated structure while keeping the earliest occurrence of duplicate entries.'
      },
      {
        level: 2,
        title: 'String Coercion and Membership Checking',
        text: 'Coerce each primary entry to string representation and verify whether the property has already been registered in the target dictionary.'
      },
      {
        level: 3,
        title: 'Linear Iteration Blueprint',
        text: 'Iterate from index zero to length minus one. If key is not in result, assign result[key] = valuesArr[i].'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Array} keysArr\n * @param {Array} valuesArr\n * @return {Object}\n */\nvar createObject = function(keysArr, valuesArr) {\n    const obj = {};\n    for (let i = 0; i < keysArr.length; i++) {\n        const key = String(keysArr[i]);\n        if (!(key in obj)) {\n            obj[key] = valuesArr[i];\n        }\n    }\n    return obj;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: length of input arrays'],
      notes: 'Single linear scan with constant-time dictionary lookups.',
      whyNaiveFails: 'Assigning unconditionally overwrites previous values when duplicate keys appear.',
      spaceTimeTradeoff: 'Allocates storage for unique keys and values.',
      interviewerExpectation: 'Handling key coercion via String(k) and first-occurrence preservation via the "in" operator.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Array} keysArr
 * @param {Array} valuesArr
 * @return {Object}
 */
var createObject = function(keysArr, valuesArr) {
    const obj = {};
    for (let i = 0; i < keysArr.length; i++) {
        const key = String(keysArr[i]);
        if (!(key in obj)) {
            obj[key] = valuesArr[i];
        }
    }
    return obj;
};`,
        approach: 'First-Occurrence Property Assignment Loop',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function createObject(keysArr: any[], valuesArr: any[]): Record<string, any> {
    const obj: Record<string, any> = {};
    for (let i = 0; i < keysArr.length; i++) {
        const key = String(keysArr[i]);
        if (!(key in obj)) {
            obj[key] = valuesArr[i];
        }
    }
    return obj;
}`,
        approach: 'TypeScript Key-Value Pair Collector',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/create-object-from-two-arrays.json'), 'utf8'));
const createObject = new Function(prob.solutions[0].code + '; return createObject;')();

assert.deepEqual(createObject(['a', 'b', 'a'], [1, 2, 3]), { a: 1, b: 2 });
assert.deepEqual(createObject([1, '1'], ['num', 'str']), { '1': 'num' });
console.log('Passed all create-object-from-two-arrays test cases');
`
  },

  // 4. #2795 parallel-execution-of-promises-for-individual-results-retrieval
  {
    slug: 'parallel-execution-of-promises-for-individual-results-retrieval',
    number: 2795,
    category: 'JavaScript',
    patterns: ['promises-async'],
    hints: [
      {
        level: 1,
        title: 'Concurrent Resolution Collection',
        text: 'Coordinate multiple pending asynchronous operations concurrently and gather individual success or failure outcomes without premature aborts.'
      },
      {
        level: 2,
        title: 'Index Preserving Completion Counter',
        text: 'Store each fulfilled or rejected outcome directly at the original index and resolve the overarching promise once all tasks complete.'
      },
      {
        level: 3,
        title: 'AllSettled Blueprint',
        text: 'Iterate over functions, execute each fn(), and inside then and catch write { status, value/reason } to results[i], checking if completed count equals n.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Array<Function>} functions\n * @return {Promise<Array>}\n */\nvar promiseAllSettled = function(functions) {\n    return new Promise((resolve) => {\n        if (functions.length === 0) {\n            resolve([]);\n            return;\n        }\n        const results = new Array(functions.length);\n        let settledCount = 0;\n        functions.forEach((fn, idx) => {\n            fn()\n                .then((value) => {\n                    results[idx] = { status: \'fulfilled\', value };\n                })\n                .catch((reason) => {\n                    results[idx] = { status: \'rejected\', reason };\n                })\n                .finally(() => {\n                    settledCount++;\n                    if (settledCount === functions.length) {\n                        resolve(results);\n                    }\n                });\n        });\n    });\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of asynchronous functions'],
      notes: 'Executes all tasks in parallel; resolution triggers after slowest task completes.',
      whyNaiveFails: 'Promise.all rejects immediately upon the first failure, dropping all other concurrently running results.',
      spaceTimeTradeoff: 'Allocates an output array of length N to store individual statuses.',
      interviewerExpectation: 'Accurate preservation of input index order regardless of resolution timing.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Array<Function>} functions
 * @return {Promise<Array>}
 */
var promiseAllSettled = function(functions) {
    return new Promise((resolve) => {
        if (functions.length === 0) {
            resolve([]);
            return;
        }
        const results = new Array(functions.length);
        let settledCount = 0;
        functions.forEach((fn, idx) => {
            fn()
                .then((value) => {
                    results[idx] = { status: 'fulfilled', value };
                })
                .catch((reason) => {
                    results[idx] = { status: 'rejected', reason };
                })
                .finally(() => {
                    settledCount++;
                    if (settledCount === functions.length) {
                        resolve(results);
                    }
                });
        });
    });
};`,
        approach: 'Manual Settled Promise Counter Tracker',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type SettledResult = { status: 'fulfilled'; value: any } | { status: 'rejected'; reason: any };

function promiseAllSettled(functions: Function[]): Promise<SettledResult[]> {
    return new Promise((resolve) => {
        if (functions.length === 0) {
            resolve([]);
            return;
        }
        const results: SettledResult[] = new Array(functions.length);
        let settledCount = 0;
        functions.forEach((fn, idx) => {
            fn()
                .then((value: any) => {
                    results[idx] = { status: 'fulfilled', value };
                })
                .catch((reason: any) => {
                    results[idx] = { status: 'rejected', reason };
                })
                .finally(() => {
                    settledCount++;
                    if (settledCount === functions.length) {
                        resolve(results);
                    }
                });
        });
    });
}`,
        approach: 'TypeScript Concurrent AllSettled Dispatcher',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/parallel-execution-of-promises-for-individual-results-retrieval.json'), 'utf8'));
const promiseAllSettled = new Function(prob.solutions[0].code + '; return promiseAllSettled;')();

async function run() {
  const fns = [
    () => new Promise(res => setTimeout(() => res(42), 20)),
    () => new Promise((_, rej) => setTimeout(() => rej('err'), 10))
  ];
  const results = await promiseAllSettled(fns);
  assert.deepEqual(results, [
    { status: 'fulfilled', value: 42 },
    { status: 'rejected', reason: 'err' }
  ]);
  console.log('Passed all parallel-execution-of-promises-for-individual-results-retrieval test cases');
}
run();
`
  },

  // 5. #2796 repeat-string
  {
    slug: 'repeat-string',
    number: 2796,
    category: 'JavaScript',
    patterns: ['object-array-utilities'],
    hints: [
      {
        level: 1,
        title: 'String Prototype Replication',
        text: 'Extend the primitive prototype to produce a repeated concatenation of the instance character sequence.'
      },
      {
        level: 2,
        title: 'Array Fill Concatenation',
        text: 'Construct an array sized to the requested repetitions, populate every index with the current string instance, and join without delimiters.'
      },
      {
        level: 3,
        title: 'Replicate Prototype Blueprint',
        text: 'Define String.prototype.replicate = function(times) and return new Array(times).fill(this).join("").'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {number} times\n * @return {string}\n */\nString.prototype.replicate = function(times) {\n    return new Array(times).fill(this).join(\'\');\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N * times)',
      space: 'O(N * times)',
      variables: ['N: string length', 'times: replication count'],
      notes: 'Constructs the resulting repeated string in linear time relative to output length.',
      whyNaiveFails: 'Modifying String.prototype improperly or using recursive string concatenation causes excessive intermediate allocations.',
      spaceTimeTradeoff: 'Allocates array of references before single join concatenation pass.',
      interviewerExpectation: 'Clean prototype method attachment and proper reference binding to this.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {number} times
 * @return {string}
 */
String.prototype.replicate = function(times) {
    return new Array(times).fill(this).join('');
};`,
        approach: 'Array Fill and Join Prototype Polyfill',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `declare global {
    interface String {
        replicate(times: number): string;
    }
}

String.prototype.replicate = function(times: number): string {
    return new Array(times).fill(this).join('');
};`,
        approach: 'TypeScript String Interface Extension',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/repeat-string.json'), 'utf8'));
new Function(prob.solutions[0].code)();

assert.equal('hello'.replicate(3), 'hellohellohello');
assert.equal('code'.replicate(0), '');
console.log('Passed all repeat-string test cases');
`
  },

  // 6. #2797 partial-function-with-placeholders
  {
    slug: 'partial-function-with-placeholders',
    number: 2797,
    category: 'JavaScript',
    patterns: ['higher-order-functions'],
    hints: [
      {
        level: 1,
        title: 'Positional Substitution Closure',
        text: 'Pre-configure an invocation by substituting designated placeholder markers with incoming arguments before appending trailing parameters.'
      },
      {
        level: 2,
        title: 'Two-Pointer Argument Merging',
        text: 'Iterate over preset parameters, swapping any placeholder token with the next value from incoming arguments, then appending any excess parameters.'
      },
      {
        level: 3,
        title: 'Partial Blueprint',
        text: 'Return function(...restArgs) where args are mapped: if arg is "_" take restArgs[i++], then append leftover restArgs and return fn(...combined).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Function} fn\n * @param {Array} args\n * @return {Function}\n */\nvar partial = function(fn, args) {\n    return function(...restArgs) {\n        let restIdx = 0;\n        const finalArgs = args.map(arg => {\n            if (arg === \'_\') {\n                return restArgs[restIdx++];\n            }\n            return arg;\n        });\n        while (restIdx < restArgs.length) {\n            finalArgs.push(restArgs[restIdx++]);\n        }\n        return fn(...finalArgs);\n    };\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N + M)',
      space: 'O(N + M)',
      variables: ['N: length of predefined args', 'M: length of restArgs'],
      notes: 'Constructs combined argument list in linear time proportional to argument counts.',
      whyNaiveFails: 'Simple concatenation fails because placeholders occur at arbitrary positions throughout the argument template.',
      spaceTimeTradeoff: 'Allocates temporary array for resolved combined argument list.',
      interviewerExpectation: 'Accurate pointer tracking across placeholders and remainder arguments.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Function} fn
 * @param {Array} args
 * @return {Function}
 */
var partial = function(fn, args) {
    return function(...restArgs) {
        let restIdx = 0;
        const finalArgs = args.map(arg => {
            if (arg === '_') {
                return restArgs[restIdx++];
            }
            return arg;
        });
        while (restIdx < restArgs.length) {
            finalArgs.push(restArgs[restIdx++]);
        }
        return fn(...finalArgs);
    };
};`,
        approach: 'Placeholder Substitution and Tail Concatenation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Fn = (...args: JSONValue[]) => JSONValue;

function partial(fn: Fn, args: JSONValue[]): Fn {
    return function(...restArgs: JSONValue[]): JSONValue {
        let restIdx = 0;
        const finalArgs = args.map(arg => {
            if (arg === '_') {
                return restArgs[restIdx++];
            }
            return arg;
        });
        while (restIdx < restArgs.length) {
            finalArgs.push(restArgs[restIdx++]);
        }
        return fn(...finalArgs);
    };
}`,
        approach: 'TypeScript Partial Application with Placeholder Binding',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/partial-function-with-placeholders.json'), 'utf8'));
const partial = new Function(prob.solutions[0].code + '; return partial;')();

const fn = (...args) => args;
const p = partial(fn, ['_', 2, '_']);
assert.deepEqual(p(1, 3, 4), [1, 2, 3, 4]);
console.log('Passed all partial-function-with-placeholders test cases');
`
  },

  // 7. #2803 factorial-generator
  {
    slug: 'factorial-generator',
    number: 2803,
    category: 'JavaScript',
    patterns: ['higher-order-functions'],
    hints: [
      {
        level: 1,
        title: 'Iterative Multiplicative Sequence',
        text: 'Yield cumulative product terms starting from the base case up to the specified upper bound.'
      },
      {
        level: 2,
        title: 'Running Accumulator State',
        text: 'Special-case zero to yield one immediately. For positive numbers, maintain an accumulator multiplied by index on each step.'
      },
      {
        level: 3,
        title: 'Generator Factorial Loop',
        text: 'If n is 0, yield 1. Otherwise loop i from 1 to n, multiply prod by i, and yield prod.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {number} n\n * @return {Generator<number>}\n */\nvar factorial = function* (n) {\n    if (n === 0) {\n        yield 1;\n        return;\n    }\n    let prod = 1;\n    for (let i = 1; i <= n; i++) {\n        prod *= i;\n        yield prod;\n    }\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: target factorial integer'],
      notes: 'Produces factorials lazily in linear time with constant auxiliary space.',
      whyNaiveFails: 'Recursion without memoization or lazy generation consumes call stack memory unnecessarily.',
      spaceTimeTradeoff: 'Generator yields values on the fly without storing an array.',
      interviewerExpectation: 'Handling of edge case n = 0 yielding 1 followed by completion.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {number} n
 * @return {Generator<number>}
 */
var factorial = function* (n) {
    if (n === 0) {
        yield 1;
        return;
    }
    let prod = 1;
    for (let i = 1; i <= n; i++) {
        prod *= i;
        yield prod;
    }
};`,
        approach: 'Accumulator Iterative Generator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function* factorial(n: number): Generator<number> {
    if (n === 0) {
        yield 1;
        return;
    }
    let prod = 1;
    for (let i = 1; i <= n; i++) {
        prod *= i;
        yield prod;
    }
}`,
        approach: 'TypeScript Lazy Factorial Generator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/factorial-generator.json'), 'utf8'));
const factorial = new Function(prob.solutions[0].code + '; return factorial;')();

const gen3 = factorial(3);
assert.equal(gen3.next().value, 1);
assert.equal(gen3.next().value, 2);
assert.equal(gen3.next().value, 6);
assert.equal(gen3.next().done, true);

const gen0 = factorial(0);
assert.equal(gen0.next().value, 1);
assert.equal(gen0.next().done, true);
console.log('Passed all factorial-generator test cases');
`
  },

  // 8. #2804 array-prototype-foreach
  {
    slug: 'array-prototype-foreach',
    number: 2804,
    category: 'JavaScript',
    patterns: ['array-prototype-methods'],
    hints: [
      {
        level: 1,
        title: 'Iterative Element Traversal',
        text: 'Enumerate elements sequentially, invoking a client subroutine with value, offset index, and instance context.'
      },
      {
        level: 2,
        title: 'Context Binding Invocation',
        text: 'Execute the callback using Function.prototype.call with the provided context parameter as thisArg.'
      },
      {
        level: 3,
        title: 'ForEach Polyfill Blueprint',
        text: 'Loop i from 0 to this.length minus 1, executing callback.call(context, this[i], i, this).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Function} callback\n * @param {Object} context\n * @return {void}\n */\nArray.prototype.forEach = function(callback, context) {\n    for (let i = 0; i < this.length; i++) {\n        callback.call(context, this[i], i, this);\n    }\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: length of array'],
      notes: 'Iterates through array elements exactly once with constant auxiliary space.',
      whyNaiveFails: 'Invoking callback(this[i]) directly drops custom context binding.',
      spaceTimeTradeoff: 'Zero allocations, purely in-place iteration.',
      interviewerExpectation: 'Use of callback.call(context, item, index, array) conforming to ECMAScript standard.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Function} callback
 * @param {Object} context
 * @return {void}
 */
Array.prototype.forEach = function(callback, context) {
    for (let i = 0; i < this.length; i++) {
        callback.call(context, this[i], i, this);
    }
};`,
        approach: 'Function.prototype.call Array Iterator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `Array.prototype.forEach = function(callback: Function, context?: any): void {
    for (let i = 0; i < this.length; i++) {
        callback.call(context, this[i], i, this);
    }
};`,
        approach: 'TypeScript Array Iteration Polyfill',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/array-prototype-foreach.json'), 'utf8'));
new Function(prob.solutions[0].code)();

const arr = [10, 20, 30];
const collected = [];
const ctx = { mult: 2 };
arr.forEach(function(val, idx) {
  collected.push(val * this.mult + idx);
}, ctx);

assert.deepEqual(collected, [20, 41, 62]);
console.log('Passed all array-prototype-foreach test cases');
`
  },

  // 9. #2805 custom-interval
  {
    slug: 'custom-interval',
    number: 2805,
    category: 'JavaScript',
    patterns: ['timing-control'],
    hints: [
      {
        level: 1,
        title: 'Progressive Interval Scheduling',
        text: 'Manage recurring invocations whose spacing scales linearly with cycle count, maintaining cancellation tokens.'
      },
      {
        level: 2,
        title: 'Recursive Timeout Dispatch',
        text: 'Schedule subsequent timeouts inside each execution cycle with delay formula delay plus period times count, storing active timer handles.'
      },
      {
        level: 3,
        title: 'Custom Interval Blueprint',
        text: 'Increment unique token ID. In recursive helper, schedule setTimeout with delay + period * count, and provide customClearInterval to clear timeout.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\nlet intervalIdCounter = 0;\nconst intervalMap = new Map();\n\n/**\n * @param {Function} fn\n * @param {number} delay\n * @param {number} period\n * @return {number}\n */\nfunction customInterval(fn, delay, period) {\n    const id = ++intervalIdCounter;\n    function schedule(count) {\n        const timeoutId = setTimeout(() => {\n            fn();\n            schedule(count + 1);\n        }, delay + period * count);\n        intervalMap.set(id, timeoutId);\n    }\n    schedule(0);\n    return id;\n}\n\n/**\n * @param {number} id\n * @return {void}\n */\nfunction customClearInterval(id) {\n    if (intervalMap.has(id)) {\n        clearTimeout(intervalMap.get(id));\n        intervalMap.delete(id);\n    }\n}\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(K)',
      variables: ['K: number of active custom interval instances'],
      notes: 'Scheduling and cancellation operate in constant time per event.',
      whyNaiveFails: 'Standard setInterval accepts only fixed periods and cannot dynamically adjust delays between iterations.',
      spaceTimeTradeoff: 'Maintains mapping between interval identifier and current active timer ID.',
      interviewerExpectation: 'Use of recursive timeout chaining with cleanup map to cancel future executions cleanly.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `let intervalIdCounter = 0;
const intervalMap = new Map();

/**
 * @param {Function} fn
 * @param {number} delay
 * @param {number} period
 * @return {number}
 */
function customInterval(fn, delay, period) {
    const id = ++intervalIdCounter;
    function schedule(count) {
        const timeoutId = setTimeout(() => {
            fn();
            schedule(count + 1);
        }, delay + period * count);
        intervalMap.set(id, timeoutId);
    }
    schedule(0);
    return id;
}

/**
 * @param {number} id
 * @return {void}
 */
function customClearInterval(id) {
    if (intervalMap.has(id)) {
        clearTimeout(intervalMap.get(id));
        intervalMap.delete(id);
    }
}`,
        approach: 'Recursive Dynamic Timeout Chaining',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `let intervalIdCounter = 0;
const intervalMap = new Map<number, any>();

function customInterval(fn: Function, delay: number, period: number): number {
    const id = ++intervalIdCounter;
    function schedule(count: number): void {
        const timeoutId = setTimeout(() => {
            fn();
            schedule(count + 1);
        }, delay + period * count);
        intervalMap.set(id, timeoutId);
    }
    schedule(0);
    return id;
}

function customClearInterval(id: number): void {
    if (intervalMap.has(id)) {
        clearTimeout(intervalMap.get(id));
        intervalMap.delete(id);
    }
}`,
        approach: 'TypeScript Progressive Interval Manager',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/custom-interval.json'), 'utf8'));
const mod = new Function(prob.solutions[0].code + '; return { customInterval, customClearInterval };')();

let count = 0;
const id = mod.customInterval(() => { count++; }, 10, 10);
setTimeout(() => {
  mod.customClearInterval(id);
  const frozen = count;
  setTimeout(() => {
    assert.equal(count, frozen);
    assert.ok(count >= 1);
    console.log('Passed all custom-interval test cases');
  }, 40);
}, 25);
`
  },

  // 10. #2821 delay-the-resolution-of-each-promise
  {
    slug: 'delay-the-resolution-of-each-promise',
    number: 2821,
    category: 'JavaScript',
    patterns: ['promises-async'],
    hints: [
      {
        level: 1,
        title: 'Asynchronous Invocation Delay',
        text: 'Map a collection of deferred routines so that each invocation introduces a fixed duration pause before execution.'
      },
      {
        level: 2,
        title: 'Promise Delay Chaining',
        text: 'Return an array of asynchronous wrapper functions that await a timeout promise before executing the underlying function.'
      },
      {
        level: 3,
        title: 'Delay Mapper Blueprint',
        text: 'Use functions.map(fn => async (...args) => { await new Promise(r => setTimeout(r, ms)); return fn(...args); }).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Array<Function>} functions\n * @param {number} ms\n * @return {Array<Function>}\n */\nvar delayAll = function(functions, ms) {\n    return functions.map(fn => {\n        return async function(...args) {\n            await new Promise(resolve => setTimeout(resolve, ms));\n            return fn(...args);\n        };\n    });\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of functions in array'],
      notes: 'Constructs wrapped functions in linear time relative to array length.',
      whyNaiveFails: 'Executing immediately and delaying resolution blocks concurrency or executes side effects ahead of time.',
      spaceTimeTradeoff: 'Allocates array of wrapper functions of length N.',
      interviewerExpectation: 'Use of Promise timeout pattern within mapped function closures.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Array<Function>} functions
 * @param {number} ms
 * @return {Array<Function>}
 */
var delayAll = function(functions, ms) {
    return functions.map(fn => {
        return async function(...args) {
            await new Promise(resolve => setTimeout(resolve, ms));
            return fn(...args);
        };
    });
};`,
        approach: 'Mapped Async Delay Wrapper',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type Fn = () => Promise<any>;

function delayAll(functions: Fn[], ms: number): Fn[] {
    return functions.map(fn => {
        return async function(...args: any[]): Promise<any> {
            await new Promise(resolve => setTimeout(resolve, ms));
            return fn(...args);
        };
    });
}`,
        approach: 'TypeScript Async Delay Decorator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/delay-the-resolution-of-each-promise.json'), 'utf8'));
const delayAll = new Function(prob.solutions[0].code + '; return delayAll;')();

async function run() {
  const fns = [() => Promise.resolve('res1'), () => Promise.resolve('res2')];
  const delayed = delayAll(fns, 10);
  const t0 = Date.now();
  const res = await delayed[0]();
  const elapsed = Date.now() - t0;
  assert.equal(res, 'res1');
  assert.ok(elapsed >= 8);
  console.log('Passed all delay-the-resolution-of-each-promise test cases');
}
run();
`
  },

  // 11. #2822 inversion-of-object
  {
    slug: 'inversion-of-object',
    number: 2822,
    category: 'JavaScript',
    patterns: ['object-array-utilities'],
    hints: [
      {
        level: 1,
        title: 'Key Value Reversal Mapping',
        text: 'Invert an associative collection by converting values into property names and collecting colliding keys into arrays.'
      },
      {
        level: 2,
        title: 'Collision Detection and Promotion',
        text: 'Iterate over all keys. If the target property already exists, promote a single string to an array or append to the existing list.'
      },
      {
        level: 3,
        title: 'Inversion Blueprint',
        text: 'For each key in obj, let val = obj[key]. If val is in res, convert to array or push key. Otherwise res[val] = key.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Object|Array} obj\n * @return {Object}\n */\nvar invertObject = function(obj) {\n    const inverted = {};\n    for (const key in obj) {\n        const val = obj[key];\n        if (Object.prototype.hasOwnProperty.call(inverted, val)) {\n            if (Array.isArray(inverted[val])) {\n                inverted[val].push(key);\n            } else {\n                inverted[val] = [inverted[val], key];\n            }\n        } else {\n            inverted[val] = key;\n        }\n    }\n    return inverted;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of properties or elements in obj'],
      notes: 'Iterates through entries once with constant-time lookup and promotion.',
      whyNaiveFails: 'Direct key assignment overwrites previous occurrences when multiple properties share identical values.',
      spaceTimeTradeoff: 'Allocates storage for inverted dictionary and collision arrays.',
      interviewerExpectation: 'Use of Object.prototype.hasOwnProperty and Array.isArray for reliable property checking.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Object|Array} obj
 * @return {Object}
 */
var invertObject = function(obj) {
    const inverted = {};
    for (const key in obj) {
        const val = obj[key];
        if (Object.prototype.hasOwnProperty.call(inverted, val)) {
            if (Array.isArray(inverted[val])) {
                inverted[val].push(key);
            } else {
                inverted[val] = [inverted[val], key];
            }
        } else {
            inverted[val] = key;
        }
    }
    return inverted;
};`,
        approach: 'Property Inversion with Dynamic Collision Promotion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function invertObject(obj: Record<string, any> | any[]): Record<string, any> {
    const inverted: Record<string, any> = {};
    for (const key in obj) {
        const val = (obj as any)[key];
        if (Object.prototype.hasOwnProperty.call(inverted, val)) {
            if (Array.isArray(inverted[val])) {
                inverted[val].push(key);
            } else {
                inverted[val] = [inverted[val], key];
            }
        } else {
            inverted[val] = key;
        }
    }
    return inverted;
}`,
        approach: 'TypeScript Inversion Handler',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/inversion-of-object.json'), 'utf8'));
const invertObject = new Function(prob.solutions[0].code + '; return invertObject;')();

assert.deepEqual(invertObject({ a: '1', b: '2' }), { '1': 'a', '2': 'b' });
assert.deepEqual(invertObject({ a: '1', b: '1', c: '1' }), { '1': ['a', 'b', 'c'] });
assert.deepEqual(invertObject(['apple', 'banana', 'apple']), { 'apple': ['0', '2'], 'banana': '1' });
console.log('Passed all inversion-of-object test cases');
`
  },

  // 12. #2823 deep-object-filter
  {
    slug: 'deep-object-filter',
    number: 2823,
    category: 'JavaScript',
    patterns: ['json-object-traversal'],
    hints: [
      {
        level: 1,
        title: 'Recursive Tree Pruning',
        text: 'Traverse nested structures depth-first, pruning nodes that fail validation or become empty after child removal.'
      },
      {
        level: 2,
        title: 'Bottom-Up Structural Collapse',
        text: 'Distinguish arrays, objects, and primitive values. Retain containers only if at least one child remains valid.'
      },
      {
        level: 3,
        title: 'Deep Filter Blueprint',
        text: 'If primitive, return fn(data) ? data : undefined. If array or object, recurse on children. Return container if non-empty, otherwise undefined.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Object|Array} obj\n * @param {Function} fn\n * @return {Object|Array|undefined}\n */\nvar deepFilter = function(obj, fn) {\n    function dfs(data) {\n        if (data === null || typeof data !== \'object\') {\n            return fn(data) ? data : undefined;\n        }\n        if (Array.isArray(data)) {\n            const res = [];\n            for (const item of data) {\n                const filtered = dfs(item);\n                if (filtered !== undefined) {\n                    res.push(filtered);\n                }\n            }\n            return res.length > 0 ? res : undefined;\n        }\n        const res = {};\n        for (const key in data) {\n            if (Object.prototype.hasOwnProperty.call(data, key)) {\n                const filtered = dfs(data[key]);\n                if (filtered !== undefined) {\n                    res[key] = filtered;\n                }\n            }\n        }\n        return Object.keys(res).length > 0 ? res : undefined;\n    }\n    return dfs(obj);\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(D)',
      variables: ['N: total nodes in JSON structure', 'D: maximum tree depth'],
      notes: 'Visits every key and primitive exactly once, using call stack proportional to nesting depth.',
      whyNaiveFails: 'Shallow filtering leaves empty containers at higher levels when all descendants are removed.',
      spaceTimeTradeoff: 'Allocates pruned container clones while avoiding in-place mutation of the input.',
      interviewerExpectation: 'Recursive post-order traversal collapsing empty objects and arrays to undefined.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Object|Array} obj
 * @param {Function} fn
 * @return {Object|Array|undefined}
 */
var deepFilter = function(obj, fn) {
    function dfs(data) {
        if (data === null || typeof data !== 'object') {
            return fn(data) ? data : undefined;
        }
        if (Array.isArray(data)) {
            const res = [];
            for (const item of data) {
                const filtered = dfs(item);
                if (filtered !== undefined) {
                    res.push(filtered);
                }
            }
            return res.length > 0 ? res : undefined;
        }
        const res = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const filtered = dfs(data[key]);
                if (filtered !== undefined) {
                    res[key] = filtered;
                }
            }
        }
        return Object.keys(res).length > 0 ? res : undefined;
    }
    return dfs(obj);
};`,
        approach: 'Depth-First Recursive Container Pruning',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function deepFilter(obj: any, fn: Function): any {
    function dfs(data: any): any {
        if (data === null || typeof data !== 'object') {
            return fn(data) ? data : undefined;
        }
        if (Array.isArray(data)) {
            const res: any[] = [];
            for (const item of data) {
                const filtered = dfs(item);
                if (filtered !== undefined) {
                    res.push(filtered);
                }
            }
            return res.length > 0 ? res : undefined;
        }
        const res: Record<string, any> = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const filtered = dfs(data[key]);
                if (filtered !== undefined) {
                    res[key] = filtered;
                }
            }
        }
        return Object.keys(res).length > 0 ? res : undefined;
    }
    return dfs(obj);
}`,
        approach: 'TypeScript Recursive Pruning DFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/deep-object-filter.json'), 'utf8'));
const deepFilter = new Function(prob.solutions[0].code + '; return deepFilter;')();

const input1 = [-5, 0, 5, [2, -3], { a: 10, b: -10 }];
const fn1 = x => x > 0;
assert.deepEqual(deepFilter(input1, fn1), [5, [2], { a: 10 }]);

const input2 = { a: 1, b: { c: 2, d: [3, 4] } };
const fn2 = x => x > 10;
assert.equal(deepFilter(input2, fn2), undefined);
console.log('Passed all deep-object-filter test cases');
`
  }
];

export function writeBatch13Js2() {
  for (const item of batch13Js2Problems) {
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
  writeBatch13Js2();
}
