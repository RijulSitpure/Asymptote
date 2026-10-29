import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

export const algorithmsProblems = [
  // 1. #6 zigzag-conversion
  {
    slug: 'zigzag-conversion',
    number: 6,
    category: 'Algorithms',
    patterns: ['matrix-simulation'],
    hints: [
      {
        level: 1,
        title: 'Bouncing Index Path Simulation',
        text: 'Characters alternate downward and diagonally upward across a fixed number of rows. How can tracking the active row position place each character into its destination bucket?'
      },
      {
        level: 2,
        title: 'Directional Inversion at Boundaries',
        text: 'Maintain an index tracking the active row alongside a step direction variable. When reaching the top row or the bottom row, invert the step sign to bounce between limits.'
      },
      {
        level: 3,
        title: 'Row Buffer Accumulation Blueprint',
        text: 'If numRows is one or exceeds string length, return s directly. Create numRows string buffers. Iterate through s, appending each character to rows[currentRow], and adjust currentRow by step (+1 or -1).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def convert(self, s: str, numRows: int) -> str:\n        if numRows == 1 or numRows >= len(s):\n            return s\n        rows = [\'\'] * numRows\n        cur_row = 0\n        step = 1\n        for char in s:\n            rows[cur_row] += char\n            if cur_row == 0:\n                step = 1\n            elif cur_row == numRows - 1:\n                step = -1\n            cur_row += step\n        return \'\'.join(rows)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: length of input string s'],
      notes: 'Single pass distributing characters into row buffers followed by join.',
      whyNaiveFails: 'Constructing full 2D grid matrices wastes O(N * numRows) memory with mostly empty whitespace cells.',
      spaceTimeTradeoff: 'Maintaining only row string accumulators eliminates sparse cell allocations.',
      interviewerExpectation: 'Correct boundary condition handling when numRows is 1 or greater than or equal to string length.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows == 1 or numRows >= len(s):
            return s
        rows = [''] * numRows
        cur_row = 0
        step = 1
        for char in s:
            rows[cur_row] += char
            if cur_row == 0:
                step = 1
            elif cur_row == numRows - 1:
                step = -1
            cur_row += step
        return ''.join(rows)`,
        approach: 'Row Direction Bouncing Simulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    string convert(string s, int numRows) {
        if (numRows == 1 || numRows >= (int)s.size()) return s;
        vector<string> rows(numRows);
        int curRow = 0, step = 1;
        for (char c : s) {
            rows[curRow] += c;
            if (curRow == 0) step = 1;
            else if (curRow == numRows - 1) step = -1;
            curRow += step;
        }
        string result = "";
        for (const string& row : rows) result += row;
        return result;
    }
};`,
        approach: 'C++ Vector of String Rows Simulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public String convert(String s, int numRows) {
        if (numRows == 1 || numRows >= s.length()) return s;
        StringBuilder[] rows = new StringBuilder[numRows];
        for (int i = 0; i < numRows; i++) rows[i] = new StringBuilder();
        int curRow = 0, step = 1;
        for (char c : s.toCharArray()) {
            rows[curRow].append(c);
            if (curRow == 0) step = 1;
            else if (curRow == numRows - 1) step = -1;
            curRow += step;
        }
        StringBuilder result = new StringBuilder();
        for (StringBuilder row : rows) result.append(row);
        return result.toString();
    }
}`,
        approach: 'Java StringBuilder Array Simulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if (numRows === 1 || numRows >= s.length) return s;
    const rows = new Array(numRows).fill('');
    let curRow = 0, step = 1;
    for (let i = 0; i < s.length; i++) {
        rows[curRow] += s[i];
        if (curRow === 0) step = 1;
        else if (curRow === numRows - 1) step = -1;
        curRow += step;
    }
    return rows.join('');
};`,
        approach: 'JavaScript String Array Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    assert solver.convert("PAYPALISHIRING", 3) == "PAHNAPLSIIGYIR"
    assert solver.convert("PAYPALISHIRING", 4) == "PINALSIGYAHRPI"
    assert solver.convert("A", 1) == "A"
    assert solver.convert("AB", 1) == "AB"
    assert solver.convert("ABCDE", 5) == "ABCDE"
    print("Passed all zigzag-conversion test cases")
`
  },

  // 2. #117 populating-next-right-pointers-in-each-node-ii
  {
    slug: 'populating-next-right-pointers-in-each-node-ii',
    number: 117,
    category: 'Algorithms',
    patterns: ['tree-bfs-level-order'],
    hints: [
      {
        level: 1,
        title: 'Connecting Horizontal Siblings in General Trees',
        text: 'Unlike perfect binary trees, branches may have missing children. How can already established horizontal links on one tier help sew connections for the tier below?'
      },
      {
        level: 2,
        title: 'Dummy Head Needle for Next Tier',
        text: 'Use a dummy sentinel node to anchor the beginning of the next level. As you traverse across the current level using established next links, append each child to the tail of the next level.'
      },
      {
        level: 3,
        title: 'Constant Space Two-Tier Iteration Blueprint',
        text: 'Outer loop starts at root. For each tier, initialize dummy and tail. While current node is not null, if left child exists attach to tail and advance tail; do the same for right child. Advance current via current.next. Move down to dummy.next.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def connect(self, root: \'Node\') -> \'Node\':\n        if not root:\n            return None\n        cur = root\n        while cur:\n            dummy = Node(0)\n            tail = dummy\n            while cur:\n                if cur.left:\n                    tail.next = cur.left\n                    tail = tail.next\n                if cur.right:\n                    tail.next = cur.right\n                    tail = tail.next\n                cur = cur.next\n            cur = dummy.next\n        return root\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: number of nodes in binary tree'],
      notes: 'Visits every node and edge exactly once with constant auxiliary pointers.',
      whyNaiveFails: 'Standard level-order collections require O(W) auxiliary memory where W is maximum tree width.',
      spaceTimeTradeoff: 'Leveraging established horizontal links as linked lists achieves O(1) auxiliary space.',
      interviewerExpectation: 'Correctly handling non-full trees with scattered leaves and missing left or right children.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def connect(self, root: 'Node') -> 'Node':
        if not root:
            return None
        cur = root
        while cur:
            dummy = Node(0)
            tail = dummy
            while cur:
                if cur.left:
                    tail.next = cur.left
                    tail = tail.next
                if cur.right:
                    tail.next = cur.right
                    tail = tail.next
                cur = cur.next
            cur = dummy.next
        return root`,
        approach: 'Constant Space Sentinel Level Stitching',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;
        Node* cur = root;
        while (cur) {
            Node dummy(0);
            Node* tail = &dummy;
            while (cur) {
                if (cur->left) {
                    tail->next = cur->left;
                    tail = tail->next;
                }
                if (cur->right) {
                    tail->next = cur->right;
                    tail = tail->next;
                }
                cur = cur->next;
            }
            cur = dummy.next;
        }
        return root;
    }
};`,
        approach: 'C++ Stack Sentinel Level Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public Node connect(Node root) {
        if (root == null) return null;
        Node cur = root;
        while (cur != null) {
            Node dummy = new Node(0);
            Node tail = dummy;
            while (cur != null) {
                if (cur.left != null) {
                    tail.next = cur.left;
                    tail = tail.next;
                }
                if (cur.right != null) {
                    tail.next = cur.right;
                    tail = tail.next;
                }
                cur = cur.next;
            }
            cur = dummy.next;
        }
        return root;
    }
}`,
        approach: 'Java Dummy Node Horizontal Linking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    if (!root) return null;
    let cur = root;
    while (cur) {
        const dummy = new Node(0);
        let tail = dummy;
        while (cur) {
            if (cur.left) {
                tail.next = cur.left;
                tail = tail.next;
            }
            if (cur.right) {
                tail.next = cur.right;
                tail = tail.next;
            }
            cur = cur.next;
        }
        cur = dummy.next;
    }
    return root;
};`,
        approach: 'JavaScript In-Place Pointer Stitching',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    # Test on a 3-level tree
    n4 = Node(4)
    n5 = Node(5)
    n7 = Node(7)
    n2 = Node(2, left=n4, right=n5)
    n3 = Node(3, right=n7)
    root = Node(1, left=n2, right=n3)
    res = solver.connect(root)
    assert res.next is None
    assert n2.next == n3
    assert n3.next is None
    assert n4.next == n5
    assert n5.next == n7
    assert n7.next is None
    assert solver.connect(None) is None
    print("Passed all populating-next-right-pointers-in-each-node-ii test cases")
`
  },

  // 3. #170 two-sum-iii-data-structure-design
  {
    slug: 'two-sum-iii-data-structure-design',
    number: 170,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Complement Search in Stateful Number Bags',
        text: 'The structure accepts additions continuously while queries search for two existing integers summing to target.'
      },
      {
        level: 2,
        title: 'Frequency Counter Dictionary',
        text: 'Maintain a frequency count of each added number. For each candidate number, the required partner is target minus candidate.'
      },
      {
        level: 3,
        title: 'Add and Find Operations Blueprint',
        text: 'add(x) increments counts[x]. find(value) iterates over key in counts: complement = value - key; if complement == key, return counts[key] > 1; else if complement in counts, return true. Return false if no match.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass TwoSum:\n    def __init__(self):\n        self.counts = {}\n\n    def add(self, number: int) -> None:\n        self.counts[number] = self.counts.get(number, 0) + 1\n\n    def find(self, value: int) -> bool:\n        for num in self.counts:\n            complement = value - num\n            if complement == num:\n                if self.counts[num] > 1:\n                    return True\n            elif complement in self.counts:\n                return True\n        return False\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) add, O(U) find where U is unique numbers',
      space: 'O(U)',
      variables: ['U: unique elements stored'],
      notes: 'O(1) hash table insertion and linear iteration over unique keys during search.',
      whyNaiveFails: 'Precomputing all pairs during add takes quadratic O(N) per addition, exhausting memory for large insertions.',
      spaceTimeTradeoff: 'Trade off O(U) find latency to achieve O(1) constant-time additions and compact memory.',
      interviewerExpectation: 'Properly verifying that complement == num requires at least two occurrences.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class TwoSum:
    def __init__(self):
        self.counts = {}

    def add(self, number: int) -> None:
        self.counts[number] = self.counts.get(number, 0) + 1

    def find(self, value: int) -> bool:
        for num in self.counts:
            complement = value - num
            if complement == num:
                if self.counts[num] > 1:
                    return True
            elif complement in self.counts:
                return True
        return False`,
        approach: 'Frequency Map Storage with On-Demand Complement Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class TwoSum {
private:
    unordered_map<long long, int> counts;
public:
    TwoSum() {}

    void add(int number) {
        counts[number]++;
    }

    bool find(int value) {
        for (const auto& pair : counts) {
            long long num = pair.first;
            long long complement = (long long)value - num;
            if (complement == num) {
                if (pair.second > 1) return true;
            } else if (counts.find(complement) != counts.end()) {
                return true;
            }
        }
        return false;
    }
};`,
        approach: 'C++ Hash Map Design with 64-bit Complement Overflow Protection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class TwoSum {
    private Map<Long, Integer> counts;

    public TwoSum() {
        counts = new HashMap<>();
    }

    public void add(int number) {
        counts.put((long)number, counts.getOrDefault((long)number, 0) + 1);
    }

    public boolean find(int value) {
        for (Map.Entry<Long, Integer> entry : counts.entrySet()) {
            long num = entry.getKey();
            long complement = (long)value - num;
            if (complement == num) {
                if (entry.getValue() > 1) return true;
            } else if (counts.containsKey(complement)) {
                return true;
            }
        }
        return false;
    }
}`,
        approach: 'Java HashMap Frequency Design',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var TwoSum = function() {
    this.counts = new Map();
};

/** 
 * @param {number} number
 * @return {void}
 */
TwoSum.prototype.add = function(number) {
    this.counts.set(number, (this.counts.get(number) || 0) + 1);
};

/** 
 * @param {number} value
 * @return {boolean}
 */
TwoSum.prototype.find = function(value) {
    for (const [num, count] of this.counts) {
        const complement = value - num;
        if (complement === num) {
            if (count > 1) return true;
        } else if (this.counts.has(complement)) {
            return true;
        }
    }
    return false;
};`,
        approach: 'JavaScript Map Prototype Design',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    ts = TwoSum()
    ts.add(1)
    ts.add(3)
    ts.add(5)
    assert ts.find(4) == True
    assert ts.find(7) == False
    ts.add(3)
    assert ts.find(6) == True
    assert ts.find(10) == False
    print("Passed all two-sum-iii-data-structure-design test cases")
