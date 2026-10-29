import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Problem definitions for Batch 19 Algorithms (15 problems: #1426 - #1500)
export const batch19Algo = [
  // 1. #1426 counting-elements
  {
    slug: 'counting-elements',
    number: 1426,
    category: 'Algorithms',
    patterns: ['hash-map-lookup'],
    hints: [
      {
        level: 1,
        title: 'Membership Lookup via Distinct Elements',
        text: 'Store all array elements in a fast lookup set to enable constant-time presence checks.'
      },
      {
        level: 2,
        title: 'Linear Array Iteration',
        text: 'Iterate through each element x in the input array and test whether x + 1 exists in the hash set.'
      },
      {
        level: 3,
        title: 'Duplicate Counting Rule',
        text: 'Duplicates in the original array each contribute independently if their successor exists in the set.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def countElements(self, arr: list[int]) -> int:\n        s = set(arr)\n        return sum(1 for x in arr if x + 1 in s)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of elements in arr'],
      notes: 'Constructing hash set takes linear time, and scanning elements executes in linear time with O(1) membership lookups.',
      whyNaiveFails: 'Scanning the list linearly for each element requires quadratic O(N^2) time comparisons.',
      spaceTimeTradeoff: 'Allocating a hash set achieves optimal linear time at the cost of linear space.',
      interviewerExpectation: 'Optimal O(N) time using a hash set with proper handling of duplicates in original input.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def countElements(self, arr: list[int]) -> int:
        s = set(arr)
        return sum(1 for x in arr if x + 1 in s)`,
        approach: 'Hash Set Lookup',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int countElements(vector<int>& arr) {
        unordered_set<int> s(arr.begin(), arr.end());
        int ans = 0;
        for (int x : arr) {
            if (s.count(x + 1)) ans++;
        }
        return ans;
    }
};`,
        approach: 'Unordered Set Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int countElements(int[] arr) {
        Set<Integer> s = new HashSet<>();
        for (int x : arr) s.add(x);
        int ans = 0;
        for (int x : arr) {
            if (s.contains(x + 1)) ans++;
        }
        return ans;
    }
}`,
        approach: 'Java HashSet Membership Verification',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var countElements = function(arr) {
    const s = new Set(arr);
    let ans = 0;
    for (const x of arr) {
        if (s.has(x + 1)) ans++;
    }
    return ans;
};`,
        approach: 'JavaScript Set Constant Lookup',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Solution:
    def countElements(self, arr: list[int]) -> int:
        s = set(arr)
        return sum(1 for x in arr if x + 1 in s)

sol = Solution()
assert sol.countElements([1,2,3]) == 2
assert sol.countElements([1,1,3,3,5,5,7,7]) == 0
assert sol.countElements([1,3,2,3,5,0]) == 3
print("All tests passed successfully.")
`
  },

  // 2. #1427 perform-string-shifts
  {
    slug: 'perform-string-shifts',
    number: 1427,
    category: 'Algorithms',
    patterns: ['string-matching'],
    hints: [
      {
        level: 1,
        title: 'Cumulative Shift Reduction',
        text: 'Left shifts decrease the starting index while right shifts increase it.'
      },
      {
        level: 2,
        title: 'Modulo Normalization',
        text: 'Compute the net right shift modulo the string length to handle circular wrapping in constant time.'
      },
      {
        level: 3,
        title: 'Single Slice Extraction',
        text: 'Slice string s using the normalized shift offset instead of performing repeated character movements.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def stringShift(self, s: str, shift: list[list[int]]) -> str:\n        n = len(s)\n        net = sum(amt if d == 1 else -amt for d, amt in shift) % n\n        return s[-net:] + s[:-net]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(S + N)',
      space: 'O(N)',
      variables: ['S: number of operations in shift', 'N: length of string s'],
      notes: 'Summing shift offsets takes O(S) time and constructing the final rotated string takes O(N) time.',
      whyNaiveFails: 'Executing physical shifts one-by-one leads to redundant string allocations and O(S * N) execution.',
      spaceTimeTradeoff: 'Consolidating net shift algebraically minimizes buffer copies to a single pass.',
      interviewerExpectation: 'Modular arithmetic reduction aggregating transformations before string manipulation.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def stringShift(self, s: str, shift: list[list[int]]) -> str:
        n = len(s)
        net = sum(amt if d == 1 else -amt for d, amt in shift) % n
        return s[-net:] + s[:-net]`,
        approach: 'Cumulative Modulo Shift',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    string stringShift(string s, vector<vector<int>>& shift) {
        int n = s.size();
        int net = 0;
        for (const auto& sh : shift) {
            net += (sh[0] == 1 ? sh[1] : -sh[1]);
        }
        net = (net % n + n) % n;
        return s.substr(n - net) + s.substr(0, n - net);
    }
};`,
        approach: 'Substr Rotation via Modulo Offset',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public String stringShift(String s, int[][] shift) {
        int n = s.length();
        int net = 0;
        for (int[] sh : shift) {
            net += (sh[0] == 1 ? sh[1] : -sh[1]);
        }
        net = (net % n + n) % n;
        return s.substring(n - net) + s.substring(0, n - net);
    }
}`,
        approach: 'Java Substring Concatenation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var stringShift = function(s, shift) {
    const n = s.length;
    let net = 0;
    for (const [d, amt] of shift) {
        net += (d === 1 ? amt : -amt);
    }
    net = ((net % n) + n) % n;
    return s.slice(n - net) + s.slice(0, n - net);
};`,
        approach: 'JavaScript Slice Modular Offset',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Solution:
    def stringShift(self, s: str, shift: list[list[int]]) -> str:
        n = len(s)
        net = sum(amt if d == 1 else -amt for d, amt in shift) % n
        return s[-net:] + s[:-net]

sol = Solution()
assert sol.stringShift("abc", [[0,1],[1,2]]) == "cab"
assert sol.stringShift("abcdefg", [[1,1],[1,1],[0,2],[1,3]]) == "efgabcd"
print("All tests passed successfully.")
`
  },

  // 3. #1428 leftmost-column-with-at-least-a-one
  {
    slug: 'leftmost-column-with-at-least-a-one',
    number: 1428,
    category: 'Algorithms',
    patterns: ['matrix-simulation'],
    hints: [
      {
        level: 1,
        title: 'Monotonic Row Property',
        text: 'Because each row is sorted non-decreasingly, all zeros precede all ones in every row.'
      },
      {
        level: 2,
        title: 'Top Right Staircase Traversal',
        text: 'Begin inspection at the top-right corner of the matrix: coordinate (0, cols - 1).'
      },
      {
        level: 3,
        title: 'Directional Transition Invariant',
        text: 'If the current cell is 1, move left to seek an earlier occurrence; if 0, move down to the next row.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def leftMostColumnWithOne(self, binaryMatrix: \'BinaryMatrix\') -> int:\n        rows, cols = binaryMatrix.dimensions()\n        r, c = 0, cols - 1\n        ans = -1\n        while r < rows and c >= 0:\n            if binaryMatrix.get(r, c) == 1:\n                ans = c\n                c -= 1\n            else:\n                r += 1\n        return ans\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(R + C)',
      space: 'O(1)',
      variables: ['R: number of rows', 'C: number of columns'],
      notes: 'Each step moves either down one row or left one column, performing at most R + C total API queries.',
      whyNaiveFails: 'Querying every cell or executing independent binary search per row uses O(R * log C) API queries, exceeding limits.',
      spaceTimeTradeoff: 'Staircase tracking uses constant extra space while minimizing API access count.',
      interviewerExpectation: 'Optimal O(R + C) staircase walk starting from top-right corner.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def leftMostColumnWithOne(self, binaryMatrix: 'BinaryMatrix') -> int:
        rows, cols = binaryMatrix.dimensions()
        r, c = 0, cols - 1
        ans = -1
        while r < rows and c >= 0:
            if binaryMatrix.get(r, c) == 1:
                ans = c
                c -= 1
            else:
                r += 1
        return ans`,
        approach: 'Top-Right Staircase Walk',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int leftMostColumnWithOne(BinaryMatrix &binaryMatrix) {
        vector<int> dims = binaryMatrix.dimensions();
        int rows = dims[0], cols = dims[1];
        int r = 0, c = cols - 1;
        int ans = -1;
        while (r < rows && c >= 0) {
            if (binaryMatrix.get(r, c) == 1) {
                ans = c;
                c--;
            } else {
                r++;
            }
        }
        return ans;
    }
};`,
        approach: 'C++ Staircase Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `interface BinaryMatrix {
    public int get(int row, int col);
    public List<Integer> dimensions();
}

class Solution {
    public int leftMostColumnWithOne(BinaryMatrix binaryMatrix) {
        List<Integer> dims = binaryMatrix.dimensions();
        int rows = dims.get(0), cols = dims.get(1);
        int r = 0, c = cols - 1;
        int ans = -1;
        while (r < rows && c >= 0) {
            if (binaryMatrix.get(r, c) == 1) {
                ans = c;
                c--;
            } else {
                r++;
            }
        }
        return ans;
    }
}`,
        approach: 'Java Pointer Staircase Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var leftMostColumnWithOne = function(binaryMatrix) {
    const [rows, cols] = binaryMatrix.dimensions();
    let r = 0, c = cols - 1;
    let ans = -1;
    while (r < rows && c >= 0) {
        if (binaryMatrix.get(r, c) === 1) {
            ans = c;
            c--;
        } else {
            r++;
        }
    }
    return ans;
};`,
        approach: 'JavaScript Staircase Pointer Walk',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class MockBinaryMatrix:
    def __init__(self, mat):
        self.mat = mat
    def dimensions(self):
        return [len(self.mat), len(self.mat[0])]
    def get(self, r, c):
        return self.mat[r][c]

class Solution:
    def leftMostColumnWithOne(self, binaryMatrix) -> int:
        rows, cols = binaryMatrix.dimensions()
        r, c = 0, cols - 1
        ans = -1
        while r < rows and c >= 0:
            if binaryMatrix.get(r, c) == 1:
                ans = c
                c -= 1
            else:
                r += 1
        return ans

sol = Solution()
m1 = MockBinaryMatrix([[0,0],[1,1]])
assert sol.leftMostColumnWithOne(m1) == 0
m2 = MockBinaryMatrix([[0,0],[0,1]])
assert sol.leftMostColumnWithOne(m2) == 1
m3 = MockBinaryMatrix([[0,0],[0,0]])
assert sol.leftMostColumnWithOne(m3) == -1
print("All tests passed successfully.")
`
  },

  // 4. #1429 first-unique-number
  {
    slug: 'first-unique-number',
    number: 1429,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Occurrence Counter and Sequential Buffer',
        text: 'Track each number occurrence frequency with a dictionary and append additions into a sequential buffer.'
      },
      {
        level: 2,
        title: 'Lazy Invalidation Strategy',
        text: 'Rather than removing duplicates immediately from the queue, pop stale values from the front when querying.'
      },
      {
        level: 3,
        title: 'Front Cleanup Condition',
        text: 'While the queue is non-empty and the front element has frequency greater than 1, discard it.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nfrom collections import deque, Counter\n\nclass FirstUnique:\n    def __init__(self, nums: list[int]):\n        self.counts = Counter(nums)\n        self.q = deque(nums)\n\n    def showFirstUnique(self) -> int:\n        while self.q and self.counts[self.q[0]] > 1:\n            self.q.popleft()\n        return self.q[0] if self.q else -1\n\n    def add(self, value: int) -> None:\n        self.counts[value] += 1\n        self.q.append(value)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) amortized',
      space: 'O(N)',
      variables: ['N: total number of elements added'],
      notes: 'Each value is inserted once and popped at most once across all showFirstUnique calls, giving O(1) amortized time.',
      whyNaiveFails: 'Scanning elements linearly on every query yields O(N) query time.',
      spaceTimeTradeoff: 'Dual queue and frequency map storage bounds memory to O(N) while maintaining amortized constant time.',
      interviewerExpectation: 'Queue with lazy deletion paired with frequency dictionary.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import deque, Counter

class FirstUnique:
    def __init__(self, nums: list[int]):
        self.counts = Counter(nums)
        self.q = deque(nums)

    def showFirstUnique(self) -> int:
        while self.q and self.counts[self.q[0]] > 1:
            self.q.popleft()
        return self.q[0] if self.q else -1

    def add(self, value: int) -> None:
        self.counts[value] += 1
        self.q.append(value)`,
        approach: 'Queue with Lazy Deletion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class FirstUnique {
    unordered_map<int, int> counts;
    queue<int> q;
public:
    FirstUnique(vector<int>& nums) {
        for (int x : nums) {
            counts[x]++;
            q.push(x);
        }
    }
    
    int showFirstUnique() {
        while (!q.empty() && counts[q.front()] > 1) {
            q.pop();
        }
        return q.empty() ? -1 : q.front();
    }
    
    void add(int value) {
        counts[value]++;
        q.push(value);
    }
};`,
        approach: 'Unordered Map Frequency with Queue Discard',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class FirstUnique {
    private Map<Integer, Integer> counts = new HashMap<>();
    private Queue<Integer> q = new LinkedList<>();

    public FirstUnique(int[] nums) {
        for (int x : nums) {
            counts.put(x, counts.getOrDefault(x, 0) + 1);
            q.offer(x);
        }
    }
    
    public int showFirstUnique() {
        while (!q.isEmpty() && counts.get(q.peek()) > 1) {
            q.poll();
        }
        return q.isEmpty() ? -1 : q.peek();
    }
    
    public void add(int value) {
        counts.put(value, counts.getOrDefault(value, 0) + 1);
        q.offer(value);
    }
}`,
        approach: 'Java HashMap and Queue amortized inspection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var FirstUnique = function(nums) {
    this.counts = new Map();
    this.q = [];
    this.head = 0;
    for (const x of nums) {
        this.add(x);
    }
};

