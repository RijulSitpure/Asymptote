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
    let codeToTest = cppSol.code;
    let preamble = `
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <map>
#include <set>
#include <queue>
#include <deque>
#include <stack>
#include <algorithm>
#include <climits>
#include <cmath>
#include <numeric>
#include <utility>
#include <sstream>

using namespace std;
`;
    if (!codeToTest.includes('struct ListNode')) {
      preamble += `
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};
`;
    }
    if (!codeToTest.includes('struct TreeNode')) {
      preamble += `
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};
`;
    }
    if (!codeToTest.includes('class Node') && !codeToTest.includes('struct Node')) {
      preamble += `
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() : val(0), neighbors() {}
    Node(int _val) : val(_val), neighbors() {}
    Node(int _val, vector<Node*> _neighbors) : val(_val), neighbors(_neighbors) {}
};
`;
    }
    preamble += `
bool isBadVersion(int version);
int guess(int num);
bool knows(int a, int b);
`;
    codeToTest = preamble + codeToTest;
    const cppRes = spawnSync('g++', ['-std=c++17', '-fsyntax-only', '-x', 'c++', '-'], {
      input: codeToTest,
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

    const sandbox = {
      ListNode: function(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
      },
      TreeNode: function(val, left, right) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
      },
      Node: function(val, neighbors) {
        this.val = (val === undefined ? 0 : val);
        this.neighbors = (neighbors === undefined ? [] : neighbors);
      }
    };
    vm.createContext(sandbox);
    vm.runInContext(jsSol.code, sandbox);

    // Helpers for JS linked lists
    function arrToList(arr) {
      if (!arr || arr.length === 0) return null;
      const dummy = new sandbox.ListNode(0);
      let curr = dummy;
      for (const x of arr) {
        curr.next = new sandbox.ListNode(x);
        curr = curr.next;
      }
      return dummy.next;
    }

    function listToArr(head) {
      const res = [];
      let curr = head;
      while (curr) {
        res.append ? res.append(curr.val) : res.push(curr.val);
        curr = curr.next;
      }
      return res;
    }

    function arrToCycle(arr, pos) {
      if (!arr || arr.length === 0) return null;
      const nodes = arr.map(x => new sandbox.ListNode(x));
      for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].next = nodes[i + 1];
      }
      if (pos >= 0 && pos < nodes.length) {
        nodes[nodes.length - 1].next = nodes[pos];
      }
      return nodes[0];
    }

    // Helpers for JS trees
    function arrToTree(arr) {
      if (!arr || arr.length === 0 || arr[0] === null || arr[0] === undefined) return null;
      const root = new sandbox.TreeNode(arr[0]);
      const queue = [root];
      let i = 1;
      while (queue.length > 0 && i < arr.length) {
        const curr = queue.shift();
        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
          curr.left = new sandbox.TreeNode(arr[i]);
          queue.push(curr.left);
        }
        i++;
        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
          curr.right = new sandbox.TreeNode(arr[i]);
          queue.push(curr.right);
        }
        i++;
      }
      return root;
    }

    function treeToArr(root) {
      if (!root) return [];
      const res = [];
      const queue = [root];
      while (queue.length > 0) {
        const curr = queue.shift();
        if (curr) {
          res.push(curr.val);
          queue.push(curr.left);
          queue.push(curr.right);
        } else {
          res.push(null);
        }
      }
      while (res.length > 0 && res[res.length - 1] === null) {
        res.pop();
      }
      return res;
    }

    function findTreeNode(root, val) {
      if (!root) return null;
      const queue = [root];
      while (queue.length > 0) {
        const curr = queue.shift();
        if (curr.val === val) return curr;
        if (curr.left) queue.push(curr.left);
        if (curr.right) queue.push(curr.right);
      }
      return null;
    }

    // Helpers for JS graphs
    function adjToGraph(adj) {
      if (!adj || adj.length === 0) return null;
      const nodes = Array.from({ length: adj.length }, (_, i) => new sandbox.Node(i + 1));
      for (let i = 0; i < adj.length; i++) {
        nodes[i].neighbors = adj[i].map(nbr => nodes[nbr - 1]);
      }
      return nodes[0];
    }

    function graphToAdj(node) {
      if (!node) return [];
      const visited = new Map();
      function dfs(curr) {
        if (!curr || visited.has(curr.val)) return;
        visited.set(curr.val, curr);
        for (const nbr of curr.neighbors) dfs(nbr);
      }
      dfs(node);
      const adj = Array.from({ length: visited.size }, () => []);
      for (const [val, n] of visited.entries()) {
        adj[val - 1] = n.neighbors.map(nbr => nbr.val);
      }
      return adj;
    }

    // Special class design testing for min-stack and lru-cache
    if (slug === 'min-stack') {
      const pyHarness = `
import json

sol_code = """${pySol.code.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"""
scope = {}
exec(sol_code, scope)
MinStack = scope['MinStack']

ops = [
  ("push", [-2]), ("push", [0]), ("push", [-3]), ("getMin", []),
  ("pop", []), ("top", []), ("getMin", []),
  ("push", [5]), ("push", [2]), ("push", [2]), ("getMin", []),
  ("pop", []), ("getMin", [])
]

res = []
ms = MinStack()
for op, a in ops:
    if op == 'push':
        ms.push(a[0])
        res.append(None)
    elif op == 'pop':
        ms.pop()
        res.append(None)
    elif op == 'top':
        res.append(ms.top())
    elif op == 'getMin':
        res.append(ms.getMin())

print(json.dumps({'ops': ops, 'expected': res}))
`;
      const pyRun = spawnSync('python3', ['-c', pyHarness], { encoding: 'utf8', timeout: 30000 });
      if (pyRun.status !== 0) {
        throw new Error(`Python harness failed for min-stack: ${pyRun.stderr}`);
      }
      const data = JSON.parse(pyRun.stdout);
      const ms = new sandbox.MinStack();
      for (let k = 0; k < data.ops.length; k++) {
        const [op, a] = data.ops[k];
        const exp = data.expected[k];
        let actual = null;
        if (op === 'push') ms.push(a[0]);
        else if (op === 'pop') ms.pop();
        else if (op === 'top') actual = ms.top();
        else if (op === 'getMin') actual = ms.getMin();

        if (actual !== exp) {
          throw new Error(`MinStack op ${op}(${JSON.stringify(a)}): JS ${actual} vs PY ${exp}`);
        }
      }
      console.log(`  ↳ Verified JavaScript MinStack against Python 3 across ${data.ops.length} operations`);
      return;
    }

    if (slug === 'lru-cache') {
      const pyHarness = `
import json

sol_code = """${pySol.code.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"""
scope = {}
exec(sol_code, scope)
LRUCache = scope['LRUCache']

ops = [
  ("put", [1, 1]), ("put", [2, 2]), ("get", [1]), ("put", [3, 3]),
  ("get", [2]), ("put", [4, 4]), ("get", [1]), ("get", [3]), ("get", [4]),
  ("put", [2, 1]), ("put", [2, 2]), ("get", [2]), ("put", [1, 1]), ("put", [4, 1]), ("get", [2])
]

res = []
cache = LRUCache(2)
for op, a in ops:
    if op == 'put':
        cache.put(a[0], a[1])
        res.append(None)
    elif op == 'get':
        res.append(cache.get(a[0]))

print(json.dumps({'ops': ops, 'expected': res}))
`;
      const pyRun = spawnSync('python3', ['-c', pyHarness], { encoding: 'utf8', timeout: 30000 });
      if (pyRun.status !== 0) {
        throw new Error(`Python harness failed for lru-cache: ${pyRun.stderr}`);
      }
      const data = JSON.parse(pyRun.stdout);
      const cache = new sandbox.LRUCache(2);
      for (let k = 0; k < data.ops.length; k++) {
        const [op, a] = data.ops[k];
        const exp = data.expected[k];
        let actual = null;
        if (op === 'put') cache.put(a[0], a[1]);
        else if (op === 'get') actual = cache.get(a[0]);

        if (actual !== exp) {
          throw new Error(`LRUCache op ${op}(${JSON.stringify(a)}): JS ${actual} vs PY ${exp}`);
        }
      }
      console.log(`  ↳ Verified JavaScript LRUCache against Python 3 across ${data.ops.length} operations`);
      return;
    }

    if (slug === 'implement-trie-prefix-tree') {
      const pyHarness = `
import json, random

sol_code = """${pySol.code.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"""
scope = {}
exec(sol_code, scope)
Trie = scope['Trie']

ops = [
  ("insert", ["apple"]), ("search", ["apple"]), ("search", ["app"]),
  ("startsWith", ["app"]), ("insert", ["app"]), ("search", ["app"]),
  ("insert", ["banana"]), ("search", ["ban"]), ("startsWith", ["ban"])
]

rng = random.Random(42)
letters = "abcdef"
for _ in range(50):
    w = ''.join(rng.choice(letters) for _ in range(rng.randint(1, 6)))
    op = rng.choice(["insert", "search", "startsWith"])
    ops.append((op, [w]))

res = []
trie = Trie()
for op, a in ops:
    if op == 'insert':
        trie.insert(a[0])
        res.append(None)
    elif op == 'search':
        res.append(trie.search(a[0]))
    elif op == 'startsWith':
        res.append(trie.startsWith(a[0]))

print(json.dumps({'ops': ops, 'expected': res}))
`;
      const pyRun = spawnSync('python3', ['-c', pyHarness], { encoding: 'utf8', timeout: 30000 });
      if (pyRun.status !== 0) {
        throw new Error(`Python harness failed for implement-trie-prefix-tree: ${pyRun.stderr}`);
      }
      const data = JSON.parse(pyRun.stdout);
      const trie = new sandbox.Trie();
      for (let k = 0; k < data.ops.length; k++) {
        const [op, a] = data.ops[k];
        const exp = data.expected[k];
        let actual = null;
        if (op === 'insert') trie.insert(a[0]);
        else if (op === 'search') actual = trie.search(a[0]);
        else if (op === 'startsWith') actual = trie.startsWith(a[0]);

        if (actual !== exp) {
          throw new Error(`Trie op ${op}(${JSON.stringify(a)}): JS ${actual} vs PY ${exp}`);
        }
      }
      console.log(`  ↳ Verified JavaScript Trie against Python 3 across ${data.ops.length} operations`);
      return;
    }

    if (slug === 'binary-search-tree-iterator') {
      const pyHarness = `
import json

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def bst_from_sorted(arr):
    if not arr: return None
    mid = len(arr) // 2
    root = TreeNode(arr[mid])
    root.left = bst_from_sorted(arr[:mid])
    root.right = bst_from_sorted(arr[mid+1:])
    return root

sol_code = """${pySol.code.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"""
scope = {'TreeNode': TreeNode, 'Optional': type('Optional', (), {'__class_getitem__': lambda cls, item: item}), 'List': list, 'Dict': dict}
exec(sol_code, scope)
BSTIterator = scope['BSTIterator']

t = bst_from_sorted([3, 7, 9, 15, 20])
it = BSTIterator(t)
res = []
while it.hasNext():
    res.append(it.next())

print(json.dumps({'expected': res}))
`;
      const pyRun = spawnSync('python3', ['-c', pyHarness], { encoding: 'utf8', timeout: 30000 });
      if (pyRun.status !== 0) {
        throw new Error(`Python harness failed for binary-search-tree-iterator: ${pyRun.stderr}`);
      }
      const data = JSON.parse(pyRun.stdout);
      function bstFromSorted(arr) {
        if (!arr || arr.length === 0) return null;
        const mid = Math.floor(arr.length / 2);
        const root = new sandbox.TreeNode(arr[mid]);
        root.left = bstFromSorted(arr.slice(0, mid));
        root.right = bstFromSorted(arr.slice(mid + 1));
        return root;
      }
      const jsIt = new sandbox.BSTIterator(bstFromSorted([3, 7, 9, 15, 20]));
      const actual = [];
      while (jsIt.hasNext()) {
        actual.push(jsIt.next());
      }
      if (JSON.stringify(actual) !== JSON.stringify(data.expected)) {
        throw new Error(`BSTIterator mismatch: JS ${JSON.stringify(actual)} vs PY ${JSON.stringify(data.expected)}`);
      }
      console.log(`  ↳ Verified JavaScript BSTIterator against Python 3 across ${data.expected.length} elements`);
      return;
    }

    if (slug === 'find-median-from-data-stream') {
      const pyHarness = `
import json, random

sol_code = """${pySol.code.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"""
scope = {}
exec(sol_code, scope)
MedianFinder = scope['MedianFinder']

ops = [
  ("addNum", [1]), ("addNum", [2]), ("findMedian", []),
  ("addNum", [3]), ("findMedian", []),
  ("addNum", [-1]), ("findMedian", []),
  ("addNum", [5]), ("findMedian", [])
]

rng = random.Random(42)
for _ in range(50):
    val = rng.randint(-100, 100)
    ops.append(("addNum", [val]))
    if rng.random() < 0.6:
        ops.append(("findMedian", []))

res = []
mf = MedianFinder()
for op, a in ops:
    if op == 'addNum':
        mf.addNum(a[0])
        res.append(None)
    elif op == 'findMedian':
        res.append(mf.findMedian())

print(json.dumps({'ops': ops, 'expected': res}))
`;
      const pyRun = spawnSync('python3', ['-c', pyHarness], { encoding: 'utf8', timeout: 30000 });
      if (pyRun.status !== 0) {
        throw new Error(`Python harness failed for find-median-from-data-stream: ${pyRun.stderr}`);
      }
      const data = JSON.parse(pyRun.stdout);
      const mf = new sandbox.MedianFinder();
      for (let k = 0; k < data.ops.length; k++) {
        const [op, a] = data.ops[k];
        const exp = data.expected[k];
        let actual = null;
        if (op === 'addNum') mf.addNum(a[0]);
        else if (op === 'findMedian') actual = mf.findMedian();

        if (actual !== null && Math.abs(actual - exp) > 1e-6) {
          throw new Error(`MedianFinder op ${op}: JS ${actual} vs PY ${exp}`);
        }
      }
      console.log(`  ↳ Verified JavaScript MedianFinder against Python 3 across ${data.ops.length} operations`);
      return;
    }

    const jsFn = sandbox[methodName];
    if (typeof jsFn !== 'function') {
      throw new Error(`JavaScript solution does not export method "${methodName}"`);
    }

    // Python harness to generate cases and evaluate python solution
    const pyHarness = `
import json, random, math, copy

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def arr_to_list(arr):
    if not arr: return None
    dummy = ListNode(0)
    curr = dummy
    for x in arr:
        curr.next = ListNode(x)
        curr = curr.next
    return dummy.next

def list_to_arr(head):
    res = []
    curr = head
    while curr:
        res.append(curr.val)
        curr = curr.next
    return res

def arr_to_cycle(arr, pos):
    if not arr: return None
    nodes = [ListNode(x) for x in arr]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    if pos >= 0 and pos < len(nodes):
        nodes[-1].next = nodes[pos]
    return nodes[0]

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def arr_to_tree(arr):
    if not arr or arr[0] is None:
        return None
    root = TreeNode(arr[0])
    queue = [root]
    i = 1
    while queue and i < len(arr):
        curr = queue.pop(0)
        if i < len(arr) and arr[i] is not None:
            curr.left = TreeNode(arr[i])
            queue.append(curr.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            curr.right = TreeNode(arr[i])
            queue.append(curr.right)
        i += 1
    return root

def tree_to_arr(root):
    if not root:
        return []
    res = []
    queue = [root]
    while queue:
        curr = queue.pop(0)
        if curr:
            res.append(curr.val)
            queue.append(curr.left)
            queue.append(curr.right)
        else:
            res.append(None)
    while res and res[-1] is None:
        res.pop()
    return res

def find_bst_node(root, val):
    curr = root
    while curr:
        if curr.val == val: return curr
        elif val < curr.val: curr = curr.left
        else: curr = curr.right
    return None

class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def adj_to_graph(adj):
    if not adj or len(adj) == 0: return None
    nodes = {i + 1: Node(i + 1) for i in range(len(adj))}
    for i, nbrs in enumerate(adj):
        nodes[i + 1].neighbors = [nodes[n] for n in nbrs]
    return nodes[1]

def graph_to_adj(node):
    if not node: return []
    visited = {}
    def dfs(curr):
        if not curr or curr.val in visited: return
        visited[curr.val] = curr
        for nbr in curr.neighbors:
            dfs(nbr)
    dfs(node)
    adj = [[] for _ in range(len(visited))]
    for val in sorted(visited.keys()):
        adj[val - 1] = [nbr.val for nbr in visited[val].neighbors]
    return adj

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

    elif slug == 'evaluate-reverse-polish-notation':
        fixed = [
            (["2","1","+","3","*"],),
            (["4","13","5","/","+"],),
            (["10","6","9","3","+","-11","*","/","*","17","+","5","+"],),
            (["42"],),
            (["-6","132","/"],)
        ]
        for t in fixed: cases.append({'args': list(t)})

    elif slug == 'car-fleet':
        fixed = [
            (12, [10,8,0,5,3], [2,4,1,1,3]),
            (10, [3], [3]),
            (100, [0,2,4], [4,2,1]),
            (10, [6, 8], [3, 2])
        ]
        for t, p, s in fixed: cases.append({'args': [t, p, s]})
        for _ in range(25):
            target = rng.randint(50, 500)
            n = rng.randint(1, 20)
            p = rng.sample(range(0, target), n)
            s = [rng.randint(1, 30) for _ in range(n)]
            cases.append({'args': [target, p, s]})

    elif slug == 'largest-rectangle-in-histogram':
        fixed = [[[2,1,5,6,2,3]], [[2,4]], [[1]], [[5,5,5,5]], [[1,2,3,4,5]], [[5,4,3,2,1]]]
        for h in fixed: cases.append({'args': h})
        for _ in range(30):
            sz = rng.randint(1, 30)
            cases.append({'args': [[rng.randint(0, 40) for _ in range(sz)]]})

    elif slug == 'binary-search':
        fixed = [([-1,0,3,5,9,12], 9), ([-1,0,3,5,9,12], 2), ([5], 5), ([5], -5)]
        for n, t in fixed: cases.append({'args': [n, t]})
        for _ in range(30):
            sz = rng.randint(1, 30)
            nums = sorted(list(set(rng.randint(-50, 50) for _ in range(sz))))
            target = rng.choice(nums) if rng.random() < 0.6 else rng.randint(-60, 60)
            cases.append({'args': [nums, target]})

    elif slug == 'search-a-2d-matrix':
        fixed = [
            ([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3),
            ([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13),
            ([[1]], 1),
            ([[1]], 0)
        ]
        for m, t in fixed: cases.append({'args': [m, t]})
        for _ in range(25):
            r = rng.randint(1, 6); c = rng.randint(1, 6)
            vals = sorted(list(set(rng.randint(-50, 50) for _ in range(r * c))))
            while len(vals) < r * c: vals.append(vals[-1] + 1)
            mat = [vals[i * c : (i + 1) * c] for i in range(r)]
            target = rng.choice(vals) if rng.random() < 0.5 else rng.randint(-60, 60)
            cases.append({'args': [mat, target]})

    elif slug == 'koko-eating-bananas':
        fixed = [([3,6,7,11], 8), ([30,11,23,4,20], 5), ([30,11,23,4,20], 6), ([1,1,1,1], 4)]
        for p, h in fixed: cases.append({'args': [p, h]})
        for _ in range(25):
            n = rng.randint(1, 20)
            p = [rng.randint(1, 100) for _ in range(n)]
            h = rng.randint(n, n * 5)
            cases.append({'args': [p, h]})

    elif slug == 'find-minimum-in-rotated-sorted-array':
        fixed = [[[3,4,5,1,2]], [[4,5,6,7,0,1,2]], [[11,13,15,17]], [[1]], [[2,1]]]
        for n in fixed: cases.append({'args': n})
        for _ in range(30):
            sz = rng.randint(1, 30)
            vals = sorted(list(set(rng.randint(-50, 50) for _ in range(sz))))
            rot = rng.randint(0, len(vals) - 1)
            cases.append({'args': [vals[rot:] + vals[:rot]]})

    elif slug == 'search-in-rotated-sorted-array':
        fixed = [([4,5,6,7,0,1,2], 0), ([4,5,6,7,0,1,2], 3), ([1], 0), ([1], 1), ([3,1], 1)]
        for n, t in fixed: cases.append({'args': [n, t]})
        for _ in range(30):
            sz = rng.randint(1, 30)
            vals = sorted(list(set(rng.randint(-50, 50) for _ in range(sz))))
            rot = rng.randint(0, len(vals) - 1)
            nums = vals[rot:] + vals[:rot]
            target = rng.choice(nums) if rng.random() < 0.6 else rng.randint(-60, 60)
            cases.append({'args': [nums, target]})

    elif slug == 'reverse-linked-list':
        fixed = [[[1,2,3,4,5]], [[1,2]], [[]], [[42]]]
        for a in fixed: cases.append({'args': a})
        for _ in range(30):
            sz = rng.randint(0, 25)
            cases.append({'args': [[rng.randint(-50, 50) for _ in range(sz)]]})

    elif slug == 'merge-two-sorted-lists':
        fixed = [([1,2,4], [1,3,4]), ([], []), ([], [0]), ([5], [1,2,3])]
        for a1, a2 in fixed: cases.append({'args': [a1, a2]})
        for _ in range(30):
            n1 = rng.randint(0, 20); n2 = rng.randint(0, 20)
            a1 = sorted([rng.randint(-50, 50) for _ in range(n1)])
            a2 = sorted([rng.randint(-50, 50) for _ in range(n2)])
            cases.append({'args': [a1, a2]})

    elif slug == 'reorder-list':
        fixed = [[[1,2,3,4]], [[1,2,3,4,5]], [[1]], [[1,2]], [[]]]
        for a in fixed: cases.append({'args': a})
        for _ in range(30):
            sz = rng.randint(0, 25)
            cases.append({'args': [[rng.randint(-50, 50) for _ in range(sz)]]})

    elif slug == 'remove-nth-node-from-end-of-list':
        fixed = [([1,2,3,4,5], 2), ([1], 1), ([1,2], 1), ([1,2], 2)]
        for a, n in fixed: cases.append({'args': [a, n]})
        for _ in range(30):
            sz = rng.randint(1, 20)
            n = rng.randint(1, sz)
            cases.append({'args': [[rng.randint(-50, 50) for _ in range(sz)], n]})

    elif slug == 'linked-list-cycle':
        fixed = [([3,2,0,-4], 1), ([1,2], 0), ([1], -1), ([], -1)]
        for a, pos in fixed: cases.append({'args': [a, pos]})
        for _ in range(30):
            sz = rng.randint(0, 20)
            has_c = rng.random() < 0.5
            pos = rng.randint(0, sz - 1) if has_c and sz > 0 else -1
            cases.append({'args': [[rng.randint(-50, 50) for _ in range(sz)], pos]})

    elif slug == 'invert-binary-tree':
        fixed = [[[4, 2, 7, 1, 3, 6, 9]], [[2, 1, 3]], [[]], [[1]], [[1, 2]], [[1, None, 2]]]
        for a in fixed: cases.append({'args': a})
        for _ in range(25):
            sz = rng.randint(1, 35)
            nodes = [rng.randint(-100, 100) if rng.random() > 0.15 else None for _ in range(sz)]
            if nodes and nodes[0] is None: nodes[0] = 1
            cases.append({'args': [nodes]})

    elif slug == 'maximum-depth-of-binary-tree':
        fixed = [[[3, 9, 20, None, None, 15, 7]], [[1, None, 2]], [[]], [[0]], [[1, 2, None, 3, None, 4]]]
        for a in fixed: cases.append({'args': a})
        for _ in range(25):
            sz = rng.randint(1, 35)
            nodes = [rng.randint(-100, 100) if rng.random() > 0.15 else None for _ in range(sz)]
            if nodes and nodes[0] is None: nodes[0] = 1
            cases.append({'args': [nodes]})

    elif slug == 'diameter-of-binary-tree':
        fixed = [[[1, 2, 3, 4, 5]], [[1, 2]], [[1]], [[]], [[1, 2, None, 3, None, 4]]]
        for a in fixed: cases.append({'args': a})
        for _ in range(25):
            sz = rng.randint(1, 35)
            nodes = [rng.randint(-100, 100) if rng.random() > 0.15 else None for _ in range(sz)]
            if nodes and nodes[0] is None: nodes[0] = 1
            cases.append({'args': [nodes]})

    elif slug == 'balanced-binary-tree':
        fixed = [[[3, 9, 20, None, None, 15, 7]], [[1, 2, 2, 3, 3, None, None, 4, 4]], [[]], [[1]], [[1, 2]], [[1, 2, None, 3]]]
        for a in fixed: cases.append({'args': a})
        for _ in range(25):
            sz = rng.randint(1, 35)
            nodes = [rng.randint(-100, 100) if rng.random() > 0.15 else None for _ in range(sz)]
            if nodes and nodes[0] is None: nodes[0] = 1
            cases.append({'args': [nodes]})

    elif slug == 'lowest-common-ancestor-of-a-binary-search-tree':
        tree_vals = [6, 2, 8, 0, 4, 7, 9, None, None, 3, 5]
        queries = [(2, 8), (2, 4), (3, 5), (7, 9), (0, 5), (0, 4)]
        for p, q in queries: cases.append({'args': [tree_vals, p, q]})
        cases.append({'args': [[2, 1], 2, 1]})

    elif slug == 'binary-tree-level-order-traversal':
        fixed = [[[3, 9, 20, None, None, 15, 7]], [[1]], [[]], [[1, 2, None, 3, None, 4]]]
        for a in fixed: cases.append({'args': a})
        for _ in range(25):
            sz = rng.randint(1, 35)
            nodes = [rng.randint(-100, 100) if rng.random() > 0.15 else None for _ in range(sz)]
            if nodes and nodes[0] is None: nodes[0] = 1
            cases.append({'args': [nodes]})

    elif slug == 'validate-binary-search-tree':
        fixed = [[[2, 1, 3]], [[5, 1, 4, None, None, 3, 6]], [[1, 1]], [[2, 2, 2]], [[5, 4, 6, None, None, 3, 7]], [[2147483647]], [[-2147483648]], [[0, -1]], [[]]]
        for a in fixed: cases.append({'args': a})
        for _ in range(25):
            sz = rng.randint(1, 30)
            s_vals = sorted(list(set(rng.randint(-200, 200) for _ in range(sz))))
            def build_bst(vals):
                if not vals: return None
                m = len(vals) // 2
                nd = TreeNode(vals[m])
                nd.left = build_bst(vals[:m])
                nd.right = build_bst(vals[m+1:])
                return nd
            t = build_bst(s_vals)
            cases.append({'args': [tree_to_arr(t)]})

    elif slug == 'kth-smallest-element-in-a-bst':
        fixed = [([3, 1, 4, None, 2], 1), ([5, 3, 6, 2, 4, None, None, 1], 3), ([1], 1), ([2, 1, 3], 2)]
        for a, k in fixed: cases.append({'args': [a, k]})
        for _ in range(25):
            sz = rng.randint(1, 35)
            s_vals = sorted(list(set(rng.randint(-200, 200) for _ in range(sz))))
            def build_bst(vals):
                if not vals: return None
                m = len(vals) // 2
                nd = TreeNode(vals[m])
                nd.left = build_bst(vals[:m])
                nd.right = build_bst(vals[m+1:])
                return nd
            t = build_bst(s_vals)
            k = rng.randint(1, len(s_vals))
            cases.append({'args': [tree_to_arr(t), k]})

    elif slug == 'kth-largest-element-in-an-array':
        fixed = [([3, 2, 1, 5, 6, 4], 2), ([3, 2, 3, 1, 2, 4, 5, 5, 6], 4), ([1], 1), ([-1, -1], 2), ([-1, 2, 0], 1)]
        for a, k in fixed: cases.append({'args': [a, k]})
        for _ in range(30):
            sz = rng.randint(1, 40)
            nums = [rng.randint(-100, 100) for _ in range(sz)]
            k = rng.randint(1, sz)
            cases.append({'args': [nums, k]})

    elif slug == 'subsets':
        fixed = [[[1, 2, 3]], [[0]], [[]], [[1, 2]], [[-1, 0, 1]]]
        for a in fixed: cases.append({'args': a})
        for _ in range(20):
            sz = rng.randint(1, 6)
            nums = sorted(list(set(rng.randint(-20, 20) for _ in range(sz))))
            cases.append({'args': [nums]})

    elif slug == 'combination-sum':
        fixed = [([2, 3, 6, 7], 7), ([2, 3, 5], 8), ([2], 1), ([1], 2), ([7, 3, 2], 18)]
        for a, t in fixed: cases.append({'args': [a, t]})
        for _ in range(20):
            sz = rng.randint(1, 4)
            cands = sorted(list(set(rng.randint(2, 10) for _ in range(sz))))
            target = rng.randint(4, 18)
            cases.append({'args': [cands, target]})

    elif slug == 'permutations':
        fixed = [[[1, 2, 3]], [[0, 1]], [[1]], [[-1, 2, 0]], [[4, 3, 2, 1]]]
        for a in fixed: cases.append({'args': a})
        for _ in range(20):
            sz = rng.randint(1, 5)
            nums = rng.sample(range(-20, 20), sz)
            cases.append({'args': [nums]})

    elif slug == 'word-search':
        base_b = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
        fixed = [
            (base_b, "ABCCED"),
            (base_b, "SEE"),
            (base_b, "ABCB"),
            ([["a"]], "a"),
            ([["a"]], "b"),
            ([["a","b"],["c","d"]], "abcd"),
            ([["A","B","C","E"],["S","F","E","S"],["A","D","E","E"]], "ABCESEEEFS")
        ]
        for b, w in fixed: cases.append({'args': [b, w]})
        letters = "ABCDEF"
        for _ in range(20):
            R = rng.randint(2, 4); C = rng.randint(2, 4)
            b = [[rng.choice(letters) for _ in range(C)] for _ in range(R)]
            w = ''.join(rng.choice(letters) for _ in range(rng.randint(1, 5)))
            cases.append({'args': [b, w]})

    elif slug == 'number-of-islands':
        fixed = [
            [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]],
            [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]],
            [["0"]], [["1"]], [["1","0"],["0","1"]], [["1","1"],["1","1"]]
        ]
        for g in fixed: cases.append({'args': [g]})
        for _ in range(25):
            m = rng.randint(2, 6); n = rng.randint(2, 6)
            cases.append({'args': [[[rng.choice(['0', '1']) for _ in range(n)] for _ in range(m)]]})

    elif slug == 'clone-graph':
        fixed = [
            [[2,4],[1,3],[2,4],[1,3]],
            [[]],
            [],
            [[2],[1]]
        ]
        for a in fixed: cases.append({'args': [a]})

    elif slug == 'rotting-oranges':
        fixed = [
            [[2,1,1],[1,1,0],[0,1,1]],
            [[2,1,1],[0,1,1],[1,0,1]],
            [[0,2]],
            [[0]], [[1]], [[2]],
            [[1,2]]
        ]
        for g in fixed: cases.append({'args': [g]})
        for _ in range(25):
            m = rng.randint(1, 6); n = rng.randint(1, 6)
            cases.append({'args': [[[rng.choice([0, 1, 2]) for _ in range(n)] for _ in range(m)]]})

    elif slug == 'pacific-atlantic-water-flow':
        fixed = [
            [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]],
            [[1]],
            [[1,1],[1,1]],
            [[10,10,10],[10,1,10],[10,10,10]]
        ]
        for h in fixed: cases.append({'args': [h]})
        for _ in range(20):
            m = rng.randint(1, 6); n = rng.randint(1, 6)
            cases.append({'args': [[[rng.randint(1, 20) for _ in range(n)] for _ in range(m)]]})

    elif slug == 'course-schedule':
        fixed = [
            (2, [[1, 0]]),
            (2, [[1, 0], [0, 1]]),
            (1, []),
            (3, [[0, 1], [0, 2], [1, 2]]),
            (4, [[1, 0], [2, 0], [3, 1], [3, 2]]),
            (3, [[0, 1], [1, 2], [2, 0]])
        ]
        for num, pre in fixed: cases.append({'args': [num, pre]})
        for _ in range(25):
            num = rng.randint(2, 8)
            edges = []
            for _ in range(rng.randint(0, num * 2)):
                u, v = rng.sample(range(num), 2)
                edges.append([u, v])
            cases.append({'args': [num, edges]})

    elif slug == 'redundant-connection':
        fixed = [
            [[1,2],[1,3],[2,3]],
            [[1,2],[2,3],[3,4],[1,4],[1,5]],
            [[1,2],[2,3],[1,3]]
        ]
        for e in fixed: cases.append({'args': [e]})
        for _ in range(25):
            n = rng.randint(4, 15)
            tree_edges = [[i, rng.randint(1, i - 1)] for i in range(2, n + 1)]
            u, v = rng.sample(range(1, n + 1), 2)
            while [min(u, v), max(u, v)] in [[min(a, b), max(a, b)] for a, b in tree_edges]:
                u, v = rng.sample(range(1, n + 1), 2)
            cases.append({'args': [tree_edges + [[u, v]]]})

    elif slug == 'climbing-stairs':
        for n in [1, 2, 3, 4, 5, 10, 15, 20, 30, 45]:
            cases.append({'args': [n]})

    elif slug == 'house-robber':
        fixed = [
            [1, 2, 3, 1],
            [2, 7, 9, 3, 1],
            [0], [100], [2, 1, 1, 2], [5, 1, 1, 5, 1, 1, 5]
        ]
        for h in fixed: cases.append({'args': [h]})
        for _ in range(30):
            sz = rng.randint(1, 30)
            cases.append({'args': [[rng.randint(0, 100) for _ in range(sz)]]})

    elif slug == 'coin-change':
        fixed = [
            ([1, 2, 5], 11),
            ([2], 3),
            ([1], 0),
            ([1], 1),
            ([1], 2),
            ([2, 5, 10, 1], 27),
            ([186, 419, 83, 408], 6249)
        ]
        for c, a in fixed: cases.append({'args': [c, a]})
        for _ in range(25):
            sz = rng.randint(1, 5)
            coins = sorted(list(set([rng.randint(1, 25) for _ in range(sz)])))
            amt = rng.randint(0, 50)
            cases.append({'args': [coins, amt]})

    elif slug == 'longest-increasing-subsequence':
        fixed = [
            [10, 9, 2, 5, 3, 7, 101, 18],
            [0, 1, 0, 3, 2, 3],
            [7, 7, 7, 7, 7, 7, 7],
            [1], [1, 2, 3, 4, 5], [5, 4, 3, 2, 1]
        ]
        for n in fixed: cases.append({'args': [n]})
        for _ in range(30):
            sz = rng.randint(1, 35)
            cases.append({'args': [[rng.randint(-50, 50) for _ in range(sz)]]})

    elif slug == 'word-break':
        fixed = [
            ("leetcode", ["leet", "code"]),
            ("applepenapple", ["apple", "pen"]),
            ("catsandog", ["cats", "dog", "sand", "and", "cat"]),
            ("a", ["a"]),
            ("a", ["b"]),
            ("cars", ["car", "ca", "rs"])
        ]
        for s, wd in fixed: cases.append({'args': [s, wd]})
        letters = "ab"
        for _ in range(25):
            wd = list(set(''.join(rng.choice(letters) for _ in range(rng.randint(1, 3))) for _ in range(4)))
            s = ''.join(rng.choice(letters) for _ in range(rng.randint(1, 10)))
            cases.append({'args': [s, wd]})

    elif slug == 'partition-equal-subset-sum':
        fixed = [
            [1, 5, 11, 5],
            [1, 2, 3, 5],
            [1, 2, 5],
            [2, 2, 2, 2],
            [1, 1],
            [100]
        ]
        for n in fixed: cases.append({'args': [n]})
        for _ in range(25):
            sz = rng.randint(1, 15)
            cases.append({'args': [[rng.randint(1, 20) for _ in range(sz)]]})

    elif slug == 'unique-paths':
        fixed = [(3, 7), (3, 2), (1, 1), (1, 10), (10, 1), (7, 3), (3, 3)]
        for m, n in fixed: cases.append({'args': [m, n]})
        for _ in range(25):
            cases.append({'args': [rng.randint(1, 12), rng.randint(1, 12)]})

    elif slug == 'longest-common-subsequence':
        fixed = [
            ("abcde", "ace"),
            ("abc", "abc"),
            ("abc", "def"),
            ("ezupkr", "ubmrapg"),
            ("bsbininm", "jmjkbkjkv"),
            ("a", "a"),
            ("a", "b")
        ]
        for t1, t2 in fixed: cases.append({'args': [t1, t2]})
        letters = "abcde"
        for _ in range(25):
            s1 = ''.join(rng.choice(letters) for _ in range(rng.randint(1, 15)))
            s2 = ''.join(rng.choice(letters) for _ in range(rng.randint(1, 15)))
            cases.append({'args': [s1, s2]})

    elif slug == 'jump-game':
        fixed = [
            [2, 3, 1, 1, 4],
            [3, 2, 1, 0, 4],
            [0], [1], [2, 0], [0, 2], [1, 2, 3]
        ]
        for n in fixed: cases.append({'args': [n]})
        for _ in range(30):
            sz = rng.randint(1, 30)
            cases.append({'args': [[rng.randint(0, 5) for _ in range(sz)]]})

    elif slug == 'merge-intervals':
        fixed = [
            [[1,3],[2,6],[8,10],[15,18]],
            [[1,4],[4,5]],
            [[1,4],[0,4]],
            [[1,4],[2,3]],
            [[1,4]],
            [[1,4],[0,2],[3,5]]
        ]
        for iv in fixed: cases.append({'args': [iv]})
        for _ in range(30):
            sz = rng.randint(1, 15)
            iv = []
            for _ in range(sz):
                s = rng.randint(0, 30)
                e = s + rng.randint(0, 15)
                iv.append([s, e])
            cases.append({'args': [iv]})

    elif slug == 'non-overlapping-intervals':
        fixed = [
            [[1,2],[2,3],[3,4],[1,3]],
            [[1,2],[1,2],[1,2]],
            [[1,2],[2,3]],
            [[1,100],[11,22],[1,11],[2,12]],
            [[0,2],[1,3],[2,4],[3,5],[4,6]]
        ]
        for iv in fixed: cases.append({'args': [iv]})
        for _ in range(30):
            sz = rng.randint(1, 15)
            iv = []
            for _ in range(sz):
                s = rng.randint(0, 30)
                e = s + rng.randint(1, 15)
                iv.append([s, e])
            cases.append({'args': [iv]})

    elif slug == 'counting-bits':
        for n in [0, 1, 2, 3, 4, 5, 8, 15, 16, 25, 50, 100]:
            cases.append({'args': [n]})

    elif slug == 'remove-duplicates-from-sorted-array':
        fixed = [[1, 1, 2], [0, 0, 1, 1, 1, 2, 2, 3, 3, 4], [1], [1, 1, 1, 1], [1, 2, 3, 4, 5]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(30):
            sz = rng.randint(1, 30)
            cases.append({'args': [sorted([rng.randint(-20, 20) for _ in range(sz)])]})

    elif slug == 'remove-element':
        fixed = [([3, 2, 2, 3], 3), ([0, 1, 2, 2, 3, 0, 4, 2], 2), ([], 1), ([1], 1), ([1], 2), ([2, 2, 2], 2)]
        for a, val in fixed: cases.append({'args': [a, val]})
        for _ in range(30):
            sz = rng.randint(1, 30)
            arr = [rng.randint(0, 10) for _ in range(sz)]
            val = rng.randint(0, 10)
            cases.append({'args': [arr, val]})

    elif slug == 'sort-colors':
        fixed = [[2, 0, 2, 1, 1, 0], [2, 0, 1], [0], [1], [2], [1, 0], [2, 1, 0, 2, 1, 0], [0, 0, 0], [2, 2, 2]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(30):
            sz = rng.randint(1, 35)
            cases.append({'args': [[rng.randint(0, 2) for _ in range(sz)]]})

    elif slug == 'merge-sorted-array':
        fixed = [
            ([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3),
            ([1], 1, [], 0),
            ([0], 0, [1], 1),
            ([2, 0], 1, [1], 1),
            ([4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3)
        ]
        for n1, m, n2, n in fixed: cases.append({'args': [n1, m, n2, n]})
        for _ in range(30):
            m = rng.randint(0, 20)
            n = rng.randint(0, 20)
            if m == 0 and n == 0: m = 1
            a1 = sorted([rng.randint(-50, 50) for _ in range(m)])
            a2 = sorted([rng.randint(-50, 50) for _ in range(n)])
            cases.append({'args': [a1 + [0] * n, m, a2, n]})

    elif slug == 'majority-element':
        fixed = [[3, 2, 3], [2, 2, 1, 1, 1, 2, 2], [1], [6, 5, 5], [1, 1, 1, 2, 3, 1]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(30):
            sz = rng.randint(1, 35)
            maj = rng.randint(-100, 100)
            maj_count = sz // 2 + 1
            other_count = sz - maj_count
            arr = [maj] * maj_count + [rng.randint(-100, 100) for _ in range(other_count)]
            rng.shuffle(arr)
            cases.append({'args': [arr]})

    elif slug == 'move-zeroes':
        fixed = [[0, 1, 0, 3, 12], [0], [1], [0, 0, 1], [1, 0, 0], [2, 1], [0, 0, 0]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(30):
            sz = rng.randint(1, 35)
            arr = [0 if rng.random() < 0.4 else rng.randint(-50, 50) for _ in range(sz)]
            cases.append({'args': [arr]})

    elif slug == 'reverse-string':
        fixed = [["h","e","l","l","o"], ["H","a","n","n","a","h"], ["a"], ["a","b"]]
        for a in fixed: cases.append({'args': [a]})
        letters = "abcdefghijklmnopqrstuvwxyz"
        for _ in range(30):
            sz = rng.randint(1, 30)
            cases.append({'args': [[rng.choice(letters) for _ in range(sz)]]})

    elif slug == 'squares-of-a-sorted-array':
        fixed = [[-4, -1, 0, 3, 10], [-7, -3, 2, 3, 11], [-5, -3, -2, -1], [0, 1, 2, 3], [0], [-10]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(30):
            sz = rng.randint(1, 35)
            cases.append({'args': [sorted([rng.randint(-100, 100) for _ in range(sz)])]})

    elif slug == '3sum-closest':
        fixed = [([-1, 2, 1, -4], 1), ([0, 0, 0], 1), ([1, 1, 1, 0], -100), ([1, 2, 5, 10, 11], 12)]
        for a, t in fixed: cases.append({'args': [a, t]})
        for _ in range(30):
            sz = rng.randint(3, 25)
            arr = [rng.randint(-100, 100) for _ in range(sz)]
            t = rng.randint(-150, 150)
            cases.append({'args': [arr, t]})

    elif slug == '4sum':
        fixed = [([1, 0, -1, 0, -2, 2], 0), ([2, 2, 2, 2, 2], 8), ([-3, -1, 0, 2, 4, 5], 2), ([0, 0, 0, 0], 0)]
        for a, t in fixed: cases.append({'args': [a, t]})
        for _ in range(25):
            sz = rng.randint(4, 18)
            arr = [rng.randint(-20, 20) for _ in range(sz)]
            t = rng.randint(-30, 30)
            cases.append({'args': [arr, t]})

    elif slug == 'valid-sudoku':
        fixed = [
            [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]],
            [["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
        ]
        for b in fixed: cases.append({'args': [b]})
        for _ in range(20):
            b = [["." for _ in range(9)] for _ in range(9)]
            for r in range(9):
                for c in range(9):
                    if rng.random() < 0.2:
                        b[r][c] = str(rng.randint(1, 9))
            cases.append({'args': [b]})

    elif slug == 'minimum-size-subarray-sum':
        fixed = [(7, [2, 3, 1, 2, 4, 3]), (4, [1, 4, 4]), (11, [1, 1, 1, 1, 1, 1, 1, 1]), (15, [1, 2, 3, 4, 5]), (100, [1, 2, 3])]
        for t, a in fixed: cases.append({'args': [t, a]})
        for _ in range(30):
            sz = rng.randint(1, 35)
            arr = [rng.randint(1, 20) for _ in range(sz)]
            t = rng.randint(1, sum(arr) + 10)
            cases.append({'args': [t, arr]})

    elif slug == 'subarray-sum-equals-k':
        fixed = [([1, 1, 1], 2), ([1, 2, 3], 3), ([1, -1, 0], 0), ([1], 0), ([1], 1), ([-1, -1, 1], 0)]
        for a, k in fixed: cases.append({'args': [a, k]})
        for _ in range(30):
            sz = rng.randint(1, 30)
            arr = [rng.randint(-10, 10) for _ in range(sz)]
            k = rng.randint(-15, 15)
            cases.append({'args': [arr, k]})

    elif slug == 'find-pivot-index':
        fixed = [[1, 7, 3, 6, 5, 6], [1, 2, 3], [2, 1, -1], [0], [-1, -1, -1, -1, -1, 0], [1, -1, 2]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(30):
            sz = rng.randint(1, 35)
            cases.append({'args': [[rng.randint(-20, 20) for _ in range(sz)]]})

    elif slug == 'fruit-into-baskets':
        fixed = [[1, 2, 1], [0, 1, 2, 2], [1, 2, 3, 2, 2], [3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4], [1], [1, 2]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(30):
            sz = rng.randint(1, 35)
            cases.append({'args': [[rng.randint(0, 5) for _ in range(sz)]]})


    elif slug == 'add-two-numbers':
        fixed = [([2, 4, 3], [5, 6, 4]), ([0], [0]), ([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9])]
        for a, b in fixed: cases.append({'args': [a, b]})
        for _ in range(25):
            l1 = [rng.randint(0, 9) for _ in range(rng.randint(1, 15))]
            l2 = [rng.randint(0, 9) for _ in range(rng.randint(1, 15))]
            cases.append({'args': [l1, l2]})

    elif slug == 'swap-nodes-in-pairs':
        fixed = [[1, 2, 3, 4], [], [1], [1, 2, 3]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(25):
            cases.append({'args': [[rng.randint(1, 100) for _ in range(rng.randint(0, 20))]]})

    elif slug == 'reverse-nodes-in-k-group':
        fixed = [([1, 2, 3, 4, 5], 2), ([1, 2, 3, 4, 5], 3), ([1], 1)]
        for a, k in fixed: cases.append({'args': [a, k]})
        for _ in range(25):
            sz = rng.randint(1, 25)
            cases.append({'args': [[rng.randint(1, 100) for _ in range(sz)], rng.randint(1, sz)]})

    elif slug == 'rotate-list':
        fixed = [([1, 2, 3, 4, 5], 2), ([0, 1, 2], 4), ([], 0), ([1], 99)]
        for a, k in fixed: cases.append({'args': [a, k]})
        for _ in range(25):
            sz = rng.randint(0, 20)
            cases.append({'args': [[rng.randint(1, 50) for _ in range(sz)], rng.randint(0, 100)]})

    elif slug in ('remove-duplicates-from-sorted-list', 'remove-duplicates-from-sorted-list-ii'):
        fixed = [[1, 2, 3, 3, 4, 4, 5], [1, 1, 1, 2, 3], [], [1], [1, 1]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(25):
            arr = sorted(rng.randint(1, 10) for _ in range(rng.randint(0, 25)))
            cases.append({'args': [arr]})

    elif slug == 'partition-list':
        fixed = [([1, 4, 3, 2, 5, 2], 3), ([2, 1], 2), ([], 0)]
        for a, x in fixed: cases.append({'args': [a, x]})
        for _ in range(25):
            sz = rng.randint(0, 20)
            cases.append({'args': [[rng.randint(1, 30) for _ in range(sz)], rng.randint(1, 30)]})

    elif slug == 'reverse-linked-list-ii':
        fixed = [([1, 2, 3, 4, 5], 2, 4), ([5], 1, 1)]
        for a, l, r in fixed: cases.append({'args': [a, l, r]})
        for _ in range(25):
            sz = rng.randint(1, 20)
            l = rng.randint(1, sz)
            r = rng.randint(l, sz)
            cases.append({'args': [[rng.randint(1, 50) for _ in range(sz)], l, r]})

    elif slug == 'linked-list-cycle-ii':
        fixed = [([3, 2, 0, -4], 1), ([1, 2], 0), ([1], -1)]
        for a, p in fixed: cases.append({'args': [a, p]})
        for _ in range(25):
            sz = rng.randint(1, 20)
            p = rng.randint(-1, sz - 1)
            cases.append({'args': [[rng.randint(1, 50) for _ in range(sz)], p]})

    elif slug in ('insertion-sort-list', 'sort-list'):
        fixed = [[4, 2, 1, 3], [-1, 5, 3, 4, 0], [], [1]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(25):
            cases.append({'args': [[rng.randint(-50, 50) for _ in range(rng.randint(0, 25))]]})

    elif slug == 'intersection-of-two-linked-lists':
        fixed = [([4, 1, 8, 4, 5], [5, 6, 1, 8, 4, 5], 2, 3), ([1, 9, 1, 2, 4], [3, 2, 4], 3, 1), ([2, 6, 4], [1, 5], 3, 2)]
        for a, b, sa, sb in fixed: cases.append({'args': [a, b, sa, sb]})

    elif slug == 'remove-linked-list-elements':
        fixed = [([1, 2, 6, 3, 4, 5, 6], 6), ([], 1), ([7, 7, 7, 7], 7)]
        for a, v in fixed: cases.append({'args': [a, v]})
        for _ in range(25):
            cases.append({'args': [[rng.randint(1, 10) for _ in range(rng.randint(0, 20))], rng.randint(1, 10)]})

    elif slug == 'palindrome-linked-list':
        fixed = [[1, 2, 2, 1], [1, 2], [1], [1, 2, 3, 2, 1]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(25):
            half = [rng.randint(1, 10) for _ in range(rng.randint(1, 10))]
            is_pal = rng.random() < 0.5
            arr = half + (list(reversed(half)) if is_pal else [999] + list(reversed(half)))
            cases.append({'args': [arr]})

    elif slug == 'delete-the-middle-node-of-a-linked-list':
        fixed = [[1, 3, 4, 7, 1, 2, 6], [1, 2, 3, 4], [2, 1], [1]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(25):
            cases.append({'args': [[rng.randint(1, 50) for _ in range(rng.randint(1, 20))]]})

    elif slug == 'odd-even-linked-list':
        fixed = [[1, 2, 3, 4, 5], [2, 1, 3, 5, 6, 4, 7], [], [1]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(25):
            cases.append({'args': [[rng.randint(1, 50) for _ in range(rng.randint(0, 20))]]})

    elif slug == 'add-two-numbers-ii':
        fixed = [([7, 2, 4, 3], [5, 6, 4]), ([2, 4, 3], [5, 6, 4]), ([0], [0])]
        for a, b in fixed: cases.append({'args': [a, b]})
        for _ in range(25):
            l1 = [rng.randint(1, 9)] + [rng.randint(0, 9) for _ in range(rng.randint(0, 15))]
            l2 = [rng.randint(1, 9)] + [rng.randint(0, 9) for _ in range(rng.randint(0, 15))]
            cases.append({'args': [l1, l2]})

    elif slug == 'split-linked-list-in-parts':
        fixed = [([1, 2, 3], 5), ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3), ([], 3)]
        for a, k in fixed: cases.append({'args': [a, k]})
        for _ in range(25):
            cases.append({'args': [[rng.randint(1, 50) for _ in range(rng.randint(0, 20))], rng.randint(1, 10)]})

    elif slug == 'middle-of-the-linked-list':
        fixed = [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6], [1]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(25):
            cases.append({'args': [[rng.randint(1, 50) for _ in range(rng.randint(1, 20))]]})

    elif slug == 'swapping-nodes-in-a-linked-list':
        fixed = [([1, 2, 3, 4, 5], 2), ([7, 9, 6, 6, 7, 8, 3, 0, 9, 5], 5), ([1], 1)]
        for a, k in fixed: cases.append({'args': [a, k]})
        for _ in range(25):
            sz = rng.randint(1, 20)
            cases.append({'args': [[rng.randint(1, 50) for _ in range(sz)], rng.randint(1, sz)]})

    elif slug == 'longest-valid-parentheses':
        fixed = ["(()", ")()())", "", "()", "()(()"]
        for s in fixed: cases.append({'args': [s]})
        for _ in range(25):
            cases.append({'args': [''.join(rng.choice(['(', ')']) for _ in range(rng.randint(0, 30)))]})

    elif slug == 'simplify-path':
        fixed = ["/home/", "/home//foo/", "/home/user/Documents/../Pictures", "/../", "/.../a/../b/c/../d/./"]
        for s in fixed: cases.append({'args': [s]})

    elif slug == 'basic-calculator-ii':
        fixed = ["3+2*2", " 3/2 ", " 3+5 / 2 ", "14-3/2", "0"]
        for s in fixed: cases.append({'args': [s]})
        ops = ['+', '-', '*', '/']
        for _ in range(25):
            terms = [str(rng.randint(1, 20)) for _ in range(rng.randint(2, 6))]
            expr = "".join(f"{t}{rng.choice(ops)}" for t in terms[:-1]) + terms[-1]
            cases.append({'args': [expr]})

    elif slug == 'decode-string':
        fixed = ["3[a]2[bc]", "3[a2[c]]", "2[abc]3[cd]ef", "abc3[cd]xyz"]
        for s in fixed: cases.append({'args': [s]})

    elif slug == 'exclusive-time-of-functions':
        fixed = [
            (2, ["0:start:0","1:start:2","1:end:5","0:end:6"]),
            (1, ["0:start:0","0:start:2","0:end:5","0:end:6"]),
            (2, ["0:start:0","0:start:2","0:end:5","1:start:6","1:end:6","0:end:7"])
        ]
        for n, logs in fixed: cases.append({'args': [n, logs]})

    elif slug == 'valid-parenthesis-string':
        fixed = ["()", "(*)", "(*))", "(", ")", "(((******))"]
        for s in fixed: cases.append({'args': [s]})
        for _ in range(25):
            cases.append({'args': [''.join(rng.choice(['(', ')', '*']) for _ in range(rng.randint(1, 25)))]})

    elif slug == 'asteroid-collision':
        fixed = [[5, 10, -5], [8, -8], [10, 2, -5], [-2, -1, 1, 2], [-2, -2, 1, -2]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(25):
            cases.append({'args': [[rng.choice([-1, 1]) * rng.randint(1, 50) for _ in range(rng.randint(2, 20))]]})

    elif slug == 'backspace-string-compare':
        fixed = [("ab#c", "ad#c"), ("ab##", "c#d#"), ("a#c", "b"), ("y#fo##f", "y#f#o##f")]
        for s, t in fixed: cases.append({'args': [s, t]})
        for _ in range(25):
            s1 = ''.join(rng.choice(['a', 'b', '#']) for _ in range(rng.randint(1, 20)))
            t1 = ''.join(rng.choice(['a', 'b', '#']) for _ in range(rng.randint(1, 20)))
            cases.append({'args': [s1, t1]})

    elif slug == 'minimum-add-to-make-parentheses-valid':
        fixed = ["())", "(((", "()", "()))(("]
        for s in fixed: cases.append({'args': [s]})
        for _ in range(25):
            cases.append({'args': [''.join(rng.choice(['(', ')']) for _ in range(rng.randint(1, 30)))]})

    elif slug == 'validate-stack-sequences':
        fixed = [([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]), ([1, 2, 3, 4, 5], [4, 3, 5, 1, 2])]
        for p, q in fixed: cases.append({'args': [p, q]})
        for _ in range(25):
            sz = rng.randint(1, 20)
            p = list(range(1, sz + 1))
            st, q = [], []
            pi = 0
            while pi < sz or st:
                if pi < sz and (not st or rng.random() < 0.5):
                    st.append(p[pi]); pi += 1
                else: q.append(st.pop())
            cases.append({'args': [p, q]})

    elif slug == 'check-if-word-is-valid-after-substitutions':
        fixed = ["aabcbc", "abcabcababcc", "abccba", "abc", "a"]
        for s in fixed: cases.append({'args': [s]})

    elif slug == 'remove-outermost-parentheses':
        fixed = ["(()())(())", "(()())(())(()(()))", "()()"]
        for s in fixed: cases.append({'args': [s]})

    elif slug in ('remove-all-adjacent-duplicates-in-string', 'make-the-string-great'):
        fixed = ["abbaca", "azxxzy", "a", "aa", "leEeetcode", "abBAcC"]
        for s in fixed: cases.append({'args': [s]})
        for _ in range(25):
            cases.append({'args': [''.join(rng.choice(['a', 'A', 'b', 'B', 'c']) for _ in range(rng.randint(1, 25)))]})

    elif slug == 'reverse-substrings-between-each-pair-of-parentheses':
        fixed = ["(abcd)", "(u(love)i)", "(ed(et(oc))el)", "a(bcdefghijkl(mno)p)q"]
        for s in fixed: cases.append({'args': [s]})

    elif slug == 'remove-all-adjacent-duplicates-in-string-ii':
        fixed = [("abcd", 2), ("deeedbbcccbdaa", 3), ("pbbcggttciiippooaais", 2)]
        for s, k in fixed: cases.append({'args': [s, k]})

    elif slug == 'minimum-remove-to-make-valid-parentheses':
        fixed = ["lee(t(c)o)de)", "a)b(c)d", "))((", "(a(b(c)d)"]
        for s in fixed: cases.append({'args': [s]})

    elif slug == 'maximum-nesting-depth-of-the-parentheses':
        fixed = ["(1+(2*3)+((8)/4))+1", "(1)+((2))+(((3)))", "1+(2*3)/(2-1)", "1"]
        for s in fixed: cases.append({'args': [s]})

    elif slug == 'maximal-rectangle':
        fixed = [
            [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]],
            [["0"]], [["1"]], [["1","1"],["1","1"]]
        ]
        for m in fixed: cases.append({'args': [m]})

    elif slug == 'sliding-window-maximum':
        fixed = [([1,3,-1,-3,5,3,6,7], 3), ([1], 1), ([1, -1], 1), ([9, 11], 2)]
        for a, k in fixed: cases.append({'args': [a, k]})
        for _ in range(25):
            sz = rng.randint(1, 30)
            k = rng.randint(1, sz)
            cases.append({'args': [[rng.randint(-50, 50) for _ in range(sz)], k]})

    elif slug == 'remove-duplicate-letters':
        fixed = ["bcabc", "cbacdcbc", "abacb", "bbcaac"]
        for s in fixed: cases.append({'args': [s]})

    elif slug == 'remove-k-digits':
        fixed = [("1432219", 3), ("10200", 1), ("10", 2), ("9", 1)]
        for num, k in fixed: cases.append({'args': [num, k]})

    elif slug == '132-pattern':
        fixed = [[1, 2, 3, 4], [3, 1, 4, 2], [-1, 3, 2, 0], [1, 0, 1, -4, -3]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(25):
            cases.append({'args': [[rng.randint(-30, 30) for _ in range(rng.randint(3, 25))]]})

    elif slug == 'next-greater-element-i':
        fixed = [([4, 1, 2], [1, 3, 4, 2]), ([2, 4], [1, 2, 3, 4])]
        for a, b in fixed: cases.append({'args': [a, b]})

    elif slug == 'next-greater-element-ii':
        fixed = [[1, 2, 1], [1, 2, 3, 4, 3], [5, 4, 3, 2, 1], [1]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(25):
            cases.append({'args': [[rng.randint(-50, 50) for _ in range(rng.randint(1, 25))]]})

    elif slug == 'sum-of-subarray-minimums':
        fixed = [[3, 1, 2, 4], [11, 81, 94, 43, 3], [71, 55, 82, 55], [1]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(25):
            cases.append({'args': [[rng.randint(1, 50) for _ in range(rng.randint(1, 25))]]})

    elif slug == 'maximum-width-ramp':
        fixed = [[6, 0, 8, 2, 1, 5], [9, 8, 1, 0, 1, 9, 4, 0, 4, 1], [1, 1], [2, 1]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(25):
            cases.append({'args': [[rng.randint(0, 50) for _ in range(rng.randint(2, 25))]]})

    elif slug == 'next-greater-node-in-linked-list':
        fixed = [[2, 1, 5], [2, 7, 4, 3, 5], [1, 7, 5, 1, 9, 2, 5, 1], [5]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(25):
            cases.append({'args': [[rng.randint(1, 50) for _ in range(rng.randint(1, 20))]]})

    elif slug == 'final-prices-with-a-special-discount-in-a-shop':
        fixed = [[8, 4, 6, 2, 3], [1, 2, 3, 4, 5], [10, 1, 1, 6], [5]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(25):
            cases.append({'args': [[rng.randint(1, 50) for _ in range(rng.randint(1, 25))]]})

    elif slug == 'number-of-visible-people-in-a-queue':
        fixed = [[10, 6, 8, 5, 11, 9], [5, 1, 2, 3, 10], [1, 2, 3], [3, 2, 1], [10]]
        for a in fixed: cases.append({'args': [a]})
        for _ in range(25):
            cases.append({'args': [rng.sample(range(1, 1000), rng.randint(1, 25))]})

    return cases

sol_code = """${pySol.code.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"""
scope = {'ListNode': ListNode, 'TreeNode': TreeNode, 'Node': Node, 'Optional': type('Optional', (), {'__class_getitem__': lambda cls, item: item}), 'List': list, 'Dict': dict, 'Set': set, 'Tuple': tuple}
exec(sol_code, scope)
solver = scope['Solution']()
cases = generate_cases('${slug}')

results = []
for c in cases:
    if '${slug}' == 'reverse-linked-list':
        h = arr_to_list(c['args'][0])
        res = solver.reverseList(h)
        ans = list_to_arr(res)
    elif '${slug}' == 'merge-two-sorted-lists':
        l1 = arr_to_list(c['args'][0])
        l2 = arr_to_list(c['args'][1])
        res = solver.mergeTwoLists(l1, l2)
        ans = list_to_arr(res)
    elif '${slug}' == 'reorder-list':
        h = arr_to_list(c['args'][0])
        solver.reorderList(h)
        ans = list_to_arr(h)
    elif '${slug}' == 'remove-nth-node-from-end-of-list':
        h = arr_to_list(c['args'][0])
        res = solver.removeNthFromEnd(h, c['args'][1])
        ans = list_to_arr(res)
    elif '${slug}' == 'linked-list-cycle':
        h = arr_to_cycle(c['args'][0], c['args'][1])
        ans = solver.hasCycle(h)
    elif '${slug}' == 'invert-binary-tree':
        h = arr_to_tree(c['args'][0])
        res = solver.invertTree(h)
        ans = tree_to_arr(res)
    elif '${slug}' == 'maximum-depth-of-binary-tree':
        h = arr_to_tree(c['args'][0])
        ans = solver.maxDepth(h)
    elif '${slug}' == 'diameter-of-binary-tree':
        h = arr_to_tree(c['args'][0])
        ans = solver.diameterOfBinaryTree(h)
    elif '${slug}' == 'balanced-binary-tree':
        h = arr_to_tree(c['args'][0])
        ans = solver.isBalanced(h)
    elif '${slug}' == 'lowest-common-ancestor-of-a-binary-search-tree':
        h = arr_to_tree(c['args'][0])
        p_node = find_bst_node(h, c['args'][1])
        q_node = find_bst_node(h, c['args'][2])
        res = solver.lowestCommonAncestor(h, p_node, q_node)
        ans = res.val if res else None
    elif '${slug}' == 'binary-tree-level-order-traversal':
        h = arr_to_tree(c['args'][0])
        ans = solver.levelOrder(h)
    elif '${slug}' == 'validate-binary-search-tree':
        h = arr_to_tree(c['args'][0])
        ans = solver.isValidBST(h)
    elif '${slug}' == 'kth-smallest-element-in-a-bst':
        h = arr_to_tree(c['args'][0])
        ans = solver.kthSmallest(h, c['args'][1])
    elif '${slug}' == 'clone-graph':
        g = adj_to_graph(c['args'][0])
        res = solver.cloneGraph(g)
        ans = graph_to_adj(res)
    elif '${slug}' == 'remove-duplicates-from-sorted-array':
        nums_copy = list(c['args'][0])
        k = solver.removeDuplicates(nums_copy)
        ans = {'k': k, 'nums': nums_copy[:k]}
    elif '${slug}' == 'remove-element':
        nums_copy = list(c['args'][0])
        k = solver.removeElement(nums_copy, c['args'][1])
        ans = {'k': k, 'nums': sorted(nums_copy[:k])}
    elif '${slug}' == 'sort-colors':
        nums_copy = list(c['args'][0])
        solver.sortColors(nums_copy)
        ans = nums_copy
    elif '${slug}' == 'merge-sorted-array':
        nums1_copy = list(c['args'][0])
        nums2_copy = list(c['args'][2])
        solver.merge(nums1_copy, c['args'][1], nums2_copy, c['args'][3])
        ans = nums1_copy
    elif '${slug}' == 'move-zeroes':
        nums_copy = list(c['args'][0])
        solver.moveZeroes(nums_copy)
        ans = nums_copy
    elif '${slug}' in ('add-two-numbers', 'add-two-numbers-ii'):
        l1 = arr_to_list(c['args'][0])
        l2 = arr_to_list(c['args'][1])
        ans = list_to_arr(solver.addTwoNumbers(l1, l2))
    elif '${slug}' == 'swap-nodes-in-pairs':
        ans = list_to_arr(solver.swapPairs(arr_to_list(c['args'][0])))
    elif '${slug}' == 'reverse-nodes-in-k-group':
        ans = list_to_arr(solver.reverseKGroup(arr_to_list(c['args'][0]), c['args'][1]))
    elif '${slug}' == 'rotate-list':
        ans = list_to_arr(solver.rotateRight(arr_to_list(c['args'][0]), c['args'][1]))
    elif '${slug}' in ('remove-duplicates-from-sorted-list', 'remove-duplicates-from-sorted-list-ii'):
        ans = list_to_arr(solver.deleteDuplicates(arr_to_list(c['args'][0])))
    elif '${slug}' == 'partition-list':
        ans = list_to_arr(solver.partition(arr_to_list(c['args'][0]), c['args'][1]))
    elif '${slug}' == 'reverse-linked-list-ii':
        ans = list_to_arr(solver.reverseBetween(arr_to_list(c['args'][0]), c['args'][1], c['args'][2]))
    elif '${slug}' == 'linked-list-cycle-ii':
        h = arr_to_cycle(c['args'][0], c['args'][1])
        node = solver.detectCycle(h)
        ans = node.val if node else -1
    elif '${slug}' in ('insertion-sort-list', 'sort-list'):
        ans = list_to_arr(solver.insertionSortList(arr_to_list(c['args'][0])) if '${slug}' == 'insertion-sort-list' else solver.sortList(arr_to_list(c['args'][0])))
    elif '${slug}' == 'intersection-of-two-linked-lists':
        nodes_a = [ListNode(x) for x in c['args'][0]]
        nodes_b = [ListNode(x) for x in c['args'][1]]
        for k in range(len(nodes_a) - 1): nodes_a[k].next = nodes_a[k + 1]
        for k in range(len(nodes_b) - 1): nodes_b[k].next = nodes_b[k + 1]
        sa, sb = c['args'][2], c['args'][3]
        if sa < len(nodes_a) and sb < len(nodes_b) and len(nodes_a) > 0 and len(nodes_b) > 0:
            if sb > 0: nodes_b[sb - 1].next = nodes_a[sa]
            elif sb == 0: nodes_b = nodes_a[sa:]
        headA = nodes_a[0] if nodes_a else None
        headB = nodes_b[0] if nodes_b else None
        res = solver.getIntersectionNode(headA, headB)
        ans = res.val if res else None
    elif '${slug}' == 'remove-linked-list-elements':
        ans = list_to_arr(solver.removeElements(arr_to_list(c['args'][0]), c['args'][1]))
    elif '${slug}' == 'palindrome-linked-list':
        ans = solver.isPalindrome(arr_to_list(c['args'][0]))
    elif '${slug}' == 'delete-the-middle-node-of-a-linked-list':
        ans = list_to_arr(solver.deleteMiddle(arr_to_list(c['args'][0])))
    elif '${slug}' == 'odd-even-linked-list':
        ans = list_to_arr(solver.oddEvenList(arr_to_list(c['args'][0])))
    elif '${slug}' == 'split-linked-list-in-parts':
        parts = solver.splitListToParts(arr_to_list(c['args'][0]), c['args'][1])
        ans = [list_to_arr(p) for p in parts]
    elif '${slug}' == 'middle-of-the-linked-list':
        ans = list_to_arr(solver.middleNode(arr_to_list(c['args'][0])))
    elif '${slug}' == 'swapping-nodes-in-a-linked-list':
        ans = list_to_arr(solver.swapNodes(arr_to_list(c['args'][0]), c['args'][1]))
    elif '${slug}' == 'next-greater-node-in-linked-list':
        ans = solver.nextLargerNodes(arr_to_list(c['args'][0]))
    elif '${slug}' == 'reverse-string':
        s_copy = list(c['args'][0])
        solver.reverseString(s_copy)
        ans = s_copy
    else:
        ans = getattr(solver, '${methodName}')(*copy.deepcopy(c['args']))
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
      let jsResult;

      if (slug === 'reverse-linked-list') {
        const h = arrToList(clonedArgs[0]);
        const res = jsFn(h);
        jsResult = listToArr(res);
      } else if (slug === 'merge-two-sorted-lists') {
        const l1 = arrToList(clonedArgs[0]);
        const l2 = arrToList(clonedArgs[1]);
        const res = jsFn(l1, l2);
        jsResult = listToArr(res);
      } else if (slug === 'reorder-list') {
        const h = arrToList(clonedArgs[0]);
        jsFn(h);
        jsResult = listToArr(h);
      } else if (slug === 'remove-nth-node-from-end-of-list') {
        const h = arrToList(clonedArgs[0]);
        const res = jsFn(h, clonedArgs[1]);
        jsResult = listToArr(res);
      } else if (slug === 'linked-list-cycle') {
        const h = arrToCycle(clonedArgs[0], clonedArgs[1]);
        jsResult = jsFn(h);
      } else if (slug === 'invert-binary-tree') {
        const h = arrToTree(clonedArgs[0]);
        const res = jsFn(h);
        jsResult = treeToArr(res);
      } else if (slug === 'maximum-depth-of-binary-tree') {
        const h = arrToTree(clonedArgs[0]);
        jsResult = jsFn(h);
      } else if (slug === 'diameter-of-binary-tree') {
        const h = arrToTree(clonedArgs[0]);
        jsResult = jsFn(h);
      } else if (slug === 'balanced-binary-tree') {
        const h = arrToTree(clonedArgs[0]);
        jsResult = jsFn(h);
      } else if (slug === 'lowest-common-ancestor-of-a-binary-search-tree') {
        const h = arrToTree(clonedArgs[0]);
        const pNode = findTreeNode(h, clonedArgs[1]);
        const qNode = findTreeNode(h, clonedArgs[2]);
        const res = jsFn(h, pNode, qNode);
        jsResult = res ? res.val : null;
      } else if (slug === 'binary-tree-level-order-traversal') {
        const h = arrToTree(clonedArgs[0]);
        jsResult = jsFn(h);
      } else if (slug === 'validate-binary-search-tree') {
        const h = arrToTree(clonedArgs[0]);
        jsResult = jsFn(h);
      } else if (slug === 'kth-smallest-element-in-a-bst') {
        const h = arrToTree(clonedArgs[0]);
        jsResult = jsFn(h, clonedArgs[1]);
      } else if (slug === 'clone-graph') {
        const g = adjToGraph(clonedArgs[0]);
        const res = jsFn(g);
        jsResult = graphToAdj(res);
      } else if (slug === 'remove-duplicates-from-sorted-array') {
        const numsCopy = [...clonedArgs[0]];
        const k = jsFn(numsCopy);
        jsResult = { k, nums: numsCopy.slice(0, k) };
      } else if (slug === 'remove-element') {
        const numsCopy = [...clonedArgs[0]];
        const k = jsFn(numsCopy, clonedArgs[1]);
        jsResult = { k, nums: numsCopy.slice(0, k).sort((a, b) => a - b) };
      } else if (slug === 'sort-colors') {
        const numsCopy = [...clonedArgs[0]];
        jsFn(numsCopy);
        jsResult = numsCopy;
      } else if (slug === 'merge-sorted-array') {
        const nums1Copy = [...clonedArgs[0]];
        const nums2Copy = [...clonedArgs[2]];
        jsFn(nums1Copy, clonedArgs[1], nums2Copy, clonedArgs[3]);
        jsResult = nums1Copy;
      } else if (slug === 'move-zeroes') {
        const numsCopy = [...clonedArgs[0]];
        jsFn(numsCopy);
        jsResult = numsCopy;
      } else if (slug === 'add-two-numbers' || slug === 'add-two-numbers-ii') {
        const l1 = arrToList(clonedArgs[0]);
        const l2 = arrToList(clonedArgs[1]);
        const res = jsFn(l1, l2);
        jsResult = listToArr(res);
      } else if (slug === 'swap-nodes-in-pairs') {
        jsResult = listToArr(jsFn(arrToList(clonedArgs[0])));
      } else if (slug === 'reverse-nodes-in-k-group') {
        jsResult = listToArr(jsFn(arrToList(clonedArgs[0]), clonedArgs[1]));
      } else if (slug === 'rotate-list') {
        jsResult = listToArr(jsFn(arrToList(clonedArgs[0]), clonedArgs[1]));
      } else if (slug === 'remove-duplicates-from-sorted-list' || slug === 'remove-duplicates-from-sorted-list-ii') {
        jsResult = listToArr(jsFn(arrToList(clonedArgs[0])));
      } else if (slug === 'partition-list') {
        jsResult = listToArr(jsFn(arrToList(clonedArgs[0]), clonedArgs[1]));
      } else if (slug === 'reverse-linked-list-ii') {
        jsResult = listToArr(jsFn(arrToList(clonedArgs[0]), clonedArgs[1], clonedArgs[2]));
      } else if (slug === 'linked-list-cycle-ii') {
        const h = arrToCycle(clonedArgs[0], clonedArgs[1]);
        const node = jsFn(h);
        jsResult = node ? node.val : -1;
      } else if (slug === 'insertion-sort-list' || slug === 'sort-list') {
        jsResult = listToArr(jsFn(arrToList(clonedArgs[0])));
      } else if (slug === 'intersection-of-two-linked-lists') {
        const nodesA = clonedArgs[0].map(x => new sandbox.ListNode(x));
        const nodesB = clonedArgs[1].map(x => new sandbox.ListNode(x));
        for (let k = 0; k < nodesA.length - 1; k++) nodesA[k].next = nodesA[k + 1];
        for (let k = 0; k < nodesB.length - 1; k++) nodesB[k].next = nodesB[k + 1];
        const sa = clonedArgs[2], sb = clonedArgs[3];
        if (sa < nodesA.length && sb < nodesB.length && nodesA.length > 0 && nodesB.length > 0) {
          if (sb > 0) nodesB[sb - 1].next = nodesA[sa];
        }
        const headA = nodesA.length > 0 ? nodesA[0] : null;
        const headB = nodesB.length > 0 ? (sb === 0 && sa < nodesA.length ? nodesA[sa] : nodesB[0]) : null;
        const res = jsFn(headA, headB);
        jsResult = res ? res.val : null;
      } else if (slug === 'remove-linked-list-elements') {
        jsResult = listToArr(jsFn(arrToList(clonedArgs[0]), clonedArgs[1]));
      } else if (slug === 'palindrome-linked-list') {
        jsResult = jsFn(arrToList(clonedArgs[0]));
      } else if (slug === 'delete-the-middle-node-of-a-linked-list') {
        jsResult = listToArr(jsFn(arrToList(clonedArgs[0])));
      } else if (slug === 'odd-even-linked-list') {
        jsResult = listToArr(jsFn(arrToList(clonedArgs[0])));
      } else if (slug === 'split-linked-list-in-parts') {
        const parts = jsFn(arrToList(clonedArgs[0]), clonedArgs[1]);
        jsResult = (parts || []).map(listToArr);
      } else if (slug === 'middle-of-the-linked-list') {
        jsResult = listToArr(jsFn(arrToList(clonedArgs[0])));
      } else if (slug === 'swapping-nodes-in-a-linked-list') {
        jsResult = listToArr(jsFn(arrToList(clonedArgs[0]), clonedArgs[1]));
      } else if (slug === 'next-greater-node-in-linked-list') {
        jsResult = jsFn(arrToList(clonedArgs[0]));
      } else if (slug === 'reverse-string') {
        const sCopy = [...clonedArgs[0]];
        jsFn(sCopy);
        jsResult = sCopy;
      } else {
        jsResult = jsFn(...clonedArgs);
      }

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
      } else if (slug === 'subsets' || slug === 'combination-sum') {
        const norm = arr => JSON.stringify(arr.map(sub => [...sub].sort((a, b) => a - b)).sort());
        if (norm(jsResult) !== norm(expected)) {
          throw new Error(`Case ${i} mismatch in ${slug}:\nJS: ${norm(jsResult)}\nPY: ${norm(expected)}`);
        }
      } else if (slug === 'permutations') {
        const norm = arr => JSON.stringify(arr.map(sub => [...sub]).sort());
        if (norm(jsResult) !== norm(expected)) {
          throw new Error(`Case ${i} mismatch in ${slug}:\nJS: ${norm(jsResult)}\nPY: ${norm(expected)}`);
        }
      } else if (slug === 'pacific-atlantic-water-flow') {
        const norm = arr => JSON.stringify(arr.map(c => [...c]).sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
        if (norm(jsResult) !== norm(expected)) {
          throw new Error(`Case ${i} mismatch in pacific-atlantic-water-flow:\nJS: ${norm(jsResult)}\nPY: ${norm(expected)}`);
        }
      } else if (slug === 'merge-intervals') {
        const norm = arr => JSON.stringify(arr.map(iv => [...iv]).sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
        if (norm(jsResult) !== norm(expected)) {
          throw new Error(`Case ${i} mismatch in merge-intervals:\nJS: ${norm(jsResult)}\nPY: ${norm(expected)}`);
        }
      } else if (slug === '4sum') {
        const norm = arr => JSON.stringify(arr.map(t => [...t].sort((a, b) => a - b)).sort());
        if (norm(jsResult) !== norm(expected)) {
          throw new Error(`Case ${i} mismatch in 4sum:\nJS: ${norm(jsResult)}\nPY: ${norm(expected)}`);
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
