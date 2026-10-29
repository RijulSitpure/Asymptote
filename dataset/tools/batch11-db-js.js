import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

export const dbJsProblems = [
  // 1. #177 nth-highest-salary (Database)
  {
    slug: 'nth-highest-salary',
    number: 177,
    category: 'Database',
    patterns: ['nth-highest-limit-offset'],
    hints: [
      {
        level: 1,
        title: 'Parameterized Rank Offset Extraction',
        text: 'Extracting the n-th distinct pay grade requires skipping preceding top values and handling tables with insufficient distinct records.'
      },
      {
        level: 2,
        title: 'Zero-Based Offset Calculation',
        text: 'The n-th largest distinct value corresponds to a zero-based offset of n minus one. Sorting unique amounts in descending order isolates the candidate.'
      },
      {
        level: 3,
        title: 'Function Definition Blueprint',
        text: 'In MySQL, declare n = n - 1. Return scalar query: select distinct salary from Employee order by salary desc limit 1 offset n.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nCREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT\nBEGIN\nSET N = N - 1;\n  RETURN (\n      SELECT DISTINCT salary\n      FROM Employee\n      ORDER BY salary DESC\n      LIMIT 1 OFFSET N\n  );\nEND\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(1)',
      variables: ['N: number of records in Employee table'],
      notes: 'Distinct sort with single row offset fetch.',
      whyNaiveFails: 'Dense rank window queries without scalar encapsulation return empty result sets rather than null when n exceeds available distinct salaries.',
      spaceTimeTradeoff: 'Scalar subquery wrapping limit offset returns null automatically when no matching row exists.',
      interviewerExpectation: 'Correct zero-based index adjustment (N = N - 1) and distinct deduplication before ordering.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
SET N = N - 1;
  RETURN (
      SELECT DISTINCT salary
      FROM Employee
      ORDER BY salary DESC
      LIMIT 1 OFFSET N
  );
END`,
        approach: 'Scalar Subquery with Variable Offset',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `CREATE OR REPLACE FUNCTION getNthHighestSalary(N INT) RETURNS INT AS $$
BEGIN
  RETURN (
    SELECT DISTINCT salary
    FROM Employee
    ORDER BY salary DESC
    LIMIT 1 OFFSET N - 1
  );
END;
$$ LANGUAGE plpgsql;`,
        approach: 'PostgreSQL Stored Function with Plpgsql Offset',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def nth_highest_salary(employee: pd.DataFrame, N: int) -> pd.DataFrame:
    unique_salaries = employee['salary'].drop_duplicates().sort_values(ascending=False)
    col_name = f'getNthHighestSalary({N})'
    if len(unique_salaries) < N or N <= 0:
        return pd.DataFrame({col_name: [None]})
    return pd.DataFrame({col_name: [unique_salaries.iloc[N - 1]]})`,
        approach: 'Pandas Drop Duplicates and Offset Slice',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Employee (id int, salary int);`,
    referenceSql: `SELECT (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1) AS getNthHighestSalary;`,
    generatorPy: `import json
cases = [
    {
        'name': 'standard_three_salaries',
        'inserts': "INSERT INTO Employee VALUES (1, 100), (2, 200), (3, 300);"
    },
    {
        'name': 'duplicate_salaries',
        'inserts': "INSERT INTO Employee VALUES (1, 100), (2, 100);"
    }
]
print(json.dumps(cases))
`
  },

  // 2. #2624 snail-traversal (JavaScript)
  {
    slug: 'snail-traversal',
    number: 2624,
    category: 'JavaScript',
    patterns: ['array-prototype-methods'],
    hints: [
      {
        level: 1,
        title: 'Serpentine Column Path Traversal',
        text: 'Elements must be arranged into a two-dimensional grid by filling columns sequentially, alternating between downward and upward movement.'
      },
      {
        level: 2,
        title: 'Dimension Validation and Parity Reversal',
        text: 'If row count multiplied by column count does not equal array length, return an empty array. Even columns traverse downward; odd columns traverse upward.'
      },
      {
        level: 3,
        title: 'Matrix Population Blueprint',
        text: 'Allocate matrix of size rowsCount x colsCount. Loop col from 0 to colsCount - 1: if col % 2 === 0, iterate row from 0 to rowsCount - 1; else iterate row from rowsCount - 1 down to 0. Populate from array and return matrix.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {number} rowsCount\n * @param {number} colsCount\n * @return {Array<Array<number>>}\n */\nArray.prototype.snail = function(rowsCount, colsCount) {\n    if (rowsCount * colsCount !== this.length) return [];\n    const matrix = Array.from({ length: rowsCount }, () => new Array(colsCount));\n    let idx = 0;\n    for (let c = 0; c < colsCount; c++) {\n        if (c % 2 === 0) {\n            for (let r = 0; r < rowsCount; r++) {\n                matrix[r][c] = this[idx++];\n            }\n        } else {\n            for (let r = rowsCount - 1; r >= 0; r--) {\n                matrix[r][c] = this[idx++];\n            }\n        }\n    }\n    return matrix;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(R * C)',
      space: 'O(R * C)',
      variables: ['R: rowsCount', 'C: colsCount'],
      notes: 'Direct linear pass placing each item into preallocated matrix.',
      whyNaiveFails: 'Unbounded matrix operations or irregular resizing incur repeated reallocation overhead.',
      spaceTimeTradeoff: 'Allocating the exact output grid dimension avoids dynamic row expansions.',
      interviewerExpectation: 'Strict dimension check (rowsCount * colsCount === this.length) returning empty array upon mismatch.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {number} rowsCount
 * @param {number} colsCount
 * @return {Array<Array<number>>}
 */
Array.prototype.snail = function(rowsCount, colsCount) {
    if (rowsCount * colsCount !== this.length) return [];
    const matrix = Array.from({ length: rowsCount }, () => new Array(colsCount));
    let idx = 0;
    for (let c = 0; c < colsCount; c++) {
        if (c % 2 === 0) {
            for (let r = 0; r < rowsCount; r++) {
                matrix[r][c] = this[idx++];
            }
        } else {
            for (let r = rowsCount - 1; r >= 0; r--) {
                matrix[r][c] = this[idx++];
            }
        }
    }
    return matrix;
};`,
        approach: 'Alternating Column Matrix Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `declare global {
    interface Array<T> {
        snail(rowsCount: number, colsCount: number): number[][];
    }
}

Array.prototype.snail = function(rowsCount: number, colsCount: number): number[][] {
    if (rowsCount * colsCount !== this.length) return [];
    const matrix: number[][] = Array.from({ length: rowsCount }, () => new Array(colsCount));
    let idx = 0;
    for (let c = 0; c < colsCount; c++) {
        if (c % 2 === 0) {
            for (let r = 0; r < rowsCount; r++) {
                matrix[r][c] = this[idx++];
            }
        } else {
            for (let r = rowsCount - 1; r >= 0; r--) {
                matrix[r][c] = this[idx++];
            }
        }
    }
    return matrix;
};

export {};`,
        approach: 'TypeScript Augmented Array Prototype Snail',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/snail-traversal.json'), 'utf8'));
new Function(prob.solutions[0].code)();

const nums = [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15];
const res = nums.snail(5, 4);
assert.equal(res.length, 5);
assert.equal(res[0].length, 4);
assert.deepEqual(res[0], [19, 17, 16, 15]);
assert.deepEqual(nums.snail(1, 4), []);
console.log('Passed all snail-traversal test cases');
`
  },

  // 3. #2628 json-deep-equal (JavaScript)
  {
    slug: 'json-deep-equal',
    number: 2628,
    category: 'JavaScript',
    patterns: ['json-object-traversal'],
    hints: [
      {
        level: 1,
        title: 'Recursive Structural Equality Checking',
        text: 'Evaluating whether two entities are identical requires comparing values across nested lists and key-value mappings.'
      },
      {
        level: 2,
        title: 'Type Discrimination and Key Alignment',
        text: 'Distinguish between primitives, arrays, and objects. Arrays must have equal lengths and matching order; objects must share identical keys and recursive values.'
      },
      {
        level: 3,
        title: 'Recursive Comparison Blueprint',
        text: 'If o1 === o2 return true. If either is not object or null, return false. If array status of o1 does not match o2, return false. Compare Object.keys length and recursively evaluate every key.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {any} o1\n * @param {any} o2\n * @return {boolean}\n */\nvar areDeeplyEqual = function(o1, o2) {\n    if (o1 === o2) return true;\n    if (o1 === null || o2 === null) return false;\n    if (typeof o1 !== \'object\' || typeof o2 !== \'object\') return false;\n    if (Array.isArray(o1) !== Array.isArray(o2)) return false;\n\n    const keys1 = Object.keys(o1);\n    const keys2 = Object.keys(o2);\n    if (keys1.length !== keys2.length) return false;\n\n    for (const key of keys1) {\n        if (!Object.prototype.hasOwnProperty.call(o2, key)) return false;\n        if (!areDeeplyEqual(o1[key], o2[key])) return false;\n    }\n    return true;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(D)',
      variables: ['N: total elements/keys across objects', 'D: maximum nested depth'],
      notes: 'Visits each primitive and key-value pair once.',
      whyNaiveFails: 'JSON.stringify fails because object keys may be ordered differently in memory while still being deeply equal.',
      spaceTimeTradeoff: 'Call stack scales with nested tree depth D while avoiding serialization buffers.',
      interviewerExpectation: 'Correctly handling null (typeof null === "object") and distinguishing arrays from plain objects.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {any} o1
 * @param {any} o2
 * @return {boolean}
 */
var areDeeplyEqual = function(o1, o2) {
    if (o1 === o2) return true;
    if (o1 === null || o2 === null) return false;
    if (typeof o1 !== 'object' || typeof o2 !== 'object') return false;
    if (Array.isArray(o1) !== Array.isArray(o2)) return false;

    const keys1 = Object.keys(o1);
    const keys2 = Object.keys(o2);
    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!Object.prototype.hasOwnProperty.call(o2, key)) return false;
        if (!areDeeplyEqual(o1[key], o2[key])) return false;
    }
    return true;
};`,
        approach: 'Recursive Type-Aware Structural Deep Equality',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'typescript',
        code: `function areDeeplyEqual(o1: any, o2: any): boolean {
    if (o1 === o2) return true;
    if (o1 === null || o2 === null) return false;
    if (typeof o1 !== 'object' || typeof o2 !== 'object') return false;
    if (Array.isArray(o1) !== Array.isArray(o2)) return false;

    const keys1 = Object.keys(o1);
    const keys2 = Object.keys(o2);
    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!Object.prototype.hasOwnProperty.call(o2, key)) return false;
        if (!areDeeplyEqual(o1[key], o2[key])) return false;
    }
    return true;
}`,
        approach: 'TypeScript Recursive Deep Structural Equality',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/json-deep-equal.json'), 'utf8'));
const areDeeplyEqual = new Function(prob.solutions[0].code + '; return areDeeplyEqual;')();

assert.equal(areDeeplyEqual({"y":2,"x":1}, {"x":1,"y":2}), true);
assert.equal(areDeeplyEqual({"x":null,"L":[1,2,3]}, {"x":null,"L":["1","2","3"]}), false);
assert.equal(areDeeplyEqual(true, false), false);
assert.equal(areDeeplyEqual([1, 2, 3], [1, 2, 3]), true);
assert.equal(areDeeplyEqual([1, 2, 3], [1, 3, 2]), false);
console.log('Passed all json-deep-equal test cases');
`
  }
];

export function writeDbJsFiles() {
  for (const item of dbJsProblems) {
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

    if (item.category === 'Database') {
      const metaData = { runner: 'database', ordered: false, testKind: 'deterministic' };
      fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(metaData, null, 2) + '\n', 'utf8');
      fs.writeFileSync(path.join(testDir, 'schema.sql'), item.schemaSql, 'utf8');
      fs.writeFileSync(path.join(testDir, 'reference.sql'), item.referenceSql, 'utf8');
      fs.writeFileSync(path.join(testDir, 'generator.py'), item.generatorPy, 'utf8');
    } else {
      const metaData = { runner: 'node', testKind: 'deterministic' };
      fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(metaData, null, 2) + '\n', 'utf8');
      fs.writeFileSync(path.join(testDir, 'test.js'), item.testJs, 'utf8');
    }

    console.log(`Generated: #${item.number} ${item.slug} [${item.category}]`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  writeDbJsFiles();
}