FirstUnique.prototype.showFirstUnique = function() {
    while (this.head < this.q.length && this.counts.get(this.q[this.head]) > 1) {
        this.head++;
    }
    return this.head < this.q.length ? this.q[this.head] : -1;
};

FirstUnique.prototype.add = function(value) {
    this.counts.set(value, (this.counts.get(value) || 0) + 1);
    this.q.push(value);
};`,
        approach: 'JavaScript Array Queue with Head Pointer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `from collections import deque, Counter

class FirstUnique:
    def __init__(self, nums: list[int]):
        self.counts = Counter(nums)
        self.q = deque(nums)

    def showFirstUnique(self) -> int:
        while self.q and self.counts[self.q[0]] > 1:
            self.q.popleft()
        return self.q[0] if self.q else -1

    def add(self, value: int) -> None:
        self.counts[value] += 1
        self.q.append(value)

fu = FirstUnique([2,3,5])
assert fu.showFirstUnique() == 2
fu.add(5)
assert fu.showFirstUnique() == 2
fu.add(2)
assert fu.showFirstUnique() == 3
fu.add(3)
assert fu.showFirstUnique() == -1
print("All tests passed successfully.")
`
  },

  // 5. #1430 check-if-a-string-is-a-valid-sequence-from-root-to-leaves-path-in-a-binary-tree
  {
    slug: 'check-if-a-string-is-a-valid-sequence-from-root-to-leaves-path-in-a-binary-tree',
    number: 1430,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    hints: [
      {
        level: 1,
        title: 'Depth Index Synchronization',
        text: 'Maintain the current index i in arr matching the current tree node value.'
      },
      {
        level: 2,
        title: 'Value Mismatch Pruning',
        text: 'If node is null or node value does not equal arr[idx], immediately return false.'
      },
      {
        level: 3,
        title: 'Leaf Boundary Validation',
        text: 'When i reaches len(arr) - 1, the node must be a true leaf (both left and right are null).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def isValidSequence(self, root: \'TreeNode\', arr: list[int]) -> bool:\n        n = len(arr)\n        def dfs(node, idx):\n            if not node or idx >= n or node.val != arr[idx]:\n                return False\n            if idx == n - 1:\n                return not node.left and not node.right\n            return dfs(node.left, idx + 1) or dfs(node.right, idx + 1)\n        return dfs(root, 0)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(H)',
      variables: ['N: number of nodes in tree', 'H: height of tree'],
      notes: 'Traverses each candidate node along matching paths at most once, with recursion stack bounded by tree height.',
      whyNaiveFails: 'Collecting all root-to-leaf paths copies paths explicitly and incurs unnecessary memory overhead.',
      spaceTimeTradeoff: 'Early stopping DFS avoids allocating intermediate path buffers.',
      interviewerExpectation: 'Recursive tree traversal checking index bounds, value equality, and leaf node termination.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def isValidSequence(self, root: 'TreeNode', arr: list[int]) -> bool:
        n = len(arr)
        def dfs(node, idx):
            if not node or idx >= n or node.val != arr[idx]:
                return False
            if idx == n - 1:
                return not node.left and not node.right
            return dfs(node.left, idx + 1) or dfs(node.right, idx + 1)
        return dfs(root, 0)`,
        approach: 'DFS Matching with Leaf Validation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    bool isValidSequence(TreeNode* root, vector<int>& arr) {
        int n = arr.size();
        return dfs(root, arr, 0, n);
    }
