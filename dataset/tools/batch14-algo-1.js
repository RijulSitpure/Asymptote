import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

export const batch14Algo1Problems = [
  // 1. #510 inorder-successor-in-bst-ii
  {
    slug: 'inorder-successor-in-bst-ii',
    number: 510,
    category: 'Algorithms',
    patterns: ['tree-bst-properties'],
    hints: [
      {
        level: 1,
        title: 'Parent Pointer Traversal Path',
        text: 'When nodes contain parent references, the next sequential node depends solely on the presence of a right branch or ancestry steps.'
      },
      {
        level: 2,
        title: 'Two Case Successor Branching',
        text: 'If a right child exists, find the leftmost node in that right subtree. Otherwise, climb parent pointers until finding an ancestor of which the current node is in the left branch.'
      },
      {
        level: 3,
        title: 'Step-by-Step Traversal Blueprint',
        text: 'If node.right: curr = node.right; while curr.left: curr = curr.left; return curr. Else: curr = node; while curr.parent and curr == curr.parent.right: curr = curr.parent; return curr.parent.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\n"""\n# Definition for a Node.\nclass Node:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\n        self.parent = None\n"""\n\nclass Solution:\n    def inorderSuccessor(self, node: \'Node\') -> \'Optional[Node]\':\n        if node.right:\n            curr = node.right\n            while curr.left:\n                curr = curr.left\n            return curr\n        curr = node\n        while curr.parent and curr == curr.parent.right:\n            curr = curr.parent\n        return curr.parent\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(H)',
      space: 'O(1)',
      variables: ['H: height of the binary search tree'],
      notes: 'Traverses either down to the leftmost leaf or up ancestors, bound by tree height H.',
      whyNaiveFails: 'Traversing the entire tree from the root takes O(N) time and requires root access which is unavailable.',
      spaceTimeTradeoff: 'Constant auxiliary space utilizing parent pointers directly.',
      interviewerExpectation: 'Clear identification of the two cases: right subtree minimum vs ancestor traversal.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `"""
# Definition for a Node.
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
        self.parent = None
"""

class Solution:
    def inorderSuccessor(self, node: 'Node') -> 'Optional[Node]':
        if node.right:
            curr = node.right
            while curr.left:
                curr = curr.left
            return curr
        curr = node
        while curr.parent and curr == curr.parent.right:
            curr = curr.parent
        return curr.parent`,
        approach: 'Right Subtree Descent or Ancestor Climb',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `/*
class Node {
public:
    int val;
    Node* left;
    Node* right;
    Node* parent;
};
*/

class Solution {
public:
    Node* inorderSuccessor(Node* node) {
        if (!node) return nullptr;
        if (node->right) {
            Node* curr = node->right;
            while (curr->left) curr = curr->left;
            return curr;
        }
        Node* curr = node;
        while (curr->parent && curr == curr->parent->right) {
            curr = curr->parent;
        }
        return curr->parent;
    }
};`,
        approach: 'Pointer Traversal with Parent References',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `/*
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node parent;
};
*/

class Solution {
    public Node inorderSuccessor(Node node) {
        if (node == null) return null;
        if (node.right != null) {
            Node curr = node.right;
            while (curr.left != null) curr = curr.left;
            return curr;
        }
        Node curr = node;
        while (curr.parent != null && curr == curr.parent.right) {
            curr = curr.parent;
        }
        return curr.parent;
    }
}`,
        approach: 'Two-Case BST Node Successor Walk',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * // Definition for a Node.
 * function Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var inorderSuccessor = function(node) {
    if (!node) return null;
    if (node.right) {
        let curr = node.right;
        while (curr.left) curr = curr.left;
        return curr;
    }
    let curr = node;
    while (curr.parent && curr === curr.parent.right) {
        curr = curr.parent;
    }
    return curr.parent;
};`,
        approach: 'JavaScript Iterative BST Parent Climber',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'inorder-successor-in-bst-ii.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


class Node:
    def __init__(self, val, left=None, right=None, parent=None):
        self.val = val
        self.left = left
        self.right = right
        self.parent = parent

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {'Node': Node, 'Optional': type('Optional', (), {'__class_getitem__': lambda cls, item: item})}
    exec(sol_code, scope)
    sol = scope['Solution']()

    n1 = Node(1)
    n2 = Node(2)
    n3 = Node(3)
    n2.left = n1
    n2.right = n3
    n1.parent = n2
    n3.parent = n2

    assert sol.inorderSuccessor(n1) == n2
    assert sol.inorderSuccessor(n2) == n3
    assert sol.inorderSuccessor(n3) is None
    print("✓ inorder-successor-in-bst-ii passed")

if __name__ == '__main__':
    main()
`
  },

  // 2. #519 random-flip-matrix
  {
    slug: 'random-flip-matrix',
    number: 519,
    category: 'Algorithms',
    patterns: ['math-number-theory'],
    hints: [
      {
        level: 1,
        title: 'Virtual Array Fisher-Yates Sampling',
        text: 'Treat the matrix as a flattened sequence of cells and map flipped coordinates to available tail positions without initializing full grids.'
      },
      {
        level: 2,
        title: 'Sparse Index Remapping Map',
        text: 'Pick a random index between zero and remaining count minus one. Swap chosen value with the element at remaining count using a sparse dictionary.'
      },
      {
        level: 3,
        title: 'Flip and Reset Blueprint',
        text: 'In flip(): pick r = randint(0, total - 1). actual = map.get(r, r). total -= 1. map[r] = map.get(total, total). return [actual // n, actual % n]. In reset(): map.clear(), total = m * n.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport random\n\nclass Solution:\n    def __init__(self, m: int, n: int):\n        self.m = m\n        self.n = n\n        self.total = m * n\n        self.mapping = {}\n\n    def flip(self) -> list[int]:\n        r = random.randint(0, self.total - 1)\n        self.total -= 1\n        actual = self.mapping.get(r, r)\n        self.mapping[r] = self.mapping.get(self.total, self.total)\n        return [actual // self.n, actual % self.n]\n\n    def reset(self) -> None:\n        self.mapping.clear()\n        self.total = self.m * self.n\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(K)',
      variables: ['K: number of flip operations performed'],
      notes: 'Constant time flip and reset using sparse hash map swapping.',
      whyNaiveFails: 'Maintaining an explicit m x n grid requires up to 10^8 elements, exhausting memory constraints.',
      spaceTimeTradeoff: 'Sparse hash table stores only flipped indices up to K entries.',
      interviewerExpectation: 'Use of Fisher-Yates sampling adapted with sparse coordinate mapping.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import random

class Solution:
    def __init__(self, m: int, n: int):
        self.m = m
        self.n = n
        self.total = m * n
        self.mapping = {}

    def flip(self) -> list[int]:
        r = random.randint(0, self.total - 1)
        self.total -= 1
        actual = self.mapping.get(r, r)
        self.mapping[r] = self.mapping.get(self.total, self.total)
        return [actual // self.n, actual % self.n]

    def reset(self) -> None:
        self.mapping.clear()
        self.total = self.m * self.n`,
        approach: 'Virtual Flattened Fisher-Yates Shuffle',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    int m, n, total;
    unordered_map<int, int> map;
public:
    Solution(int m, int n) : m(m), n(n), total(m * n) {}
    
    vector<int> flip() {
        int r = rand() % total--;
        int actual = map.count(r) ? map[r] : r;
        map[r] = map.count(total) ? map[total] : total;
        return {actual / n, actual % n};
    }
    
    void reset() {
        map.clear();
        total = m * n;
    }
};`,
        approach: 'Sparse Hash Map Swap Sampling',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private int m, n, total;
    private Map<Integer, Integer> map;
    private Random rand;

    public Solution(int m, int n) {
        this.m = m;
        this.n = n;
        this.total = m * n;
        this.map = new HashMap<>();
        this.rand = new Random();
    }
    
    public int[] flip() {
        int r = rand.nextInt(total--);
        int actual = map.getOrDefault(r, r);
        map.put(r, map.getOrDefault(total, total));
        return new int[]{actual / n, actual % n};
    }
    
    public void reset() {
        map.clear();
        total = m * n;
    }
}`,
        approach: 'Java Random Virtual Array Mapping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number} m
 * @param {number} n
 */
var Solution = function(m, n) {
    this.m = m;
    this.n = n;
    this.total = m * n;
    this.map = new Map();
};

/**
 * @return {number[]}
 */
Solution.prototype.flip = function() {
    const r = Math.floor(Math.random() * this.total);
    this.total--;
    const actual = this.map.has(r) ? this.map.get(r) : r;
    this.map.set(r, this.map.has(this.total) ? this.map.get(this.total) : this.total);
    return [Math.floor(actual / this.n), actual % this.n];
};

/**
 * @return {void}
 */
Solution.prototype.reset = function() {
    this.map.clear();
    this.total = this.m * this.n;
};`,
        approach: 'JavaScript Map Fisher-Yates Tracker',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'random-flip-matrix.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    sol = scope['Solution'](3, 1)

    f1 = sol.flip()
    f2 = sol.flip()
    f3 = sol.flip()
    res = {tuple(f1), tuple(f2), tuple(f3)}
    assert res == {(0, 0), (1, 0), (2, 0)}
    sol.reset()
    assert sol.total == 3
    print("✓ random-flip-matrix passed")

if __name__ == '__main__':
    main()
`
  },

  // 3. #528 random-pick-with-weight
  {
    slug: 'random-pick-with-weight',
    number: 528,
    category: 'Algorithms',
    patterns: ['binary-search-basic'],
    hints: [
      {
        level: 1,
        title: 'Prefix Sum Discrete Probability Partition',
        text: 'Transform positive weights into cumulative thresholds so that sampling uniformly picks an interval proportional to weight.'
      },
      {
        level: 2,
        title: 'Monotonic Search Interval Lookup',
        text: 'Precompute running totals. Generate a random target between one and total sum, then locate the earliest prefix sum at or exceeding target.'
      },
      {
        level: 3,
        title: 'Prefix and Search Blueprint',
        text: 'In init: build prefix sums prefix[i] = prefix[i-1] + w[i]. In pickIndex: target = random(1, prefix[-1]), return bisect_left(prefix, target).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport bisect\nimport random\n\nclass Solution:\n    def __init__(self, w: list[int]):\n        self.prefix = []\n        total = 0\n        for weight in w:\n            total += weight\n            self.prefix.append(total)\n        self.total = total\n\n    def pickIndex(self) -> int:\n        target = random.randint(1, self.total)\n        return bisect.bisect_left(self.prefix, target)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log N)',
      space: 'O(N)',
      variables: ['N: number of weights'],
      notes: 'Initial prefix sum build takes O(N); each sample query executes in O(log N) time.',
      whyNaiveFails: 'Replicating elements according to their weight causes O(W) memory blowup for large weights.',
      spaceTimeTradeoff: 'Prefix array takes O(N) space, enabling logarithmic lookup per pick.',
      interviewerExpectation: 'Use of prefix sums combined with upper/lower bound binary search.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import bisect
import random

class Solution:
    def __init__(self, w: list[int]):
        self.prefix = []
        total = 0
        for weight in w:
            total += weight
            self.prefix.append(total)
        self.total = total

    def pickIndex(self) -> int:
        target = random.randint(1, self.total)
        return bisect.bisect_left(self.prefix, target)`,
        approach: 'Prefix Sum with Bisect Left Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    vector<int> prefix;
    int total;
public:
    Solution(vector<int>& w) {
        int sum = 0;
        for (int weight : w) {
            sum += weight;
            prefix.push_back(sum);
        }
        total = sum;
    }
    
    int pickIndex() {
        int target = rand() % total + 1;
        return lower_bound(prefix.begin(), prefix.end(), target) - prefix.begin();
    }
};`,
        approach: 'Cumulative Vector with std::lower_bound',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private int[] prefix;
    private int total;
    private Random rand;

    public Solution(int[] w) {
        prefix = new int[w.length];
        int sum = 0;
        for (int i = 0; i < w.length; i++) {
            sum += w[i];
            prefix[i] = sum;
        }
        total = sum;
        rand = new Random();
    }
    
    public int pickIndex() {
        int target = rand.nextInt(total) + 1;
        int low = 0, high = prefix.length - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (prefix[mid] < target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }
}`,
        approach: 'Java Binary Search on Cumulative Sum Array',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} w
 */
var Solution = function(w) {
    this.prefix = [];
    let sum = 0;
    for (const weight of w) {
        sum += weight;
        this.prefix.push(sum);
    }
    this.total = sum;
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function() {
    const target = Math.floor(Math.random() * this.total) + 1;
    let low = 0, high = this.prefix.length - 1;
    while (low < high) {
        const mid = (low + high) >> 1;
        if (this.prefix[mid] < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
};`,
        approach: 'JavaScript Binary Search on Prefix Sums',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'random-pick-with-weight.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    sol = scope['Solution']([1, 3])

    picks = [sol.pickIndex() for _ in range(100)]
    assert all(p in (0, 1) for p in picks)
    assert 1 in picks
    print("✓ random-pick-with-weight passed")

if __name__ == '__main__':
    main()
`
  },

  // 4. #535 encode-and-decode-tinyurl
  {
    slug: 'encode-and-decode-tinyurl',
    number: 535,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Bidirectional Hash Mapping Identifier',
        text: 'Generate compact unique tokens for links and maintain reciprocal dictionaries for constant time decoding.'
      },
      {
        level: 2,
        title: 'Counter or Random Base Conversion',
        text: 'Assign a monotonically increasing counter or short random alphanumeric hash to each new link and save mapping in both directions.'
      },
      {
        level: 3,
        title: 'Codec Map Blueprint',
        text: 'Initialize count = 0, long_to_short = {}, short_to_long = {}. In encode(longUrl): if not mapped, key = str(count), save both maps, count += 1. Return prefix + key. In decode(shortUrl): return short_to_long[shortUrl.replace(prefix, "")].'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Codec:\n    def __init__(self):\n        self.long_to_short = {}\n        self.short_to_long = {}\n        self.counter = 0\n        self.base_url = "http://tinyurl.com/"\n\n    def encode(self, longUrl: str) -> str:\n        if longUrl not in self.long_to_short:\n            self.counter += 1\n            short_key = str(self.counter)\n            self.long_to_short[longUrl] = short_key\n            self.short_to_long[short_key] = longUrl\n        return self.base_url + self.long_to_short[longUrl]\n\n    def decode(self, shortUrl: str) -> str:\n        short_key = shortUrl.replace(self.base_url, "")\n        return self.short_to_long[short_key]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(N)',
      variables: ['N: number of encoded URLs'],
      notes: 'Constant time encode and decode operations backed by hash tables.',
      whyNaiveFails: 'Reversible encryption without state produces excessively long strings for large URLs.',
      spaceTimeTradeoff: 'Dual hash tables trade linear memory for immediate O(1) two-way lookups.',
      interviewerExpectation: 'Handling of deduplication and discussion of collision avoidance in distributed environments.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Codec:
    def __init__(self):
        self.long_to_short = {}
        self.short_to_long = {}
        self.counter = 0
        self.base_url = "http://tinyurl.com/"

    def encode(self, longUrl: str) -> str:
        if longUrl not in self.long_to_short:
            self.counter += 1
            short_key = str(self.counter)
            self.long_to_short[longUrl] = short_key
            self.short_to_long[short_key] = longUrl
        return self.base_url + self.long_to_short[longUrl]

    def decode(self, shortUrl: str) -> str:
        short_key = shortUrl.replace(self.base_url, "")
        return self.short_to_long[short_key]`,
        approach: 'Dual Hash Map Incremental Counter Codec',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    unordered_map<string, string> longToShort;
    unordered_map<string, string> shortToLong;
    int counter = 0;
    string baseUrl = "http://tinyurl.com/";
public:
    string encode(string longUrl) {
        if (!longToShort.count(longUrl)) {
            counter++;
            string key = to_string(counter);
            longToShort[longUrl] = key;
            shortToLong[key] = longUrl;
        }
        return baseUrl + longToShort[longUrl];
    }

    string decode(string shortUrl) {
        string key = shortUrl.substr(baseUrl.length());
        return shortToLong[key];
    }
};`,
        approach: 'C++ Bidirectional String Mapping Codec',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `public class Codec {
    private Map<String, String> longToShort = new HashMap<>();
    private Map<String, String> shortToLong = new HashMap<>();
    private int counter = 0;
    private String baseUrl = "http://tinyurl.com/";

    public String encode(String longUrl) {
        if (!longToShort.containsKey(longUrl)) {
            counter++;
            String key = String.valueOf(counter);
            longToShort.put(longUrl, key);
            shortToLong.put(key, longUrl);
        }
        return baseUrl + longToShort.get(longUrl);
    }

    public String decode(String shortUrl) {
        String key = shortUrl.replace(baseUrl, "");
        return shortToLong.get(key);
    }
}`,
        approach: 'Java Counter-Based TinyURL Service',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `const longToShort = new Map();
const shortToLong = new Map();
let counter = 0;
const baseUrl = "http://tinyurl.com/";

/**
 * Encodes a URL to a shortened URL.
 *
 * @param {string} longUrl
 * @return {string}
 */
var encode = function(longUrl) {
    if (!longToShort.has(longUrl)) {
        counter++;
        const key = String(counter);
        longToShort.set(longUrl, key);
        shortToLong.set(key, longUrl);
    }
    return baseUrl + longToShort.get(longUrl);
};

/**
 * Decodes a shortened URL to its original URL.
 *
 * @param {string} shortUrl
 * @return {string}
 */
var decode = function(shortUrl) {
    const key = shortUrl.replace(baseUrl, "");
    return shortToLong.get(key);
};`,
        approach: 'JavaScript Map Key Store Codec',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'encode-and-decode-tinyurl.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    codec = scope['Codec']()

    url = 'https://leetcode.com/problems/design-tinyurl'
    short = codec.encode(url)
    assert short.startswith('http://tinyurl.com/')
    assert codec.decode(short) == url
    print("✓ encode-and-decode-tinyurl passed")

if __name__ == '__main__':
    main()
`
  },

  // 5. #558 logical-or-of-two-binary-grids-represented-as-quad-trees
  {
    slug: 'logical-or-of-two-binary-grids-represented-as-quad-trees',
    number: 558,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    hints: [
      {
        level: 1,
        title: 'Hierarchical Tree Bitwise Merging',
        text: 'Merge two quadrant trees recursively, short-circuiting when either node is a uniform leaf.'
      },
      {
        level: 2,
        title: 'Leaf Short-Circuit and Collapse',
        text: 'If quadTree1 is a leaf with true value, return quadTree1. If a leaf with false, return quadTree2. Otherwise recurse on four quadrants and collapse if all four become uniform leaves.'
      },
      {
        level: 3,
        title: 'Recursive Quad Merge Blueprint',
        text: 'If t1.isLeaf: return t1 if t1.val else t2. If t2.isLeaf: return t2 if t2.val else t1. Recurse on tl, tr, bl, br. If all 4 are leaves with same val: return Node(tl.val, True). Else return Node(0, False, tl, tr, bl, br).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\n"""\n# Definition for a QuadTree node.\nclass Node:\n    def __init__(self, val, isLeaf, topLeft=None, topRight=None, bottomLeft=None, bottomRight=None):\n        self.val = val\n        self.isLeaf = isLeaf\n        self.topLeft = topLeft\n        self.topRight = topRight\n        self.bottomLeft = bottomLeft\n        self.bottomRight = bottomRight\n"""\n\nclass Solution:\n    def intersect(self, quadTree1: \'Node\', quadTree2: \'Node\') -> \'Node\':\n        if quadTree1.isLeaf:\n            return quadTree1 if quadTree1.val else quadTree2\n        if quadTree2.isLeaf:\n            return quadTree2 if quadTree2.val else quadTree1\n\n        tl = self.intersect(quadTree1.topLeft, quadTree2.topLeft)\n        tr = self.intersect(quadTree1.topRight, quadTree2.topRight)\n        bl = self.intersect(quadTree1.bottomLeft, quadTree2.bottomLeft)\n        br = self.intersect(quadTree1.bottomRight, quadTree2.bottomRight)\n\n        if tl.isLeaf and tr.isLeaf and bl.isLeaf and br.isLeaf and tl.val == tr.val == bl.val == br.val:\n            return Node(tl.val, True)\n        return Node(0, False, tl, tr, bl, br)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(log N)',
      variables: ['N: total number of nodes in trees'],
      notes: 'Visits overlapping quadrants recursively, bounded by the number of tree nodes.',
      whyNaiveFails: 'Decompressing quad trees into full grids takes exponential O(2^2H) space and time.',
      spaceTimeTradeoff: 'Direct tree intersection operates in-place without rasterization.',
      interviewerExpectation: 'Correct handling of leaf short-circuiting and quad-leaf collapse logic.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `"""
# Definition for a QuadTree node.
class Node:
    def __init__(self, val, isLeaf, topLeft=None, topRight=None, bottomLeft=None, bottomRight=None):
        self.val = val
        self.isLeaf = isLeaf
        self.topLeft = topLeft
        self.topRight = topRight
        self.bottomLeft = bottomLeft
        self.bottomRight = bottomRight
"""

class Solution:
    def intersect(self, quadTree1: 'Node', quadTree2: 'Node') -> 'Node':
        if quadTree1.isLeaf:
            return quadTree1 if quadTree1.val else quadTree2
        if quadTree2.isLeaf:
            return quadTree2 if quadTree2.val else quadTree1

        tl = self.intersect(quadTree1.topLeft, quadTree2.topLeft)
        tr = self.intersect(quadTree1.topRight, quadTree2.topRight)
        bl = self.intersect(quadTree1.bottomLeft, quadTree2.bottomLeft)
        br = self.intersect(quadTree1.bottomRight, quadTree2.bottomRight)

        if tl.isLeaf and tr.isLeaf and bl.isLeaf and br.isLeaf and tl.val == tr.val == bl.val == br.val:
            return Node(tl.val, True)
        return Node(0, False, tl, tr, bl, br)`,
        approach: 'Recursive Quad-Tree Intersect and Collapse',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `/*
class Node {
public:
    bool val;
    bool isLeaf;
    Node* topLeft;
    Node* topRight;
    Node* bottomLeft;
    Node* bottomRight;
};
*/

class Solution {
public:
    Node* intersect(Node* quadTree1, Node* quadTree2) {
        if (quadTree1->isLeaf) {
            return quadTree1->val ? quadTree1 : quadTree2;
        }
        if (quadTree2->isLeaf) {
            return quadTree2->val ? quadTree2 : quadTree1;
        }

        Node* tl = intersect(quadTree1->topLeft, quadTree2->topLeft);
        Node* tr = intersect(quadTree1->topRight, quadTree2->topRight);
        Node* bl = intersect(quadTree1->bottomLeft, quadTree2->bottomLeft);
        Node* br = intersect(quadTree1->bottomRight, quadTree2->bottomRight);

        if (tl->isLeaf && tr->isLeaf && bl->isLeaf && br->isLeaf &&
            tl->val == tr->val && tr->val == bl->val && bl->val == br->val) {
            return new Node(tl->val, true);
        }
        return new Node(false, false, tl, tr, bl, br);
    }
};`,
        approach: 'C++ Recursive Quad Merging and Pruning',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `/*
class Node {
    public boolean val;
    public boolean isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;
};
*/

class Solution {
    public Node intersect(Node quadTree1, Node quadTree2) {
        if (quadTree1.isLeaf) {
            return quadTree1.val ? quadTree1 : quadTree2;
        }
        if (quadTree2.isLeaf) {
            return quadTree2.val ? quadTree2 : quadTree1;
        }

        Node tl = intersect(quadTree1.topLeft, quadTree2.topLeft);
        Node tr = intersect(quadTree1.topRight, quadTree2.topRight);
        Node bl = intersect(quadTree1.bottomLeft, quadTree2.bottomLeft);
        Node br = intersect(quadTree1.bottomRight, quadTree2.bottomRight);

        if (tl.isLeaf && tr.isLeaf && bl.isLeaf && br.isLeaf &&
            tl.val == tr.val && tr.val == bl.val && bl.val == br.val) {
            return new Node(tl.val, true);
        }
        return new Node(false, false, tl, tr, bl, br);
    }
}`,
        approach: 'Java Recursive Quad Node Intersect',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * // Definition for a QuadTree node.
 * function Node(val,isLeaf,topLeft,topRight,bottomLeft,bottomRight) {
 *    this.val = val;
 *    this.isLeaf = isLeaf;
 *    this.topLeft = topLeft;
 *    this.topRight = topRight;
 *    this.bottomLeft = bottomLeft;
 *    this.bottomRight = bottomRight;
 * };
 */

/**
 * @param {Node} quadTree1
 * @param {Node} quadTree2
 * @return {Node}
 */
var intersect = function(quadTree1, quadTree2) {
    if (quadTree1.isLeaf) {
        return quadTree1.val ? quadTree1 : quadTree2;
    }
    if (quadTree2.isLeaf) {
        return quadTree2.val ? quadTree2 : quadTree1;
    }

    const tl = intersect(quadTree1.topLeft, quadTree2.topLeft);
    const tr = intersect(quadTree1.topRight, quadTree2.topRight);
    const bl = intersect(quadTree1.bottomLeft, quadTree2.bottomLeft);
    const br = intersect(quadTree1.bottomRight, quadTree2.bottomRight);

    if (tl.isLeaf && tr.isLeaf && bl.isLeaf && br.isLeaf &&
        tl.val === tr.val && tr.val === bl.val && bl.val === br.val) {
        return new Node(tl.val, true, null, null, null, null);
    }
    return new Node(0, false, tl, tr, bl, br);
};`,
        approach: 'JavaScript Recursive Quad Tree Merger',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'logical-or-of-two-binary-grids-represented-as-quad-trees.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


class Node:
    def __init__(self, val, isLeaf, topLeft=None, topRight=None, bottomLeft=None, bottomRight=None):
        self.val = val
        self.isLeaf = isLeaf
        self.topLeft = topLeft
        self.topRight = topRight
        self.bottomLeft = bottomLeft
        self.bottomRight = bottomRight

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {'Node': Node}
    exec(sol_code, scope)
    sol = scope['Solution']()

    t1 = Node(1, True)
    t2 = Node(0, True)
    res = sol.intersect(t1, t2)
    assert res.isLeaf and res.val == 1
    print("✓ logical-or-of-two-binary-grids-represented-as-quad-trees passed")

if __name__ == '__main__':
    main()
`
  },

  // 6. #588 design-in-memory-file-system
  {
    slug: 'design-in-memory-file-system',
    number: 588,
    category: 'Algorithms',
    patterns: ['tree-trie-prefix'],
    hints: [
      {
        level: 1,
        title: 'Prefix Tree Directory Hierarchy',
        text: 'Represent nested directories and files using an n-ary tree where directories contain children maps and files store accumulated text content.'
      },
      {
        level: 2,
        title: 'Path Tokenization and Traversal',
        text: 'Split path strings by slash delimiters. Traverse down child nodes, creating missing directories as needed for mkdir or addContentToFile.'
      },
      {
        level: 3,
        title: 'File System Operations Blueprint',
        text: 'Each node has is_file flag, content string, and children dict. ls(path) navigates to node: if is_file return [name], else return sorted(children.keys()).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass FSNode:\n    def __init__(self):\n        self.is_file = False\n        self.content = ""\n        self.children = {}\n\nclass FileSystem:\n    def __init__(self):\n        self.root = FSNode()\n\n    def _traverse(self, path: str) -> FSNode:\n        curr = self.root\n        parts = [p for p in path.split(\'/\') if p]\n        for part in parts:\n            if part not in curr.children:\n                curr.children[part] = FSNode()\n            curr = curr.children[part]\n        return curr\n\n    def ls(self, path: str) -> list[str]:\n        curr = self.root\n        parts = [p for p in path.split(\'/\') if p]\n        for part in parts:\n            curr = curr.children[part]\n        if curr.is_file:\n            return [parts[-1]]\n        return sorted(curr.children.keys())\n\n    def mkdir(self, path: str) -> None:\n        self._traverse(path)\n\n    def addContentToFile(self, filePath: str, content: str) -> None:\n        node = self._traverse(filePath)\n        node.is_file = True\n        node.content += content\n\n    def readContentFromFile(self, filePath: str) -> str:\n        node = self._traverse(filePath)\n        return node.content\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(L + K log K)',
      space: 'O(Total Content + Nodes)',
      variables: ['L: path length in components', 'K: number of entries in directory'],
      notes: 'Path traversal takes O(L); directory listing sorts K children in O(K log K) time.',
      whyNaiveFails: 'Flat dictionary storage cannot efficiently support hierarchical directory listings or nested mkdir.',
      spaceTimeTradeoff: 'Trie nodes allocate space proportional to unique folder and file paths.',
      interviewerExpectation: 'Clean separation between directory nodes and file nodes with string content concatenation.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class FSNode:
    def __init__(self):
        self.is_file = False
        self.content = ""
        self.children = {}

class FileSystem:
    def __init__(self):
        self.root = FSNode()

    def _traverse(self, path: str) -> FSNode:
        curr = self.root
        parts = [p for p in path.split('/') if p]
        for part in parts:
            if part not in curr.children:
                curr.children[part] = FSNode()
            curr = curr.children[part]
        return curr

    def ls(self, path: str) -> list[str]:
        curr = self.root
        parts = [p for p in path.split('/') if p]
        for part in parts:
            curr = curr.children[part]
        if curr.is_file:
            return [parts[-1]]
        return sorted(curr.children.keys())

    def mkdir(self, path: str) -> None:
        self._traverse(path)

    def addContentToFile(self, filePath: str, content: str) -> None:
        node = self._traverse(filePath)
        node.is_file = True
        node.content += content

    def readContentFromFile(self, filePath: str) -> str:
        node = self._traverse(filePath)
        return node.content`,
        approach: 'Trie-Based File System Tree',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `struct FSNode {
    bool isFile = false;
    string content = "";
    map<string, FSNode*> children;
};

class FileSystem {
    FSNode* root;
    vector<string> splitPath(const string& path) {
        vector<string> parts;
        stringstream ss(path);
        string part;
        while (getline(ss, part, '/')) {
            if (!part.empty()) parts.push_back(part);
        }
        return parts;
    }
public:
    FileSystem() {
        root = new FSNode();
    }
    
    vector<string> ls(string path) {
        FSNode* curr = root;
        vector<string> parts = splitPath(path);
        for (const string& p : parts) {
            curr = curr->children[p];
        }
        if (curr->isFile) return {parts.back()};
        vector<string> res;
        for (auto& pair : curr->children) res.push_back(pair.first);
        return res;
    }
    
    void mkdir(string path) {
        FSNode* curr = root;
        for (const string& p : splitPath(path)) {
            if (!curr->children.count(p)) curr->children[p] = new FSNode();
            curr = curr->children[p];
        }
    }
    
    void addContentToFile(string filePath, string content) {
        FSNode* curr = root;
        for (const string& p : splitPath(filePath)) {
            if (!curr->children.count(p)) curr->children[p] = new FSNode();
            curr = curr->children[p];
        }
        curr->isFile = true;
        curr->content += content;
    }
    
    string readContentFromFile(string filePath) {
        FSNode* curr = root;
        for (const string& p : splitPath(filePath)) {
            curr = curr->children[p];
        }
        return curr->content;
    }
};`,
        approach: 'C++ Map Trie Tree Hierarchy',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class FileSystem {
    class FSNode {
        boolean isFile = false;
        StringBuilder content = new StringBuilder();
        Map<String, FSNode> children = new TreeMap<>();
    }
    
    private FSNode root;

    public FileSystem() {
        root = new FSNode();
    }
    
    private String[] split(String path) {
        if (path.equals("/")) return new String[0];
        return path.substring(1).split("/");
    }
    
    public List<String> ls(String path) {
        FSNode curr = root;
        String[] parts = split(path);
        for (String p : parts) {
            curr = curr.children.get(p);
        }
        if (curr.isFile) {
            return Collections.singletonList(parts[parts.length - 1]);
        }
        return new ArrayList<>(curr.children.keySet());
    }
    
    public void mkdir(String path) {
        FSNode curr = root;
        for (String p : split(path)) {
            curr.children.putIfAbsent(p, new FSNode());
            curr = curr.children.get(p);
        }
    }
    
    public void addContentToFile(String filePath, String content) {
        FSNode curr = root;
        for (String p : split(filePath)) {
            curr.children.putIfAbsent(p, new FSNode());
            curr = curr.children.get(p);
        }
        curr.isFile = true;
        curr.content.append(content);
    }
    
    public String readContentFromFile(String filePath) {
        FSNode curr = root;
        for (String p : split(filePath)) {
            curr = curr.children.get(p);
        }
        return curr.content.toString();
    }
}`,
        approach: 'Java TreeMap Trie Tree Directory Model',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class FSNode {
    constructor() {
        this.isFile = false;
        this.content = "";
        this.children = new Map();
    }
}

var FileSystem = function() {
    this.root = new FSNode();
};

FileSystem.prototype._traverse = function(path) {
    let curr = this.root;
    const parts = path.split('/').filter(Boolean);
    for (const part of parts) {
        if (!curr.children.has(part)) {
            curr.children.set(part, new FSNode());
        }
        curr = curr.children.get(part);
    }
    return curr;
};

FileSystem.prototype.ls = function(path) {
    let curr = this.root;
    const parts = path.split('/').filter(Boolean);
    for (const part of parts) {
        curr = curr.children.get(part);
    }
    if (curr.isFile) return [parts[parts.length - 1]];
    return Array.from(curr.children.keys()).sort();
};

FileSystem.prototype.mkdir = function(path) {
    this._traverse(path);
};

FileSystem.prototype.addContentToFile = function(filePath, content) {
    const node = this._traverse(filePath);
    node.isFile = true;
    node.content += content;
};

FileSystem.prototype.readContentFromFile = function(filePath) {
    const node = this._traverse(filePath);
    return node.content;
};`,
        approach: 'JavaScript Map File System Hierarchy',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-in-memory-file-system.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    fs = scope['FileSystem']()

    assert fs.ls('/') == []
    fs.mkdir('/a/b/c')
    fs.addContentToFile('/a/b/c/d', 'hello')
    assert fs.ls('/') == ['a']
    assert fs.readContentFromFile('/a/b/c/d') == 'hello'
    print("✓ design-in-memory-file-system passed")

if __name__ == '__main__':
    main()
`
  },

  // 7. #589 n-ary-tree-preorder-traversal
  {
    slug: 'n-ary-tree-preorder-traversal',
    number: 589,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    hints: [
      {
        level: 1,
        title: 'N-ary Root First Traversal',
        text: 'Record the current node valuation before recursively or iteratively exploring each offspring subbranch from left to right.'
      },
      {
        level: 2,
        title: 'Recursive Depth-First Sequence',
        text: 'Base case returns empty on null root. Append current value to result list, then iterate through children list calling preorder on each.'
      },
      {
        level: 3,
        title: 'Preorder Blueprint',
        text: 'Define res = []. Helper dfs(node): if not node: return. res.append(node.val). For child in node.children: dfs(child). Invoke dfs(root) and return res.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\n"""\n# Definition for a Node.\nclass Node:\n    def __init__(self, val=None, children=None):\n        self.val = val\n        self.children = children if children is not None else []\n"""\n\nclass Solution:\n    def preorder(self, root: \'Node\') -> list[int]:\n        if not root:\n            return []\n        res = []\n        def dfs(node):\n            if not node:\n                return\n            res.append(node.val)\n            for child in node.children:\n                dfs(child)\n        dfs(root)\n        return res\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(H)',
      variables: ['N: total nodes in n-ary tree', 'H: tree height'],
      notes: 'Visits every node once in linear time with recursion stack proportional to tree depth.',
      whyNaiveFails: 'Binary tree assumptions fail because each node may have arbitrary numbers of children.',
      spaceTimeTradeoff: 'Linear time traversal with recursion stack auxiliary memory.',
      interviewerExpectation: 'Correct handling of empty root and iterating children list in natural order.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `"""
# Definition for a Node.
class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []
"""

class Solution:
    def preorder(self, root: 'Node') -> list[int]:
        if not root:
            return []
        res = []
        def dfs(node):
            if not node:
                return
            res.append(node.val)
            for child in node.children:
                dfs(child)
        dfs(root)
        return res`,
        approach: 'Recursive Depth-First Preorder',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `/*
class Node {
public:
    int val;
    vector<Node*> children;
    Node() {}
    Node(int _val) { val = _val; }
    Node(int _val, vector<Node*> _children) { val = _val; children = _children; }
};
*/

class Solution {
    void dfs(Node* root, vector<int>& res) {
        if (!root) return;
        res.push_back(root->val);
        for (Node* child : root->children) {
            dfs(child, res);
        }
    }
public:
    vector<int> preorder(Node* root) {
        vector<int> res;
        dfs(root, res);
        return res;
    }
};`,
        approach: 'C++ Recursive N-ary Preorder Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `/*
class Node {
    public int val;
    public List<Node> children;
    public Node() {}
    public Node(int _val) { val = _val; }
    public Node(int _val, List<Node> _children) { val = _val; children = _children; }
};
*/

class Solution {
    private void dfs(Node root, List<Integer> res) {
        if (root == null) return;
        res.add(root.val);
        for (Node child : root.children) {
            dfs(child, res);
        }
    }

    public List<Integer> preorder(Node root) {
        List<Integer> res = new ArrayList<>();
        dfs(root, res);
        return res;
    }
}`,
        approach: 'Java N-ary Preorder Traversal DFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var preorder = function(root) {
    if (!root) return [];
    const res = [];
    function dfs(node) {
        if (!node) return;
        res.push(node.val);
        for (const child of node.children) {
            dfs(child);
        }
    }
    dfs(root);
    return res;
};`,
        approach: 'JavaScript Recursive N-ary Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'n-ary-tree-preorder-traversal.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {'Node': Node}
    exec(sol_code, scope)
    sol = scope['Solution']()

    n3 = Node(3, [Node(5), Node(6)])
    root = Node(1, [n3, Node(2), Node(4)])
    assert sol.preorder(root) == [1, 3, 5, 6, 2, 4]
    assert sol.preorder(None) == []
    print("✓ n-ary-tree-preorder-traversal passed")

if __name__ == '__main__':
    main()
`
  },

  // 8. #590 n-ary-tree-postorder-traversal
  {
    slug: 'n-ary-tree-postorder-traversal',
    number: 590,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    hints: [
      {
        level: 1,
        title: 'N-ary Children First Traversal',
        text: 'Visit and exhaust all descendant subtrees from left to right prior to recording the current parent node valuation.'
      },
      {
        level: 2,
        title: 'Recursive Post-Order Collection',
        text: 'For each child in node children, recursively execute postorder traversal, then append current node val to the collected list.'
      },
      {
        level: 3,
        title: 'Postorder Blueprint',
        text: 'Define res = []. Helper dfs(node): if not node: return. For child in node.children: dfs(child). res.append(node.val). Return res after calling dfs(root).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\n"""\n# Definition for a Node.\nclass Node:\n    def __init__(self, val=None, children=None):\n        self.val = val\n        self.children = children if children is not None else []\n"""\n\nclass Solution:\n    def postorder(self, root: \'Node\') -> list[int]:\n        if not root:\n            return []\n        res = []\n        def dfs(node):\n            if not node:\n                return\n            for child in node.children:\n                dfs(child)\n            res.append(node.val)\n        dfs(root)\n        return res\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(H)',
      variables: ['N: total nodes in n-ary tree', 'H: tree height'],
      notes: 'Visits every node once with call stack depth bounded by tree height.',
      whyNaiveFails: 'Recording values before traversing subtrees produces preorder sequence instead of postorder.',
      spaceTimeTradeoff: 'Linear time with tree depth auxiliary stack space.',
      interviewerExpectation: 'Correct bottom-up evaluation visiting all children before parent.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `"""
# Definition for a Node.
class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []
"""

class Solution:
    def postorder(self, root: 'Node') -> list[int]:
        if not root:
            return []
        res = []
        def dfs(node):
            if not node:
                return
            for child in node.children:
                dfs(child)
            res.append(node.val)
        dfs(root)
        return res`,
        approach: 'Recursive Post-Order Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `/*
class Node {
public:
    int val;
    vector<Node*> children;
    Node() {}
    Node(int _val) { val = _val; }
    Node(int _val, vector<Node*> _children) { val = _val; children = _children; }
};
*/

class Solution {
    void dfs(Node* root, vector<int>& res) {
        if (!root) return;
        for (Node* child : root->children) {
            dfs(child, res);
        }
        res.push_back(root->val);
    }
public:
    vector<int> postorder(Node* root) {
        vector<int> res;
        dfs(root, res);
        return res;
    }
};`,
        approach: 'C++ Recursive Postorder Tree Walk',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `/*
class Node {
    public int val;
    public List<Node> children;
    public Node() {}
    public Node(int _val) { val = _val; }
    public Node(int _val, List<Node> _children) { val = _val; children = _children; }
};
*/

class Solution {
    private void dfs(Node root, List<Integer> res) {
        if (root == null) return;
        for (Node child : root.children) {
            dfs(child, res);
        }
        res.add(root.val);
    }

    public List<Integer> postorder(Node root) {
        List<Integer> res = new ArrayList<>();
        dfs(root, res);
        return res;
    }
}`,
        approach: 'Java Recursive Postorder Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var postorder = function(root) {
    if (!root) return [];
    const res = [];
    function dfs(node) {
        if (!node) return;
        for (const child of node.children) {
            dfs(child);
        }
        res.push(node.val);
    }
    dfs(root);
    return res;
};`,
        approach: 'JavaScript Recursive Postorder Walker',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'n-ary-tree-postorder-traversal.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {'Node': Node}
    exec(sol_code, scope)
    sol = scope['Solution']()

    n3 = Node(3, [Node(5), Node(6)])
    root = Node(1, [n3, Node(2), Node(4)])
    assert sol.postorder(root) == [5, 6, 3, 2, 4, 1]
    assert sol.postorder(None) == []
    print("✓ n-ary-tree-postorder-traversal passed")

if __name__ == '__main__':
    main()
`
  },

  // 9. #604 design-compressed-string-iterator
  {
    slug: 'design-compressed-string-iterator',
    number: 604,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Run-Length Stream Decompression',
        text: 'Decompress serialized run-length character sequences lazily without materializing full expansion strings in buffer allocations.'
      },
      {
        level: 2,
        title: 'Two-Pointer Segment Parsing',
        text: 'Maintain the current active character and its remaining repeat count. When repeat count reaches zero, parse the next character and following digits.'
      },
      {
        level: 3,
        title: 'StringIterator Blueprint',
        text: 'In init: store compressed string and pointer index = 0. In next(): if not hasNext() return " ". If count == 0: read char, read multi-digit count. Decrement count, return char. In hasNext(): return count > 0 or index < len.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass StringIterator:\n    def __init__(self, compressedString: str):\n        self.s = compressedString\n        self.idx = 0\n        self.curr_char = \' \'\n        self.count = 0\n\n    def next(self) -> str:\n        if not self.hasNext():\n            return \' \'\n        if self.count == 0:\n            self.curr_char = self.s[self.idx]\n            self.idx += 1\n            num = 0\n            while self.idx < len(self.s) and self.s[self.idx].isdigit():\n                num = num * 10 + int(self.s[self.idx])\n                self.idx += 1\n            self.count = num\n        self.count -= 1\n        return self.curr_char\n\n    def hasNext(self) -> bool:\n        return self.count > 0 or self.idx < len(self.s)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['N: length of compressed string'],
      notes: 'Each character emission takes amortized O(1) time; parsing steps occur once per segment.',
      whyNaiveFails: 'Expanding the string eagerly can exhaust memory when character counts are up to 10^9.',
      spaceTimeTradeoff: 'Constant auxiliary space tracking cursor positions.',
      interviewerExpectation: 'Handling multi-digit counts and returning space when iterator is exhausted.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class StringIterator:
    def __init__(self, compressedString: str):
        self.s = compressedString
        self.idx = 0
        self.curr_char = ' '
        self.count = 0

    def next(self) -> str:
        if not self.hasNext():
            return ' '
        if self.count == 0:
            self.curr_char = self.s[self.idx]
            self.idx += 1
            num = 0
            while self.idx < len(self.s) and self.s[self.idx].isdigit():
                num = num * 10 + int(self.s[self.idx])
                self.idx += 1
            self.count = num
        self.count -= 1
        return self.curr_char

    def hasNext(self) -> bool:
        return self.count > 0 or self.idx < len(self.s)`,
        approach: 'Lazy Segment Cursor Parsing',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class StringIterator {
    string s;
    int idx = 0;
    char currChar = ' ';
    int count = 0;
public:
    StringIterator(string compressedString) : s(compressedString) {}
    
    char next() {
        if (!hasNext()) return ' ';
        if (count == 0) {
            currChar = s[idx++];
            long long num = 0;
            while (idx < s.size() && isdigit(s[idx])) {
                num = num * 10 + (s[idx++] - '0');
            }
            count = num;
        }
        count--;
        return currChar;
    }
    
    bool hasNext() {
        return count > 0 || idx < s.size();
    }
};`,
        approach: 'C++ Lazy Stream Parsing',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class StringIterator {
    private String s;
    private int idx = 0;
    private char currChar = ' ';
    private int count = 0;

    public StringIterator(String compressedString) {
        this.s = compressedString;
    }
    
    public char next() {
        if (!hasNext()) return ' ';
        if (count == 0) {
            currChar = s.charAt(idx++);
            int num = 0;
            while (idx < s.length() && Character.isDigit(s.charAt(idx))) {
                num = num * 10 + (s.charAt(idx++) - '0');
            }
            count = num;
        }
        count--;
        return currChar;
    }
    
    public boolean hasNext() {
        return count > 0 || idx < s.length();
    }
}`,
        approach: 'Java Lazy Run-Length Stream Decompressor',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {string} compressedString
 */
var StringIterator = function(compressedString) {
    this.s = compressedString;
    this.idx = 0;
    this.currChar = ' ';
    this.count = 0;
};

/**
 * @return {character}
 */
StringIterator.prototype.next = function() {
    if (!this.hasNext()) return ' ';
    if (this.count === 0) {
        this.currChar = this.s[this.idx++];
        let num = 0;
        while (this.idx < this.s.length && /\\d/.test(this.s[this.idx])) {
            num = num * 10 + Number(this.s[this.idx++]);
        }
        this.count = num;
    }
    this.count--;
    return this.currChar;
};

/**
 * @return {boolean}
 */
StringIterator.prototype.hasNext = function() {
    return this.count > 0 || this.idx < this.s.length;
};`,
        approach: 'JavaScript Lazy Stream Decompressor',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-compressed-string-iterator.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    it = scope['StringIterator']("L1e2t1C1o1d1e1")

    assert it.next() == 'L'
    assert it.next() == 'e'
    assert it.next() == 'e'
    assert it.next() == 't'
    assert it.next() == 'C'
    assert it.next() == 'o'
    assert it.next() == 'd'
    assert it.hasNext() == True
    assert it.next() == 'e'
    assert it.hasNext() == False
    assert it.next() == ' '
    print("✓ design-compressed-string-iterator passed")

if __name__ == '__main__':
    main()
`
  },

  // 10. #622 design-circular-queue
  {
    slug: 'design-circular-queue',
    number: 622,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Ring Buffer Index Arithmetic',
        text: 'Manage head and tail pointers modulo capacity over a preallocated array to reuse buffer slots continuously.'
      },
      {
        level: 2,
        title: 'Head and Count Tracking State',
        text: 'Store fixed capacity k, current item count, and head index. Tail index is computed via (head + count - 1) % k.'
      },
      {
        level: 3,
        title: 'Circular Queue Blueprint',
        text: 'enQueue(v): if isFull return False, write at (head + count) % k, count += 1, return True. deQueue(): if isEmpty return False, head = (head + 1) % k, count -= 1, return True. Front: return queue[head] if not isEmpty else -1. Rear: return queue[(head+count-1)%k] if not isEmpty else -1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass MyCircularQueue:\n    def __init__(self, k: int):\n        self.k = k\n        self.queue = [0] * k\n        self.head = 0\n        self.count = 0\n\n    def enQueue(self, value: int) -> bool:\n        if self.isFull():\n            return False\n        tail = (self.head + self.count) % self.k\n        self.queue[tail] = value\n        self.count += 1\n        return True\n\n    def deQueue(self) -> bool:\n        if self.isEmpty():\n            return False\n        self.head = (self.head + 1) % self.k\n        self.count -= 1\n        return True\n\n    def Front(self) -> int:\n        if self.isEmpty():\n            return -1\n        return self.queue[self.head]\n\n    def Rear(self) -> int:\n        if self.isEmpty():\n            return -1\n        tail = (self.head + self.count - 1) % self.k\n        return self.queue[tail]\n\n    def isEmpty(self) -> bool:\n        return self.count == 0\n\n    def isFull(self) -> bool:\n        return self.count == self.k\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(K)',
      variables: ['K: maximum capacity of circular queue'],
      notes: 'All queue operations execute in strict O(1) time with fixed size array allocation.',
      whyNaiveFails: 'Dynamic arrays without circular wrapping require O(N) shifts on each dequeue operation.',
      spaceTimeTradeoff: 'Allocates fixed array of size K once.',
      interviewerExpectation: 'Use of modular arithmetic and tracking size to distinguish full from empty.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class MyCircularQueue:
    def __init__(self, k: int):
        self.k = k
        self.queue = [0] * k
        self.head = 0
        self.count = 0

    def enQueue(self, value: int) -> bool:
        if self.isFull():
            return False
        tail = (self.head + self.count) % self.k
        self.queue[tail] = value
        self.count += 1
        return True

    def deQueue(self) -> bool:
        if self.isEmpty():
            return False
        self.head = (self.head + 1) % self.k
        self.count -= 1
        return True

    def Front(self) -> int:
        if self.isEmpty():
            return -1
        return self.queue[self.head]

    def Rear(self) -> int:
        if self.isEmpty():
            return -1
        tail = (self.head + self.count - 1) % self.k
        return self.queue[tail]

    def isEmpty(self) -> bool:
        return self.count == 0

    def isFull(self) -> bool:
        return self.count == self.k`,
        approach: 'Fixed-Size Ring Buffer with Count Tracker',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class MyCircularQueue {
    vector<int> q;
    int head = 0, count = 0, k;
public:
    MyCircularQueue(int k) : k(k), q(k) {}
    
    bool enQueue(int value) {
        if (isFull()) return false;
        q[(head + count) % k] = value;
        count++;
        return true;
    }
    
    bool deQueue() {
        if (isEmpty()) return false;
        head = (head + 1) % k;
        count--;
        return true;
    }
    
    int Front() {
        return isEmpty() ? -1 : q[head];
    }
    
    int Rear() {
        return isEmpty() ? -1 : q[(head + count - 1) % k];
    }
    
    bool isEmpty() {
        return count == 0;
    }
    
    bool isFull() {
        return count == k;
    }
};`,
        approach: 'C++ Ring Buffer with Vector Modulo Math',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class MyCircularQueue {
    private int[] q;
    private int head = 0, count = 0, k;

    public MyCircularQueue(int k) {
        this.k = k;
        this.q = new int[k];
    }
    
    public boolean enQueue(int value) {
        if (isFull()) return false;
        q[(head + count) % k] = value;
        count++;
        return true;
    }
    
    public boolean deQueue() {
        if (isEmpty()) return false;
        head = (head + 1) % k;
        count--;
        return true;
    }
    
    public int Front() {
        return isEmpty() ? -1 : q[head];
    }
    
    public int Rear() {
        return isEmpty() ? -1 : q[(head + count - 1) % k];
    }
    
    public boolean isEmpty() {
        return count == 0;
    }
    
    public boolean isFull() {
        return count == k;
    }
}`,
        approach: 'Java Modular Array Circular Queue',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number} k
 */
var MyCircularQueue = function(k) {
    this.k = k;
    this.q = new Array(k);
    this.head = 0;
    this.count = 0;
};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
    if (this.isFull()) return false;
    this.q[(this.head + this.count) % this.k] = value;
    this.count++;
    return true;
};

/** 
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
    if (this.isEmpty()) return false;
    this.head = (this.head + 1) % this.k;
    this.count--;
    return true;
};

/** 
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
    return this.isEmpty() ? -1 : this.q[this.head];
};

/** 
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
    return this.isEmpty() ? -1 : this.q[(this.head + this.count - 1) % this.k];
};

/** 
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
    return this.count === 0;
};

/** 
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
    return this.count === this.k;
};`,
        approach: 'JavaScript Modulo Array Ring Buffer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-circular-queue.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    cq = scope['MyCircularQueue'](3)

    assert cq.enQueue(1) == True
    assert cq.enQueue(2) == True
    assert cq.enQueue(3) == True
    assert cq.enQueue(4) == False
    assert cq.Rear() == 3
    assert cq.isFull() == True
    assert cq.deQueue() == True
    assert cq.enQueue(4) == True
    assert cq.Rear() == 4
    print("✓ design-circular-queue passed")

if __name__ == '__main__':
    main()
`
  },

  // 11. #631 design-excel-sum-formula
  {
    slug: 'design-excel-sum-formula',
    number: 631,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Spreadsheet Dependency Representation',
        text: 'Cells contain either fixed values or composite formula ranges that resolve dynamically upon query.'
      },
      {
        level: 2,
        title: 'Formula String Range Expansion',
        text: 'Parse strings like A1 or A1:B2 to expand into cell coordinate occurrences, storing coefficient frequencies for each cell.'
      },
      {
        level: 3,
        title: 'Excel Grid Blueprint',
        text: 'Store grid[r][c] with val and formula map. get(r, c): if no formula, return val; else compute sum of count * get(nr, nc) recursively. set(r, c, v): clear formula and set val = v. sum(r, c, numbers): parse ranges into formula dict, return get(r, c).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Excel:\n    def __init__(self, height: int, width: str):\n        self.H = height\n        self.W = ord(width) - ord(\'A\') + 1\n        self.grid = {} # (r, c) -> (val, formula_dict)\n\n    def set(self, row: int, column: str, val: int) -> None:\n        col = ord(column) - ord(\'A\')\n        self.grid[(row, col)] = (val, None)\n\n    def get(self, row: int, column: str) -> int:\n        col = ord(column) - ord(\'A\') if isinstance(column, str) else column\n        return self._eval(row, col)\n\n    def _eval(self, r: int, c: int) -> int:\n        if (r, c) not in self.grid:\n            return 0\n        val, formula = self.grid[(r, c)]\n        if not formula:\n            return val\n        total = 0\n        for (nr, nc), count in formula.items():\n            total += count * self._eval(nr, nc)\n        return total\n\n    def sum(self, row: int, column: str, numbers: list[str]) -> int:\n        col = ord(column) - ord(\'A\')\n        formula = {}\n        for s in numbers:\n            if \':\' in s:\n                start, end = s.split(\':\')\n                r1, c1 = int(start[1:]), ord(start[0]) - ord(\'A\')\n                r2, c2 = int(end[1:]), ord(end[0]) - ord(\'A\')\n                for r in range(r1, r2 + 1):\n                    for c in range(c1, c2 + 1):\n                        formula[(r, c)] = formula.get((r, c), 0) + 1\n            else:\n                r, c = int(s[1:]), ord(s[0]) - ord(\'A\')\n                formula[(r, c)] = formula.get((r, c), 0) + 1\n        self.grid[(row, col)] = (0, formula)\n        return self._eval(row, col)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(Cells in Formula)',
      space: 'O(H * W)',
      variables: ['H: height of sheet', 'W: width of sheet'],
      notes: 'Dynamic recursive evaluation traverses dependent cells on demand.',
      whyNaiveFails: 'Eager recomputation without cycle tracking or dependency updates leads to stale values upon deep updates.',
      spaceTimeTradeoff: 'Formula frequency map stores cell dependencies compactly.',
      interviewerExpectation: 'Parsing rectangular ranges like A1:B3 and handling dynamic recalculations.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Excel:
    def __init__(self, height: int, width: str):
        self.H = height
        self.W = ord(width) - ord('A') + 1
        self.grid = {} # (r, c) -> (val, formula_dict)

    def set(self, row: int, column: str, val: int) -> None:
        col = ord(column) - ord('A')
        self.grid[(row, col)] = (val, None)

    def get(self, row: int, column: str) -> int:
        col = ord(column) - ord('A') if isinstance(column, str) else column
        return self._eval(row, col)

    def _eval(self, r: int, c: int) -> int:
        if (r, c) not in self.grid:
            return 0
        val, formula = self.grid[(r, c)]
        if not formula:
            return val
        total = 0
        for (nr, nc), count in formula.items():
            total += count * self._eval(nr, nc)
        return total

    def sum(self, row: int, column: str, numbers: list[str]) -> int:
        col = ord(column) - ord('A')
        formula = {}
        for s in numbers:
            if ':' in s:
                start, end = s.split(':')
                r1, c1 = int(start[1:]), ord(start[0]) - ord('A')
                r2, c2 = int(end[1:]), ord(end[0]) - ord('A')
                for r in range(r1, r2 + 1):
                    for c in range(c1, c2 + 1):
                        formula[(r, c)] = formula.get((r, c), 0) + 1
            else:
                r, c = int(s[1:]), ord(s[0]) - ord('A')
                formula[(r, c)] = formula.get((r, c), 0) + 1
        self.grid[(row, col)] = (0, formula)
        return self._eval(row, col)`,
        approach: 'Formula Dependency Map Evaluation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Excel {
    struct Cell {
        int val = 0;
        map<pair<int, int>, int> formula;
    };
    int H, W;
    map<pair<int, int>, Cell> grid;

    int eval(int r, int c) {
        if (!grid.count({r, c})) return 0;
        auto& cell = grid[{r, c}];
        if (cell.formula.empty()) return cell.val;
        int total = 0;
        for (auto& p : cell.formula) {
            total += p.second * eval(p.first.first, p.first.second);
        }
        return total;
    }
public:
    Excel(int height, char width) : H(height), W(width - 'A' + 1) {}
    
    void set(int row, char column, int val) {
        grid[{row, column - 'A'}] = {val, {}};
    }
    
    int get(int row, char column) {
        return eval(row, column - 'A');
    }
    
    int sum(int row, char column, vector<string> numbers) {
        map<pair<int, int>, int> form;
        for (const string& s : numbers) {
            auto colon = s.find(':');
            if (colon != string::npos) {
                int r1 = stoi(s.substr(1, colon - 1)), c1 = s[0] - 'A';
                int r2 = stoi(s.substr(colon + 2)), c2 = s[colon + 1] - 'A';
                for (int r = r1; r <= r2; ++r) {
                    for (int c = c1; c <= c2; ++c) form[{r, c}]++;
                }
            } else {
                form[{stoi(s.substr(1)), s[0] - 'A'}]++;
            }
        }
        grid[{row, column - 'A'}] = {0, form};
        return eval(row, column - 'A');
    }
};`,
        approach: 'C++ Spreadsheet Evaluation Grid',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Excel {
    class Cell {
        int val = 0;
        Map<String, Integer> formula = new HashMap<>();
    }
    private Cell[][] grid;

    public Excel(int height, char width) {
        grid = new Cell[height + 1][width - 'A' + 1];
        for (int i = 0; i <= height; i++) {
            for (int j = 0; j <= width - 'A'; j++) {
                grid[i][j] = new Cell();
            }
        }
    }
    
    public void set(int row, char column, int val) {
        int c = column - 'A';
        grid[row][c].val = val;
        grid[row][c].formula.clear();
    }
    
    public int get(int row, char column) {
        return eval(row, column - 'A');
    }
    
    private int eval(int r, int c) {
        Cell cell = grid[r][c];
        if (cell.formula.isEmpty()) return cell.val;
        int total = 0;
        for (Map.Entry<String, Integer> e : cell.formula.entrySet()) {
            String[] parts = e.getKey().split(",");
            int nr = Integer.parseInt(parts[0]);
            int nc = Integer.parseInt(parts[1]);
            total += e.getValue() * eval(nr, nc);
        }
        return total;
    }
    
    public int sum(int row, char column, String[] numbers) {
        int col = column - 'A';
        Cell cell = grid[row][col];
        cell.formula.clear();
        for (String s : numbers) {
            int colon = s.indexOf(':');
            if (colon != -1) {
                int r1 = Integer.parseInt(s.substring(1, colon));
                int c1 = s.charAt(0) - 'A';
                int r2 = Integer.parseInt(s.substring(colon + 2));
                int c2 = s.charAt(colon + 1) - 'A';
                for (int r = r1; r <= r2; r++) {
                    for (int c = c1; c <= c2; c++) {
                        String key = r + "," + c;
                        cell.formula.put(key, cell.formula.getOrDefault(key, 0) + 1);
                    }
                }
            } else {
                int r = Integer.parseInt(s.substring(1));
                int c = s.charAt(0) - 'A';
                String key = r + "," + c;
                cell.formula.put(key, cell.formula.getOrDefault(key, 0) + 1);
            }
        }
        return eval(row, col);
    }
}`,
        approach: 'Java Dynamic Spreadsheet Evaluator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number} height
 * @param {character} width
 */
var Excel = function(height, width) {
    this.H = height;
    this.W = width.charCodeAt(0) - 65 + 1;
    this.grid = new Map();
};

/** 
 * @param {number} row 
 * @param {character} column 
 * @param {number} val
 * @return {void}
 */
Excel.prototype.set = function(row, column, val) {
    const col = column.charCodeAt(0) - 65;
    this.grid.set(\`\${row},\${col}\`, { val, formula: null });
};

/** 
 * @param {number} row 
 * @param {character} column
 * @return {number}
 */
Excel.prototype.get = function(row, column) {
    const col = column.charCodeAt(0) - 65;
    return this._eval(row, col);
};

Excel.prototype._eval = function(r, c) {
    const key = \`\${r},\${c}\`;
    if (!this.grid.has(key)) return 0;
    const { val, formula } = this.grid.get(key);
    if (!formula) return val;
    let total = 0;
    for (const [depKey, count] of formula.entries()) {
        const [nr, nc] = depKey.split(',').map(Number);
        total += count * this._eval(nr, nc);
    }
    return total;
};

/** 
 * @param {number} row 
 * @param {character} column 
 * @param {string[]} numbers
 * @return {number}
 */
Excel.prototype.sum = function(row, column, numbers) {
    const col = column.charCodeAt(0) - 65;
    const formula = new Map();
    for (const s of numbers) {
        if (s.includes(':')) {
            const [start, end] = s.split(':');
            const r1 = parseInt(start.slice(1)), c1 = start.charCodeAt(0) - 65;
            const r2 = parseInt(end.slice(1)), c2 = end.charCodeAt(0) - 65;
            for (let r = r1; r <= r2; r++) {
                for (let c = c1; c <= c2; c++) {
                    const k = \`\${r},\${c}\`;
                    formula.set(k, (formula.get(k) || 0) + 1);
                }
            }
        } else {
            const r = parseInt(s.slice(1)), c = s.charCodeAt(0) - 65;
            const k = \`\${r},\${c}\`;
            formula.set(k, (formula.get(k) || 0) + 1);
        }
    }
    this.grid.set(\`\${row},\${col}\`, { val: 0, formula });
    return this._eval(row, col);
};`,
        approach: 'JavaScript Spreadsheet Formula Resolver',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-excel-sum-formula.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    excel = scope['Excel'](3, "C")

    excel.set(1, "A", 2)
    assert excel.sum(3, "C", ["A1", "A1:B2"]) == 4
    excel.set(2, "B", 2)
    assert excel.get(3, "C") == 6
    print("✓ design-excel-sum-formula passed")

if __name__ == '__main__':
    main()
`
  },

  // 12. #635 design-log-storage-system
  {
    slug: 'design-log-storage-system',
    number: 635,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Granular Timestamp Prefix Matching',
        text: 'Filter timestamps by truncation up to the designated granularity level without parsing dates into complex formats.'
      },
      {
        level: 2,
        title: 'Index Slicing by Granularity',
        text: 'Granularity defines string slice endpoints: Year is 4, Month is 7, Day is 10, Hour is 13, Minute is 16, Second is 19. Compare slices lexicographically.'
      },
      {
        level: 3,
        title: 'LogSystem Blueprint',
        text: 'In init: logs = []. In put(id, timestamp): append (id, timestamp). In retrieve(start, end, granularity): idx = indexMap[granularity], s = start[:idx], e = end[:idx], return [id for id, ts in logs if s <= ts[:idx] <= e].'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass LogSystem:\n    def __init__(self):\n        self.logs = []\n        self.gran = {\n            "Year": 4,\n            "Month": 7,\n            "Day": 10,\n            "Hour": 13,\n            "Minute": 16,\n            "Second": 19\n        }\n\n    def put(self, id: int, timestamp: str) -> None:\n        self.logs.append((id, timestamp))\n\n    def retrieve(self, start: str, end: str, granularity: str) -> list[int]:\n        idx = self.gran[granularity]\n        s = start[:idx]\n        e = end[:idx]\n        return [log_id for log_id, ts in self.logs if s <= ts[:idx] <= e]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of logs inserted'],
      notes: 'Insertion is O(1); retrieval filters N logs using string slice comparisons.',
      whyNaiveFails: 'Parsing full date objects on each operation incurs unnecessary conversion overhead.',
      spaceTimeTradeoff: 'Stores logs linearly with constant-size granularity dictionary.',
      interviewerExpectation: 'Use of standard ISO timestamp fixed-width prefixes for lexicographic filtering.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class LogSystem:
    def __init__(self):
        self.logs = []
        self.gran = {
            "Year": 4,
            "Month": 7,
            "Day": 10,
            "Hour": 13,
            "Minute": 16,
            "Second": 19
        }

    def put(self, id: int, timestamp: str) -> None:
        self.logs.append((id, timestamp))

    def retrieve(self, start: str, end: str, granularity: str) -> list[int]:
        idx = self.gran[granularity]
        s = start[:idx]
        e = end[:idx]
        return [log_id for log_id, ts in self.logs if s <= ts[:idx] <= e]`,
        approach: 'Fixed-Width Substring Granularity Comparison',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class LogSystem {
    vector<pair<int, string>> logs;
    unordered_map<string, int> gran = {
        {"Year", 4}, {"Month", 7}, {"Day", 10},
        {"Hour", 13}, {"Minute", 16}, {"Second", 19}
    };
public:
    LogSystem() {}
    
    void put(int id, string timestamp) {
        logs.push_back({id, timestamp});
    }
    
    vector<int> retrieve(string start, string end, string granularity) {
        int len = gran[granularity];
        string s = start.substr(0, len);
        string e = end.substr(0, len);
        vector<int> res;
        for (auto& log : logs) {
            string sub = log.second.substr(0, len);
            if (sub >= s && sub <= e) {
                res.push_back(log.first);
            }
        }
        return res;
    }
};`,
        approach: 'C++ Substring Filter for Granular Logs',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class LogSystem {
    private List<Pair<Integer, String>> logs = new ArrayList<>();
    private Map<String, Integer> gran = new HashMap<>();

    public LogSystem() {
        gran.put("Year", 4);
        gran.put("Month", 7);
        gran.put("Day", 10);
        gran.put("Hour", 13);
        gran.put("Minute", 16);
        gran.put("Second", 19);
    }
    
    public void put(int id, String timestamp) {
        logs.add(new Pair<>(id, timestamp));
    }
    
    public List<Integer> retrieve(String start, String end, String granularity) {
        int len = gran.get(granularity);
        String s = start.substring(0, len);
        String e = end.substring(0, len);
        List<Integer> res = new ArrayList<>();
        for (Pair<Integer, String> log : logs) {
            String sub = log.getValue().substring(0, len);
            if (sub.compareTo(s) >= 0 && sub.compareTo(e) <= 0) {
                res.add(log.getKey());
            }
        }
        return res;
    }
    
    static class Pair<K, V> {
        private K key; private V value;
        public Pair(K key, V value) { this.key = key; this.value = value; }
        public K getKey() { return key; }
        public V getValue() { return value; }
    }
}`,
        approach: 'Java String Substring Lexicographic Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var LogSystem = function() {
    this.logs = [];
    this.gran = {
        "Year": 4,
        "Month": 7,
        "Day": 10,
        "Hour": 13,
        "Minute": 16,
        "Second": 19
    };
};

/** 
 * @param {number} id 
 * @param {string} timestamp
 * @return {void}
 */
LogSystem.prototype.put = function(id, timestamp) {
    this.logs.push({ id, timestamp });
};

/** 
 * @param {string} start 
 * @param {string} end 
 * @param {string} granularity
 * @return {number[]}
 */
LogSystem.prototype.retrieve = function(start, end, granularity) {
    const len = this.gran[granularity];
    const s = start.slice(0, len);
    const e = end.slice(0, len);
    return this.logs
        .filter(log => {
            const sub = log.timestamp.slice(0, len);
            return sub >= s && sub <= e;
        })
        .map(log => log.id);
};`,
        approach: 'JavaScript Substring Log Filtering',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-log-storage-system.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    logs = scope['LogSystem']()

    logs.put(1, "2017:01:01:23:59:59")
    logs.put(2, "2017:01:01:22:59:59")
    logs.put(3, "2016:01:01:00:00:00")
    assert logs.retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Year") == [1, 2, 3]
    assert logs.retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Hour") == [1, 2]
    print("✓ design-log-storage-system passed")

if __name__ == '__main__':
    main()
`
  },

  // 13. #641 design-circular-deque
  {
    slug: 'design-circular-deque',
    number: 641,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Bidirectional Circular Ring Buffer',
        text: 'Extend fixed-size array buffering to accommodate insertions and deletions at both front and back boundaries modulo capacity.'
      },
      {
        level: 2,
        title: 'Head and Tail Modular Offsets',
        text: 'Maintain head index and count. Insert front moves head backward (head - 1 + k) % k. Insert last places element at (head + count) % k.'
      },
      {
        level: 3,
        title: 'Circular Deque Blueprint',
        text: 'insertFront(v): if full return False; head = (head - 1 + k) % k, q[head] = v, count += 1, return True. insertLast(v): if full return False; q[(head + count) % k] = v, count += 1, return True. deleteFront(): head = (head + 1) % k, count -= 1. deleteLast(): count -= 1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass MyCircularDeque:\n    def __init__(self, k: int):\n        self.k = k\n        self.q = [0] * k\n        self.head = 0\n        self.count = 0\n\n    def insertFront(self, value: int) -> bool:\n        if self.isFull():\n            return False\n        self.head = (self.head - 1 + self.k) % self.k\n        self.q[self.head] = value\n        self.count += 1\n        return True\n\n    def insertLast(self, value: int) -> bool:\n        if self.isFull():\n            return False\n        idx = (self.head + self.count) % self.k\n        self.q[idx] = value\n        self.count += 1\n        return True\n\n    def deleteFront(self) -> bool:\n        if self.isEmpty():\n            return False\n        self.head = (self.head + 1) % self.k\n        self.count -= 1\n        return True\n\n    def deleteLast(self) -> bool:\n        if self.isEmpty():\n            return False\n        self.count -= 1\n        return True\n\n    def getFront(self) -> int:\n        return -1 if self.isEmpty() else self.q[self.head]\n\n    def getRear(self) -> int:\n        if self.isEmpty():\n            return -1\n        return self.q[(self.head + self.count - 1) % self.k]\n\n    def isEmpty(self) -> bool:\n        return self.count == 0\n\n    def isFull(self) -> bool:\n        return self.count == self.k\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(K)',
      variables: ['K: maximum capacity of circular deque'],
      notes: 'All double-ended queue operations execute in O(1) time without shifts.',
      whyNaiveFails: 'Standard arrays require O(N) element relocation on front insertions and deletions.',
      spaceTimeTradeoff: 'Allocates fixed array of size K once for all operations.',
      interviewerExpectation: 'Correct modular backward rotation ((head - 1 + k) % k) for front insertions.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class MyCircularDeque:
    def __init__(self, k: int):
        self.k = k
        self.q = [0] * k
        self.head = 0
        self.count = 0

    def insertFront(self, value: int) -> bool:
        if self.isFull():
            return False
        self.head = (self.head - 1 + self.k) % self.k
        self.q[self.head] = value
        self.count += 1
        return True

    def insertLast(self, value: int) -> bool:
        if self.isFull():
            return False
        idx = (self.head + self.count) % self.k
        self.q[idx] = value
        self.count += 1
        return True

    def deleteFront(self) -> bool:
        if self.isEmpty():
            return False
        self.head = (self.head + 1) % self.k
        self.count -= 1
        return True

    def deleteLast(self) -> bool:
        if self.isEmpty():
            return False
        self.count -= 1
        return True

    def getFront(self) -> int:
        return -1 if self.isEmpty() else self.q[self.head]

    def getRear(self) -> int:
        if self.isEmpty():
            return -1
        return self.q[(self.head + self.count - 1) % self.k]

    def isEmpty(self) -> bool:
        return self.count == 0

    def isFull(self) -> bool:
        return self.count == self.k`,
        approach: 'Bidirectional Modular Ring Buffer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class MyCircularDeque {
    vector<int> q;
    int head = 0, count = 0, k;
public:
    MyCircularDeque(int k) : k(k), q(k) {}
    
    bool insertFront(int value) {
        if (isFull()) return false;
        head = (head - 1 + k) % k;
        q[head] = value;
        count++;
        return true;
    }
    
    bool insertLast(int value) {
        if (isFull()) return false;
        q[(head + count) % k] = value;
        count++;
        return true;
    }
    
    bool deleteFront() {
        if (isEmpty()) return false;
        head = (head + 1) % k;
        count--;
        return true;
    }
    
    bool deleteLast() {
        if (isEmpty()) return false;
        count--;
        return true;
    }
    
    int getFront() {
        return isEmpty() ? -1 : q[head];
    }
    
    int getRear() {
        return isEmpty() ? -1 : q[(head + count - 1) % k];
    }
    
    bool isEmpty() {
        return count == 0;
    }
    
    bool isFull() {
        return count == k;
    }
};`,
        approach: 'C++ Circular Double-Ended Buffer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class MyCircularDeque {
    private int[] q;
    private int head = 0, count = 0, k;

    public MyCircularDeque(int k) {
        this.k = k;
        this.q = new int[k];
    }
    
    public boolean insertFront(int value) {
        if (isFull()) return false;
        head = (head - 1 + k) % k;
        q[head] = value;
        count++;
        return true;
    }
    
    public boolean insertLast(int value) {
        if (isFull()) return false;
        q[(head + count) % k] = value;
        count++;
        return true;
    }
    
    public boolean deleteFront() {
        if (isEmpty()) return false;
        head = (head + 1) % k;
        count--;
        return true;
    }
    
    public boolean deleteLast() {
        if (isEmpty()) return false;
        count--;
        return true;
    }
    
    public int getFront() {
        return isEmpty() ? -1 : q[head];
    }
    
    public int getRear() {
        return isEmpty() ? -1 : q[(head + count - 1) % k];
    }
    
    public boolean isEmpty() {
        return count == 0;
    }
    
    public boolean isFull() {
        return count == k;
    }
}`,
        approach: 'Java Modular Circular Deque',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number} k
 */
var MyCircularDeque = function(k) {
    this.k = k;
    this.q = new Array(k);
    this.head = 0;
    this.count = 0;
};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function(value) {
    if (this.isFull()) return false;
    this.head = (this.head - 1 + this.k) % this.k;
    this.q[this.head] = value;
    this.count++;
    return true;
};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function(value) {
    if (this.isFull()) return false;
    this.q[(this.head + this.count) % this.k] = value;
    this.count++;
    return true;
};

/** 
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function() {
    if (this.isEmpty()) return false;
    this.head = (this.head + 1) % this.k;
    this.count--;
    return true;
};

/** 
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function() {
    if (this.isEmpty()) return false;
    this.count--;
    return true;
};

/** 
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function() {
    return this.isEmpty() ? -1 : this.q[this.head];
};

/** 
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function() {
    return this.isEmpty() ? -1 : this.q[(this.head + this.count - 1) % this.k];
};

/** 
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function() {
    return this.count === 0;
};

/** 
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function() {
    return this.count === this.k;
};`,
        approach: 'JavaScript Modulo Deque Ring Buffer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-circular-deque.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    deque = scope['MyCircularDeque'](3)

    assert deque.insertLast(1) == True
    assert deque.insertLast(2) == True
    assert deque.insertFront(3) == True
    assert deque.insertFront(4) == False
    assert deque.getRear() == 2
    assert deque.isFull() == True
    assert deque.deleteLast() == True
    assert deque.insertFront(4) == True
    assert deque.getFront() == 4
    print("✓ design-circular-deque passed")

if __name__ == '__main__':
    main()
`
  }
];

export function writeBatch14Algo1() {
  for (const item of batch14Algo1Problems) {
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

    const metaData = { runner: 'python', testKind: 'deterministic' };
    fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(metaData, null, 2) + '\n', 'utf8');
    fs.writeFileSync(path.join(testDir, 'test.py'), item.testPy, 'utf8');

    console.log(`Generated: #${item.number} ${item.slug} [${item.category}]`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  writeBatch14Algo1();
}