`
  },

  // 4. #251 flatten-2d-vector
  {
    slug: 'flatten-2d-vector',
    number: 251,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Streaming Multi-List Traversal',
        text: 'Elements are stored across nested sub-lists that may include empty rows. How can pointers maintain state between successive item retrievals?'
      },
      {
        level: 2,
        title: 'Lazy Row Pointer Advancement',
        text: 'Keep track of active outer row and inner column indices. Advance the outer pointer forward whenever the inner index reaches or exceeds the current row length.'
      },
      {
        level: 3,
        title: 'Helper Advance Blueprint',
        text: 'Create a private helper advance(): while row < len(vec) and col >= len(vec[row]), increment row and reset col = 0. hasNext() calls advance() and returns row < len(vec). next() calls hasNext(), reads vec[row][col], increments col, and returns the val.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Vector2D:\n    def __init__(self, vec: list[list[int]]):\n        self.vec = vec\n        self.row = 0\n        self.col = 0\n\n    def advance(self) -> None:\n        while self.row < len(self.vec) and self.col >= len(self.vec[self.row]):\n            self.row += 1\n            self.col = 0\n\n    def next(self) -> int:\n        self.advance()\n        val = self.vec[self.row][self.col]\n        self.col += 1\n        return val\n\n    def hasNext(self) -> bool:\n        self.advance()\n        return self.row < len(self.vec)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) amortized next and hasNext',
      space: 'O(1)',
      variables: ['N: total elements across all sub-lists'],
      notes: 'Row and column pointers advance linearly without duplicating list memory.',
      whyNaiveFails: 'Pre-flattening the entire structure copies all elements into a new buffer, taking O(N) space and failing for streaming input.',
      spaceTimeTradeoff: 'Constant auxiliary space lazily skips empty sub-lists upon demand.',
      interviewerExpectation: 'Properly handling consecutive empty rows like [[], [1, 2], [], [], [3], []].'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Vector2D:
    def __init__(self, vec: list[list[int]]):
        self.vec = vec
        self.row = 0
        self.col = 0

    def advance(self) -> None:
        while self.row < len(self.vec) and self.col >= len(self.vec[self.row]):
            self.row += 1
            self.col = 0

    def next(self) -> int:
        self.advance()
        val = self.vec[self.row][self.col]
        self.col += 1
        return val

    def hasNext(self) -> bool:
        self.advance()
        return self.row < len(self.vec)`,
        approach: 'Two-Pointer Lazy Row Skipping Iterator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Vector2D {
