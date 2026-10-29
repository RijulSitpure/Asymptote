import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

export const batch12Part2Problems = [
  // 14. #2691 immutability-helper
  {
    slug: 'immutability-helper',
    number: 2691,
    category: 'JavaScript',
    patterns: ['object-array-utilities'],
    hints: [
      {
        level: 1,
        title: 'Structural Copy-on-Write Proxies',
        text: 'Producing an updated version of a nested structure while keeping untouched branches shared requires intercepting mutation attempts and cloning only the modified path.'
      },
      {
        level: 2,
        title: 'Proxy Wrapping and Lazy Cloning',
        text: 'Wrap the root object in a Proxy that intercepts property accesses and mutations. When a mutation occurs, create a shallow copy of that node and bubble the modified clone up to the parent.'
      },
      {
        level: 3,
        title: 'Immutability Proxy Blueprint',
        text: 'Define Immutable class with produce(mutator) method. In produce, create shadow copies along accessed paths using Proxy traps for get and set. Run mutator on proxy and return materialized updated clone.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {any} initVal\n */\nvar Immutable = function(initVal) {\n    this.initVal = initVal;\n};\n\n/**\n * @param {Function} mutator\n * @return {any}\n */\nImmutable.prototype.produce = function(mutator) {\n    const cloned = JSON.parse(JSON.stringify(this.initVal));\n    mutator(cloned);\n    return cloned;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: total size of object tree'],
      notes: 'Produces a clean immutable snapshot containing mutator changes.',
      whyNaiveFails: 'Direct in-place modification mutates the original object reference, violating functional immutability.',
      spaceTimeTradeoff: 'Cloning preserves historical snapshot references safely.',
      interviewerExpectation: 'Understanding structural sharing principles and proxy-based draft mutations.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {any} initVal
 */
var Immutable = function(initVal) {
    this.initVal = initVal;
};

/**
 * @param {Function} mutator
 * @return {any}
 */
Immutable.prototype.produce = function(mutator) {
    const cloned = JSON.parse(JSON.stringify(this.initVal));
    mutator(cloned);
    return cloned;
};`,
        approach: 'Deep Clone Snapshot with Mutator Application',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `class Immutable {
    private initVal: any;
    constructor(initVal: any) {
        this.initVal = initVal;
    }

    produce(mutator: (draft: any) => void): any {
        const cloned = JSON.parse(JSON.stringify(this.initVal));
        mutator(cloned);
        return cloned;
    }
}`,
        approach: 'TypeScript Immutable Helper Class',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/immutability-helper.json'), 'utf8'));
const Immutable = new Function(prob.solutions[0].code + '; return Immutable;')();

const original = { x: 1, y: 2 };
const helper = new Immutable(original);
const modified = helper.produce(proxy => {
    proxy.x = 10;
});
assert.equal(original.x, 1);
assert.equal(modified.x, 10);
assert.equal(modified.y, 2);
console.log('Passed all immutability-helper test cases');
`
  },

  // 15. #2692 make-object-immutable
  {
    slug: 'make-object-immutable',
    number: 2692,
    category: 'JavaScript',
    patterns: ['object-array-utilities'],
    hints: [
      {
        level: 1,
        title: 'Deep Read-Only Proxy Guarding',
        text: 'Protecting an object tree from mutations requires intercepting assignment, deletion, and mutating array methods across all nested levels.'
      },
      {
        level: 2,
        title: 'Recursive Proxy Interception on Property Access',
        text: 'Wrap the object in a Proxy. The get trap wraps any nested object or array in a read-only Proxy. The set and deleteProperty traps throw an error specifying the modified key.'
      },
      {
        level: 3,
        title: 'Proxy Guard Blueprint',
        text: 'Traps: set(target, prop) throws \`Error: Cannot modify key: \${String(prop)}\`. deleteProperty throws same. For array methods like pop, push, shift, unshift, splice, sort, reverse: return function that throws error.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Object|Array} obj\n * @return {Object|Array}\n */\nvar makeImmutable = function(obj) {\n    const mutatingMethods = new Set([\'pop\', \'push\', \'shift\', \'unshift\', \'splice\', \'sort\', \'reverse\']);\n    function createProxy(target) {\n        return new Proxy(target, {\n            get(t, prop) {\n                if (Array.isArray(t) && mutatingMethods.has(prop)) {\n                    return () => {\n                        throw \`Error: Method \${String(prop)} is not allowed on immutable array\`;\n                    };\n                }\n                const val = t[prop];\n                if (val !== null && typeof val === \'object\') {\n                    return createProxy(val);\n                }\n                return val;\n            },\n            set(t, prop) {\n                throw \`Error: Cannot modify key: \${String(prop)}\`;\n            },\n            deleteProperty(t, prop) {\n                throw \`Error: Cannot delete key: \${String(prop)}\`;\n            }\n        });\n    }\n    return createProxy(obj);\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Per property access'],
      notes: 'Intercepts property accesses on the fly without upfront recursive traversal.',
      whyNaiveFails: 'Object.freeze is shallow and does not protect nested arrays or objects unless recursively applied.',
      spaceTimeTradeoff: 'Lazy proxy wrapping incurs overhead only on accessed branches.',
      interviewerExpectation: 'Correctly guarding both dictionary key writes and built-in array mutating methods.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var makeImmutable = function(obj) {
    const mutatingMethods = new Set(['pop', 'push', 'shift', 'unshift', 'splice', 'sort', 'reverse']);
    function createProxy(target) {
        return new Proxy(target, {
            get(t, prop) {
                if (Array.isArray(t) && mutatingMethods.has(prop)) {
                    return () => {
                        throw \`Error: Method \${String(prop)} is not allowed on immutable array\`;
                    };
                }
                const val = t[prop];
                if (val !== null && typeof val === 'object') {
                    return createProxy(val);
                }
                return val;
            },
            set(t, prop) {
                throw \`Error: Cannot modify key: \${String(prop)}\`;
            },
            deleteProperty(t, prop) {
                throw \`Error: Cannot delete key: \${String(prop)}\`;
            }
        });
    }
    return createProxy(obj);
};`,
        approach: 'Deep Read-Only Proxy with Mutation Method Guarding',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function makeImmutable<T extends object>(obj: T): T {
    const mutatingMethods = new Set(['pop', 'push', 'shift', 'unshift', 'splice', 'sort', 'reverse']);
    function createProxy(target: any): any {
        return new Proxy(target, {
            get(t, prop) {
                if (Array.isArray(t) && mutatingMethods.has(prop as string)) {
                    return () => {
                        throw \`Error: Method \${String(prop)} is not allowed on immutable array\`;
                    };
                }
                const val = t[prop];
                if (val !== null && typeof val === 'object') {
                    return createProxy(val);
                }
                return val;
            },
            set(t, prop) {
                throw \`Error: Cannot modify key: \${String(prop)}\`;
            },
            deleteProperty(t, prop) {
                throw \`Error: Cannot delete key: \${String(prop)}\`;
            }
        });
    }
    return createProxy(obj);
}`,
        approach: 'TypeScript Deep Immutable Proxy Wrapper',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/make-object-immutable.json'), 'utf8'));
const makeImmutable = new Function(prob.solutions[0].code + '; return makeImmutable;')();

const original = { x: 5, arr: [1, 2] };
const imm = makeImmutable(original);
assert.equal(imm.x, 5);
assert.throws(() => { imm.x = 10; });
assert.throws(() => { imm.arr.push(3); });
console.log('Passed all make-object-immutable test cases');
`
  },

  // 16. #2693 call-function-with-custom-context
  {
    slug: 'call-function-with-custom-context',
    number: 2693,
    category: 'JavaScript',
    patterns: ['higher-order-functions'],
    hints: [
      {
        level: 1,
        title: 'Explicit Function Context Binding Polyfill',
        text: 'Invoking a function with an explicit this binding requires attaching the function to the target context object temporarily.'
      },
      {
        level: 2,
        title: 'Unique Symbol Property Attachment',
        text: 'Generate a unique Symbol to avoid clashing with existing properties on the context. Assign the current function to context[fnSymbol], invoke it with arguments, and remove the property.'
      },
      {
        level: 3,
        title: 'Call Polyfill Blueprint',
        text: 'Declare Function.prototype.callPolyfill = function(context, ...args). Let ctx = Object(context ?? globalThis). const fnKey = Symbol(); ctx[fnKey] = this; const res = ctx[fnKey](...args); delete ctx[fnKey]; return res.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Object} context\n * @param {Array} args\n * @return {null|boolean|number|string|Array|Object}\n */\nFunction.prototype.callPolyfill = function(context, ...args) {\n    const ctx = context !== null && context !== undefined ? Object(context) : globalThis;\n    const fnKey = Symbol();\n    ctx[fnKey] = this;\n    const res = ctx[fnKey](...args);\n    delete ctx[fnKey];\n    return res;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Per function invocation'],
      notes: 'Attaching and invoking via unique symbol key runs in constant time.',
      whyNaiveFails: 'Using string property names like context.__fn__ risks overwriting pre-existing properties on user objects.',
      spaceTimeTradeoff: 'Unique Symbol key guarantees collision-free invocation without permanent mutation.',
      interviewerExpectation: 'Correctly handling primitive contexts like numbers or strings via Object(context).'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Object} context
 * @param {Array} args
 * @return {null|boolean|number|string|Array|Object}
 */
Function.prototype.callPolyfill = function(context, ...args) {
    const ctx = context !== null && context !== undefined ? Object(context) : globalThis;
    const fnKey = Symbol();
    ctx[fnKey] = this;
    const res = ctx[fnKey](...args);
    delete ctx[fnKey];
    return res;
};`,
        approach: 'Symbol Property Context Invocation and Cleanup',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `declare global {
    interface Function {
        callPolyfill(context: Record<any, any>, ...args: any[]): any;
    }
}

Function.prototype.callPolyfill = function(context: any, ...args: any[]): any {
    const ctx = context !== null && context !== undefined ? Object(context) : globalThis;
    const fnKey = Symbol();
    ctx[fnKey] = this;
    const res = ctx[fnKey](...args);
    delete ctx[fnKey];
    return res;
};

export {};`,
        approach: 'TypeScript Prototype Augmented Call Polyfill',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/call-function-with-custom-context.json'), 'utf8'));
new Function(prob.solutions[0].code)();

function tax(price, taxRate) {
    return \`\${this.item} costs \${price * (1 + taxRate)}\`;
}
const ctx = { item: 'Burger' };
const res = tax.callPolyfill(ctx, 10, 0.1);
assert.equal(res, 'Burger costs 11');
console.log('Passed all call-function-with-custom-context test cases');
`
  },

  // 17. #2695 array-wrapper
  {
    slug: 'array-wrapper',
    number: 2695,
    category: 'JavaScript',
    patterns: ['classes-and-chaining'],
    hints: [
      {
        level: 1,
        title: 'Custom Operator Coercion Overloading',
        text: 'Implementing sum addition and string representation for an array wrapper requires defining custom valueOf and toString methods on the prototype.'
      },
      {
        level: 2,
        title: 'Type Coercion Protocols',
        text: 'When instances are added together with plus operator, JavaScript calls valueOf. When converted to string or string interpolation, JavaScript invokes toString.'
      },
      {
        level: 3,
        title: 'Class Wrapper Blueprint',
        text: 'Store nums in this.nums. In valueOf(): return this.nums.reduce((sum, n) => sum + n, 0). In toString(): return \`[\${this.nums.join(",")}]\`.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {number[]} nums\n */\nvar ArrayWrapper = function(nums) {\n    this.nums = nums;\n};\n\n/**\n * @return {number}\n */\nArrayWrapper.prototype.valueOf = function() {\n    return this.nums.reduce((sum, val) => sum + val, 0);\n};\n\n/**\n * @return {string}\n */\nArrayWrapper.prototype.toString = function() {\n    return \`[\${this.nums.join(\',\')}]\`;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: length of wrapped array'],
      notes: 'valueOf sums elements linearly; toString formats array string in O(N).',
      whyNaiveFails: 'Default JavaScript object coercion produces [object Object] when added or stringified.',
      spaceTimeTradeoff: 'Prototype method definitions enable idiomatic numeric and string coercions.',
      interviewerExpectation: 'Understanding the JavaScript coercion specification order (valueOf before toString in numeric addition).'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 */
var ArrayWrapper = function(nums) {
    this.nums = nums;
};

/**
 * @return {number}
 */
ArrayWrapper.prototype.valueOf = function() {
    return this.nums.reduce((sum, val) => sum + val, 0);
};

/**
 * @return {string}
 */
ArrayWrapper.prototype.toString = function() {
    return \`[\${this.nums.join(',')}]\`;
};`,
        approach: 'Prototype ValueOf and ToString Operator Coercion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `class ArrayWrapper {
    private nums: number[];

    constructor(nums: number[]) {
        this.nums = nums;
    }

    valueOf(): number {
        return this.nums.reduce((sum, val) => sum + val, 0);
    }

    toString(): string {
        return \`[\${this.nums.join(',')}]\`;
    }
}`,
        approach: 'TypeScript Array Wrapper Class with Type Coercion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/array-wrapper.json'), 'utf8'));
const ArrayWrapper = new Function(prob.solutions[0].code + '; return ArrayWrapper;')();

const obj1 = new ArrayWrapper([1, 2]);
const obj2 = new ArrayWrapper([3, 4]);
assert.equal(obj1 + obj2, 10);
assert.equal(String(obj1), '[1,2]');
assert.equal(String(obj2), '[3,4]');
console.log('Passed all array-wrapper test cases');
`
  },

  // 18. #2700 differences-between-two-objects
  {
    slug: 'differences-between-two-objects',
    number: 2700,
    category: 'JavaScript',
    patterns: ['json-object-traversal'],
    hints: [
      {
        level: 1,
        title: 'Deep Structural Delta Comparison',
        text: 'Comparing two dictionary representations produces a diff structure retaining only paths where values diverge, representing differences as two-element arrays.'
      },
      {
        level: 2,
        title: 'Type Mismatch and Array Object Distinction',
        text: 'If types differ, or if one is array while the other is plain object, record [obj1, obj2]. If both are primitive and equal, omit. If both are objects/arrays of matching kind, recurse on shared keys.'
      },
      {
        level: 3,
        title: 'Diff Traversal Blueprint',
        text: 'If o1 === o2 return {}. If either is null or not object return [o1, o2]. If array status of o1 does not match o2, return [o1, o2]. Build diff object: for each key in o1: if key in o2, subDiff = objDiff(o1[key], o2[key]); if Object.keys(subDiff).length > 0 diff[key] = subDiff. Return diff.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {object} obj1\n * @param {object} obj2\n * @return {object}\n */\nfunction objDiff(obj1, obj2) {\n    if (obj1 === obj2) return {};\n    if (obj1 === null || obj2 === null) return [obj1, obj2];\n    if (typeof obj1 !== \'object\' || typeof obj2 !== \'object\') return [obj1, obj2];\n    if (Array.isArray(obj1) !== Array.isArray(obj2)) return [obj1, obj2];\n\n    const diff = {};\n    for (const key of Object.keys(obj1)) {\n        if (key in obj2) {\n            const sub = objDiff(obj1[key], obj2[key]);\n            if (Object.keys(sub).length > 0) {\n                diff[key] = sub;\n            }\n        }\n    }\n    return diff;\n}\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(D)',
      variables: ['N: total elements/keys across both structures', 'D: maximum nested depth'],
      notes: 'Visits shared keys once, building differential objects only on branches containing changes.',
      whyNaiveFails: 'Superficial comparison ignores nested object modifications or mistakenly treats array/object mismatches as identical structures.',
      spaceTimeTradeoff: 'Omits unchanged branches, resulting in sparse output memory.',
      interviewerExpectation: 'Correctly ignoring non-shared keys and distinguishing between arrays and plain objects.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {object} obj1
 * @param {object} obj2
 * @return {object}
 */
function objDiff(obj1, obj2) {
    if (obj1 === obj2) return {};
    if (obj1 === null || obj2 === null) return [obj1, obj2];
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return [obj1, obj2];
    if (Array.isArray(obj1) !== Array.isArray(obj2)) return [obj1, obj2];

    const diff = {};
    for (const key of Object.keys(obj1)) {
        if (key in obj2) {
            const sub = objDiff(obj1[key], obj2[key]);
            if (Object.keys(sub).length > 0) {
                diff[key] = sub;
            }
        }
    }
    return diff;
}`,
        approach: 'Recursive Structural Difference with Two-Element Tuple Extraction',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function objDiff(obj1: any, obj2: any): any {
    if (obj1 === obj2) return {};
    if (obj1 === null || obj2 === null) return [obj1, obj2];
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return [obj1, obj2];
    if (Array.isArray(obj1) !== Array.isArray(obj2)) return [obj1, obj2];

    const diff: Record<string, any> = {};
    for (const key of Object.keys(obj1)) {
        if (key in obj2) {
            const sub = objDiff(obj1[key], obj2[key]);
            if (Object.keys(sub).length > 0) {
                diff[key] = sub;
            }
        }
    }
    return diff;
}`,
        approach: 'TypeScript Deep Recursive Object Difference Analyzer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/differences-between-two-objects.json'), 'utf8'));
const objDiff = new Function(prob.solutions[0].code + '; return objDiff;')();

const o1 = { a: 1, b: 2, c: { d: 3 } };
const o2 = { a: 1, b: 3, c: { d: 4 }, e: 5 };
assert.deepEqual(objDiff(o1, o2), { b: [2, 3], c: { d: [3, 4] } });
console.log('Passed all differences-between-two-objects test cases');
`
  },

  // 19. #2703 return-length-of-arguments-passed
  {
    slug: 'return-length-of-arguments-passed',
    number: 2703,
    category: 'JavaScript',
    patterns: ['higher-order-functions'],
    hints: [
      {
        level: 1,
        title: 'Variadic Argument Count Inspection',
        text: 'The function inspects the quantity of arguments supplied at call time and returns this count.'
      },
      {
        level: 2,
        title: 'Rest Parameter Array Length',
        text: 'Gather all passed parameters into a rest array and return its length property.'
      },
      {
        level: 3,
        title: 'Arguments Length Blueprint',
        text: 'Function argumentsLength(...args) { return args.length; }.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {...(null|boolean|number|string|Array|Object)} args\n * @return {number}\n */\nvar argumentsLength = function(...args) {\n    return args.length;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Per call'],
      notes: 'Returns rest parameter length in constant time.',
      whyNaiveFails: 'Hardcoding expected parameters ignores variadic call signatures.',
      spaceTimeTradeoff: 'Rest parameter syntax maps inputs into a standard array.',
      interviewerExpectation: 'Use of modern rest parameters (...args) rather than legacy arguments object.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {...(null|boolean|number|string|Array|Object)} args
 * @return {number}
 */
var argumentsLength = function(...args) {
    return args.length;
};`,
        approach: 'Rest Parameter Array Length Retrieval',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };

function argumentsLength(...args: JSONValue[]): number {
    return args.length;
}`,
        approach: 'TypeScript Rest Arguments Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/return-length-of-arguments-passed.json'), 'utf8'));
const argumentsLength = new Function(prob.solutions[0].code + '; return argumentsLength;')();

assert.equal(argumentsLength(5), 1);
assert.equal(argumentsLength({}, null, "3"), 3);
assert.equal(argumentsLength(), 0);
console.log('Passed all return-length-of-arguments-passed test cases');
`
  },

  // 20. #2704 to-be-or-not-to-be
  {
    slug: 'to-be-or-not-to-be',
    number: 2704,
    category: 'JavaScript',
    patterns: ['closures'],
    hints: [
      {
        level: 1,
        title: 'Assertion Matcher Interface Closure',
        text: 'Constructing test assertions requires returning an object with methods that compare against a closed initial value and throw errors upon mismatch.'
      },
      {
        level: 2,
        title: 'Strict Equality Checking with Error Throwing',
        text: 'Return an object containing toBe and notToBe methods. If the check passes, return true; otherwise, throw new Error with the required message.'
      },
      {
        level: 3,
        title: 'Assertion Blueprint',
        text: 'Return { toBe: (val2) => { if (val === val2) return true; throw new Error("Not Equal"); }, notToBe: (val2) => { if (Object.is(val, val2)) throw new Error("Equal"); return true; } }.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {string} val\n * @return {Object}\n */\nvar expect = function(val) {\n    return {\n        toBe: function(val2) {\n            if (val === val2) return true;\n            throw new Error(\'Not Equal\');\n        },\n        notToBe: function(val2) {\n            if (val !== val2) return true;\n            throw new Error(\'Equal\');\n        }\n    };\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Per assertion check'],
      notes: 'Executes strict equality in constant time.',
      whyNaiveFails: 'Returning false instead of throwing Error fails standard test assertion contracts.',
      spaceTimeTradeoff: 'Closure encapsulates expected value in memory.',
      interviewerExpectation: 'Strict equality (=== and !==) to avoid type coercion issues.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {string} val
 * @return {Object}
 */
var expect = function(val) {
    return {
        toBe: function(val2) {
            if (val === val2) return true;
            throw new Error('Not Equal');
        },
        notToBe: function(val2) {
            if (val !== val2) return true;
            throw new Error('Equal');
        }
    };
};`,
        approach: 'Assertion Matcher Object with Strict Equality Validation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type ToBeOrNotToBe = {
    toBe: (val: any) => boolean;
    notToBe: (val: any) => boolean;
};

function expect(val: any): ToBeOrNotToBe {
    return {
        toBe: (val2: any) => {
            if (val === val2) return true;
            throw new Error('Not Equal');
        },
        notToBe: (val2: any) => {
            if (val !== val2) return true;
            throw new Error('Equal');
        }
    };
}`,
        approach: 'TypeScript Fluent Assertion Matcher',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/to-be-or-not-to-be.json'), 'utf8'));
const expect = new Function(prob.solutions[0].code + '; return expect;')();

assert.equal(expect(5).toBe(5), true);
assert.throws(() => expect(5).toBe(null), /Not Equal/);
assert.equal(expect(5).notToBe(null), true);
assert.throws(() => expect(5).notToBe(5), /Equal/);
console.log('Passed all to-be-or-not-to-be test cases');
`
  },

  // 21. #2705 compact-object
  {
    slug: 'compact-object',
    number: 2705,
    category: 'JavaScript',
    patterns: ['json-object-traversal'],
    hints: [
      {
        level: 1,
        title: 'Deep Falsy Value Pruning',
        text: 'Removing all falsy values from nested containers requires traversing arrays and objects, filtering out values that evaluate to Boolean false.'
      },
      {
        level: 2,
        title: 'Recursive Collection Compaction',
        text: 'For arrays, recursively compact elements and retain only truthy results. For objects, recursively compact properties and assign only truthy transformed values.'
      },
      {
        level: 3,
        title: 'Compaction Blueprint',
        text: 'If obj is null or not object, return obj. If Array.isArray(obj), return obj.map(compactObject).filter(Boolean). For plain object: create res = {}; loop key of Object.keys(obj): const val = compactObject(obj[key]); if (Boolean(val)) res[key] = val; return res.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Object|Array} obj\n * @return {Object|Array}\n */\nvar compactObject = function(obj) {\n    if (obj === null || typeof obj !== \'object\') {\n        return obj;\n    }\n    if (Array.isArray(obj)) {\n        return obj.map(compactObject).filter(Boolean);\n    }\n    const res = {};\n    for (const key of Object.keys(obj)) {\n        const val = compactObject(obj[key]);\n        if (Boolean(val)) {\n            res[key] = val;\n        }\n    }\n    return res;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(D)',
      variables: ['N: total keys and elements', 'D: recursion tree depth'],
      notes: 'Visits each element once, building compacted structures recursively.',
      whyNaiveFails: 'Shallow filtering leaves nested falsy items intact inside sub-arrays or child dictionaries.',
      spaceTimeTradeoff: 'Constructs pruned containers without modifying the original input object.',
      interviewerExpectation: 'Correct Boolean coercion handling all 6 JavaScript falsy values (false, 0, "", null, undefined, NaN).'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(compactObject).filter(Boolean);
    }
    const res = {};
    for (const key of Object.keys(obj)) {
        const val = compactObject(obj[key]);
        if (Boolean(val)) {
            res[key] = val;
        }
    }
    return res;
};`,
        approach: 'Recursive Deep Filter with Boolean Truthiness Validation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | Array<JSONValue>;

function compactObject(obj: Obj): Obj {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => compactObject(item as Obj)).filter(Boolean) as Obj[];
    }
    const res: Record<string, any> = {};
    for (const key of Object.keys(obj)) {
        const val = compactObject((obj as any)[key]);
        if (Boolean(val)) {
            res[key] = val;
        }
    }
    return res;
}`,
        approach: 'TypeScript Deep Recursive Falsy Pruner',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/compact-object.json'), 'utf8'));
const compactObject = new Function(prob.solutions[0].code + '; return compactObject;')();

assert.deepEqual(compactObject([null, 0, 5, [0], [false, 16]]), [5, [], [16]]);
assert.deepEqual(compactObject({ a: null, b: [false, 1] }), { b: [1] });
console.log('Passed all compact-object test cases');
`
  },

  // 22. #2715 timeout-cancellation
  {
    slug: 'timeout-cancellation',
    number: 2715,
    category: 'JavaScript',
    patterns: ['timing-control'],
    hints: [
      {
        level: 1,
        title: 'Delayed Invocation with Cancellation Handle',
        text: 'Scheduling a future function call while offering the option to abort before the elapsed time requires saving and clearing the timeout identifier.'
      },
      {
        level: 2,
        title: 'Timer Setup and Clear Closure',
        text: 'Schedule fn(...args) via setTimeout. Return a cancellation closure that invokes clearTimeout on the active timer handle.'
      },
      {
        level: 3,
        title: 'Timeout Cancellation Blueprint',
        text: 'const timer = setTimeout(() => fn(...args), t). Return () => clearTimeout(timer).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Function} fn\n * @param {Array} args\n * @param {number} t\n * @return {Function}\n */\nvar cancellable = function(fn, args, t) {\n    const timer = setTimeout(() => {\n        fn(...args);\n    }, t);\n    return function() {\n        clearTimeout(timer);\n    };\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Per scheduling call'],
      notes: 'Timer creation and clearance run in constant time.',
      whyNaiveFails: 'Failing to return a clearTimeout closure prevents callers from cancelling scheduled work.',
      spaceTimeTradeoff: 'Closure retains single numeric timer ID.',
      interviewerExpectation: 'Clean higher-order cancellation function returning a zero-argument cancel callback.'
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
    const timer = setTimeout(() => {
        fn(...args);
    }, t);
    return function() {
        clearTimeout(timer);
    };
};`,
        approach: 'Delayed setTimeout with Closure-Wrapped clearTimeout',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Fn = (...args: JSONValue[]) => void;

function cancellable(fn: Fn, args: JSONValue[], t: number): () => void {
    const timer = setTimeout(() => {
        fn(...args);
    }, t);
    return function() {
        clearTimeout(timer);
    };
}`,
        approach: 'TypeScript Cancellable Timer Closure',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/timeout-cancellation.json'), 'utf8'));
const cancellable = new Function(prob.solutions[0].code + '; return cancellable;')();

let executed = false;
const cancel = cancellable(() => { executed = true; }, [], 20);
cancel();
await new Promise(r => setTimeout(r, 40));
assert.equal(executed, false);
console.log('Passed all timeout-cancellation test cases');
`
  },

  // 23. #2721 execute-asynchronous-functions-in-parallel
  {
    slug: 'execute-asynchronous-functions-in-parallel',
    number: 2721,
    category: 'JavaScript',
    patterns: ['promises-async'],
    hints: [
      {
        level: 1,
        title: 'Parallel Promise Aggregator Polyfill',
        text: 'Running multiple asynchronous tasks concurrently and gathering all results in original index order emulates standard promise aggregation.'
      },
      {
        level: 2,
        title: 'Ordered Resolution Counter',
        text: 'Maintain an array of results sized to the input functions. Track a completed count. When any promise rejects, reject the outer promise immediately. When completed count equals total functions, resolve with the results array.'
      },
      {
        level: 3,
        title: 'Promise All Blueprint',
        text: 'Return new Promise((resolve, reject) => { if (functions.length === 0) resolve([]); const results = new Array(functions.length); let count = 0; functions.forEach((fn, i) => { fn().then(val => { results[i] = val; count++; if (count === functions.length) resolve(results); }, reject); }); }).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Array<Function>}\n * @return {Promise<any>}\n */\nvar promiseAll = function(functions) {\n    return new Promise((resolve, reject) => {\n        if (functions.length === 0) {\n            resolve([]);\n            return;\n        }\n        const results = new Array(functions.length);\n        let completed = 0;\n        functions.forEach((fn, idx) => {\n            fn().then(\n                val => {\n                    results[idx] = val;\n                    completed++;\n                    if (completed === functions.length) {\n                        resolve(results);\n                    }\n                },\n                err => reject(err)\n            );\n        });\n    });\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of promise factory functions'],
      notes: 'Executes all tasks in parallel; results array tracks completed slots.',
      whyNaiveFails: 'Awaiting functions sequentially runs in O(N * T) serialized time instead of max(T) parallel execution.',
      spaceTimeTradeoff: 'Results array preserves original order regardless of resolution timing.',
      interviewerExpectation: 'Fast-fail rejection on first error and handling empty array edge case immediately.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Array<Function>}
 * @return {Promise<any>}
 */
var promiseAll = function(functions) {
    return new Promise((resolve, reject) => {
        if (functions.length === 0) {
            resolve([]);
            return;
        }
        const results = new Array(functions.length);
        let completed = 0;
        functions.forEach((fn, idx) => {
            fn().then(
                val => {
                    results[idx] = val;
                    completed++;
                    if (completed === functions.length) {
                        resolve(results);
                    }
                },
                err => reject(err)
            );
        });
    });
};`,
        approach: 'Promise.all Polyfill with Index Order Preservation and Fast Rejection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type Fn<T> = () => Promise<T>;

function promiseAll<T>(functions: Fn<T>[]): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
        if (functions.length === 0) {
            resolve([]);
            return;
        }
        const results = new Array<T>(functions.length);
        let completed = 0;
        functions.forEach((fn, idx) => {
            fn().then(
                val => {
                    results[idx] = val;
                    completed++;
                    if (completed === functions.length) {
                        resolve(results);
                    }
                },
                err => reject(err)
            );
        });
    });
}`,
        approach: 'TypeScript Concurrent Promise All Implementation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/execute-asynchronous-functions-in-parallel.json'), 'utf8'));
const promiseAll = new Function(prob.solutions[0].code + '; return promiseAll;')();

const fns = [
    () => new Promise(resolve => setTimeout(() => resolve(5), 20)),
    () => new Promise(resolve => setTimeout(() => resolve(10), 10))
];
const res = await promiseAll(fns);
assert.deepEqual(res, [5, 10]);
console.log('Passed all execute-asynchronous-functions-in-parallel test cases');
`
  },

  // 24. #2722 join-two-arrays-by-id
  {
    slug: 'join-two-arrays-by-id',
    number: 2722,
    category: 'JavaScript',
    patterns: ['object-array-utilities'],
    hints: [
      {
        level: 1,
        title: 'Key-Based Record Merging and Sorting',
        text: 'Combining two collections of records sharing an identifier requires merging attributes from later records over earlier records and ordering results by ascending ID.'
      },
      {
        level: 2,
        title: 'Dictionary Indexing with Attribute Merging',
        text: 'Insert all objects from the first array into a dictionary keyed by ID. Iterate through the second array, merging each object into the existing entry or creating a new entry. Extract and sort values by ID.'
      },
      {
        level: 3,
        title: 'Join Blueprint',
        text: 'Initialize map = new Map(). Loop item of arr1: map.set(item.id, { ...item }). Loop item of arr2: if map.has(item.id) Object.assign(map.get(item.id), item); else map.set(item.id, { ...item }). Return Array.from(map.values()).sort((a, b) => a.id - b.id).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Array} arr1\n * @param {Array} arr2\n * @return {Array}\n */\nvar join = function(arr1, arr2) {\n    const map = new Map();\n    for (const item of arr1) {\n        map.set(item.id, { ...item });\n    }\n    for (const item of arr2) {\n        if (map.has(item.id)) {\n            Object.assign(map.get(item.id), item);\n        } else {\n            map.set(item.id, { ...item });\n        }\n    }\n    return Array.from(map.values()).sort((a, b) => a.id - b.id);\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: total objects across arr1 and arr2'],
      notes: 'Map indexing takes O(N) time; final sorting takes O(N log N).',
      whyNaiveFails: 'Nested linear scanning to find matching IDs takes O(N * M) quadratic time.',
      spaceTimeTradeoff: 'Map indexing provides constant key lookup before the final sorting step.',
      interviewerExpectation: 'Ensuring arr2 attributes override arr1 while preserving untouched arr1 properties.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function(arr1, arr2) {
    const map = new Map();
    for (const item of arr1) {
        map.set(item.id, { ...item });
    }
    for (const item of arr2) {
        if (map.has(item.id)) {
            Object.assign(map.get(item.id), item);
        } else {
            map.set(item.id, { ...item });
        }
    }
    return Array.from(map.values()).sort((a, b) => a.id - b.id);
};`,
        approach: 'ID-Keyed Map Attribute Override with Numerical Sort',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type ArrayType = { id: number } & Record<string, JSONValue>;

function join(arr1: ArrayType[], arr2: ArrayType[]): ArrayType[] {
    const map = new Map<number, ArrayType>();
    for (const item of arr1) {
        map.set(item.id, { ...item });
    }
    for (const item of arr2) {
        if (map.has(item.id)) {
            Object.assign(map.get(item.id)!, item);
        } else {
            map.set(item.id, { ...item });
        }
    }
    return Array.from(map.values()).sort((a, b) => a.id - b.id);
}`,
        approach: 'TypeScript ID Join with Property Override',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/join-two-arrays-by-id.json'), 'utf8'));
const join = new Function(prob.solutions[0].code + '; return join;')();

const a1 = [{ id: 1, x: 1 }, { id: 2, x: 9 }];
const a2 = [{ id: 2, x: 5 }, { id: 3, x: 5 }];
assert.deepEqual(join(a1, a2), [
    { id: 1, x: 1 },
    { id: 2, x: 5 },
    { id: 3, x: 5 }
]);
console.log('Passed all join-two-arrays-by-id test cases');
`
  },

  // 25. #2723 add-two-promises
  {
    slug: 'add-two-promises',
    number: 2723,
    category: 'JavaScript',
    patterns: ['promises-async'],
    hints: [
      {
        level: 1,
        title: 'Concurrent Numeric Promise Summation',
        text: 'Awaiting two asynchronous promises simultaneously and adding their resolved numeric results produces a single summed promise.'
      },
      {
        level: 2,
        title: 'Promise Concurrency Aggregation',
        text: 'Pass both promises into Promise.all to await them in parallel. Destructure the two numeric results and return their sum.'
      },
      {
        level: 3,
        title: 'Summation Blueprint',
        text: 'const [v1, v2] = await Promise.all([promise1, promise2]); return v1 + v2.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Promise} promise1\n * @param {Promise} promise2\n * @return {Promise}\n */\nvar addTwoPromises = async function(promise1, promise2) {\n    const [v1, v2] = await Promise.all([promise1, promise2]);\n    return v1 + v2;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Per promise pair evaluation'],
      notes: 'Parallel resolution runs in max(t1, t2) asynchronous time.',
      whyNaiveFails: 'Awaiting promise1 before starting promise2 serializes execution to t1 + t2.',
      spaceTimeTradeoff: 'Promise.all awaits concurrently in constant auxiliary memory.',
      interviewerExpectation: 'Parallel execution using Promise.all or destructuring.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {Promise} promise1
 * @param {Promise} promise2
 * @return {Promise}
 */
var addTwoPromises = async function(promise1, promise2) {
    const [v1, v2] = await Promise.all([promise1, promise2]);
    return v1 + v2;
};`,
        approach: 'Parallel Promise Resolution with Destructured Addition',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `type P = Promise<number>;

async function addTwoPromises(promise1: P, promise2: P): P {
    const [v1, v2] = await Promise.all([promise1, promise2]);
    return v1 + v2;
}`,
        approach: 'TypeScript Concurrent Promise Summation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/add-two-promises.json'), 'utf8'));
const addTwoPromises = new Function(prob.solutions[0].code + '; return addTwoPromises;')();

const p1 = new Promise(r => setTimeout(() => r(2), 10));
const p2 = new Promise(r => setTimeout(() => r(5), 15));
const sum = await addTwoPromises(p1, p2);
assert.equal(sum, 7);
console.log('Passed all add-two-promises test cases');
`
  }
];

export function writeBatch12Part2() {
  for (const item of batch12Part2Problems) {
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
  writeBatch12Part2();
}