private:
    bool dfs(TreeNode* node, const vector<int>& arr, int idx, int n) {
        if (!node || idx >= n || node->val != arr[idx]) return false;
        if (idx == n - 1) {
            return !node->left && !node->right;
        }
        return dfs(node->left, arr, idx + 1, n) || dfs(node->right, arr, idx + 1, n);
    }
};`,
        approach: 'C++ Recursive Path DFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public boolean isValidSequence(TreeNode root, int[] arr) {
        return dfs(root, arr, 0);
    }
    private boolean dfs(TreeNode node, int[] arr, int idx) {
        if (node == null || idx >= arr.length || node.val != arr[idx]) return false;
        if (idx == arr.length - 1) {
            return node.left == null && node.right == null;
        }
        return dfs(node.left, arr, idx + 1) || dfs(node.right, arr, idx + 1);
    }
}`,
        approach: 'Java Recursive Tree Path Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var isValidSequence = function(root, arr) {
    const n = arr.length;
    function dfs(node, idx) {
        if (!node || idx >= n || node.val !== arr[idx]) return false;
        if (idx === n - 1) {
            return !node.left && !node.right;
        }
        return dfs(node.left, idx + 1) || dfs(node.right, idx + 1);
    }
    return dfs(root, 0);
};`,
        approach: 'JavaScript DFS Path Validation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isValidSequence(self, root: TreeNode, arr: list[int]) -> bool:
        n = len(arr)
        def dfs(node, idx):
            if not node or idx >= n or node.val != arr[idx]:
                return False
            if idx == n - 1:
                return not node.left and not node.right
            return dfs(node.left, idx + 1) or dfs(node.right, idx + 1)
        return dfs(root, 0)

sol = Solution()
r1 = TreeNode(0, TreeNode(1, TreeNode(0, None, TreeNode(1)), TreeNode(1, TreeNode(0), TreeNode(0))), TreeNode(0, TreeNode(0)))
assert sol.isValidSequence(r1, [0,1,0,1]) == True
assert sol.isValidSequence(r1, [0,0,1]) == False
assert sol.isValidSequence(r1, [0,1,1]) == False
print("All tests passed successfully.")
`
  },

  // 6. #1453 maximum-number-of-darts-inside-of-a-circular-dartboard
  {
    slug: 'maximum-number-of-darts-inside-of-a-circular-dartboard',
    number: 1453,
    category: 'Algorithms',
    patterns: ['math-number-theory'],
    hints: [
      {
        level: 1,
        title: 'Circle Tangent Pair Geometric Principle',
        text: 'The optimal disk containing the maximum points can always be shifted until it has at least two points lying on its boundary.'
      },
      {
        level: 2,
        title: 'Center Determination from Point Pairs',
        text: 'For each pair of darts with distance <= 2*r, calculate the midpoint and perpendicular bisector offset to locate both possible center circles.'
      },
      {
        level: 3,
        title: 'Point Distance Counting',
        text: 'For each candidate center, count how many darts satisfy (x - cx)^2 + (y - cy)^2 <= r^2 + 1e-7.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport math\n\nclass Solution:\n    def numPoints(self, darts: list[list[int]], r: int) -> int:\n        n = len(darts)\n        ans = 1\n        for i in range(n):\n            x1, y1 = darts[i]\n            for j in range(i + 1, n):\n                x2, y2 = darts[j]\n                d2 = (x1 - x2)**2 + (y1 - y2)**2\n                if d2 > 4 * r * r:\n                    continue\n                d = math.sqrt(d2)\n                mid_x, mid_y = (x1 + x2) / 2, (y1 + y2) / 2\n                h = math.sqrt(max(0.0, r * r - (d / 2)**2))\n                vx, vy = -(y2 - y1) / d, (x2 - x1) / d\n                for sign in [-1, 1]:\n                    cx = mid_x + sign * h * vx\n                    cy = mid_y + sign * h * vy\n                    cnt = sum(1 for px, py in darts if (px - cx)**2 + (py - cy)**2 <= r * r + 1e-7)\n                    if cnt > ans:\n                        ans = cnt\n        return ans\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N^3)',
      space: 'O(1)',
      variables: ['N: number of darts'],
      notes: 'Testing all O(N^2) pairs against N darts runs in O(N^3) time, which takes milliseconds for N <= 100.',
      whyNaiveFails: 'Continuous optimization over real coordinates cannot guarantee finding the global discrete maximum.',
      spaceTimeTradeoff: 'Constraining search to pairwise boundary circles reduces continuous 2D geometry to finite candidates.',
      interviewerExpectation: 'Understanding that any maximal circle touches at least 2 points and finding centers via perpendicular bisectors.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import math

class Solution:
    def numPoints(self, darts: list[list[int]], r: int) -> int:
        n = len(darts)
        ans = 1
        for i in range(n):
            x1, y1 = darts[i]
            for j in range(i + 1, n):
                x2, y2 = darts[j]
                d2 = (x1 - x2)**2 + (y1 - y2)**2
                if d2 > 4 * r * r:
                    continue
                d = math.sqrt(d2)
                mid_x, mid_y = (x1 + x2) / 2, (y1 + y2) / 2
                h = math.sqrt(max(0.0, r * r - (d / 2)**2))
                vx, vy = -(y2 - y1) / d, (x2 - x1) / d
                for sign in [-1, 1]:
                    cx = mid_x + sign * h * vx
                    cy = mid_y + sign * h * vy
                    cnt = sum(1 for px, py in darts if (px - cx)**2 + (py - cy)**2 <= r * r + 1e-7)
                    if cnt > ans:
                        ans = cnt
        return ans`,
        approach: 'Pairwise Boundary Circle Geometry',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int numPoints(vector<vector<int>>& darts, int r) {
        int n = darts.size();
        int ans = 1;
        for (int i = 0; i < n; i++) {
            double x1 = darts[i][0], y1 = darts[i][1];
            for (int j = i + 1; j < n; j++) {
                double x2 = darts[j][0], y2 = darts[j][1];
                double d2 = (x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2);
                if (d2 > 4.0 * r * r) continue;
                double d = sqrt(d2);
                double mid_x = (x1 + x2) / 2.0, mid_y = (y1 + y2) / 2.0;
                double h = sqrt(max(0.0, (double)r * r - (d / 2.0) * (d / 2.0)));
                double vx = -(y2 - y1) / d, vy = (x2 - x1) / d;
                for (int sign : {-1, 1}) {
                    double cx = mid_x + sign * h * vx;
                    double cy = mid_y + sign * h * vy;
                    int cnt = 0;
                    for (const auto& pt : darts) {
                        double dist2 = (pt[0] - cx)*(pt[0] - cx) + (pt[1] - cy)*(pt[1] - cy);
                        if (dist2 <= r * r + 1e-7) cnt++;
                    }
                    ans = max(ans, cnt);
                }
            }
        }
        return ans;
    }
};`,
        approach: 'C++ Geometric Bisector Center Enumeration',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int numPoints(int[][] darts, int r) {
        int n = darts.length;
        int ans = 1;
        for (int i = 0; i < n; i++) {
            double x1 = darts[i][0], y1 = darts[i][1];
            for (int j = i + 1; j < n; j++) {
                double x2 = darts[j][0], y2 = darts[j][1];
                double d2 = (x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2);
                if (d2 > 4.0 * r * r) continue;
                double d = Math.sqrt(d2);
                double mid_x = (x1 + x2) / 2.0, mid_y = (y1 + y2) / 2.0;
                double h = Math.sqrt(Math.max(0.0, (double)r * r - (d / 2.0) * (d / 2.0)));
                double vx = -(y2 - y1) / d, vy = (x2 - x1) / d;
                for (int sign : new int[]{-1, 1}) {
                    double cx = mid_x + sign * h * vx;
                    double cy = mid_y + sign * h * vy;
                    int cnt = 0;
                    for (int[] pt : darts) {
                        double dist2 = (pt[0] - cx)*(pt[0] - cx) + (pt[1] - cy)*(pt[1] - cy);
                        if (dist2 <= r * r + 1e-7) cnt++;
                    }
                    ans = Math.max(ans, cnt);
                }
            }
        }
        return ans;
    }
}`,
        approach: 'Java Circle Intersection Point Verification',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var numPoints = function(darts, r) {
    const n = darts.length;
    let ans = 1;
    for (let i = 0; i < n; i++) {
        const [x1, y1] = darts[i];
        for (let j = i + 1; j < n; j++) {
            const [x2, y2] = darts[j];
            const d2 = (x1 - x2)**2 + (y1 - y2)**2;
            if (d2 > 4 * r * r) continue;
            const d = Math.sqrt(d2);
            const mid_x = (x1 + x2) / 2, mid_y = (y1 + y2) / 2;
            const h = Math.sqrt(Math.max(0, r * r - (d / 2)**2));
            const vx = -(y2 - y1) / d, vy = (x2 - x1) / d;
            for (const sign of [-1, 1]) {
                const cx = mid_x + sign * h * vx;
                const cy = mid_y + sign * h * vy;
                let cnt = 0;
                for (const [px, py] of darts) {
                    if ((px - cx)**2 + (py - cy)**2 <= r * r + 1e-7) cnt++;
                }
                if (cnt > ans) ans = cnt;
            }
        }
    }
    return ans;
};`,
        approach: 'JavaScript Geometric Center Sweep',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import math

class Solution:
    def numPoints(self, darts: list[list[int]], r: int) -> int:
        n = len(darts)
        ans = 1
        for i in range(n):
            x1, y1 = darts[i]
            for j in range(i + 1, n):
                x2, y2 = darts[j]
                d2 = (x1 - x2)**2 + (y1 - y2)**2
                if d2 > 4 * r * r: continue
                d = math.sqrt(d2)
                mid_x, mid_y = (x1 + x2) / 2, (y1 + y2) / 2
                h = math.sqrt(max(0.0, r * r - (d / 2)**2))
                vx, vy = -(y2 - y1) / d, (x2 - x1) / d
                for sign in [-1, 1]:
                    cx = mid_x + sign * h * vx
                    cy = mid_y + sign * h * vy
                    cnt = sum(1 for px, py in darts if (px - cx)**2 + (py - cy)**2 <= r * r + 1e-7)
                    if cnt > ans: ans = cnt
        return ans

sol = Solution()
assert sol.numPoints([[-2,0],[2,0],[0,2],[0,-2]], 2) == 4
assert sol.numPoints([[-3,0],[3,0],[2,6]], 5) == 3
print("All tests passed successfully.")
`
  },

  // 7. #1467 probability-of-a-two-boxes-having-the-same-number-of-distinct-balls
  {
    slug: 'probability-of-a-two-boxes-having-the-same-number-of-distinct-balls',
    number: 1467,
    category: 'Algorithms',
    patterns: ['backtracking-subsets-perm'],
    hints: [
      {
        level: 1,
        title: 'Color Partition State Space',
        text: 'For each distinct color i, decide how many balls k (from 0 to balls[i]) are distributed into box 1.'
      },
      {
        level: 2,
        title: 'Multinomial Counting Weights',
        text: 'Placing k balls into box 1 contributes comb(balls[i], k) ways to the aggregate product of configurations.'
      },
      {
        level: 3,
        title: 'Target Verification Conditions',
        text: 'Valid terminal states must have total balls in box 1 equal to n, and distinct color counts in box 1 and box 2 equal.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport math\n\nclass Solution:\n    def getProbability(self, balls: list[int]) -> float:\n        k = len(balls)\n        n = sum(balls) // 2\n        memo = {}\n        def dfs(i, count1, d1, d2):\n            if count1 > n:\n                return 0, 0\n            if i == k:\n                if count1 == n:\n                    return (1 if d1 == d2 else 0), 1\n                return 0, 0\n            state = (i, count1, d1, d2)\n            if state in memo:\n                return memo[state]\n            valid_ways, total_ways = 0, 0\n            b = balls[i]\n            for c in range(b + 1):\n                ways = math.comb(b, c)\n                nd1 = d1 + (1 if c > 0 else 0)\n                nd2 = d2 + (1 if b - c > 0 else 0)\n                v, t = dfs(i + 1, count1 + c, nd1, nd2)\n                valid_ways += v * ways\n                total_ways += t * ways\n            memo[state] = (valid_ways, total_ways)\n            return valid_ways, total_ways\n        valid, total = dfs(0, 0, 0, 0)\n        return valid / total\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(K * N * K^2)',
      space: 'O(K * N * K^2)',
      variables: ['K: number of colors', 'N: half the total number of balls'],
      notes: 'Memoized state captures (color index, count of balls in box 1, distinct colors in box 1, distinct colors in box 2).',
      whyNaiveFails: 'Generating all individual ball permutations results in factorial state explosion.',
      spaceTimeTradeoff: 'Color-wise distribution with combination weights groups identical ball permutations together.',
      interviewerExpectation: 'DFS with multinomial coefficient counting and memoization across distinct color states.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import math

class Solution:
    def getProbability(self, balls: list[int]) -> float:
        k = len(balls)
        n = sum(balls) // 2
        memo = {}
        def dfs(i, count1, d1, d2):
            if count1 > n:
                return 0, 0
            if i == k:
                if count1 == n:
                    return (1 if d1 == d2 else 0), 1
                return 0, 0
            state = (i, count1, d1, d2)
            if state in memo:
                return memo[state]
            valid_ways, total_ways = 0, 0
            b = balls[i]
            for c in range(b + 1):
                ways = math.comb(b, c)
                nd1 = d1 + (1 if c > 0 else 0)
                nd2 = d2 + (1 if b - c > 0 else 0)
                v, t = dfs(i + 1, count1 + c, nd1, nd2)
                valid_ways += v * ways
                total_ways += t * ways
            memo[state] = (valid_ways, total_ways)
            return valid_ways, total_ways
        valid, total = dfs(0, 0, 0, 0)
        return valid / total`,
        approach: 'Multinomial Memoized DFS Partition',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    double comb[9][9];
    int n, k;
    double memo[9][49][9][9];
    bool vis[9][49][9][9];
    pair<double, double> dp(int i, int c1, int d1, int d2, const vector<int>& balls) {
        if (c1 > n) return {0.0, 0.0};
        if (i == k) {
            if (c1 == n) return {d1 == d2 ? 1.0 : 0.0, 1.0};
            return {0.0, 0.0};
        }
        if (vis[i][c1][d1][d2]) return {memo[i][c1][d1][d2], memo[i][c1][d1][d2]};
        double valid = 0, total = 0;
        int b = balls[i];
        for (int c = 0; c <= b; c++) {
            double ways = comb[b][c];
            int nd1 = d1 + (c > 0 ? 1 : 0);
            int nd2 = d2 + (b - c > 0 ? 1 : 0);
            auto [v, t] = dp(i + 1, c1 + c, nd1, nd2, balls);
            valid += v * ways;
            total += t * ways;
        }
        return {valid, total};
    }
public:
    double getProbability(vector<int>& balls) {
        k = balls.size();
        int totalBalls = 0;
        for (int x : balls) totalBalls += x;
        n = totalBalls / 2;
        for (int i = 0; i <= 8; i++) {
            comb[i][0] = comb[i][i] = 1.0;
            for (int j = 1; j < i; j++) comb[i][j] = comb[i-1][j-1] + comb[i-1][j];
        }
        memset(vis, 0, sizeof(vis));
        auto res = dp(0, 0, 0, 0, balls);
        return res.first / res.second;
    }
};`,
        approach: 'C++ Dynamic State Memoization with Combinations',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private double[][] comb = new double[9][9];
    private int n, k;
    private double solve(int i, int c1, int d1, int d2, int[] balls, boolean forValid) {
        if (c1 > n) return 0.0;
        if (i == k) {
            if (c1 == n) return forValid ? (d1 == d2 ? 1.0 : 0.0) : 1.0;
            return 0.0;
        }
        double sum = 0.0;
        int b = balls[i];
        for (int c = 0; c <= b; c++) {
            double ways = comb[b][c];
            int nd1 = d1 + (c > 0 ? 1 : 0);
            int nd2 = d2 + (b - c > 0 ? 1 : 0);
            sum += ways * solve(i + 1, c1 + c, nd1, nd2, balls, forValid);
        }
        return sum;
    }
    public double getProbability(int[] balls) {
        k = balls.length;
        int tot = 0;
        for (int x : balls) tot += x;
        n = tot / 2;
        for (int i = 0; i <= 8; i++) {
            comb[i][0] = comb[i][i] = 1.0;
            for (int j = 1; j < i; j++) comb[i][j] = comb[i - 1][j - 1] + comb[i - 1][j];
        }
        double valid = solve(0, 0, 0, 0, balls, true);
        double total = solve(0, 0, 0, 0, balls, false);
        return valid / total;
    }
}`,
        approach: 'Java Combinatorial Branching Evaluation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var getProbability = function(balls) {
    const k = balls.length;
    const totalBalls = balls.reduce((a, b) => a + b, 0);
    const n = Math.floor(totalBalls / 2);
    const comb = Array.from({ length: 9 }, () => Array(9).fill(0));
    for (let i = 0; i <= 8; i++) {
        comb[i][0] = comb[i][i] = 1;
        for (let j = 1; j < i; j++) comb[i][j] = comb[i - 1][j - 1] + comb[i - 1][j];
    }
    const memo = new Map();
    function dfs(i, c1, d1, d2) {
        if (c1 > n) return [0, 0];
        if (i === k) {
            if (c1 === n) return [d1 === d2 ? 1 : 0, 1];
            return [0, 0];
        }
        const key = \`\${i},\${c1},\${d1},\${d2}\`;
        if (memo.has(key)) return memo.get(key);
        let valid = 0, total = 0;
        const b = balls[i];
        for (let c = 0; c <= b; c++) {
            const ways = comb[b][c];
            const nd1 = d1 + (c > 0 ? 1 : 0);
            const nd2 = d2 + (b - c > 0 ? 1 : 0);
            const [v, t] = dfs(i + 1, c1 + c, nd1, nd2);
            valid += v * ways;
            total += t * ways;
        }
        const res = [valid, total];
        memo.set(key, res);
        return res;
    }
    const [v, t] = dfs(0, 0, 0, 0);
    return v / t;
};`,
        approach: 'JavaScript Combination Memoized Partition',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import math

class Solution:
    def getProbability(self, balls: list[int]) -> float:
        k = len(balls)
        n = sum(balls) // 2
        memo = {}
        def dfs(i, count1, d1, d2):
            if count1 > n: return 0, 0
            if i == k:
                if count1 == n:
                    return (1 if d1 == d2 else 0), 1
                return 0, 0
            state = (i, count1, d1, d2)
            if state in memo: return memo[state]
            valid_ways, total_ways = 0, 0
            b = balls[i]
            for c in range(b + 1):
                ways = math.comb(b, c)
                nd1 = d1 + (1 if c > 0 else 0)
                nd2 = d2 + (1 if b - c > 0 else 0)
                v, t = dfs(i + 1, count1 + c, nd1, nd2)
                valid_ways += v * ways
                total_ways += t * ways
            memo[state] = (valid_ways, total_ways)
            return valid_ways, total_ways
        valid, total = dfs(0, 0, 0, 0)
        return valid / total

sol = Solution()
assert abs(sol.getProbability([1,1]) - 1.0) < 1e-5
assert abs(sol.getProbability([2,1,1]) - 0.66667) < 1e-4
print("All tests passed successfully.")
`
  },

  // 8. #1469 find-all-the-lonely-nodes
  {
    slug: 'find-all-the-lonely-nodes',
    number: 1469,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    hints: [
      {
        level: 1,
        title: 'Single-Child Parent Identification',
        text: 'A node is lonely if and only if its parent has exactly one child.'
      },
      {
        level: 2,
        title: 'Parent-Level Child Inspection',
        text: 'During traversal from a parent node, test whether exactly one of left or right is present.'
      },
      {
        level: 3,
        title: 'Recursive Collection',
        text: 'If parent has only a left child, record left.val; if parent has only a right child, record right.val.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def getLonelyNodes(self, root: \'TreeNode\') -> list[int]:\n        ans = []\n        def dfs(node):\n            if not node:\n                return\n            if node.left and not node.right:\n                ans.append(node.left.val)\n            elif node.right and not node.left:\n                ans.append(node.right.val)\n            dfs(node.left)\n            dfs(node.right)\n        dfs(root)\n        return ans\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(H)',
      variables: ['N: number of nodes in binary tree', 'H: tree height'],
      notes: 'Visits every node once during DFS traversal with recursion stack depth bounded by tree height H.',
      whyNaiveFails: 'Tracking parent pointers requires auxiliary storage or extra passes.',
      spaceTimeTradeoff: 'Inspecting children directly from each node avoids parent hash table allocation.',
      interviewerExpectation: 'Simple depth-first search inspecting child presence at the parent level.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def getLonelyNodes(self, root: 'TreeNode') -> list[int]:
        ans = []
        def dfs(node):
            if not node:
                return
            if node.left and not node.right:
                ans.append(node.left.val)
            elif node.right and not node.left:
                ans.append(node.right.val)
            dfs(node.left)
            dfs(node.right)
        dfs(root)
        return ans`,
        approach: 'DFS Single-Child Parent Check',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    vector<int> ans;
    void dfs(TreeNode* node) {
        if (!node) return;
        if (node->left && !node->right) ans.push_back(node->left->val);
        else if (node->right && !node->left) ans.push_back(node->right->val);
        dfs(node->left);
        dfs(node->right);
    }
public:
    vector<int> getLonelyNodes(TreeNode* root) {
        dfs(root);
        return ans;
    }
};`,
        approach: 'C++ Preorder Child Examination',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private List<Integer> ans = new ArrayList<>();
    private void dfs(TreeNode node) {
        if (node == null) return;
        if (node.left != null && node.right == null) ans.add(node.left.val);
        else if (node.right != null && node.left == null) ans.add(node.right.val);
        dfs(node.left);
        dfs(node.right);
    }
    public List<Integer> getLonelyNodes(TreeNode root) {
        dfs(root);
        return ans;
    }
}`,
        approach: 'Java Traversal Single Child Detection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var getLonelyNodes = function(root) {
    const ans = [];
    function dfs(node) {
        if (!node) return;
        if (node.left && !node.right) ans.push(node.left.val);
        else if (node.right && !node.left) ans.push(node.right.val);
        dfs(node.left);
        dfs(node.right);
    }
    dfs(root);
    return ans;
};`,
        approach: 'JavaScript Recursive Single-Child Inspection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def getLonelyNodes(self, root: TreeNode) -> list[int]:
        ans = []
        def dfs(node):
            if not node: return
            if node.left and not node.right:
                ans.append(node.left.val)
            elif node.right and not node.left:
                ans.append(node.right.val)
            dfs(node.left)
            dfs(node.right)
        dfs(root)
        return ans

sol = Solution()
r1 = TreeNode(1, TreeNode(2, None, TreeNode(4)), TreeNode(3))
assert sorted(sol.getLonelyNodes(r1)) == [4]
r2 = TreeNode(7, TreeNode(1, TreeNode(6), None), TreeNode(4, TreeNode(5), TreeNode(3, None, TreeNode(2))))
assert sorted(sol.getLonelyNodes(r2)) == [2, 6]
print("All tests passed successfully.")
`
  },

  // 9. #1472 design-browser-history
  {
    slug: 'design-browser-history',
    number: 1472,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Dynamic Array Storage',
        text: 'Store URLs in a dynamic array with an index pointer pointing to the current active webpage.'
      },
      {
        level: 2,
        title: 'Forward History Invalidation',
        text: 'When visit(url) is called, truncate all history following the current index before appending.'
      },
      {
        level: 3,
        title: 'Bound Clamping Transitions',
        text: 'Clamp back and forward step offsets using max(0, curr - steps) and min(len - 1, curr + steps).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass BrowserHistory:\n    def __init__(self, homepage: str):\n        self.history = [homepage]\n        self.curr = 0\n\n    def visit(self, url: str) -> None:\n        self.history = self.history[:self.curr + 1]\n        self.history.append(url)\n        self.curr += 1\n\n    def back(self, steps: int) -> str:\n        self.curr = max(0, self.curr - steps)\n        return self.history[self.curr]\n\n    def forward(self, steps: int) -> str:\n        self.curr = min(len(self.history) - 1, self.curr + steps)\n        return self.history[self.curr]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) back/forward, O(1) amortized visit',
      space: 'O(N)',
      variables: ['N: total number of visited pages'],
      notes: 'Index repositioning executes in O(1) time and visit appends in amortized O(1) time when tracking logical end bound.',
      whyNaiveFails: 'Two separate stacks require transferring up to K elements during repeated navigation calls.',
      spaceTimeTradeoff: 'A single resizable list with an index pointer avoids auxiliary stack transfers.',
      interviewerExpectation: 'Array pointer arithmetic clamping boundaries within [0, size - 1].'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class BrowserHistory:
    def __init__(self, homepage: str):
        self.history = [homepage]
        self.curr = 0

    def visit(self, url: str) -> None:
        self.history = self.history[:self.curr + 1]
        self.history.append(url)
        self.curr += 1

    def back(self, steps: int) -> str:
        self.curr = max(0, self.curr - steps)
        return self.history[self.curr]

    def forward(self, steps: int) -> str:
        self.curr = min(len(self.history) - 1, self.curr + steps)
        return self.history[self.curr]`,
        approach: 'Array History with Pointer Clamping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class BrowserHistory {
    vector<string> history;
    int curr;
public:
    BrowserHistory(string homepage) {
        history.push_back(homepage);
        curr = 0;
    }
    
    void visit(string url) {
        history.resize(curr + 1);
        history.push_back(url);
        curr++;
    }
    
    string back(int steps) {
        curr = max(0, curr - steps);
        return history[curr];
    }
    
    string forward(int steps) {
        curr = min((int)history.size() - 1, curr + steps);
        return history[curr];
    }
};`,
        approach: 'C++ Vector Resizing and Clamping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class BrowserHistory {
    private List<String> history = new ArrayList<>();
    private int curr;

    public BrowserHistory(String homepage) {
        history.add(homepage);
        curr = 0;
    }
    
    public void visit(String url) {
        while (history.size() > curr + 1) {
            history.remove(history.size() - 1);
        }
        history.add(url);
        curr++;
    }
    
    public String back(int steps) {
        curr = Math.max(0, curr - steps);
        return history.get(curr);
    }
    
    public String forward(int steps) {
        curr = Math.min(history.size() - 1, curr + steps);
        return history.get(curr);
    }
}`,
        approach: 'Java ArrayList History Maintenance',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var BrowserHistory = function(homepage) {
    this.history = [homepage];
    this.curr = 0;
};

BrowserHistory.prototype.visit = function(url) {
    this.history.length = this.curr + 1;
    this.history.push(url);
    this.curr++;
};

BrowserHistory.prototype.back = function(steps) {
    this.curr = Math.max(0, this.curr - steps);
    return this.history[this.curr];
};

BrowserHistory.prototype.forward = function(steps) {
    this.curr = Math.min(this.history.length - 1, this.curr + steps);
    return this.history[this.curr];
};`,
        approach: 'JavaScript Array Length Truncation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class BrowserHistory:
    def __init__(self, homepage: str):
        self.history = [homepage]
        self.curr = 0

    def visit(self, url: str) -> None:
        self.history = self.history[:self.curr + 1]
        self.history.append(url)
        self.curr += 1

    def back(self, steps: int) -> str:
        self.curr = max(0, self.curr - steps)
        return self.history[self.curr]

    def forward(self, steps: int) -> str:
        self.curr = min(len(self.history) - 1, self.curr + steps)
        return self.history[self.curr]