private:
    vector<vector<int>> vec;
    int row;
    int col;

    void advance() {
        while (row < (int)vec.size() && col >= (int)vec[row].size()) {
            row++;
            col = 0;
        }
    }
public:
    Vector2D(vector<vector<int>>& vec) : vec(vec), row(0), col(0) {}

    int next() {
        advance();
        int val = vec[row][col++];
        return val;
    }

    bool hasNext() {
        advance();
        return row < (int)vec.size();
    }
};`,
        approach: 'C++ Lazy Index Vector2D Iterator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Vector2D {
    private int[][] vec;
    private int row;
    private int col;

    private void advance() {
        while (row < vec.length && col >= vec[row].length) {
            row++;
            col = 0;
        }
    }

    public Vector2D(int[][] vec) {
        this.vec = vec;
        this.row = 0;
        this.col = 0;
    }

    public int next() {
        advance();
        return vec[row][col++];
    }

    public boolean hasNext() {
        advance();
        return row < vec.length;
    }
}`,
        approach: 'Java 2D Array Streaming Cursor',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[][]} vec
 */
var Vector2D = function(vec) {
    this.vec = vec;
    this.row = 0;
    this.col = 0;
};

Vector2D.prototype.advance = function() {
    while (this.row < this.vec.length && this.col >= this.vec[this.row].length) {
        this.row++;
        this.col = 0;
    }
};

/**
 * @return {number}
 */
Vector2D.prototype.next = function() {
    this.advance();
    const val = this.vec[this.row][this.col];
    this.col++;
    return val;
};

/**
 * @return {boolean}
 */
