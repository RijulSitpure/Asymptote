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

    elif slug == 'contains-duplicate':
        fixed = [[[1, 2, 3, 1]], [[1, 2, 3, 4]], [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], [[]], [[1]], [[-10**9, 10**9, -10**9]]]
        for nums in fixed: cases.append({'args': nums})
        for _ in range(30):
            sz = rng.randint(1, 30)
            cases.append({'args': [[rng.randint(-50, 50) for _ in range(sz)]]})

    elif slug == 'valid-anagram':
        fixed = [("anagram", "nagaram"), ("rat", "car"), ("a", "a"), ("a", "b"), ("", ""), ("ab", "a")]
        for s, t in fixed: cases.append({'args': [s, t]})
        letters = 'abcdef'
        for _ in range(30):
            sz = rng.randint(1, 20)
            s = ''.join(rng.choice(letters) for _ in range(sz))
            if rng.random() < 0.5:
                lst = list(s); rng.shuffle(lst); t = ''.join(lst)
            else:
                t = ''.join(rng.choice(letters) for _ in range(sz))
            cases.append({'args': [s, t]})

    elif slug == 'group-anagrams':
        fixed = [
            [["eat", "tea", "tan", "ate", "nat", "bat"]],
            [[""]],
            [["a"]],
            [["bdddddddddd", "bbbbbbbbbbc"]]
        ]
        for strs in fixed: cases.append({'args': strs})
        letters = 'abc'
        for _ in range(25):
            n = rng.randint(1, 15)
            cases.append({'args': [[''.join(rng.choice(letters) for _ in range(rng.randint(0, 5))) for _ in range(n)]]})

    elif slug == 'top-k-frequent-elements':
        fixed = [([1, 1, 1, 2, 2, 3], 2), ([1], 1), ([4, 1, -1, 2, -1, 2, 3], 2)]
        for nums, k in fixed: cases.append({'args': [nums, k]})
        for _ in range(30):
            sz = rng.randint(5, 30)
            nums = [rng.randint(-15, 15) for _ in range(sz)]
            u = len(set(nums))
            k = rng.randint(1, u)
            cases.append({'args': [nums, k]})

    elif slug == 'product-of-array-except-self':
        fixed = [[[1, 2, 3, 4]], [[-1, 1, 0, -3, 3]], [[0, 0]], [[1, 0]], [[2, 3]]]
        for nums in fixed: cases.append({'args': nums})
        for _ in range(30):
            sz = rng.randint(2, 25)
            cases.append({'args': [[rng.randint(-10, 10) for _ in range(sz)]]})

    elif slug == 'longest-consecutive-sequence':
        fixed = [[[100, 4, 200, 1, 3, 2]], [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], [[]], [[1]], [[1, 2, 0, 1]], [[-1, -2, -3, 0]]]
        for nums in fixed: cases.append({'args': nums})
        for _ in range(30):
            sz = rng.randint(0, 35)
            cases.append({'args': [[rng.randint(-30, 30) for _ in range(sz)]]})

    elif slug == 'valid-palindrome':
        fixed = ["A man, a plan, a canal: Panama", "race a car", " ", ".,", "0P", "a."]
        for s in fixed: cases.append({'args': [s]})
        chars = 'abcdefABCDEF0123 .,!?'
        for _ in range(30):
            sz = rng.randint(0, 30)
            cases.append({'args': [''.join(rng.choice(chars) for _ in range(sz))]})

    elif slug == 'two-sum-ii-input-array-is-sorted':
        fixed = [([2, 7, 11, 15], 9), ([2, 3, 4], 6), ([-1, 0], -1), ([0, 0, 3, 4], 0)]
        for nums, t in fixed: cases.append({'args': [nums, t]})
        for _ in range(30):
            sz = rng.randint(2, 25)
            nums = sorted([rng.randint(-50, 50) for _ in range(sz)])
            i1, i2 = rng.sample(range(sz), 2)
            cases.append({'args': [nums, nums[i1] + nums[i2]]})

    elif slug == '3sum':
        fixed = [[[-1, 0, 1, 2, -1, -4]], [[0, 1, 1]], [[0, 0, 0]], [[-2, 0, 1, 1, 2]]]
        for nums in fixed: cases.append({'args': nums})
        for _ in range(25):
            sz = rng.randint(3, 15)
            cases.append({'args': [[rng.randint(-10, 10) for _ in range(sz)]]})

    elif slug == 'container-with-most-water':
        fixed = [[[1, 8, 6, 2, 5, 4, 8, 3, 7]], [[1, 1]], [[4, 3, 2, 1, 4]], [[1, 2, 1]]]
        for h in fixed: cases.append({'args': h})
        for _ in range(30):
            sz = rng.randint(2, 30)
            cases.append({'args': [[rng.randint(1, 100) for _ in range(sz)]]})

    elif slug == 'trapping-rain-water':
        fixed = [[[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], [[4, 2, 0, 3, 2, 5]], [[]], [[1]], [[2, 0, 2]], [[5, 4, 3, 2, 1]]]
        for h in fixed: cases.append({'args': h})
        for _ in range(30):
            sz = rng.randint(0, 30)
            cases.append({'args': [[rng.randint(0, 20) for _ in range(sz)]]})

    elif slug == 'best-time-to-buy-and-sell-stock':
        fixed = [[[7, 1, 5, 3, 6, 4]], [[7, 6, 4, 3, 1]], [[1, 2]], [[2, 1]], [[3, 3, 3]], [[]]]
        for p in fixed: cases.append({'args': p})
        for _ in range(30):
            sz = rng.randint(0, 30)
            cases.append({'args': [[rng.randint(1, 100) for _ in range(sz)]]})

    elif slug == 'longest-substring-without-repeating-characters':
        fixed = ["abcabcbb", "bbbbb", "pwwkew", "", " ", "au", "dvdf"]
        for s in fixed: cases.append({'args': [s]})
        letters = 'abcdef0123'
        for _ in range(30):
            sz = rng.randint(0, 25)
            cases.append({'args': [''.join(rng.choice(letters) for _ in range(sz))]})

    elif slug == 'longest-repeating-character-replacement':
        fixed = [("ABAB", 2), ("AABABBA", 1), ("AAAA", 0), ("ABCDE", 1), ("ABBB", 2)]
        for s, k in fixed: cases.append({'args': [s, k]})
        letters = 'ABCD'
        for _ in range(30):
            sz = rng.randint(1, 25)
            s = ''.join(rng.choice(letters) for _ in range(sz))
            cases.append({'args': [s, rng.randint(0, sz)]})

    elif slug == 'minimum-window-substring':
        fixed = [("ADOBECODEBANC", "ABC"), ("a", "a"), ("a", "aa"), ("ab", "b"), ("aa", "aa")]
        for s, t in fixed: cases.append({'args': [s, t]})
        letters = 'ABCDE'
        for _ in range(30):
            s_len = rng.randint(1, 20); t_len = rng.randint(1, 4)
            cases.append({'args': [''.join(rng.choice(letters) for _ in range(s_len)), ''.join(rng.choice(letters) for _ in range(t_len))]})

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
      } else if (slug === 'two-sum-ii-input-array-is-sorted') {
        const [nums, target] = args;
        if (!Array.isArray(jsResult) || jsResult.length !== 2) {
          throw new Error(`Case ${i}: twoSum returned invalid length: ${JSON.stringify(jsResult)}`);
        }
        const [i1, i2] = jsResult;
        if (i1 >= i2 || nums[i1 - 1] + nums[i2 - 1] !== target) {
          throw new Error(`Case ${i}: twoSum II invalid indices: nums[${i1 - 1}]+nums[${i2 - 1}] != ${target}`);
        }
      } else if (slug === 'group-anagrams') {
        const norm = arr => JSON.stringify(arr.map(g => [...g].sort()).sort());
        if (norm(jsResult) !== norm(expected)) {
          throw new Error(`Case ${i} mismatch in group-anagrams:\nJS: ${norm(jsResult)}\nPY: ${norm(expected)}`);
        }
      } else if (slug === '3sum') {
        const norm = arr => JSON.stringify(arr.map(t => [...t].sort((a, b) => a - b)).sort());
        if (norm(jsResult) !== norm(expected)) {
          throw new Error(`Case ${i} mismatch in 3sum:\nJS: ${norm(jsResult)}\nPY: ${norm(expected)}`);
        }
      } else if (slug === 'top-k-frequent-elements') {
        const k = args[1];
        if (!Array.isArray(jsResult) || jsResult.length !== k) {
          throw new Error(`Case ${i}: topKFrequent invalid length: ${JSON.stringify(jsResult)}`);
        }
        const jsSet = new Set(jsResult);
        if (jsSet.size !== k) {
          throw new Error(`Case ${i}: topKFrequent returned duplicate elements: ${JSON.stringify(jsResult)}`);
        }
        const nums = args[0];
        const counts = new Map();
        for (const n of nums) counts.set(n, (counts.get(n) || 0) + 1);
        const jsMinFreq = Math.min(...jsResult.map(n => counts.get(n)));
        for (const [n, f] of counts.entries()) {
          if (!jsSet.has(n) && f > jsMinFreq) {
            throw new Error(`Case ${i}: topKFrequent omitted element ${n} with frequency ${f} > min frequency ${jsMinFreq}`);
          }
        }
      } else if (slug === 'minimum-window-substring') {
        if (expected === "") {
          if (jsResult !== "") throw new Error(`Case ${i}: expected empty string, got "${jsResult}"`);
        } else {
          if (typeof jsResult !== 'string' || jsResult.length !== expected.length) {
            throw new Error(`Case ${i}: minWindow length mismatch: JS "${jsResult}" vs PY "${expected}"`);
          }
          const t = args[1];
          const need = new Map();
          for (const c of t) need.set(c, (need.get(c) || 0) + 1);
          const cur = new Map();
          for (const c of jsResult) cur.set(c, (cur.get(c) || 0) + 1);
          for (const [c, cnt] of need.entries()) {
            if ((cur.get(c) || 0) < cnt) {
              throw new Error(`Case ${i}: minWindow "${jsResult}" does not contain needed character "${c}" x${cnt}`);
            }
          }
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