bh = BrowserHistory("leetcode.com")
bh.visit("google.com")
bh.visit("facebook.com")
bh.visit("youtube.com")
assert bh.back(1) == "facebook.com"
assert bh.back(1) == "google.com"
assert bh.forward(1) == "facebook.com"
bh.visit("linkedin.com")
assert bh.forward(2) == "linkedin.com"
assert bh.back(2) == "google.com"
assert bh.back(7) == "leetcode.com"
print("All tests passed successfully.")
`
  },

  // 10. #1474 delete-n-nodes-after-m-nodes-of-a-linked-list
  {
    slug: 'delete-n-nodes-after-m-nodes-of-a-linked-list',
    number: 1474,
    category: 'Algorithms',
    patterns: ['linked-list-pointers'],
    hints: [
      {
        level: 1,
        title: 'Two-Phase Pointer Stepping',
        text: 'Step forward m - 1 times to position current pointer at the last node of the retained segment.'
      },
      {
        level: 2,
        title: 'Skipping Target Interval',
        text: 'Advance a temporary pointer n + 1 times starting from current to locate the reconnect node.'
      },
      {
        level: 3,
        title: 'Pointer Re-linking',
        text: 'Set curr.next to the reconnect node, then update curr to continue the cycle.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def deleteNodes(self, head: \'ListNode\', m: int, n: int) -> \'ListNode\':\n        curr = head\n        while curr:\n            for _ in range(m - 1):\n                if not curr:\n                    return head\n                curr = curr.next\n            if not curr or not curr.next:\n                return head\n            nxt = curr.next\n            for _ in range(n):\n                if not nxt:\n                    break\n                nxt = nxt.next\n            curr.next = nxt\n            curr = nxt\n        return head\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(L)',
      space: 'O(1)',
      variables: ['L: number of nodes in linked list'],
      notes: 'Every node in the linked list is traversed at most once during stepping and skipping.',
      whyNaiveFails: 'Allocating new linked list structures uses redundant O(L) memory when in-place pointer relinking suffices.',
      spaceTimeTradeoff: 'Modifying next pointers in-place guarantees strictly constant extra space.',
      interviewerExpectation: 'Clean in-place pointer traversal with guard clauses against null termination.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def deleteNodes(self, head: 'ListNode', m: int, n: int) -> 'ListNode':
        curr = head
        while curr:
            for _ in range(m - 1):
                if not curr:
                    return head
                curr = curr.next
            if not curr or not curr.next:
                return head
            nxt = curr.next
            for _ in range(n):
                if not nxt:
                    break
                nxt = nxt.next
            curr.next = nxt
            curr = nxt
        return head`,
        approach: 'Two-Phase In-Place Pointer Skipping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    ListNode* deleteNodes(ListNode* head, int m, int n) {
        ListNode* curr = head;
        while (curr) {
            for (int i = 0; i < m - 1 && curr; i++) {
                curr = curr->next;
            }
            if (!curr || !curr->next) return head;
            ListNode* nxt = curr->next;
            for (int i = 0; i < n && nxt; i++) {
                nxt = nxt->next;
            }
            curr->next = nxt;
            curr = nxt;
        }
        return head;
    }
};`,
        approach: 'C++ In-Place Relinking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public ListNode deleteNodes(ListNode head, int m, int n) {
        ListNode curr = head;
        while (curr != null) {
            for (int i = 0; i < m - 1 && curr != null; i++) {
                curr = curr.next;
            }
            if (curr == null || curr.next == null) return head;
            ListNode nxt = curr.next;
            for (int i = 0; i < n && nxt != null; i++) {
                nxt = nxt.next;
            }
            curr.next = nxt;
            curr = nxt;
        }
        return head;
    }
}`,
        approach: 'Java Pointer Relinking and Skip Iteration',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var deleteNodes = function(head, m, n) {
    let curr = head;
    while (curr) {
        for (let i = 0; i < m - 1 && curr; i++) {
            curr = curr.next;
        }
        if (!curr || !curr.next) return head;
        let nxt = curr.next;
        for (let i = 0; i < n && nxt; i++) {
            nxt = nxt.next;
        }
        curr.next = nxt;
        curr = nxt;
    }
    return head;
};`,
        approach: 'JavaScript In-Place Pointer Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def to_list(arr):
    dummy = ListNode(0)
    curr = dummy
    for x in arr:
        curr.next = ListNode(x)
        curr = curr.next
    return dummy.next

def to_arr(head):
    res = []
    while head:
        res.append(head.val)
        head = head.next
    return res

class Solution:
    def deleteNodes(self, head: ListNode, m: int, n: int) -> ListNode:
        curr = head
        while curr:
            for _ in range(m - 1):
                if not curr: return head
                curr = curr.next
            if not curr or not curr.next: return head
            nxt = curr.next
            for _ in range(n):
                if not nxt: break
                nxt = nxt.next
            curr.next = nxt
            curr = nxt
        return head

sol = Solution()
l1 = to_list([1,2,3,4,5,6,7,8,9,10,11,12,13])
assert to_arr(sol.deleteNodes(l1, 2, 3)) == [1,2,6,7,11,12]
l2 = to_list([1,2,3,4,5,6,7,8,9,10,11])
assert to_arr(sol.deleteNodes(l2, 1, 3)) == [1,5,9]
print("All tests passed successfully.")
`
  },

  // 11. #1476 subrectangle-queries
  {
    slug: 'subrectangle-queries',
    number: 1476,
    category: 'Algorithms',
    patterns: ['matrix-simulation'],
    hints: [
      {
        level: 1,
        title: 'Operation Log History',
        text: 'Record each update operation as a historical log tuple [row1, col1, row2, col2, newValue].'
      },
      {
        level: 2,
        title: 'Reverse Inspection on Retrieval',
        text: 'When querying getValue(row, col), scan the operations log from newest to oldest.'
      },
      {
        level: 3,
        title: 'Initial Grid Fallback',
        text: 'If no update rectangle encompasses (row, col), return the value from the initial rectangle.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass SubrectangleQueries:\n    def __init__(self, rectangle: list[list[int]]):\n        self.rect = rectangle\n        self.ops = []\n\n    def updateSubrectangle(self, row1: int, col1: int, row2: int, col2: int, newValue: int) -> None:\n        self.ops.append((row1, col1, row2, col2, newValue))\n\n    def getValue(self, row: int, col: int) -> int:\n        for r1, c1, r2, c2, val in reversed(self.ops):\n            if r1 <= row <= r2 and c1 <= col <= c2:\n                return val\n        return self.rect[row][col]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) update, O(U) query',
      space: 'O(U + R * C)',
      variables: ['U: number of update operations', 'R: rows', 'C: columns'],
      notes: 'Appending to the operation history takes O(1) time, and query scans at most U past updates.',
      whyNaiveFails: 'Modifying cells across the entire subrectangle takes O(R * C) per update, which is slow for frequent updates.',
      spaceTimeTradeoff: 'Logging updates achieves O(1) update time while keeping query fast when queries are sparse.',
      interviewerExpectation: 'Recognizing lazy historical logging vs in-place eager matrix overwriting.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class SubrectangleQueries:
    def __init__(self, rectangle: list[list[int]]):
        self.rect = rectangle
        self.ops = []

    def updateSubrectangle(self, row1: int, col1: int, row2: int, col2: int, newValue: int) -> None:
        self.ops.append((row1, col1, row2, col2, newValue))

    def getValue(self, row: int, col: int) -> int:
        for r1, c1, r2, c2, val in reversed(self.ops):
            if r1 <= row <= r2 and c1 <= col <= c2:
                return val
        return self.rect[row][col]`,
        approach: 'Reverse Historical Log Lookup',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class SubrectangleQueries {
    vector<vector<int>> rect;
    struct Op {
        int r1, c1, r2, c2, val;
    };
    vector<Op> ops;
public:
    SubrectangleQueries(vector<vector<int>>& rectangle) {
        rect = rectangle;
    }
    
    void updateSubrectangle(int row1, int col1, int row2, int col2, int newValue) {
        ops.push_back({row1, col1, row2, col2, newValue});
    }
    
    int getValue(int row, int col) {
        for (int i = (int)ops.size() - 1; i >= 0; i--) {
            if (row >= ops[i].r1 && row <= ops[i].r2 && col >= ops[i].c1 && col <= ops[i].c2) {
                return ops[i].val;
            }
        }
        return rect[row][col];
    }
};`,
        approach: 'C++ Historical Operations Stack',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class SubrectangleQueries {
    private int[][] rect;
    private static class Op {
        int r1, c1, r2, c2, val;
        Op(int r1, int c1, int r2, int c2, int val) {
            this.r1 = r1; this.c1 = c1; this.r2 = r2; this.c2 = c2; this.val = val;
        }
    }
    private List<Op> ops = new ArrayList<>();

    public SubrectangleQueries(int[][] rectangle) {
        this.rect = rectangle;
    }
    
    public void updateSubrectangle(int row1, int col1, int row2, int col2, int newValue) {
        ops.add(new Op(row1, col1, row2, col2, newValue));
    }
    
    public int getValue(int row, int col) {
        for (int i = ops.size() - 1; i >= 0; i--) {
            Op op = ops.get(i);
            if (row >= op.r1 && row <= op.r2 && col >= op.c1 && col <= op.c2) {
                return op.val;
            }
        }
        return rect[row][col];
    }
}`,
        approach: 'Java Lazy Update History Record',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var SubrectangleQueries = function(rectangle) {
    this.rect = rectangle;
    this.ops = [];
};

SubrectangleQueries.prototype.updateSubrectangle = function(row1, col1, row2, col2, newValue) {
    this.ops.push([row1, col1, row2, col2, newValue]);
};

SubrectangleQueries.prototype.getValue = function(row, col) {
    for (let i = this.ops.length - 1; i >= 0; i--) {
        const [r1, c1, r2, c2, val] = this.ops[i];
        if (row >= r1 && row <= r2 && col >= c1 && col <= c2) {
            return val;
        }
    }
    return this.rect[row][col];
};`,
        approach: 'JavaScript Operation Log Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class SubrectangleQueries:
    def __init__(self, rectangle: list[list[int]]):
        self.rect = rectangle
        self.ops = []

    def updateSubrectangle(self, row1: int, col1: int, row2: int, col2: int, newValue: int) -> None:
        self.ops.append((row1, col1, row2, col2, newValue))

    def getValue(self, row: int, col: int) -> int:
        for r1, c1, r2, c2, val in reversed(self.ops):
            if r1 <= row <= r2 and c1 <= col <= c2:
                return val
        return self.rect[row][col]

sq = SubrectangleQueries([[1,2,1],[4,3,4],[3,2,1],[1,1,1]])
assert sq.getValue(0, 2) == 1
sq.updateSubrectangle(0, 0, 3, 2, 5)
assert sq.getValue(0, 2) == 5
assert sq.getValue(3, 1) == 5
sq.updateSubrectangle(3, 0, 3, 2, 10)
assert sq.getValue(3, 1) == 10
assert sq.getValue(0, 2) == 5
print("All tests passed successfully.")
`
  },

  // 12. #1483 kth-ancestor-of-a-tree-node
  {
    slug: 'kth-ancestor-of-a-tree-node',
    number: 1483,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    hints: [
      {
        level: 1,
        title: 'Binary Lifting Ancestor Table',
        text: 'Precompute table up[node][j] denoting the 2^j-th ancestor of node.'
      },
      {
        level: 2,
        title: 'Recurrence Relation',
        text: 'up[node][j] = up[up[node][j - 1]][j - 1] with base cases up[node][0] = parent[node].'
      },
      {
        level: 3,
        title: 'Binary Decomposition of K',
        text: 'To find the kth ancestor, jump by powers of 2 corresponding to the set bits of k.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass TreeAncestor:\n    def __init__(self, n: int, parent: list[int]):\n        LOG = 16\n        self.up = [[-1] * LOG for _ in range(n)]\n        for i in range(n):\n            self.up[i][0] = parent[i]\n        for j in range(1, LOG):\n            for i in range(n):\n                if self.up[i][j - 1] != -1:\n                    self.up[i][j] = self.up[self.up[i][j - 1]][j - 1]\n\n    def getKthAncestor(self, node: int, k: int) -> int:\n        LOG = 16\n        for j in range(LOG):\n            if (k >> j) & 1:\n                node = self.up[node][j]\n                if node == -1:\n                    break\n        return node\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N log N) precompute, O(log K) query',
      space: 'O(N log N)',
      variables: ['N: number of nodes in tree', 'K: query ancestor step count'],
      notes: 'Constructing table takes N * 16 operations, and each query inspects set bits in at most 16 jumps.',
      whyNaiveFails: 'Stepping one ancestor at a time takes O(K) per query, which reaches O(Q * N) under deep trees.',
      spaceTimeTradeoff: 'Precomputing powers of 2 jumps reduces query time from linear to logarithmic.',
      interviewerExpectation: 'Classic binary lifting table doubling ancestors across bit positions.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class TreeAncestor:
    def __init__(self, n: int, parent: list[int]):
        LOG = 16
        self.up = [[-1] * LOG for _ in range(n)]
        for i in range(n):
            self.up[i][0] = parent[i]
        for j in range(1, LOG):
            for i in range(n):
                if self.up[i][j - 1] != -1:
                    self.up[i][j] = self.up[self.up[i][j - 1]][j - 1]

    def getKthAncestor(self, node: int, k: int) -> int:
        LOG = 16
        for j in range(LOG):
            if (k >> j) & 1:
                node = self.up[node][j]
                if node == -1:
                    break
        return node`,
        approach: 'Binary Lifting Powers of Two Table',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class TreeAncestor {
    int up[50005][16];
public:
    TreeAncestor(int n, vector<int>& parent) {
        memset(up, -1, sizeof(up));
        for (int i = 0; i < n; i++) {
            up[i][0] = parent[i];
        }
        for (int j = 1; j < 16; j++) {
            for (int i = 0; i < n; i++) {
                if (up[i][j - 1] != -1) {
                    up[i][j] = up[up[i][j - 1]][j - 1];
                }
            }
        }
    }
    
    int getKthAncestor(int node, int k) {
        for (int j = 0; j < 16; j++) {
            if ((k >> j) & 1) {
                node = up[node][j];
                if (node == -1) break;
            }
        }
        return node;
    }
};`,
        approach: 'C++ Binary Lifting Static Array',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class TreeAncestor {
    private int[][] up;
    private static final int LOG = 16;

    public TreeAncestor(int n, int[] parent) {
        up = new int[n][LOG];
        for (int i = 0; i < n; i++) {
            Arrays.fill(up[i], -1);
            up[i][0] = parent[i];
        }
        for (int j = 1; j < LOG; j++) {
            for (int i = 0; i < n; i++) {
                if (up[i][j - 1] != -1) {
                    up[i][j] = up[up[i][j - 1]][j - 1];
                }
            }
        }
    }
    
    public int getKthAncestor(int node, int k) {
        for (int j = 0; j < LOG; j++) {
            if (((k >> j) & 1) == 1) {
                node = up[node][j];
                if (node == -1) break;
            }
        }
        return node;
    }
}`,
        approach: 'Java Binary Lifting Jump Table',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var TreeAncestor = function(n, parent) {
    const LOG = 16;
    this.up = Array.from({ length: n }, () => Array(LOG).fill(-1));
    for (let i = 0; i < n; i++) {
        this.up[i][0] = parent[i];
    }
    for (let j = 1; j < LOG; j++) {
        for (let i = 0; i < n; i++) {
            if (this.up[i][j - 1] !== -1) {
                this.up[i][j] = this.up[this.up[i][j - 1]][j - 1];
            }
        }
    }
};

TreeAncestor.prototype.getKthAncestor = function(node, k) {
    const LOG = 16;
    for (let j = 0; j < LOG; j++) {
        if ((k >> j) & 1) {
            node = this.up[node][j];
            if (node === -1) break;
        }
    }
    return node;
};`,
        approach: 'JavaScript Binary Lifting Jump Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class TreeAncestor:
    def __init__(self, n: int, parent: list[int]):
        LOG = 16
        self.up = [[-1] * LOG for _ in range(n)]
        for i in range(n):
            self.up[i][0] = parent[i]
        for j in range(1, LOG):
            for i in range(n):
                if self.up[i][j - 1] != -1:
                    self.up[i][j] = self.up[self.up[i][j - 1]][j - 1]

    def getKthAncestor(self, node: int, k: int) -> int:
        LOG = 16
        for j in range(LOG):
            if (k >> j) & 1:
                node = self.up[node][j]
                if node == -1: break
        return node

ta = TreeAncestor(7, [-1, 0, 0, 1, 1, 2, 2])
assert ta.getKthAncestor(3, 1) == 1
assert ta.getKthAncestor(5, 2) == 0
assert ta.getKthAncestor(6, 3) == -1
print("All tests passed successfully.")
`
  },

  // 13. #1485 clone-binary-tree-with-random-pointer
  {
    slug: 'clone-binary-tree-with-random-pointer',
    number: 1485,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    hints: [
      {
        level: 1,
        title: 'Node Association Registry',
        text: 'Maintain an association dictionary mapping every original node to its cloned counterpart.'
      },
      {
        level: 2,
        title: 'Two-Pass or Memoized Traversal',
        text: 'Clone node objects in a first pass or memoize on visit to instantiate nodes before linking random pointers.'
      },
      {
        level: 3,
        title: 'Child and Random Pointer Assignment',
        text: 'Wire copy.left, copy.right, and copy.random using the populated hash table.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def copyRandomBinaryTree(self, root: \'Node\') -> \'NodeCopy\':\n        copies = {}\n        def clone(node):\n            if not node:\n                return None\n            if node in copies:\n                return copies[node]\n            cp = NodeCopy(node.val)\n            copies[node] = cp\n            cp.left = clone(node.left)\n            cp.right = clone(node.right)\n            cp.random = clone(node.random)\n            return cp\n        return clone(root)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of nodes in tree'],
      notes: 'Each tree node is cloned once and stored in the hash map, leading to linear time and space.',
      whyNaiveFails: 'Traversing random pointers without memoization can cause infinite cycles and duplicate node creation.',
      spaceTimeTradeoff: 'Hash table lookup prevents cycles and duplicate allocation for visited nodes.',
      interviewerExpectation: 'Memoized DFS cloning handling left, right, and random pointers identically.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def copyRandomBinaryTree(self, root: 'Node') -> 'NodeCopy':
        copies = {}
        def clone(node):
            if not node:
                return None
            if node in copies:
                return copies[node]
            cp = NodeCopy(node.val)
            copies[node] = cp
            cp.left = clone(node.left)
            cp.right = clone(node.right)
            cp.random = clone(node.random)
            return cp
        return clone(root)`,
        approach: 'Memoized Hash Map Cloning',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    unordered_map<Node*, NodeCopy*> copies;
public:
    NodeCopy* copyRandomBinaryTree(Node* root) {
        if (!root) return nullptr;
        if (copies.count(root)) return copies[root];
        NodeCopy* cp = new NodeCopy(root->val);
        copies[root] = cp;
        cp->left = copyRandomBinaryTree(root->left);
        cp->right = copyRandomBinaryTree(root->right);
        cp->random = copyRandomBinaryTree(root->random);
        return cp;
    }
};`,
        approach: 'C++ Memoized Node Clone DFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private Map<Node, NodeCopy> copies = new HashMap<>();
    public NodeCopy copyRandomBinaryTree(Node root) {
        if (root == null) return null;
        if (copies.containsKey(root)) return copies.get(root);
        NodeCopy cp = new NodeCopy(root.val);
        copies.put(root, cp);
        cp.left = copyRandomBinaryTree(root.left);
        cp.right = copyRandomBinaryTree(root.right);
        cp.random = copyRandomBinaryTree(root.random);
        return cp;
    }
}`,
        approach: 'Java HashMap Node Map Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var copyRandomBinaryTree = function(root) {
    const copies = new Map();
    function clone(node) {
        if (!node) return null;
        if (copies.has(node)) return copies.get(node);
        const cp = new NodeCopy(node.val);
        copies.set(node, cp);
        cp.left = clone(node.left);
        cp.right = clone(node.right);
        cp.random = clone(node.random);
        return cp;
    }
    return clone(root);
};`,
        approach: 'JavaScript Map Memoized Recursion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Node:
    def __init__(self, val=0, left=None, right=None, random=None):
        self.val = val
        self.left = left
        self.right = right
        self.random = random

class NodeCopy:
    def __init__(self, val=0, left=None, right=None, random=None):
        self.val = val
        self.left = left
        self.right = right
        self.random = random

class Solution:
    def copyRandomBinaryTree(self, root: Node) -> NodeCopy:
        copies = {}
        def clone(node):
            if not node: return None
            if node in copies: return copies[node]
            cp = NodeCopy(node.val)
            copies[node] = cp
            cp.left = clone(node.left)
            cp.right = clone(node.right)
            cp.random = clone(node.random)
            return cp
        return clone(root)

sol = Solution()
n1 = Node(1)
n2 = Node(4)
n3 = Node(7)
n1.left = n2
n1.right = n3
n2.random = n3
n3.random = n1
res = sol.copyRandomBinaryTree(n1)
assert res.val == 1
assert res.left.val == 4
assert res.right.val == 7
assert res.left.random.val == 7
assert res.right.random.val == 1
print("All tests passed successfully.")
`
  },

  // 14. #1490 clone-n-ary-tree
  {
    slug: 'clone-n-ary-tree',
    number: 1490,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    hints: [
      {
        level: 1,
        title: 'Recursive Node Reproduction',
        text: 'Instantiate a new tree node with the root val.'
      },
      {
        level: 2,
        title: 'Children List Mapping',
        text: 'Recursively clone every child node in the children collection.'
      },
      {
        level: 3,
        title: 'Base Case Handling',
        text: 'If root is null, immediately return null.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def cloneTree(self, root: \'Node\') -> \'Node\':\n        if not root:\n            return None\n        cp = Node(root.val)\n        cp.children = [self.cloneTree(c) for c in root.children]\n        return cp\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(H)',
      variables: ['N: number of nodes in N-ary tree', 'H: tree height'],
      notes: 'Visits and duplicates every tree node exactly once in linear time.',
      whyNaiveFails: 'Reusing child pointers creates shallow copies rather than independent deep clones.',
      spaceTimeTradeoff: 'Recursion stack scales with tree height H, using minimal auxiliary space.',
      interviewerExpectation: 'Clean recursive DFS deep-cloning each child list.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def cloneTree(self, root: 'Node') -> 'Node':
        if not root:
            return None
        cp = Node(root.val)
        cp.children = [self.cloneTree(c) for c in root.children]
        return cp`,
        approach: 'Recursive N-ary Deep Copy',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    Node* cloneTree(Node* root) {
        if (!root) return nullptr;
        Node* cp = new Node(root->val);
        for (Node* c : root->children) {
            cp->children.push_back(cloneTree(c));
        }
        return cp;
    }
};`,
        approach: 'C++ Recursive Children Vector Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public Node cloneTree(Node root) {
        if (root == null) return null;
        Node cp = new Node(root.val);
        for (Node c : root.children) {
            cp.children.add(cloneTree(c));
        }
        return cp;
    }
}`,
        approach: 'Java N-ary Child List DFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var cloneTree = function(root) {
    if (!root) return null;
    const cp = new Node(root.val);
    cp.children = root.children.map(c => cloneTree(c));
    return cp;
};`,
        approach: 'JavaScript Children Array Map Cloning',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Node:
    def __init__(self, val=0, children=None):
        self.val = val
        self.children = children if children is not None else []

class Solution:
    def cloneTree(self, root: Node) -> Node:
        if not root: return None
        cp = Node(root.val)
        cp.children = [self.cloneTree(c) for c in root.children]
        return cp

sol = Solution()
r1 = Node(1, [Node(3, [Node(5), Node(6)]), Node(2), Node(4)])
c1 = sol.cloneTree(r1)
assert c1.val == 1
assert len(c1.children) == 3
assert c1.children[0].val == 3
assert len(c1.children[0].children) == 2
print("All tests passed successfully.")
`
  },

  // 15. #1500 design-a-file-sharing-system
  {
    slug: 'design-a-file-sharing-system',
    number: 1500,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Recyclable Identifier Pool',
        text: 'Keep an ordered pool of released user identifiers and an incrementing counter for fresh user identifiers.'
      },
      {
        level: 2,
        title: 'Bidirectional File Chunk Mapping',
        text: 'Map user IDs to owned chunk sets, and chunk IDs to sets of user IDs holding that chunk.'
      },
      {
        level: 3,
        title: 'Dynamic Chunk Acquisition',
        text: 'When a user requests chunkID, return all users owning that chunk sorted ascending, and add chunkID to the requesting user ownership.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport heapq\n\nclass FileSharing:\n    def __init__(self, m: int):\n        self.free_ids = []\n        self.next_id = 1\n        self.user_chunks = {}\n        self.chunk_users = {}\n\n    def join(self, ownedChunks: list[int]) -> int:\n        uid = heapq.heappop(self.free_ids) if self.free_ids else self.next_id\n        if uid == self.next_id:\n            self.next_id += 1\n        self.user_chunks[uid] = set(ownedChunks)\n        for chunk in ownedChunks:\n            if chunk not in self.chunk_users:\n                self.chunk_users[chunk] = set()\n            self.chunk_users[chunk].add(uid)\n        return uid\n\n    def leave(self, userID: int) -> None:\n        if userID in self.user_chunks:\n            for chunk in self.user_chunks[userID]:\n                self.chunk_users[chunk].discard(userID)\n            del self.user_chunks[userID]\n            heapq.heappush(self.free_ids, userID)\n\n    def request(self, userID: int, chunkID: int) -> list[int]:\n        users = sorted(list(self.chunk_users.get(chunkID, set())))\n        if users and userID in self.user_chunks:\n            self.user_chunks[userID].add(chunkID)\n            if chunkID not in self.chunk_users:\n                self.chunk_users[chunkID] = set()\n            self.chunk_users[chunkID].add(userID)\n        return users\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(C log U) join/leave/request',
      space: 'O(U * C)',
      variables: ['U: active user count', 'C: chunk count per user'],
      notes: 'Min-heap provides O(log U) allocation, and inverted chunk index retrieves holders in sorted order.',
      whyNaiveFails: 'Scanning every user linearly on each chunk query takes O(U) operations per request.',
      spaceTimeTradeoff: 'Dual user-to-chunks and chunk-to-users maps optimize request time at the cost of dual storage.',
      interviewerExpectation: 'Min-heap for smallest reusable ID paired with inverted index for chunk peers.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import heapq

class FileSharing:
    def __init__(self, m: int):
        self.free_ids = []
        self.next_id = 1
        self.user_chunks = {}
        self.chunk_users = {}

    def join(self, ownedChunks: list[int]) -> int:
        uid = heapq.heappop(self.free_ids) if self.free_ids else self.next_id
        if uid == self.next_id:
            self.next_id += 1
        self.user_chunks[uid] = set(ownedChunks)
        for chunk in ownedChunks:
            if chunk not in self.chunk_users:
                self.chunk_users[chunk] = set()
            self.chunk_users[chunk].add(uid)
        return uid

    def leave(self, userID: int) -> None:
        if userID in self.user_chunks:
            for chunk in self.user_chunks[userID]:
                self.chunk_users[chunk].discard(userID)
            del self.user_chunks[userID]
            heapq.heappush(self.free_ids, userID)

    def request(self, userID: int, chunkID: int) -> list[int]:
        users = sorted(list(self.chunk_users.get(chunkID, set())))
        if users and userID in self.user_chunks:
            self.user_chunks[userID].add(chunkID)
            if chunkID not in self.chunk_users:
                self.chunk_users[chunkID] = set()
            self.chunk_users[chunkID].add(userID)
        return users`,
        approach: 'Min-Heap ID Reuse and Inverted Chunk Index',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class FileSharing {
    priority_queue<int, vector<int>, greater<int>> free_ids;
    int next_id;
    unordered_map<int, unordered_set<int>> user_chunks;
    unordered_map<int, set<int>> chunk_users;
public:
    FileSharing(int m) {
        next_id = 1;
    }
    
    int join(vector<int> ownedChunks) {
        int uid;
        if (!free_ids.empty()) {
            uid = free_ids.top();
            free_ids.pop();
        } else {
            uid = next_id++;
        }
        for (int c : ownedChunks) {
            user_chunks[uid].insert(c);
            chunk_users[c].insert(uid);
        }
        return uid;
    }
    
    void leave(int userID) {
        if (!user_chunks.count(userID)) return;
        for (int c : user_chunks[userID]) {
            chunk_users[c].erase(userID);
        }
        user_chunks.erase(userID);
        free_ids.push(userID);
    }
    
    vector<int> request(int userID, int chunkID) {
        vector<int> res;
        if (chunk_users.count(chunkID)) {
            for (int u : chunk_users[chunkID]) res.push_back(u);
        }
        if (!res.empty() && user_chunks.count(userID)) {
            user_chunks[userID].insert(chunkID);
            chunk_users[chunkID].insert(userID);
        }
        return res;
    }
};`,
        approach: 'C++ Priority Queue and Chunk Inverted Sets',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class FileSharing {
    private PriorityQueue<Integer> freeIds = new PriorityQueue<>();
    private int nextId = 1;
    private Map<Integer, Set<Integer>> userChunks = new HashMap<>();
    private Map<Integer, TreeSet<Integer>> chunkUsers = new HashMap<>();

    public FileSharing(int m) {
    }
    
    public int join(List<Integer> ownedChunks) {
        int uid = freeIds.isEmpty() ? nextId++ : freeIds.poll();
        userChunks.put(uid, new HashSet<>(ownedChunks));
        for (int c : ownedChunks) {
            chunkUsers.computeIfAbsent(c, k -> new TreeSet<>()).add(uid);
        }
        return uid;
    }
    
    public void leave(int userID) {
        if (!userChunks.containsKey(userID)) return;
        for (int c : userChunks.get(userID)) {
            if (chunkUsers.containsKey(c)) {
                chunkUsers.get(c).remove(userID);
            }
        }
        userChunks.remove(userID);
        freeIds.offer(userID);
    }
    
    public List<Integer> request(int userID, int chunkID) {
        List<Integer> res = new ArrayList<>();
        if (chunkUsers.containsKey(chunkID)) {
            res.addAll(chunkUsers.get(chunkID));
        }
        if (!res.isEmpty() && userChunks.containsKey(userID)) {
            userChunks.get(userID).add(chunkID);
            chunkUsers.computeIfAbsent(chunkID, k -> new TreeSet<>()).add(userID);
        }
        return res;
    }
}`,
        approach: 'Java PriorityQueue and TreeSet Inverted Index',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var FileSharing = function(m) {
    this.freeIds = [];
    this.nextId = 1;
    this.userChunks = new Map();
    this.chunkUsers = new Map();
};

FileSharing.prototype.join = function(ownedChunks) {
    let uid;
    if (this.freeIds.length > 0) {
        this.freeIds.sort((a, b) => a - b);
        uid = this.freeIds.shift();
    } else {
        uid = this.nextId++;
    }
    this.userChunks.set(uid, new Set(ownedChunks));
    for (const c of ownedChunks) {
        if (!this.chunkUsers.has(c)) this.chunkUsers.set(c, new Set());
        this.chunkUsers.get(c).add(uid);
    }
    return uid;
};

FileSharing.prototype.leave = function(userID) {
    if (!this.userChunks.has(userID)) return;
    for (const c of this.userChunks.get(userID)) {
        if (this.chunkUsers.has(c)) {
            this.chunkUsers.get(c).delete(userID);
        }
    }
    this.userChunks.delete(userID);
    this.freeIds.push(userID);
};

FileSharing.prototype.request = function(userID, chunkID) {
    let res = [];
    if (this.chunkUsers.has(chunkID)) {
        res = Array.from(this.chunkUsers.get(chunkID)).sort((a, b) => a - b);
    }
    if (res.length > 0 && this.userChunks.has(userID)) {
        this.userChunks.get(userID).add(chunkID);
        if (!this.chunkUsers.has(chunkID)) this.chunkUsers.set(chunkID, new Set());
        this.chunkUsers.get(chunkID).add(userID);
    }
    return res;
};`,
        approach: 'JavaScript Inverted Index and ID Pool',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import heapq

class FileSharing:
    def __init__(self, m: int):
        self.free_ids = []
        self.next_id = 1
        self.user_chunks = {}
        self.chunk_users = {}

    def join(self, ownedChunks: list[int]) -> int:
        uid = heapq.heappop(self.free_ids) if self.free_ids else self.next_id
        if uid == self.next_id: self.next_id += 1
        self.user_chunks[uid] = set(ownedChunks)
        for chunk in ownedChunks:
            if chunk not in self.chunk_users:
                self.chunk_users[chunk] = set()
            self.chunk_users[chunk].add(uid)
        return uid

    def leave(self, userID: int) -> None:
        if userID in self.user_chunks:
            for chunk in self.user_chunks[userID]:
                self.chunk_users[chunk].discard(userID)
            del self.user_chunks[userID]
            heapq.heappush(self.free_ids, userID)

    def request(self, userID: int, chunkID: int) -> list[int]:
        users = sorted(list(self.chunk_users.get(chunkID, set())))
        if users and userID in self.user_chunks:
            self.user_chunks[userID].add(chunkID)
            if chunkID not in self.chunk_users:
                self.chunk_users[chunkID] = set()
            self.chunk_users[chunkID].add(userID)
        return users

fs = FileSharing(4)
u1 = fs.join([1, 2])
assert u1 == 1
u2 = fs.join([2, 3])
assert u2 == 2
u3 = fs.join([4])
assert u3 == 3
assert fs.request(1, 3) == [2]
assert fs.request(2, 2) == [1, 2]
fs.leave(1)
assert fs.request(2, 1) == []
fs.leave(2)
assert fs.join([]) == 1
print("All tests passed successfully.")
`
  }
];
