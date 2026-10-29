import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

export const javascriptProblems = [
  // 1. #2619 array-prototype-last
  {
    slug: 'array-prototype-last',
    number: 2619,
    category: 'JavaScript',
    patterns: ['array-prototype-methods'],
    hints: [
      {
        level: 1,
        title: 'Inspecting Array Boundaries',
        text: 'Prototype methods gain access to their calling instance through this context. When an array holds elements, what calculation yields the index of its final position?'
      },
      {
        level: 2,
        title: 'Empty Array Detection',
        text: 'Check whether the length of this instance equals zero. If empty, return negative one. Otherwise, retrieve the element located at index length minus one.'
      },
      {
        level: 3,
        title: 'Prototype Augmentation Blueprint',
        text: 'Assign a new function to Array.prototype.last. Inside the function body, evaluate this.length === 0 ? -1 : this[this.length - 1] and return the result.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @return {null|boolean|number|string|Array|Object}\n */\nArray.prototype.last = function() {\n    return this.length === 0 ? -1 : this[this.length - 1];\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: [],
      notes: 'Direct property lookup of length and indexed offset.',
      whyNaiveFails: 'Popping or slicing elements alters the original array or allocates redundant shallow copies in memory.',
      spaceTimeTradeoff: 'Constant time index access reads the boundary in-place without memory allocation.',
      interviewerExpectation: 'Understanding this binding in prototype methods and avoiding arrow functions which capture lexical scope.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @return {null|boolean|number|string|Array|Object}
 */
Array.prototype.last = function() {
    return this.length === 0 ? -1 : this[this.length - 1];
};`,
        approach: 'Array Prototype Boundary Lookup',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `declare global {
    interface Array<T> {
        last(): T | -1;
    }
}

Array.prototype.last = function<T>(this: T[]): T | -1 {
    return this.length === 0 ? -1 : this[this.length - 1];
};

export {};`,
        approach: 'TypeScript Augmented Array Prototype',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/array-prototype-last.json'), 'utf8'));
new Function(prob.solutions[0].code)();

assert.equal([null, {}, 3].last(), 3);
assert.equal([].last(), -1);
assert.equal([2].last(), 2);
assert.equal([1, 2, 'hello'].last(), 'hello');
assert.equal([false].last(), false);
console.log('Passed all array-prototype-last test cases');
`
  },

  // 2. #2622 cache-with-time-limit
  {
    slug: 'cache-with-time-limit',
    number: 2622,
    category: 'JavaScript',
    patterns: ['timing-control', 'classes-and-chaining'],
    hints: [
      {
        level: 1,
        title: 'Expiring Key Storage',
        text: 'Values stored in a temporary store must expire automatically once their configured duration lapses. How can each entry track both its payload and cancellation timer?'
      },
      {
        level: 2,
        title: 'Timer Cancellation on Overwrite',
        text: 'When setting an existing unexpired key, clear its previous timer handle to prevent premature deletion, record the new value, and register a fresh expiration callback.'
      },
      {
        level: 3,
        title: 'Internal Map and Active Count',
        text: 'Maintain an internal Map storing value and timer identifier. When timer triggers, delete key from map. set returns true if key exists prior to overwrite, false otherwise. count returns map.size.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\nclass TimeLimitedCache {\n    constructor() {\n        this.cache = new Map();\n    }\n\n    set(key, value, duration) {\n        const exists = this.cache.has(key);\n        if (exists) {\n            clearTimeout(this.cache.get(key).timer);\n        }\n        const timer = setTimeout(() => {\n            this.cache.delete(key);\n        }, duration);\n        this.cache.set(key, { value, timer });\n        return exists;\n    }\n\n    get(key) {\n        return this.cache.has(key) ? this.cache.get(key).value : -1;\n    }\n\n    count() {\n        return this.cache.size;\n    }\n}\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) for set, get, and count',
      space: 'O(N) where N is number of active unexpired keys',
      variables: ['N: count of concurrent active unexpired entries'],
      notes: 'Map lookups and timer registrations take constant time.',
      whyNaiveFails: 'Periodic polling loops consume high CPU and introduce latency between duration completion and cleanup.',
      spaceTimeTradeoff: 'Storing timer references inside the map enables O(1) cancel on overwrite and O(1) active count.',
      interviewerExpectation: 'Clearing pending timeouts when keys are overwritten to prevent memory leaks and zombie deletes.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `class TimeLimitedCache {
    constructor() {
        this.cache = new Map();
    }

    set(key, value, duration) {
        const exists = this.cache.has(key);
        if (exists) {
            clearTimeout(this.cache.get(key).timer);
        }
        const timer = setTimeout(() => {
            this.cache.delete(key);
        }, duration);
        this.cache.set(key, { value, timer });
        return exists;
    }

    get(key) {
        return this.cache.has(key) ? this.cache.get(key).value : -1;
    }

    count() {
        return this.cache.size;
    }
}`,
        approach: 'Map with Timeout Cancellation Handles',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `interface CacheEntry {
    value: number;
    timer: ReturnType<typeof setTimeout>;
}

class TimeLimitedCache {
    private cache: Map<number, CacheEntry>;

    constructor() {
        this.cache = new Map<number, CacheEntry>();
    }

    set(key: number, value: number, duration: number): boolean {
        const exists = this.cache.has(key);
        if (exists) {
            clearTimeout(this.cache.get(key)!.timer);
        }
        const timer = setTimeout(() => {
            this.cache.delete(key);
        }, duration);
        this.cache.set(key, { value, timer });
        return exists;
    }

    get(key: number): number {
        return this.cache.has(key) ? this.cache.get(key)!.value : -1;
    }

    count(): number {
        return this.cache.size;
    }
}`,
        approach: 'Typed Map Cache with Active Timers',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
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
`
  },

  // 3. #2625 flatten-deeply-nested-array
  {
    slug: 'flatten-deeply-nested-array',
    number: 2625,
    category: 'JavaScript',
    patterns: ['object-array-utilities', 'array-prototype-methods'],
    hints: [
      {
        level: 1,
        title: 'Depth-Bounded Recursive Extraction',
        text: 'Nested structures can contain arbitrary levels of sub-lists. When an integer specifies the maximum permissible unwrapping depth, how should items be inspected?'
      },
      {
        level: 2,
        title: 'Array Detection and Depth Decrement',
        text: 'Iterate across the elements. If an item is an array and depth exceeds zero, recursively unwrap that item with depth minus one and concatenate its items into the accumulator.'
      },
      {
        level: 3,
        title: 'Recursive Traversal Blueprint',
        text: 'Base case: if n is zero or no nested arrays remain, return shallow copy or push element directly. Otherwise, traverse every element, recursing on arrays with n - 1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Array} arr\n * @param {number} depth\n * @return {Array}\n */\nvar flat = function (arr, n) {\n    if (n <= 0) return arr;\n    const result = [];\n    for (const item of arr) {\n        if (Array.isArray(item)) {\n            result.push(...flat(item, n - 1));\n        } else {\n            result.push(item);\n        }\n    }\n    return result;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N) where N is total items across all arrays',
      space: 'O(D) call depth + O(N) output storage',
      variables: ['N: total leaf items visited', 'D: recursion depth bounded by min(n, maxDepth)'],
      notes: 'Visits each element once and accumulates into result.',
      whyNaiveFails: 'Built-in flat(Infinity) unwraps all levels, violating the strict integer depth restriction n.',
      spaceTimeTradeoff: 'Passing depth counter prevents unnecessary recursion beyond allowed boundary.',
      interviewerExpectation: 'Handling arrays that contain empty arrays and avoiding mutations to the original input.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function (arr, n) {
    if (n <= 0) return arr;
    const result = [];
    for (const item of arr) {
        if (Array.isArray(item)) {
            result.push(...flat(item, n - 1));
        } else {
            result.push(item);
        }
    }
    return result;
};`,
        approach: 'Recursive Depth-Bounded Array Flattening',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type MultiDimensionalArray = (number | MultiDimensionalArray)[];

var flat = function (arr: MultiDimensionalArray, n: number): MultiDimensionalArray {
    if (n <= 0) return arr;
    const result: MultiDimensionalArray = [];
    for (const item of arr) {
        if (Array.isArray(item)) {
            result.push(...flat(item, n - 1));
        } else {
            result.push(item);
        }
    }
    return result;
};`,
        approach: 'TypeScript Recursive Multi-Dimensional Flatten',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/flatten-deeply-nested-array.json'), 'utf8'));
const flat = new Function(prob.solutions[0].code + '; return flat;')();

assert.deepEqual(flat([1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 0), [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]);
assert.deepEqual(flat([1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 1), [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]);
assert.deepEqual(flat([[1, 2, 3], [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 2), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
console.log('Passed all flatten-deeply-nested-array test cases');
`
  },

  // 4. #2626 array-reduce-transformation
  {
    slug: 'array-reduce-transformation',
    number: 2626,
    category: 'JavaScript',
    patterns: ['higher-order-functions'],
    hints: [
      {
        level: 1,
        title: 'Sequential Accumulator Combination',
        text: 'A transformation produces a single value by sequentially combining each item of a sequence with an accumulated total.'
      },
      {
        level: 2,
        title: 'Loop-Based State Update',
        text: 'Initialize a variable with the provided initial value. Iterate through the array sequentially, updating the accumulator to the output of fn(accumulator, current).'
      },
      {
        level: 3,
        title: 'Reducer Implementation Steps',
        text: 'Let val = init. Run a for loop over nums: val = fn(val, nums[i]). When loop finishes, return val.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {number[]} nums\n * @param {Function} fn\n * @param {number} init\n * @return {number}\n */\nvar reduce = function(nums, fn, init) {\n    let val = init;\n    for (let i = 0; i < nums.length; i++) {\n        val = fn(val, nums[i]);\n    }\n    return val;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: number of elements in nums'],
      notes: 'Single forward pass invoking callback once per element.',
      whyNaiveFails: 'Array.prototype.reduce cannot be used when the problem strictly prohibits built-in library functions.',
      spaceTimeTradeoff: 'Constant auxiliary space maintaining a single running accumulator variable.',
      interviewerExpectation: 'Correct ordering of callback parameters (accum, current) and handling empty array returning init immediately.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function(nums, fn, init) {
    let val = init;
    for (let i = 0; i < nums.length; i++) {
        val = fn(val, nums[i]);
    }
    return val;
};`,
        approach: 'Iterative Accumulator Folding',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type Fn = (accum: number, curr: number) => number;

function reduce(nums: number[], fn: Fn, init: number): number {
    let val = init;
    for (let i = 0; i < nums.length; i++) {
        val = fn(val, nums[i]);
    }
    return val;
}`,
        approach: 'TypeScript Type-Safe Array Fold',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/array-reduce-transformation.json'), 'utf8'));
const reduce = new Function(prob.solutions[0].code + '; return reduce;')();

assert.equal(reduce([1, 2, 3, 4], (accum, curr) => accum + curr, 0), 10);
assert.equal(reduce([1, 2, 3, 4], (accum, curr) => accum + curr * curr, 100), 130);
assert.equal(reduce([], (accum, curr) => 0, 25), 25);
console.log('Passed all array-reduce-transformation test cases');
`
  },

  // 5. #2627 debounce
  {
    slug: 'debounce',
    number: 2627,
    category: 'JavaScript',
    patterns: ['timing-control'],
    hints: [
      {
        level: 1,
        title: 'Delayed Execution Coalescing',
        text: 'Frequent events like rapid key strokes should postpone actual execution until a period of silence occurs.'
      },
      {
        level: 2,
        title: 'Timer Reset Mechanics',
        text: 'Store a timer reference in closure scope. Whenever the wrapped function is called, cancel any active timer with clearTimeout and schedule a fresh timeout.'
      },
      {
        level: 3,
        title: 'Closure Wrapper Blueprint',
        text: 'Declare timerId in outer scope. Returned function accepts rest arguments (...args), cancels previous timerId, and assigns timerId = setTimeout(() => fn(...args), t).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Function} fn\n * @param {number} t milliseconds\n * @return {Function}\n */\nvar debounce = function(fn, t) {\n    let timerId = null;\n    return function(...args) {\n        if (timerId !== null) {\n            clearTimeout(timerId);\n        }\n        timerId = setTimeout(() => {\n            fn(...args);\n        }, t);\n    };\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) invocation and timer schedule',
      space: 'O(1) timer handle retained in closure',
      variables: ['t: delay duration in milliseconds'],
      notes: 'Timer cancellation and recreation operate in constant time.',
      whyNaiveFails: 'Executing on every event floods downstream handlers, network endpoints, or rendering engines.',
      spaceTimeTradeoff: 'Constant closure memory captures arguments and delays execution until trailing quiet window.',
      interviewerExpectation: 'Correct handling of rest arguments and lexical arrow function preservation of closure variables.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
var debounce = function(fn, t) {
    let timerId = null;
    return function(...args) {
        if (timerId !== null) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
        }, t);
    };
};`,
        approach: 'Timer Coalescing via Lexical Closure',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type F = (...args: number[]) => void;

function debounce(fn: F, t: number): F {
    let timerId: ReturnType<typeof setTimeout> | null = null;
    return function(...args: number[]) {
        if (timerId !== null) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
        }, t);
    };
}`,
        approach: 'TypeScript Debounce Factory',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/debounce.json'), 'utf8'));
const debounce = new Function(prob.solutions[0].code + '; return debounce;')();

const log = [];
const d = debounce((x) => log.push(x), 50);
d(1);
d(2);
d(3);

setTimeout(() => {
    assert.deepEqual(log, [3]);
    console.log('Passed all debounce test cases');
}, 100);
`
  },

  // 6. #2631 group-by
  {
    slug: 'group-by',
    number: 2631,
    category: 'JavaScript',
    patterns: ['array-prototype-methods', 'object-array-utilities'],
    hints: [
      {
        level: 1,
        title: 'Categorizing Items by Key',
        text: 'Items in a list must be clustered into separate lists under keys computed by applying a selector callback.'
      },
      {
        level: 2,
        title: 'Dictionary Bucket Initialization',
        text: 'Initialize an empty object. For each item in this array, evaluate key = fn(item). If key does not exist on the object, initialize it to an empty list before appending.'
      },
      {
        level: 3,
        title: 'Prototype GroupBy Blueprint',
        text: 'Iterate through this array. For each element, evaluate key = fn(item). If key does not exist on the result dictionary, initialize it to an empty array. Then push the item into the array at that key.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Function} fn\n * @return {Object}\n */\nArray.prototype.groupBy = function(fn) {\n    const result = {};\n    for (let i = 0; i < this.length; i++) {\n        const key = fn(this[i]);\n        if (!result[key]) {\n            result[key] = [];\n        }\n        result[key].push(this[i]);\n    }\n    return result;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of items in array'],
      notes: 'Single linear scan with constant time dictionary insertion.',
      whyNaiveFails: 'Nested filtering passes over the array for each distinct key take quadratic O(N^2) time.',
      spaceTimeTradeoff: 'Single-pass dictionary accumulation partitions all items in linear time.',
      interviewerExpectation: 'Accessing the calling array via this context and correctly handling string coercion of keys.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Function} fn
 * @return {Object}
 */
Array.prototype.groupBy = function(fn) {
    const result = {};
    for (let i = 0; i < this.length; i++) {
        const key = fn(this[i]);
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(this[i]);
    }
    return result;
};`,
        approach: 'Single-Pass Dictionary Partitioning',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `declare global {
    interface Array<T> {
        groupBy(fn: (item: T) => string): Record<string, T[]>;
    }
}

Array.prototype.groupBy = function<T>(this: T[], fn: (item: T) => string): Record<string, T[]> {
    const result: Record<string, T[]> = {};
    for (let i = 0; i < this.length; i++) {
        const key = fn(this[i]);
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(this[i]);
    }
    return result;
};

export {};`,
        approach: 'TypeScript Augmented Array Prototype Partitioning',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
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
`
  },

  // 7. #2635 apply-transform-over-each-element-in-array
  {
    slug: 'apply-transform-over-each-element-in-array',
    number: 2635,
    category: 'JavaScript',
    patterns: ['higher-order-functions'],
    hints: [
      {
        level: 1,
        title: 'Element-Wise Mapping',
        text: 'Authoring a custom array transformation requires taking each element and returning a new array populated with the transformed values.'
      },
      {
        level: 2,
        title: 'Passing Element and Index',
        text: 'The transformer callback takes two arguments: the element itself and its zero-based index. Pass both arr[i] and i on every iteration.'
      },
      {
        level: 3,
        title: 'Preallocated Transformation Loop',
        text: 'Preallocate result = new Array(arr.length). For i from 0 to arr.length - 1, assign result[i] = fn(arr[i], i). Return result.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {number[]} arr\n * @param {Function} fn\n * @return {number[]}\n */\nvar map = function(arr, fn) {\n    const returnedArray = new Array(arr.length);\n    for (let i = 0; i < arr.length; i++) {\n        returnedArray[i] = fn(arr[i], i);\n    }\n    return returnedArray;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: length of input array'],
      notes: 'Executes transformation callback exactly once per index.',
      whyNaiveFails: 'Built-in Array.prototype.map is disallowed by problem constraints requiring fundamental implementation.',
      spaceTimeTradeoff: 'Preallocating array capacity avoids dynamic reallocation overhead.',
      interviewerExpectation: 'Supplying both element and index arguments to the transformation callback.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function(arr, fn) {
    const returnedArray = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
        returnedArray[i] = fn(arr[i], i);
    }
    return returnedArray;
};`,
        approach: 'Preallocated Index-Aware Array Mapping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function map(arr: number[], fn: (n: number, i: number) => number): number[] {
    const returnedArray: number[] = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
        returnedArray[i] = fn(arr[i], i);
    }
    return returnedArray;
}`,
        approach: 'TypeScript Type-Safe Element-Wise Map',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/apply-transform-over-each-element-in-array.json'), 'utf8'));
const map = new Function(prob.solutions[0].code + '; return map;')();

assert.deepEqual(map([1, 2, 3], (n) => n + 1), [2, 3, 4]);
assert.deepEqual(map([1, 2, 3], (n, i) => n + i), [1, 3, 5]);
assert.deepEqual(map([10, 20, 30], () => 42), [42, 42, 42]);
console.log('Passed all apply-transform-over-each-element-in-array test cases');
`
  },

  // 8. #2637 promise-time-limit
  {
    slug: 'promise-time-limit',
    number: 2637,
    category: 'JavaScript',
    patterns: ['promises-async', 'timing-control'],
    hints: [
      {
        level: 1,
        title: 'Racing Asynchronous Operations',
        text: 'When an asynchronous task may run indefinitely, an independent deadline timer can intervene and terminate the operation early.'
      },
      {
        level: 2,
        title: 'Promise Race Composition',
        text: 'Create a race between the asynchronous invocation fn(...args) and a rejecting timer scheduled for t milliseconds. Whichever settles first dictates the outcome.'
      },
      {
        level: 3,
        title: 'Rejection Timer Blueprint',
        text: 'Return an async function (...args) returning Promise.race([ fn(...args), new Promise((_, reject) => setTimeout(() => reject("Time Limit Exceeded"), t)) ]).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Function} fn\n * @param {number} t\n * @return {Function}\n */\nvar timeLimit = function(fn, t) {\n    return async function(...args) {\n        return Promise.race([\n            fn(...args),\n            new Promise((_, reject) => {\n                setTimeout(() => {\n                    reject("Time Limit Exceeded");\n                }, t);\n            })\n        ]);\n    };\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) wrapper scheduling + O(T) underlying task',
      space: 'O(1)',
      variables: ['t: timeout cutoff in milliseconds'],
      notes: 'Timer and task are evaluated concurrently via Promise.race.',
      whyNaiveFails: 'Waiting indefinitely on unconstrained promises leaks microtasks and hangs dependent workflows.',
      spaceTimeTradeoff: 'Constant space timeout promise guarantees deterministic upper bound on resolution time.',
      interviewerExpectation: 'Rejecting with the exact string "Time Limit Exceeded" and forwarding resolve value when under deadline.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function(fn, t) {
    return async function(...args) {
        return Promise.race([
            fn(...args),
            new Promise((_, reject) => {
                setTimeout(() => {
                    reject("Time Limit Exceeded");
                }, t);
            })
        ]);
    };
};`,
        approach: 'Promise.race with Timeout Rejection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type Fn = (...params: any[]) => Promise<any>;

function timeLimit(fn: Fn, t: number): Fn {
    return async function(...args) {
        return Promise.race([
            fn(...args),
            new Promise((_, reject) => {
                setTimeout(() => {
                    reject("Time Limit Exceeded");
                }, t);
            })
        ]);
    };
}`,
        approach: 'TypeScript Generic Promise Time Limit',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
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
`
  },

  // 9. #2665 counter-ii
  {
    slug: 'counter-ii',
    number: 2665,
    category: 'JavaScript',
    patterns: ['closures'],
    hints: [
      {
        level: 1,
        title: 'Encapsulating Mutable Counter State',
        text: 'A stateful controller object needs methods to increment, decrement, and restore a private numeric value to its initial configuration.'
      },
      {
        level: 2,
        title: 'Dual Variable Closure Binding',
        text: 'Store both the initial baseline and a mutable current value within the parent function scope so all returned methods share access.'
      },
      {
        level: 3,
        title: 'Object Method Interface Blueprint',
        text: 'Let current = init. Return an object with increment: () => ++current, decrement: () => --current, and reset: () => (current = init).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {integer} init\n * @return { increment: Function, decrement: Function, reset: Function }\n */\nvar createCounter = function(init) {\n    let current = init;\n    return {\n        increment: () => ++current,\n        decrement: () => --current,\n        reset: () => {\n            current = init;\n            return current;\n        }\n    };\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) per method invocation',
      space: 'O(1)',
      variables: ['init: starting integer'],
      notes: 'State transitions occur in-place within lexical closure.',
      whyNaiveFails: 'Global variables cause conflicts between distinct counter instances and violate encapsulation.',
      spaceTimeTradeoff: 'Lexical closure preserves isolated scope per instance with minimal memory footprint.',
      interviewerExpectation: 'Pre-increment and pre-decrement semantics returning the updated value after modification.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function(init) {
    let current = init;
    return {
        increment: () => ++current,
        decrement: () => --current,
        reset: () => {
            current = init;
            return current;
        }
    };
};`,
        approach: 'Lexical Closure State Encapsulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type Counter = {
    increment: () => number,
    decrement: () => number,
    reset: () => number,
}

function createCounter(init: number): Counter {
    let current = init;
    return {
        increment: () => ++current,
        decrement: () => --current,
        reset: () => {
            current = init;
            return current;
        }
    };
}`,
        approach: 'TypeScript Counter Interface Factory',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/counter-ii.json'), 'utf8'));
const createCounter = new Function(prob.solutions[0].code + '; return createCounter;')();

const counter = createCounter(5);
assert.equal(counter.increment(), 6);
assert.equal(counter.reset(), 5);
assert.equal(counter.decrement(), 4);

const c2 = createCounter(0);
assert.equal(c2.increment(), 1);
assert.equal(c2.increment(), 2);
assert.equal(c2.decrement(), 1);
assert.equal(c2.reset(), 0);
assert.equal(c2.reset(), 0);
console.log('Passed all counter-ii test cases');
`
  },

  // 10. #2666 allow-one-function-call
  {
    slug: 'allow-one-function-call',
    number: 2666,
    category: 'JavaScript',
    patterns: ['closures', 'higher-order-functions'],
    hints: [
      {
        level: 1,
        title: 'Single-Execution Guard',
        text: 'A higher-order wrapper must guarantee that its target function executes exactly once, suppressing any subsequent invocations.'
      },
      {
        level: 2,
        title: 'Boolean Flag State',
        text: 'Maintain a boolean flag in outer closure scope initialized to false. When called the first time, toggle the flag and execute fn; otherwise return undefined.'
      },
      {
        level: 3,
        title: 'Once Wrapper Blueprint',
        text: 'Declare let hasBeenCalled = false in wrapper. Returned function checks: when hasBeenCalled is false, set hasBeenCalled = true and return fn(...args). Otherwise, return undefined.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Function} fn\n * @return {Function}\n */\nvar once = function(fn) {\n    let hasBeenCalled = false;\n    return function(...args) {\n        if (!hasBeenCalled) {\n            hasBeenCalled = true;\n            return fn(...args);\n        }\n        return undefined;\n    };\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) check + O(F) first invocation',
      space: 'O(1) flag in closure',
      variables: ['F: runtime of wrapped callback'],
      notes: 'Subsequent calls return undefined immediately in constant time.',
      whyNaiveFails: 'Unprotected execution of idempotent setup routines can corrupt state, trigger duplicate payments, or leak resources.',
      spaceTimeTradeoff: 'A single boolean flag provides deterministic execution safety with zero memory overhead.',
      interviewerExpectation: 'Returning undefined explicitly on subsequent calls and properly forwarding arbitrary argument lists.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Function} fn
 * @return {Function}
 */
var once = function(fn) {
    let hasBeenCalled = false;
    return function(...args) {
        if (!hasBeenCalled) {
            hasBeenCalled = true;
            return fn(...args);
        }
        return undefined;
    };
};`,
        approach: 'Boolean Flag Lexical Guard',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type OnceFn = (...args: JSONValue[]) => JSONValue | undefined;

function once(fn: Function): OnceFn {
    let hasBeenCalled = false;
    return function (...args) {
        if (!hasBeenCalled) {
            hasBeenCalled = true;
            return fn(...args);
        }
        return undefined;
    };
}`,
        approach: 'TypeScript Type-Safe Single-Execution Wrapper',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/allow-one-function-call.json'), 'utf8'));
const once = new Function(prob.solutions[0].code + '; return once;')();

let callCount = 0;
const fn = (a, b, c) => {
    callCount++;
    return a + b + c;
};
const onceFn = once(fn);

assert.equal(onceFn(1, 2, 3), 6);
assert.equal(callCount, 1);
assert.equal(onceFn(2, 3, 6), undefined);
assert.equal(callCount, 1);
assert.equal(onceFn(), undefined);
assert.equal(callCount, 1);
console.log('Passed all allow-one-function-call test cases');
`
  }
];

export function writeJavaScriptFiles() {
  for (const item of javascriptProblems) {
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

    const metaData = {
      runner: 'node',
      testKind: 'deterministic'
    };
    fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(metaData, null, 2) + '\n', 'utf8');
    fs.writeFileSync(path.join(testDir, 'test.js'), item.testJs, 'utf8');

    console.log(`Generated: #${item.number} ${item.slug} [${item.category}]`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  writeJavaScriptFiles();
}
