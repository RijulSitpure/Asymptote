import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';

/**
 * Multi-language verification for Algorithms problems:
 * 1. Checks C++ solution compiles cleanly with g++ -std=c++17 -fsyntax-only
 * 2. Runs JavaScript solution in Node against fixed + random test cases and compares with Python 3 solution
 */
export function verifyAlgoMultiLang(slug, prob, slugTestDir, runtimes) {
  // 1. C++ compilation check
  const cppSol = prob.solutions?.find(s => s.lang === 'cpp');
  if (cppSol && runtimes.cpp) {
    const cppRes = spawnSync('g++', ['-std=c++17', '-fsyntax-only', '-x', 'c++', '-'], {
      input: cppSol.code,
      encoding: 'utf8',
      timeout: 15000
    });
    if (cppRes.status !== 0) {
      throw new Error(`C++ syntax check failed: ${cppRes.stderr || 'exit code ' + cppRes.status}`);
    }
    console.log(`  ↳ Verified C++ solution with g++ -std=c++17`);
  }

  // 2. JavaScript solution execution in Node vs Python 3
  const jsSol = prob.solutions?.find(s => s.lang === 'javascript');
  const pySol = prob.solutions?.find(s => s.lang === 'python3');
  const metaPath = path.join(slugTestDir, 'meta.json');

  if (jsSol && pySol && runtimes.python3 && fs.existsSync(metaPath)) {
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    const methodName = meta.method;
    if (!methodName) {
      throw new Error(`Missing "method" in ${metaPath}`);
    }

    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(jsSol.code, sandbox);
    const jsFn = sandbox[methodName];
    if (typeof jsFn !== 'function') {
      throw new Error(`JavaScript solution does not export method "${methodName}"`);
    }

    // Python harness to generate cases and evaluate python solution
    const pyHarness = `
import json, random

def generate_cases(slug):
    rng = random.Random(42)
    cases = []
    if slug == 'two-sum':
        fixed = [
            ([2, 7, 11, 15], 9),
            ([3, 2, 4], 6),
            ([3, 3], 6),
            ([-1, -2, -3, -4, -5], -8),
            ([0, 4, 3, 0], 0),
            ([-10**9, 10**9], 0)
        ]
        for nums, target in fixed: cases.append({'args': [nums, target]})
        for _ in range(50):
            sz = rng.randint(2, 30)
            nums = [rng.randint(-500, 500) for _ in range(sz)]
            i1, i2 = rng.sample(range(sz), 2)
            cases.append({'args': [nums, nums[i1] + nums[i2]]})

    elif slug == 'maximum-subarray':
        fixed = [[-2, 1, -3, 4, -1, 2, 1, -5, 4], [1], [5, 4, -1, 7, 8], [-1], [-100, -2, -30, -5], [0, 0, 0]]
        for nums in fixed: cases.append({'args': [nums]})
        for _ in range(50):
            sz = rng.randint(1, 40)
            cases.append({'args': [[rng.randint(-500, 500) for _ in range(sz)]]})

    elif slug == 'valid-parentheses':
        fixed = ['()', '()[]{}', '(]', '([)]', '{[]}', '', '(', ')', '(((', ')))', '(([]){})']
        for s in fixed: cases.append({'args': [s]})
        def gen_valid(p):
            res = []
            for _ in range(p):
                op, cl = rng.choice([('(',')'), ('[',']'), ('{','}')])
                pos = rng.randint(0, len(res))
                res.insert(pos, op); res.insert(pos+1, cl)
            return ''.join(res)
        for _ in range(50):
            if rng.random() < 0.5:
                cases.append({'args': [gen_valid(rng.randint(1, 15))]})
            else:
                l = rng.randint(1, 30)
                cases.append({'args': [''.join(rng.choice(['(',')','[',']','{','}']) for _ in range(l))]})

    elif slug == 'daily-temperatures':
        fixed = [[73, 74, 75, 71, 69, 72, 76, 73], [30, 40, 50, 60], [30, 60, 90], [89, 62, 70, 58, 47, 47, 46, 76, 100, 70]]
        for t in fixed: cases.append({'args': [t]})
        for _ in range(50):
            sz = rng.randint(1, 50)
            cases.append({'args': [[rng.randint(30, 100) for _ in range(sz)]]})

    elif slug == 'burst-balloons':
        fixed = [[3, 1, 5, 8], [1, 5], [7], [1, 2, 3, 4], [5, 5, 5, 5]]
        for nums in fixed: cases.append({'args': [nums]})
        for _ in range(25):
            sz = rng.randint(1, 8)
            cases.append({'args': [[rng.randint(1, 100) for _ in range(sz)]]})

    elif slug == 'cheapest-flights-within-k-stops':
        fixed = [
            (4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 1),
            (3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1),
            (3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 0)
        ]
        for n, f, s, d, k in fixed: cases.append({'args': [n, f, s, d, k]})
        for _ in range(30):
            n = rng.randint(4, 10)
            m = rng.randint(n - 1, n * 2)
            fl = []
            for _ in range(m):
                u = rng.randint(0, n - 1); v = rng.randint(0, n - 1)
                if u != v: fl.append([u, v, rng.randint(10, 300)])
            s = rng.randint(0, n - 1); d = rng.randint(0, n - 1)
            while d == s: d = rng.randint(0, n - 1)
            cases.append({'args': [n, fl, s, d, rng.randint(0, 3)]})

    elif slug == 'shortest-path-visiting-all-nodes':
        fixed = [[[1, 2, 3], [0], [0], [0]], [[1], [0, 2, 4], [1, 3, 4], [2], [1, 2]], [[]]]
        for g in fixed: cases.append({'args': [g]})
        for _ in range(30):
            n = rng.randint(2, 6)
            adj = [set() for _ in range(n)]
            for i in range(1, n):
                p = rng.randint(0, i - 1)
                adj[i].add(p); adj[p].add(i)
            for _ in range(rng.randint(0, n)):
                u = rng.randint(0, n - 1); v = rng.randint(0, n - 1)
                if u != v: adj[u].add(v); adj[v].add(u)
            cases.append({'args': [[sorted(list(x)) for x in adj]]})

    elif slug == 'sum-of-distances-in-tree':
        fixed = [(6, [[0, 1], [0, 2], [2, 3], [2, 4], [2, 5]]), (1, []), (2, [[1, 0]])]
        for n, ed in fixed: cases.append({'args': [n, ed]})
        for _ in range(30):
            n = rng.randint(2, 15)
            edges = []
            for i in range(1, n):
                p = rng.randint(0, i - 1)
                edges.append([p, i])
            cases.append({'args': [n, edges]})

    elif slug == 'longest-increasing-path-in-a-matrix':
        fixed = [
            [[9, 9, 4], [6, 6, 8], [2, 1, 1]],
            [[3, 4, 5], [3, 2, 6], [2, 2, 1]],
            [[1]],
            [[7, 8, 9], [9, 7, 6], [7, 2, 3]]
        ]
        for m in fixed: cases.append({'args': [m]})
        for _ in range(30):
            r = rng.randint(1, 8); c = rng.randint(1, 8)
            cases.append({'args': [[[rng.randint(0, 50) for _ in range(c)] for _ in range(r)]]})

    elif slug == 'minimum-cost-to-make-at-least-one-valid-path-in-a-grid':
        fixed = [
            [[1, 1, 1, 1], [2, 2, 2, 2], [1, 1, 1, 1], [2, 2, 2, 2]],
            [[1, 1, 3], [3, 2, 2], [1, 1, 4]],
            [[1, 2], [4, 3]],
            [[2, 2, 2], [2, 2, 2]],
            [[4]]
        ]
        for g in fixed: cases.append({'args': [g]})
        for _ in range(30):
            r = rng.randint(1, 6); c = rng.randint(1, 6)
            cases.append({'args': [[[rng.randint(1, 4) for _ in range(c)] for _ in range(r)]]})

    return cases

sol_code = """${pySol.code.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"""
scope = {}
exec(sol_code, scope)
solver = scope['Solution']()
cases = generate_cases('${slug}')

results = []
for c in cases:
    ans = getattr(solver, '${methodName}')(*c['args'])
    results.append({'args': c['args'], 'expected': ans})

print(json.dumps(results))
`;

    const pyRun = spawnSync('python3', ['-c', pyHarness], { encoding: 'utf8', timeout: 30000 });
    if (pyRun.status !== 0) {
      throw new Error(`Python harness failed for ${slug}: ${pyRun.stderr}`);
    }

    const testPairs = JSON.parse(pyRun.stdout);
    for (let i = 0; i < testPairs.length; i++) {
      const { args, expected } = testPairs[i];
      // Clone args to avoid mutation side-effects across calls
      const clonedArgs = JSON.parse(JSON.stringify(args));
      const jsResult = jsFn(...clonedArgs);

      if (slug === 'two-sum') {
        const [nums, target] = args;
        if (!Array.isArray(jsResult) || jsResult.length !== 2) {
          throw new Error(`Case ${i}: twoSum returned invalid length: ${JSON.stringify(jsResult)}`);
        }
        const [i1, i2] = jsResult;
        if (i1 === i2 || nums[i1] + nums[i2] !== target) {
          throw new Error(`Case ${i}: twoSum invalid indices: nums[${i1}]+nums[${i2}] != ${target}`);
        }
      } else {
        const jsStr = JSON.stringify(jsResult);
        const expStr = JSON.stringify(expected);
        if (jsStr !== expStr) {
          throw new Error(`Case ${i} mismatch in ${slug}:\nJS: ${jsStr}\nPY: ${expStr}`);
        }
      }
    }
    console.log(`  ↳ Verified JavaScript solution against Python 3 across ${testPairs.length} test cases`);
  }
}