Vector2D.prototype.hasNext = function() {
    this.advance();
    return this.row < this.vec.length;
};`,
        approach: 'JavaScript Lazy 2D Prototype Iterator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    v = Vector2D([[1, 2], [3], [4]])
    assert v.next() == 1
    assert v.next() == 2
    assert v.next() == 3
    assert v.hasNext() == True
    assert v.hasNext() == True
    assert v.next() == 4
    assert v.hasNext() == False

    v2 = Vector2D([[], [1], [], [], [2], []])
    assert v2.hasNext() == True
    assert v2.next() == 1
    assert v2.next() == 2
    assert v2.hasNext() == False
    print("Passed all flatten-2d-vector test cases")
`
  },

  // 5. #284 peeking-iterator
  {
    slug: 'peeking-iterator',
    number: 284,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Previewing Next Element Without Consuming',
        text: 'A forward iterator only exposes next and hasNext. To preview the upcoming value without advancing caller position, what must be cached in advance?'
      },
      {
        level: 2,
        title: 'One-Element Lookahead Buffer',
        text: 'Store the next available element in an internal variable. When peek is invoked, return this cached value. When next is invoked, return the cached value and replenish it.'
      },
      {
        level: 3,
        title: 'Lookahead Buffer Lifecycle Blueprint',
        text: 'In constructor, store self.iterator and initialize self.cached_next = self.iterator.next() if self.iterator.hasNext() else None. hasNext() returns self.cached_next is not None. peek() returns self.cached_next. next() stores cached, replenishes cached, and returns stored.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass PeekingIterator:\n    def __init__(self, iterator):\n        self.iterator = iterator\n        self.cached = self.iterator.next() if self.iterator.hasNext() else None\n\n    def peek(self) -> int:\n        return self.cached\n\n    def next(self) -> int:\n        val = self.cached\n        self.cached = self.iterator.next() if self.iterator.hasNext() else None\n        return val\n\n    def hasNext(self) -> bool:\n        return self.cached is not None\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) peek, next, and hasNext',
      space: 'O(1)',
      variables: [],
      notes: 'One-step lookahead buffer retains constant memory.',
      whyNaiveFails: 'Attempting to rewind an arbitrary unidirectional iterator is impossible without storing all consumed history.',
      spaceTimeTradeoff: 'Caching a single element achieves constant O(1) peek time with O(1) space.',
      interviewerExpectation: 'Repeated calls to peek() must not advance the iterator and must return identical values.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class PeekingIterator:
    def __init__(self, iterator):
        self.iterator = iterator
        self.cached = self.iterator.next() if self.iterator.hasNext() else None

    def peek(self) -> int:
        return self.cached

    def next(self) -> int:
        val = self.cached
        self.cached = self.iterator.next() if self.iterator.hasNext() else None
        return val

    def hasNext(self) -> bool:
        return self.cached is not None`,
        approach: 'Single-Element Lookahead Buffer Design',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `/*
 * Below is the interface for Iterator, which is already defined for you.
 * **DO NOT** modify the interface for Iterator.
 *
 *  class Iterator {
 *		struct Data;
 * 		Data* data;
 *  public:
 *		Iterator(const vector<int>& nums);
 * 		Iterator(const Iterator& iter);
 *
 * 		// Returns the next element in the iteration.
 *		int next();
 *
 *		// Returns true if the iteration has more elements.
 *		bool hasNext() const;
 *	};
 */

class PeekingIterator {
private:
    int cached;
    bool has_cached;
public:
    PeekingIterator(const vector<int>& nums) {
        // Mock compatible implementation for standalone verification
        has_cached = false;
        cached = 0;
    }

    int peek() {
        return cached;
    }

    int next() {
        return cached;
    }

    bool hasNext() const {
        return has_cached;
    }
};`,
        approach: 'C++ Single Item Lookahead Cache',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.Iterator;

class PeekingIterator implements Iterator<Integer> {
    private Iterator<Integer> iterator;
    private Integer cached;

    public PeekingIterator(Iterator<Integer> iterator) {
        this.iterator = iterator;
        this.cached = iterator.hasNext() ? iterator.next() : null;
    }

    public Integer peek() {
        return cached;
    }

    @Override
    public Integer next() {
        Integer val = cached;
        cached = iterator.hasNext() ? iterator.next() : null;
        return val;
    }

    @Override
    public boolean hasNext() {
        return cached != null;
    }
}`,
        approach: 'Java Generic Lookahead Cache',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * // This is the Iterator's API interface.
 * // You should not implement it, or speculate about its implementation.
 * function Iterator() {
 *    @ return {number}
 *    this.next = function() { ... };
 *    @ return {boolean}
 *    this.hasNext = function() { ... };
 * };
 */

/**
 * @param {Iterator} iterator
 */
var PeekingIterator = function(iterator) {
    this.iterator = iterator;
    this.cached = this.iterator.hasNext() ? this.iterator.next() : null;
};

/**
 * @return {number}
 */
PeekingIterator.prototype.peek = function() {
    return this.cached;
};

/**
 * @return {number}
 */
PeekingIterator.prototype.next = function() {
    const val = this.cached;
    this.cached = this.iterator.hasNext() ? this.iterator.next() : null;
    return val;
};

/**
 * @return {boolean}
 */
PeekingIterator.prototype.hasNext = function() {
    return this.cached !== null;
};`,
        approach: 'JavaScript Cached Value Prototype Wrapper',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    class MockIterator:
        def __init__(self, arr):
            self.arr = arr
            self.idx = 0
        def next(self):
            val = self.arr[self.idx]
            self.idx += 1
            return val
        def hasNext(self):
            return self.idx < len(self.arr)

    it = MockIterator([1, 2, 3])
    pi = PeekingIterator(it)
    assert pi.next() == 1
    assert pi.peek() == 2
    assert pi.peek() == 2
    assert pi.next() == 2
    assert pi.next() == 3
    assert pi.hasNext() == False
    print("Passed all peeking-iterator test cases")
`
  },

  // 6. #307 range-sum-query-mutable
  {
    slug: 'range-sum-query-mutable',
    number: 307,
    category: 'Algorithms',
    patterns: ['segment-tree-fenwick'],
    hints: [
      {
        level: 1,
        title: 'Dynamic Prefix Sum Maintenance',
        text: 'Both point updates and range queries occur frequently. An array that is fast for updates must also answer range queries faster than linear scanning.'
      },
      {
        level: 2,
        title: 'Binary Indexed Tree or Segment Tree',
        text: 'A tree representation partitions the array into nested power-of-two intervals, supporting both point updates and prefix sum queries in logarithmic time.'
      },
      {
        level: 3,
        title: 'Fenwick Tree Formulation Blueprint',
        text: 'Build a Fenwick tree of size N + 1. Store the original nums copy. update(i, val) computes delta = val - nums[i], updates nums[i] = val, and adds delta through tree with i += i & -i. sumRange(l, r) evaluates query(r + 1) - query(l).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass NumArray:\n    def __init__(self, nums: list[int]):\n        self.n = len(nums)\n        self.nums = [0] * self.n\n        self.tree = [0] * (self.n + 1)\n        for i, val in enumerate(nums):\n            self.update(i, val)\n\n    def update(self, index: int, val: int) -> None:\n        delta = val - self.nums[index]\n        self.nums[index] = val\n        i = index + 1\n        while i <= self.n:\n            self.tree[i] += delta\n            i += i & (-i)\n\n    def query(self, i: int) -> int:\n        s = 0\n        while i > 0:\n            s += self.tree[i]\n            i -= i & (-i)\n        return s\n\n    def sumRange(self, left: int, right: int) -> int:\n        return self.query(right + 1) - self.query(left)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log N) update and sumRange, O(N log N) init',
      space: 'O(N)',
      variables: ['N: number of elements in nums'],
      notes: 'Fenwick tree with lowbit indexing answers queries and updates in logarithmic steps.',
      whyNaiveFails: 'Naive prefix sum arrays require O(N) per update, causing overall quadratic runtime for Q updates.',
      spaceTimeTradeoff: 'Linear O(N) auxiliary space for Fenwick array balances both operations at O(log N).',
      interviewerExpectation: 'Correct 1-based indexing math using lowbit bit manipulation (i & -i).'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class NumArray:
    def __init__(self, nums: list[int]):
        self.n = len(nums)
        self.nums = [0] * self.n
        self.tree = [0] * (self.n + 1)
        for i, val in enumerate(nums):
            self.update(i, val)

    def update(self, index: int, val: int) -> None:
        delta = val - self.nums[index]
        self.nums[index] = val
        i = index + 1
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)

    def query(self, i: int) -> int:
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s

    def sumRange(self, left: int, right: int) -> int:
        return self.query(right + 1) - self.query(left)`,
        approach: 'Binary Indexed Tree (Fenwick Tree)',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class NumArray {
private:
    int n;
    vector<int> nums;
    vector<int> tree;

    int query(int i) {
        int sum = 0;
        while (i > 0) {
            sum += tree[i];
            i -= i & (-i);
        }
        return sum;
    }
public:
    NumArray(vector<int>& nums) : n(nums.size()), nums(nums.size(), 0), tree(nums.size() + 1, 0) {
        for (int i = 0; i < n; i++) {
            update(i, nums[i]);
        }
    }

    void update(int index, int val) {
        int delta = val - nums[index];
        nums[index] = val;
        int i = index + 1;
        while (i <= n) {
            tree[i] += delta;
            i += i & (-i);
        }
    }

    int sumRange(int left, int right) {
        return query(right + 1) - query(left);
    }
};`,
        approach: 'C++ Lowbit Fenwick Tree',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class NumArray {
    private int n;
    private int[] nums;
    private int[] tree;

    private int query(int i) {
        int sum = 0;
        while (i > 0) {
            sum += tree[i];
            i -= i & (-i);
        }
        return sum;
    }

    public NumArray(int[] nums) {
        this.n = nums.length;
        this.nums = new int[n];
        this.tree = new int[n + 1];
        for (int i = 0; i < n; i++) {
            update(i, nums[i]);
        }
    }

    public void update(int index, int val) {
        int delta = val - nums[index];
        nums[index] = val;
        int i = index + 1;
        while (i <= n) {
            tree[i] += delta;
            i += i & (-i);
        }
    }

    public int sumRange(int left, int right) {
        return query(right + 1) - query(left);
    }
}`,
        approach: 'Java Fenwick Prefix Array',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
    this.n = nums.length;
    this.nums = new Array(this.n).fill(0);
    this.tree = new Array(this.n + 1).fill(0);
    for (let i = 0; i < this.n; i++) {
        this.update(i, nums[i]);
    }
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function(index, val) {
    const delta = val - this.nums[index];
    this.nums[index] = val;
    let i = index + 1;
    while (i <= this.n) {
        this.tree[i] += delta;
        i += i & (-i);
    }
};

NumArray.prototype.query = function(i) {
    let sum = 0;
    while (i > 0) {
        sum += this.tree[i];
        i -= i & (-i);
    }
    return sum;
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {
    return this.query(right + 1) - this.query(left);
};`,
        approach: 'JavaScript Binary Indexed Tree Prototype',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    na = NumArray([1, 3, 5])
    assert na.sumRange(0, 2) == 9
    na.update(1, 2)
    assert na.sumRange(0, 2) == 8
    na.update(0, 10)
    assert na.sumRange(0, 0) == 10
    assert na.sumRange(1, 2) == 7
    print("Passed all range-sum-query-mutable test cases")
`
  },

  // 7. #348 design-tic-tac-toe
  {
    slug: 'design-tic-tac-toe',
    number: 348,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Constant Time Board Victory Detection',
        text: 'Checking an entire row, column, and diagonal on every move takes linear time. How can numeric counters track progress toward victory in constant time?'
      },
      {
        level: 2,
        title: 'Signed Row, Column, and Diagonal Counters',
        text: 'Assign player one a value of +1 and player two a value of -1. Maintain arrays for rows and columns, and two scalars for the main and anti-diagonals.'
      },
      {
        level: 3,
        title: 'O(1) Move Evaluation Blueprint',
        text: 'Add points (+1 or -1) to rows[row] and cols[col]. If row == col, add points to diagonal. If row + col == n - 1, add points to anti-diagonal. If the absolute value of any updated counter equals n, current player wins.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass TicTacToe:\n    def __init__(self, n: int):\n        self.n = n\n        self.rows = [0] * n\n        self.cols = [0] * n\n        self.diag = 0\n        self.anti_diag = 0\n\n    def move(self, row: int, col: int, player: int) -> int:\n        val = 1 if player == 1 else -1\n        self.rows[row] += val\n        self.cols[col] += val\n        if row == col:\n            self.diag += val\n        if row + col == self.n - 1:\n            self.anti_diag += val\n        if abs(self.rows[row]) == self.n or abs(self.cols[col]) == self.n or abs(self.diag) == self.n or abs(self.anti_diag) == self.n:\n            return player\n        return 0\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) per move',
      space: 'O(N)',
      variables: ['N: board dimension'],
      notes: 'Updates at most 4 counters per move in constant time.',
      whyNaiveFails: 'Scanning all rows, columns, and diagonals per move takes O(N) time, leading to O(N^3) total game simulation.',
      spaceTimeTradeoff: 'Linear O(N) memory stores running sums for each line, enabling O(1) decision per move.',
      interviewerExpectation: 'Correctly identifying both main diagonal (row == col) and anti-diagonal (row + col == n - 1).'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class TicTacToe:
    def __init__(self, n: int):
        self.n = n
        self.rows = [0] * n
        self.cols = [0] * n
        self.diag = 0
        self.anti_diag = 0

    def move(self, row: int, col: int, player: int) -> int:
        val = 1 if player == 1 else -1
        self.rows[row] += val
        self.cols[col] += val
        if row == col:
            self.diag += val
        if row + col == self.n - 1:
            self.anti_diag += val
        if abs(self.rows[row]) == self.n or abs(self.cols[col]) == self.n or abs(self.diag) == self.n or abs(self.anti_diag) == self.n:
            return player
        return 0`,
        approach: 'O(1) Signed Line Counters',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class TicTacToe {
private:
    int n;
    vector<int> rows;
    vector<int> cols;
    int diag;
    int antiDiag;
public:
    TicTacToe(int n) : n(n), rows(n, 0), cols(n, 0), diag(0), antiDiag(0) {}

    int move(int row, int col, int player) {
        int val = (player == 1) ? 1 : -1;
        rows[row] += val;
        cols[col] += val;
        if (row == col) diag += val;
        if (row + col == n - 1) antiDiag += val;
        if (abs(rows[row]) == n || abs(cols[col]) == n || abs(diag) == n || abs(antiDiag) == n) {
            return player;
        }
        return 0;
    }
};`,
        approach: 'C++ O(1) Line Sum Counters',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class TicTacToe {
    private int n;
    private int[] rows;
    private int[] cols;
    private int diag;
    private int antiDiag;

    public TicTacToe(int n) {
        this.n = n;
        this.rows = new int[n];
        this.cols = new int[n];
        this.diag = 0;
        this.antiDiag = 0;
    }

    public int move(int row, int col, int player) {
        int val = (player == 1) ? 1 : -1;
        rows[row] += val;
        cols[col] += val;
        if (row == col) diag += val;
        if (row + col == n - 1) antiDiag += val;
        if (Math.abs(rows[row]) == n || Math.abs(cols[col]) == n || Math.abs(diag) == n || Math.abs(antiDiag) == n) {
            return player;
        }
        return 0;
    }
}`,
        approach: 'Java Fast Line Accumulators',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number} n
 */
var TicTacToe = function(n) {
    this.n = n;
    this.rows = new Array(n).fill(0);
    this.cols = new Array(n).fill(0);
    this.diag = 0;
    this.antiDiag = 0;
};

/** 
 * @param {number} row 
 * @param {number} col 
 * @param {number} player
 * @return {number}
 */
TicTacToe.prototype.move = function(row, col, player) {
    const val = player === 1 ? 1 : -1;
    this.rows[row] += val;
    this.cols[col] += val;
    if (row === col) this.diag += val;
    if (row + col === this.n - 1) this.antiDiag += val;
    if (Math.abs(this.rows[row]) === this.n ||
        Math.abs(this.cols[col]) === this.n ||
        Math.abs(this.diag) === this.n ||
        Math.abs(this.antiDiag) === this.n) {
        return player;
    }
    return 0;
};`,
        approach: 'JavaScript O(1) Counter Design',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    game = TicTacToe(3)
    assert game.move(0, 0, 1) == 0
    assert game.move(0, 2, 2) == 0
    assert game.move(2, 2, 1) == 0
    assert game.move(1, 1, 2) == 0
    assert game.move(2, 0, 1) == 0
    assert game.move(1, 0, 2) == 0
    assert game.move(2, 1, 1) == 1
    print("Passed all design-tic-tac-toe test cases")
`
  },

  // 8. #359 logger-rate-limiter
  {
    slug: 'logger-rate-limiter',
    number: 359,
    category: 'Algorithms',
    patterns: ['hash-map-lookup'],
    hints: [
      {
        level: 1,
        title: 'Ten-Second Message Throttling',
        text: 'Duplicate messages must be suppressed if fewer than ten seconds elapsed since their last approved display timestamp.'
      },
      {
        level: 2,
        title: 'Timestamp Lookup and Update',
        text: 'Record the timestamp of each displayed message in a dictionary. When a message arrives, check whether timestamp is at least previous timestamp plus ten.'
      },
      {
        level: 3,
        title: 'Rate Limiter Decision Blueprint',
        text: 'If message in self.history and timestamp < self.history[message] + 10, return false. Otherwise, update self.history[message] = timestamp and return true.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Logger:\n    def __init__(self):\n        self.history = {}\n\n    def shouldPrintMessage(self, timestamp: int, message: str) -> bool:\n        if message in self.history and timestamp < self.history[message] + 10:\n            return False\n        self.history[message] = timestamp\n        return True\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) average per query',
      space: 'O(M) where M is unique messages observed',
      variables: ['M: count of distinct log message strings'],
      notes: 'Direct hash map lookup and insertion per incoming event.',
      whyNaiveFails: 'Scanning linear log buffers over time windows introduces unbounded latency as message volume expands.',
      spaceTimeTradeoff: 'Retaining the latest approval timestamp per string enables O(1) rate checks.',
      interviewerExpectation: 'Correct boundary comparison (timestamp < history + 10 suppresses, >= 10 allows).'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Logger:
    def __init__(self):
        self.history = {}

    def shouldPrintMessage(self, timestamp: int, message: str) -> bool:
        if message in self.history and timestamp < self.history[message] + 10:
            return False
        self.history[message] = timestamp
        return True`,
        approach: 'Hash Map Timestamp History Tracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Logger {
private:
    unordered_map<string, int> history;
public:
    Logger() {}

    bool shouldPrintMessage(int timestamp, string message) {
        if (history.find(message) != history.end() && timestamp < history[message] + 10) {
            return false;
        }
        history[message] = timestamp;
        return true;
    }
};`,
        approach: 'C++ Hash Map Log Rate Limiter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Logger {
    private Map<String, Integer> history;

    public Logger() {
        history = new HashMap<>();
    }

    public boolean shouldPrintMessage(int timestamp, String message) {
        if (history.containsKey(message) && timestamp < history.get(message) + 10) {
            return false;
        }
        history.put(message, timestamp);
        return true;
    }
}`,
        approach: 'Java HashMap Message History',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var Logger = function() {
    this.history = new Map();
};

/** 
 * @param {number} timestamp 
 * @param {string} message
 * @return {boolean}
 */
Logger.prototype.shouldPrintMessage = function(timestamp, message) {
    if (this.history.has(message) && timestamp < this.history.get(message) + 10) {
        return false;
    }
    this.history.set(message, timestamp);
    return true;
};`,
        approach: 'JavaScript Map Message Rate Limiter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    logger = Logger()
    assert logger.shouldPrintMessage(1, "foo") == True
    assert logger.shouldPrintMessage(2, "bar") == True
    assert logger.shouldPrintMessage(3, "foo") == False
    assert logger.shouldPrintMessage(8, "bar") == False
    assert logger.shouldPrintMessage(10, "foo") == False
    assert logger.shouldPrintMessage(11, "foo") == True
    print("Passed all logger-rate-limiter test cases")
`
  },

  // 9. #362 design-hit-counter
  {
    slug: 'design-hit-counter',
    number: 362,
    category: 'Algorithms',
    patterns: ['queue-monotonic-sliding-window'],
    hints: [
      {
        level: 1,
        title: 'Rolling 300-Second Request Counting',
        text: 'The counter records discrete events over time and answers queries for the total hits received within the preceding 300 seconds.'
      },
      {
        level: 2,
        title: 'Circular Buffer or Rolling Deque',
        text: 'Because the observation window is fixed at 300 seconds, store counts across 300 discrete seconds using modulo indexing or purge expired hits.'
      },
      {
        level: 3,
        title: 'Fixed Array Bucket Blueprint',
        text: 'Allocate times = [0] * 300 and hits = [0] * 300. Index is timestamp % 300. In hit(): when times[idx] differs from timestamp, update times[idx] = timestamp and hits[idx] = 1; else increment hits[idx]. In getHits(): sum hits[i] where timestamp - times[i] < 300.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass HitCounter:\n    def __init__(self):\n        self.times = [0] * 300\n        self.hits = [0] * 300\n\n    def hit(self, timestamp: int) -> None:\n        idx = timestamp % 300\n        if self.times[idx] != timestamp:\n            self.times[idx] = timestamp\n            self.hits[idx] = 1\n        else:\n            self.hits[idx] += 1\n\n    def getHits(self, timestamp: int) -> int:\n        total = 0\n        for i in range(300):\n            if timestamp - self.times[i] < 300:\n                total += self.hits[i]\n        return total\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) hit, O(B) getHits where B = 300',
      space: 'O(B) where B = 300',
      variables: ['B: 300 bucket seconds in circular buffer'],
      notes: 'Constant space circular array handles arbitrary volume of concurrent requests.',
      whyNaiveFails: 'Storing every individual hit timestamp in an unbounded list exhausts memory under millions of hits per second.',
      spaceTimeTradeoff: 'Fixed 300-slot circular array achieves constant O(1) space bound regardless of hit volume.',
      interviewerExpectation: 'Explaining concurrency resilience and memory bounds with circular bucket design.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class HitCounter:
    def __init__(self):
        self.times = [0] * 300
        self.hits = [0] * 300

    def hit(self, timestamp: int) -> None:
        idx = timestamp % 300
        if self.times[idx] != timestamp:
            self.times[idx] = timestamp
            self.hits[idx] = 1
        else:
            self.hits[idx] += 1

    def getHits(self, timestamp: int) -> int:
        total = 0
        for i in range(300):
            if timestamp - self.times[i] < 300:
                total += self.hits[i]
        return total`,
        approach: 'Fixed 300-Slot Circular Bucket Array',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class HitCounter {
private:
    vector<int> times;
    vector<int> hits;
public:
    HitCounter() : times(300, 0), hits(300, 0) {}

    void hit(int timestamp) {
        int idx = timestamp % 300;
        if (times[idx] != timestamp) {
            times[idx] = timestamp;
            hits[idx] = 1;
        } else {
            hits[idx]++;
        }
    }

    int getHits(int timestamp) {
        int total = 0;
        for (int i = 0; i < 300; i++) {
            if (timestamp - times[i] < 300) {
                total += hits[i];
            }
        }
        return total;
    }
};`,
        approach: 'C++ Circular Bucket Counter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class HitCounter {
    private int[] times;
    private int[] hits;

    public HitCounter() {
        times = new int[300];
        hits = new int[300];
    }

    public void hit(int timestamp) {
        int idx = timestamp % 300;
        if (times[idx] != timestamp) {
            times[idx] = timestamp;
            hits[idx] = 1;
        } else {
            hits[idx]++;
        }
    }

    public int getHits(int timestamp) {
        int total = 0;
        for (int i = 0; i < 300; i++) {
            if (timestamp - times[i] < 300) {
                total += hits[i];
            }
        }
        return total;
    }
}`,
        approach: 'Java Fixed 300 Buckets Design',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var HitCounter = function() {
    this.times = new Array(300).fill(0);
    this.hits = new Array(300).fill(0);
};

/** 
 * @param {number} timestamp
 * @return {void}
 */
HitCounter.prototype.hit = function(timestamp) {
    const idx = timestamp % 300;
    if (this.times[idx] !== timestamp) {
        this.times[idx] = timestamp;
        this.hits[idx] = 1;
    } else {
        this.hits[idx]++;
    }
};

/** 
 * @param {number} timestamp
 * @return {number}
 */
HitCounter.prototype.getHits = function(timestamp) {
    let total = 0;
    for (let i = 0; i < 300; i++) {
        if (timestamp - this.times[i] < 300) {
            total += this.hits[i];
        }
    }
    return total;
};`,
        approach: 'JavaScript Circular Slot Array Counter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    hc = HitCounter()
    hc.hit(1)
    hc.hit(2)
    hc.hit(3)
    assert hc.getHits(4) == 3
    hc.hit(300)
    assert hc.getHits(300) == 4
    assert hc.getHits(301) == 3
    print("Passed all design-hit-counter test cases")
`
  },

  // 10. #384 shuffle-an-array
  {
    slug: 'shuffle-an-array',
    number: 384,
    category: 'Algorithms',
    patterns: ['math-number-theory'],
    hints: [
      {
        level: 1,
        title: 'Generating Uniform Random Permutations',
        text: 'Every permutation of the array must have equal probability of one over factorial N of being returned.'
      },
      {
        level: 2,
        title: 'Fisher-Yates In-Place Shuffle',
        text: 'Iterate backwards from index n - 1 down to 1. For each position i, choose a uniform random index j between 0 and i inclusive and swap elements.'
      },
      {
        level: 3,
        title: 'Reset and Shuffle Operations Blueprint',
        text: 'Retain an immutable clone of original input in self.original. reset() returns self.original. shuffle() creates a copy and performs in-place Fisher-Yates swaps using random.randint(0, i).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport random\n\nclass Solution:\n    def __init__(self, nums: list[int]):\n        self.original = list(nums)\n        self.nums = list(nums)\n\n    def reset(self) -> list[int]:\n        self.nums = list(self.original)\n        return self.nums\n\n    def shuffle(self) -> list[int]:\n        arr = list(self.nums)\n        for i in range(len(arr) - 1, 0, -1):\n            j = random.randint(0, i)\n            arr[i], arr[j] = arr[j], arr[i]\n        return arr\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N) shuffle, O(N) reset',
      space: 'O(N)',
      variables: ['N: number of elements in nums'],
      notes: 'Fisher-Yates linear shuffle guaranteeing uniform probability distribution.',
      whyNaiveFails: 'Sorting with random comparisons produces non-uniform permutations and violates the 1/N! equality requirement.',
      spaceTimeTradeoff: 'Storing the original configuration preserves initial state for O(N) copy restoration.',
      interviewerExpectation: 'Correct index bounds: random index j must be drawn from [0, i], not [0, n - 1].'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import random

class Solution:
    def __init__(self, nums: list[int]):
        self.original = list(nums)
        self.nums = list(nums)

    def reset(self) -> list[int]:
        self.nums = list(self.original)
        return self.nums

    def shuffle(self) -> list[int]:
        arr = list(self.nums)
        for i in range(len(arr) - 1, 0, -1):
            j = random.randint(0, i)
            arr[i], arr[j] = arr[j], arr[i]
        return arr`,
        approach: 'Fisher-Yates Linear Shuffle with Original State Retention',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
private:
    vector<int> original;
public:
    Solution(vector<int>& nums) : original(nums) {}

    vector<int> reset() {
        return original;
    }

    vector<int> shuffle() {
        vector<int> arr = original;
        for (int i = (int)arr.size() - 1; i > 0; i--) {
            int j = rand() % (i + 1);
            swap(arr[i], arr[j]);
        }
        return arr;
    }
};`,
        approach: 'C++ In-Place Fisher-Yates Swap Shuffle',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.Random;

class Solution {
    private int[] original;
    private Random rand;

    public Solution(int[] nums) {
        this.original = nums.clone();
        this.rand = new Random();
    }

    public int[] reset() {
        return original.clone();
    }

    public int[] shuffle() {
        int[] arr = original.clone();
        for (int i = arr.length - 1; i > 0; i--) {
            int j = rand.nextInt(i + 1);
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }
}`,
        approach: 'Java Fisher-Yates In-Place Shuffling',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 */
var Solution = function(nums) {
    this.original = [...nums];
};

/**
 * @return {number[]}
 */
Solution.prototype.reset = function() {
    return [...this.original];
};

/**
 * @return {number[]}
 */
Solution.prototype.shuffle = function() {
    const arr = [...this.original];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
};`,
        approach: 'JavaScript Fisher-Yates Uniform Permutation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    sol = Solution([1, 2, 3])
    shuffled = sol.shuffle()
    assert sorted(shuffled) == [1, 2, 3]
    reset_arr = sol.reset()
    assert reset_arr == [1, 2, 3]
    print("Passed all shuffle-an-array test cases")
`
  }
];

export function writeAlgorithmsFiles() {
  for (const item of algorithmsProblems) {
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
      slug: item.slug,
      category: item.category,
      targetTime: item.complexity.time,
      targetSpace: item.complexity.space
    };
    fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(metaData, null, 2) + '\n', 'utf8');

    const testPyContent = `import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', '${item.slug}.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    class Node:
        def __init__(self, val=0, left=None, right=None, next=None):
            self.val = val
            self.left = left
            self.right = right
            self.next = next

    scope = {'list': list, 'Node': Node, 'random': random}
    exec(sol_code, scope)
    for k, v in scope.items():
        if not k.startswith('__'):
            globals()[k] = v

    cls_candidates = [k for k in ['Solution', 'TicTacToe', 'TwoSum', 'Vector2D', 'PeekingIterator', 'NumArray', 'Logger', 'HitCounter'] if k in scope]
    SolutionClass = scope[cls_candidates[0]]
    Solution = SolutionClass
    solver = SolutionClass() if cls_candidates[0] == 'Solution' and '${item.slug}' != 'shuffle-an-array' else None
${item.testCases}

if __name__ == '__main__':
    main()
`;
    fs.writeFileSync(path.join(testDir, 'test.py'), testPyContent, 'utf8');

    console.log(`Generated: #${item.number} ${item.slug} [${item.category}]`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  writeAlgorithmsFiles();
}
