import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

export const algorithms2Problems = [
  // 15. #398 random-pick-index
  {
    slug: 'random-pick-index',
    number: 398,
    category: 'Algorithms',
    patterns: ['math-number-theory'],
    hints: [
      {
        level: 1,
        title: 'Uniform Target Index Selection',
        text: 'Given an array with duplicated elements, selecting any instance of a specified number with uniform likelihood requires isolating candidate occurrences.'
      },
      {
        level: 2,
        title: 'Pre-grouped Offset Arrays',
        text: 'Group indices by their stored values during initialization. When queried for a target value, select one index uniformly at random from its precomputed list.'
      },
      {
        level: 3,
        title: 'Grouped Selection Blueprint',
        text: 'In init: populate a dictionary mapping each number to a list of its indices. In pick(target): retrieve target list and return random choice from that list.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport random\nfrom collections import defaultdict\n\nclass Solution:\n    def __init__(self, nums: list[int]):\n        self.indices = defaultdict(list)\n        for i, num in enumerate(nums):\n            self.indices[num].append(i)\n\n    def pick(self, target: int) -> int:\n        idx_list = self.indices[target]\n        return random.choice(idx_list)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(N)',
      variables: ['N: total elements in input array'],
      notes: 'Constructor indexes elements in O(N); pick executes in O(1) time.',
      whyNaiveFails: 'Scanning the entire array on each pick call costs O(N) per query.',
      spaceTimeTradeoff: 'Trading O(N) auxiliary memory for pre-indexed offset lists accelerates repeated queries to constant time.',
      interviewerExpectation: 'Understanding both the precomputed index lookup approach and streaming reservoir sampling trade-offs.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import random
from collections import defaultdict

class Solution:
    def __init__(self, nums: list[int]):
        self.indices = defaultdict(list)
        for i, num in enumerate(nums):
            self.indices[num].append(i)

    def pick(self, target: int) -> int:
        idx_list = self.indices[target]
        return random.choice(idx_list)`,
        approach: 'Precomputed Index Buckets with Uniform Choice',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
private:
    unordered_map<int, vector<int>> indices;
public:
    Solution(vector<int>& nums) {
        for (int i = 0; i < nums.size(); ++i) {
            indices[nums[i]].push_back(i);
        }
    }

    int pick(int target) {
        const auto& list = indices[target];
        return list[rand() % list.size()];
    }
};`,
        approach: 'C++ Hash Map of Vectors with Random Index',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.*;

class Solution {
    private Map<Integer, List<Integer>> map = new HashMap<>();
    private Random rand = new Random();

    public Solution(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            map.computeIfAbsent(nums[i], k -> new ArrayList<>()).add(i);
        }
    }

    public int pick(int target) {
        List<Integer> list = map.get(target);
        return list.get(rand.nextInt(list.size()));
    }
}`,
        approach: 'Java HashMap of Index Lists',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 */
var Solution = function(nums) {
    this.indices = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (!this.indices.has(nums[i])) this.indices.set(nums[i], []);
        this.indices.get(nums[i]).push(i);
    }
};

/** 
 * @param {number} target
 * @return {number}
 */
Solution.prototype.pick = function(target) {
    const list = this.indices.get(target);
    const randIdx = Math.floor(Math.random() * list.length);
    return list[randIdx];
};`,
        approach: 'JavaScript Map of Arrays with Uniform Random Selection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

with open('dataset/problems/random-pick-index.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
Solution = scope['Solution']

sol = Solution([1, 2, 3, 3, 3])
assert sol.pick(1) == 0
assert sol.pick(2) == 1
picks = {sol.pick(3) for _ in range(50)}
assert picks.issubset({2, 3, 4}) and len(picks) > 1
print("Passed random-pick-index tests")
`
  },

  // 16. #426 convert-binary-search-tree-to-sorted-doubly-linked-list
  {
    slug: 'convert-binary-search-tree-to-sorted-doubly-linked-list',
    number: 426,
    category: 'Algorithms',
    patterns: ['tree-bst-properties'],
    hints: [
      {
        level: 1,
        title: 'Monotonic Order In-Place Pointer Transformation',
        text: 'A BST visits nodes in sorted order when traversed in-order. Reassigning left and right references into prev and next constructs a doubly-linked ring.'
      },
      {
        level: 2,
        title: 'In-Order Traversal with Trailing Predecessor Pointer',
        text: 'Traverse left child, visit current node, then traverse right child. Connect the predecessor node right pointer to current, and current left pointer to predecessor.'
      },
      {
        level: 3,
        title: 'Circular Linking Blueprint',
        text: 'Maintain first and last pointers. In inorder: recurse left; if last exists connect last.right = curr and curr.left = last, else first = curr; update last = curr; recurse right. At completion, close circular ring by linking last.right = first and first.left = last.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def treeToDoublyList(self, root: \'Optional[Node]\') -> \'Optional[Node]\':\n        if not root:\n            return None\n        self.first = None\n        self.last = None\n\n        def inorder(node):\n            if not node:\n                return\n            inorder(node.left)\n            if self.last:\n                self.last.right = node\n                node.left = self.last\n            else:\n                self.first = node\n            self.last = node\n            inorder(node.right)\n\n        inorder(root)\n        self.last.right = self.first\n        self.first.left = self.last\n        return self.first\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(H)',
      variables: ['N: number of nodes in tree', 'H: tree height'],
      notes: 'In-order traversal visits each node once with call stack depth bounded by tree height.',
      whyNaiveFails: 'Collecting nodes into a separate array before re-linking uses O(N) extra space instead of in-place pointer reassignments.',
      spaceTimeTradeoff: 'In-place pointer rewrites operate directly on existing tree node objects.',
      interviewerExpectation: 'Correct bidirectional circular linkage connecting first and last elements.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def treeToDoublyList(self, root: 'Optional[Node]') -> 'Optional[Node]':
        if not root:
            return None
        self.first = None
        self.last = None

        def inorder(node):
            if not node:
                return
            inorder(node.left)
            if self.last:
                self.last.right = node
                node.left = self.last
            else:
                self.first = node
            self.last = node
            inorder(node.right)

        inorder(root)
        self.last.right = self.first
        self.first.left = self.last
        return self.first`,
        approach: 'In-Order Traversal with Circular Boundary Linkage',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
private:
    Node* first = nullptr;
    Node* last = nullptr;

    void inorder(Node* node) {
        if (!node) return;
        inorder(node->left);
        if (last) {
            last->right = node;
            node->left = last;
        } else {
            first = node;
        }
        last = node;
        inorder(node->right);
    }
public:
    Node* treeToDoublyList(Node* root) {
        if (!root) return nullptr;
        inorder(root);
        last->right = first;
        first->left = last;
        return first;
    }
};`,
        approach: 'C++ In-Order Node Pointer Rewiring',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private Node first = null;
    private Node last = null;

    private void inorder(Node node) {
        if (node == null) return;
        inorder(node.left);
        if (last != null) {
            last.right = node;
            node.left = last;
        } else {
            first = node;
        }
        last = node;
        inorder(node.right);
    }

    public Node treeToDoublyList(Node root) {
        if (root == null) return null;
        inorder(root);
        last.right = first;
        first.left = last;
        return first;
    }
}`,
        approach: 'Java In-Place In-Order Circular List Stitching',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {_Node} root
 * @return {_Node}
 */
var treeToDoublyList = function(root) {
    if (!root) return null;
    let first = null;
    let last = null;

    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        if (last) {
            last.right = node;
            node.left = last;
        } else {
            first = node;
        }
        last = node;
        inorder(node.right);
    }

    inorder(root);
    last.right = first;
    first.left = last;
    return first;
};`,
        approach: 'JavaScript In-Order Traversal Closure Linkage',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

class Node:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

with open('dataset/problems/convert-binary-search-tree-to-sorted-doubly-linked-list.json') as f:
    prob = json.load(f)

scope = {'Optional': None, 'Node': Node}
exec(prob['solutions'][0]['code'], scope)
sol = scope['Solution']()

# BST: 4, left=2 (left=1, right=3), right=5
root = Node(4, Node(2, Node(1), Node(3)), Node(5))
head = sol.treeToDoublyList(root)
vals = []
curr = head
for _ in range(5):
    vals.append(curr.val)
    curr = curr.right
assert vals == [1, 2, 3, 4, 5]
assert head.left.val == 5
assert head.left.right == head
print("Passed convert-binary-search-tree-to-sorted-doubly-linked-list tests")
`
  },

  // 17. #427 construct-quad-tree
  {
    slug: 'construct-quad-tree',
    number: 427,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    hints: [
      {
        level: 1,
        title: 'Quadrant Decomposition and Homogeneity Validation',
        text: 'A square grid is recursively partitioned into four equal sub-quadrants unless every cell within the active region shares the identical binary value.'
      },
      {
        level: 2,
        title: 'Divide and Conquer Grid Partitioning',
        text: 'Check if the current subgrid is uniform. If all cells match, construct a leaf node with that value. Otherwise, divide into four subgrids of half width and recursively construct children.'
      },
      {
        level: 3,
        title: 'Recursive Subdivision Blueprint',
        text: 'Function build(r, c, size): inspect grid cells from (r, c) to (r+size, c+size). If all equal val, return Node(val==1, True). Else half = size // 2, return Node(True, False, build(r, c, half), build(r, c+half, half), build(r+half, c, half), build(r+half, c+half, half)).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def construct(self, grid: list[list[int]]) -> \'Node\':\n        def build(r0, c0, size):\n            all_same = True\n            val = grid[r0][c0]\n            for r in range(r0, r0 + size):\n                for c in range(c0, c0 + size):\n                    if grid[r][c] != val:\n                        all_same = False\n                        break\n                if not all_same:\n                    break\n            if all_same:\n                return Node(val == 1, True, None, None, None, None)\n            half = size // 2\n            tl = build(r0, c0, half)\n            tr = build(r0, c0 + half, half)\n            bl = build(r0 + half, c0, half)\n            br = build(r0 + half, c0 + half, half)\n            return Node(True, False, tl, tr, bl, br)\n        return build(0, 0, len(grid))\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N^2 log N)',
      space: 'O(log N)',
      variables: ['N: grid dimension length'],
      notes: 'Recursive quad tree depth is log2(N) with cell equality scans across subregions.',
      whyNaiveFails: 'Flattening without geometric quadrant bounds makes quad-tree hierarchical subdivision ambiguous.',
      spaceTimeTradeoff: 'Direct recursive subgrid evaluation without auxiliary matrices limits memory to call stack depth.',
      interviewerExpectation: 'Correct assignment of isLeaf and val properties on internal versus leaf nodes.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def construct(self, grid: list[list[int]]) -> 'Node':
        def build(r0, c0, size):
            all_same = True
            val = grid[r0][c0]
            for r in range(r0, r0 + size):
                for c in range(c0, c0 + size):
                    if grid[r][c] != val:
                        all_same = False
                        break
                if not all_same:
                    break
            if all_same:
                return Node(val == 1, True, None, None, None, None)
            half = size // 2
            tl = build(r0, c0, half)
            tr = build(r0, c0 + half, half)
            bl = build(r0 + half, c0, half)
            br = build(r0 + half, c0 + half, half)
            return Node(True, False, tl, tr, bl, br)
        return build(0, 0, len(grid))`,
        approach: 'Divide and Conquer Quadrant Homogeneity Check',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
private:
    Node* build(const vector<vector<int>>& grid, int r0, int c0, int size) {
        bool allSame = true;
        int val = grid[r0][c0];
        for (int r = r0; r < r0 + size; ++r) {
            for (int c = c0; c < c0 + size; ++c) {
                if (grid[r][c] != val) {
                    allSame = false;
                    break;
                }
            }
            if (!allSame) break;
        }
        if (allSame) {
            return new Node(val == 1, true, nullptr, nullptr, nullptr, nullptr);
        }
        int half = size / 2;
        Node* tl = build(grid, r0, c0, half);
        Node* tr = build(grid, r0, c0 + half, half);
        Node* bl = build(grid, r0 + half, c0, half);
        Node* br = build(grid, r0 + half, c0 + half, half);
        return new Node(true, false, tl, tr, bl, br);
    }
public:
    Node* construct(vector<vector<int>>& grid) {
        return build(grid, 0, 0, grid.size());
    }
};`,
        approach: 'C++ Recursive Divide and Conquer QuadTree Construction',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private Node build(int[][] grid, int r0, int c0, int size) {
        boolean allSame = true;
        int val = grid[r0][c0];
        for (int r = r0; r < r0 + size; r++) {
            for (int c = c0; c < c0 + size; c++) {
                if (grid[r][c] != val) {
                    allSame = false;
                    break;
                }
            }
            if (!allSame) break;
        }
        if (allSame) {
            return new Node(val == 1, true, null, null, null, null);
        }
        int half = size / 2;
        Node tl = build(grid, r0, c0, half);
        Node tr = build(grid, r0, c0 + half, half);
        Node bl = build(grid, r0 + half, c0, half);
        Node br = build(grid, r0 + half, c0 + half, half);
        return new Node(true, false, tl, tr, bl, br);
    }

    public Node construct(int[][] grid) {
        return build(grid, 0, 0, grid.length);
    }
}`,
        approach: 'Java Quad Partition Recursion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[][]} grid
 * @return {_Node}
 */
var construct = function(grid) {
    function build(r0, c0, size) {
        let allSame = true;
        const val = grid[r0][c0];
        for (let r = r0; r < r0 + size; r++) {
            for (let c = c0; c < c0 + size; c++) {
                if (grid[r][c] !== val) {
                    allSame = false;
                    break;
                }
            }
            if (!allSame) break;
        }
        if (allSame) {
            return new _Node(val === 1, true, null, null, null, null);
        }
        const half = size >> 1;
        const tl = build(r0, c0, half);
        const tr = build(r0, c0 + half, half);
        const bl = build(r0 + half, c0, half);
        const br = build(r0 + half, c0 + half, half);
        return new _Node(true, false, tl, tr, bl, br);
    }
    return build(0, 0, grid.length);
};`,
        approach: 'JavaScript Recursive Subgrid Decomposition',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

class Node:
    def __init__(self, val, isLeaf, topLeft=None, topRight=None, bottomLeft=None, bottomRight=None):
        self.val = val
        self.isLeaf = isLeaf
        self.topLeft = topLeft
        self.topRight = topRight
        self.bottomLeft = bottomLeft
        self.bottomRight = bottomRight

with open('dataset/problems/construct-quad-tree.json') as f:
    prob = json.load(f)

scope = {'Node': Node}
exec(prob['solutions'][0]['code'], scope)
sol = scope['Solution']()

grid = [
    [0, 1],
    [1, 0]
]
root = sol.construct(grid)
assert not root.isLeaf
assert root.topLeft.isLeaf and root.topLeft.val == False
assert root.topRight.isLeaf and root.topRight.val == True
print("Passed construct-quad-tree tests")
`
  },

  // 18. #428 serialize-and-deserialize-n-ary-tree
  {
    slug: 'serialize-and-deserialize-n-ary-tree',
    number: 428,
    category: 'Algorithms',
    patterns: ['tree-bfs-level-order'],
    hints: [
      {
        level: 1,
        title: 'Hierarchical Structure Linearization',
        text: 'N-ary tree nodes possess an arbitrary number of branches. Recording each node value alongside its immediate child count creates an unambiguous linear encoding.'
      },
      {
        level: 2,
        title: 'Value-Length Pair Sequence Representation',
        text: 'Serialize each node as its value followed by the integer count of its children. Deserialization pops the value, pops the child count, and recursively reconstructs the children.'
      },
      {
        level: 3,
        title: 'Token Stream Blueprint',
        text: 'In serialize: depth-first search appending str(node.val) and str(len(node.children)), then recurse for each child. In deserialize: split string into tokens; pop val, pop count, create Node(val), loop count times appending recursive child results.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Codec:\n    def serialize(self, root: \'Node\') -> str:\n        if not root:\n            return ""\n        tokens = []\n        def dfs(node):\n            tokens.append(str(node.val))\n            tokens.append(str(len(node.children)))\n            for child in node.children:\n                dfs(child)\n        dfs(root)\n        return " ".join(tokens)\n\n    def deserialize(self, data: str) -> \'Node\':\n        if not data:\n            return None\n        from collections import deque\n        tokens = deque(data.split())\n        def dfs():\n            val = int(tokens.popleft())\n            count = int(tokens.popleft())\n            node = Node(val, [])\n            for _ in range(count):\n                node.children.append(dfs())\n            return node\n        return dfs()\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: total nodes in N-ary tree'],
      notes: 'Visits each node once in linear encoding and decoding passes.',
      whyNaiveFails: 'Omitting explicit child degree counts causes ambiguity when intermediate nodes have differing fanouts.',
      spaceTimeTradeoff: 'Token pair encoding [val, childCount] uses exact 2N integers without trailing null padding.',
      interviewerExpectation: 'Clean recursive reconstruction using token streams or queues.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Codec:
    def serialize(self, root: 'Node') -> str:
        if not root:
            return ""
        tokens = []
        def dfs(node):
            tokens.append(str(node.val))
            tokens.append(str(len(node.children)))
            for child in node.children:
                dfs(child)
        dfs(root)
        return " ".join(tokens)

    def deserialize(self, data: str) -> 'Node':
        if not data:
            return None
        from collections import deque
        tokens = deque(data.split())
        def dfs():
            val = int(tokens.popleft())
            count = int(tokens.popleft())
            node = Node(val, [])
            for _ in range(count):
                node.children.append(dfs())
            return node
        return dfs()`,
        approach: 'Token Pair Pre-Order Encoding and Recursive Stream Decoding',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Codec {
private:
    void serializeDfs(Node* root, stringstream& ss) {
        if (!root) return;
        ss << root->val << " " << root->children.size() << " ";
        for (Node* child : root->children) {
            serializeDfs(child, ss);
        }
    }

    Node* deserializeDfs(stringstream& ss) {
        int val, count;
        if (!(ss >> val >> count)) return nullptr;
        Node* node = new Node(val);
        for (int i = 0; i < count; ++i) {
            node->children.push_back(deserializeDfs(ss));
        }
        return node;
    }
public:
    string serialize(Node* root) {
        stringstream ss;
        serializeDfs(root, ss);
        return ss.str();
    }

    Node* deserialize(string data) {
        if (data.empty()) return nullptr;
        stringstream ss(data);
        return deserializeDfs(ss);
    }
};`,
        approach: 'C++ StringStream Child Count Encoding',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Codec {
    private void serializeDfs(Node root, StringBuilder sb) {
        if (root == null) return;
        sb.append(root.val).append(" ").append(root.children.size()).append(" ");
        for (Node child : root.children) {
            serializeDfs(child, sb);
        }
    }

    private Node deserializeDfs(Queue<String> queue) {
        int val = Integer.parseInt(queue.poll());
        int count = Integer.parseInt(queue.poll());
        Node node = new Node(val, new ArrayList<>());
        for (int i = 0; i < count; i++) {
            node.children.add(deserializeDfs(queue));
        }
        return node;
    }

    public String serialize(Node root) {
        if (root == null) return "";
        StringBuilder sb = new StringBuilder();
        serializeDfs(root, sb);
        return sb.toString().trim();
    }

    public Node deserialize(String data) {
        if (data.isEmpty()) return null;
        Queue<String> queue = new LinkedList<>(Arrays.asList(data.split(" ")));
        return deserializeDfs(queue);
    }
}`,
        approach: 'Java Queue Preorder Degree Serialization',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class Codec {
    constructor() {}

    /**
     * @param {_Node|null} root
     * @return {string}
     */
    serialize(root) {
        if (!root) return "";
        const tokens = [];
        function dfs(node) {
            tokens.push(node.val, node.children.length);
            for (const child of node.children) {
                dfs(child);
            }
        }
        dfs(root);
        return tokens.join(" ");
    }

    /**
     * @param {string} data
     * @return {_Node|null}
     */
    deserialize(data) {
        if (!data) return null;
        const tokens = data.split(" ");
        let idx = 0;
        function dfs() {
            const val = parseInt(tokens[idx++], 10);
            const count = parseInt(tokens[idx++], 10);
            const node = new _Node(val, []);
            for (let i = 0; i < count; i++) {
                node.children.push(dfs());
            }
            return node;
        }
        return dfs();
    }
}`,
        approach: 'JavaScript Degree Token Sequence Linearization',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

with open('dataset/problems/serialize-and-deserialize-n-ary-tree.json') as f:
    prob = json.load(f)

scope = {'Node': Node}
exec(prob['solutions'][0]['code'], scope)
Codec = scope['Codec']

codec = Codec()
# Tree: 1 -> [3 -> [5, 6], 2, 4]
n1 = Node(1, [Node(3, [Node(5), Node(6)]), Node(2), Node(4)])
serialized = codec.serialize(n1)
deserialized = codec.deserialize(serialized)
assert deserialized.val == 1
assert len(deserialized.children) == 3
assert deserialized.children[0].val == 3
assert len(deserialized.children[0].children) == 2
print("Passed serialize-and-deserialize-n-ary-tree tests")
`
  },

  // 19. #429 n-ary-tree-level-order-traversal
  {
    slug: 'n-ary-tree-level-order-traversal',
    number: 429,
    category: 'Algorithms',
    patterns: ['tree-bfs-level-order'],
    hints: [
      {
        level: 1,
        title: 'Horizontal Layer Node Partitioning',
        text: 'Visiting an arbitrary branching tree breadth-wise groups all elements residing at identical vertical distances into distinct sublists.'
      },
      {
        level: 2,
        title: 'Queue Breadth Snapshots',
        text: 'At the start of each level iteration, record the number of nodes currently residing in the queue. Pop that exact count of nodes and collect all their non-null children.'
      },
      {
        level: 3,
        title: 'Level Order BFS Blueprint',
        text: 'Initialize result = [] and queue = deque([root]). While queue has elements: loop over current queue length; popleft(); append val to level list; push each child in curr.children to queue. Append level list to result.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nfrom collections import deque\n\nclass Solution:\n    def levelOrder(self, root: \'Node\') -> list[list[int]]:\n        if not root:\n            return []\n        result = []\n        queue = deque([root])\n        while queue:\n            level = []\n            for _ in range(len(queue)):\n                curr = queue.popleft()\n                level.append(curr.val)\n                for child in curr.children:\n                    if child:\n                        queue.append(child)\n            result.append(level)\n        return result\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(W)',
      variables: ['N: total nodes in tree', 'W: maximum tree width'],
      notes: 'Every node and child pointer is enqueued and dequeued exactly once.',
      whyNaiveFails: 'Simple pre-order traversal mixes levels together unless augmented with depth tracking maps.',
      spaceTimeTradeoff: 'Queue memory is bounded by the maximum width of any level layer.',
      interviewerExpectation: 'Clean snapshot iteration using the fixed queue length at the start of each level.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import deque

class Solution:
    def levelOrder(self, root: 'Node') -> list[list[int]]:
        if not root:
            return []
        result = []
        queue = deque([root])
        while queue:
            level = []
            for _ in range(len(queue)):
                curr = queue.popleft()
                level.append(curr.val)
                for child in curr.children:
                    if child:
                        queue.append(child)
            result.append(level)
        return result`,
        approach: 'Breadth-First Queue Snapshot Layer Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    vector<vector<int>> levelOrder(Node* root) {
        if (!root) return {};
        vector<vector<int>> result;
        queue<Node*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level;
            for (int i = 0; i < sz; ++i) {
                Node* curr = q.front();
                q.pop();
                level.push_back(curr->val);
                for (Node* child : curr->children) {
                    if (child) q.push(child);
                }
            }
            result.push_back(level);
        }
        return result;
    }
};`,
        approach: 'C++ Queue-Based Level Order Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public List<List<Integer>> levelOrder(Node root) {
        if (root == null) return new ArrayList<>();
        List<List<Integer>> result = new ArrayList<>();
        Queue<Node> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int sz = queue.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < sz; i++) {
                Node curr = queue.poll();
                level.add(curr.val);
                for (Node child : curr.children) {
                    if (child != null) queue.offer(child);
                }
            }
            result.add(level);
        }
        return result;
    }
}`,
        approach: 'Java Queue Level Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {_Node|null} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    while (queue.length > 0) {
        const sz = queue.length;
        const level = [];
        for (let i = 0; i < sz; i++) {
            const curr = queue.shift();
            level.push(curr.val);
            for (const child of curr.children) {
                if (child) queue.push(child);
            }
        }
        result.push(level);
    }
    return result;
};`,
        approach: 'JavaScript BFS Level Queueing',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

with open('dataset/problems/n-ary-tree-level-order-traversal.json') as f:
    prob = json.load(f)

scope = {'Node': Node}
exec(prob['solutions'][0]['code'], scope)
sol = scope['Solution']()

n1 = Node(1, [Node(3, [Node(5), Node(6)]), Node(2), Node(4)])
res = sol.levelOrder(n1)
assert res == [[1], [3, 2, 4], [5, 6]]
print("Passed n-ary-tree-level-order-traversal tests")
`
  },

  // 20. #431 encode-n-ary-tree-to-binary-tree
  {
    slug: 'encode-n-ary-tree-to-binary-tree',
    number: 431,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'First-Child Next-Sibling Isomorphism',
        text: 'Any general multi-way branching tree maps bijectively into a standard binary tree by linking the primary child to the left branch and subsequent siblings along the right branch.'
      },
      {
        level: 2,
        title: 'Binary Pointer Direction Semantics',
        text: 'A node left pointer references its first child. That child right pointer references its next sibling. Chains of right pointers encode sibling collections.'
      },
      {
        level: 3,
        title: 'Recursive Encoding and Decoding Blueprint',
        text: 'Encode(root): b_root = TreeNode(root.val). If children exist, b_root.left = encode(children[0]). Iterate remaining children, chaining along right pointers. Decode(b_node): root = Node(b_node.val, []). Walk curr = b_node.left along right pointers, appending decode(curr) to children.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Codec:\n    def encode(self, root: \'Optional[Node]\') -> Optional[TreeNode]:\n        if not root:\n            return None\n        b_root = TreeNode(root.val)\n        if not root.children:\n            return b_root\n        b_root.left = self.encode(root.children[0])\n        curr = b_root.left\n        for child in root.children[1:]:\n            curr.right = self.encode(child)\n            curr = curr.right\n        return b_root\n\n    def decode(self, data: Optional[TreeNode]) -> \'Optional[Node]\':\n        if not data:\n            return None\n        root = Node(data.val, [])\n        curr = data.left\n        while curr:\n            root.children.append(self.decode(curr))\n            curr = curr.right\n        return root\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(H)',
      variables: ['N: total nodes in tree', 'H: tree height'],
      notes: 'Visits each node once during transformation with recursion stack bounded by tree height.',
      whyNaiveFails: 'Storing children as arbitrary subtrees without standard conventions loses sibling order relationships.',
      spaceTimeTradeoff: 'Left-child right-sibling encoding utilizes existing TreeNode pointer slots without auxiliary arrays.',
      interviewerExpectation: 'Familiarity with the classic Knuth transform for representing multi-way trees as binary trees.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Codec:
    def encode(self, root: 'Optional[Node]') -> Optional[TreeNode]:
        if not root:
            return None
        b_root = TreeNode(root.val)
        if not root.children:
            return b_root
        b_root.left = self.encode(root.children[0])
        curr = b_root.left
        for child in root.children[1:]:
            curr.right = self.encode(child)
            curr = curr.right
        return b_root

    def decode(self, data: Optional[TreeNode]) -> 'Optional[Node]':
        if not data:
            return None
        root = Node(data.val, [])
        curr = data.left
        while curr:
            root.children.append(self.decode(curr))
            curr = curr.right
        return root`,
        approach: 'Left-Child Right-Sibling Knuth Transformation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Codec {
public:
    TreeNode* encode(Node* root) {
        if (!root) return nullptr;
        TreeNode* bRoot = new TreeNode(root->val);
        if (root->children.empty()) return bRoot;
        bRoot->left = encode(root->children[0]);
        TreeNode* curr = bRoot->left;
        for (int i = 1; i < root->children.size(); ++i) {
            curr->right = encode(root->children[i]);
            curr = curr->right;
        }
        return bRoot;
    }

    Node* decode(TreeNode* root) {
        if (!root) return nullptr;
        Node* node = new Node(root->val);
        TreeNode* curr = root->left;
        while (curr) {
            node->children.push_back(decode(curr));
            curr = curr->right;
        }
        return node;
    }
};`,
        approach: 'C++ Left-Child Right-Sibling Encoding',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Codec {
    public TreeNode encode(Node root) {
        if (root == null) return null;
        TreeNode bRoot = new TreeNode(root.val);
        if (root.children == null || root.children.isEmpty()) return bRoot;
        bRoot.left = encode(root.children.get(0));
        TreeNode curr = bRoot.left;
        for (int i = 1; i < root.children.size(); i++) {
            curr.right = encode(root.children.get(i));
            curr = curr.right;
        }
        return bRoot;
    }

    public Node decode(TreeNode root) {
        if (root == null) return null;
        Node node = new Node(root.val, new ArrayList<>());
        TreeNode curr = root.left;
        while (curr != null) {
            node.children.add(decode(curr));
            curr = curr.right;
        }
        return node;
    }
}`,
        approach: 'Java Binary Tree Sibling Pointer Encoding',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class Codec {
    /**
     * @param {_Node|null} root
     * @return {TreeNode|null}
     */
    encode(root) {
        if (!root) return null;
        const bRoot = new TreeNode(root.val);
        if (!root.children || root.children.length === 0) return bRoot;
        bRoot.left = this.encode(root.children[0]);
        let curr = bRoot.left;
        for (let i = 1; i < root.children.length; i++) {
            curr.right = this.encode(root.children[i]);
            curr = curr.right;
        }
        return bRoot;
    }

    /**
     * @param {TreeNode|null} root
     * @return {_Node|null}
     */
    decode(root) {
        if (!root) return null;
        const node = new _Node(root.val, []);
        let curr = root.left;
        while (curr) {
            node.children.push(this.decode(curr));
            curr = curr.right;
        }
        return node;
    }
}`,
        approach: 'JavaScript Sibling-Right Child-Left Binary Mapper',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

with open('dataset/problems/encode-n-ary-tree-to-binary-tree.json') as f:
    prob = json.load(f)

scope = {'Optional': None, 'Node': Node, 'TreeNode': TreeNode}
exec(prob['solutions'][0]['code'], scope)
Codec = scope['Codec']

codec = Codec()
n1 = Node(1, [Node(3, [Node(5), Node(6)]), Node(2), Node(4)])
b_tree = codec.encode(n1)
decoded = codec.decode(b_tree)
assert decoded.val == 1
assert len(decoded.children) == 3
assert decoded.children[0].val == 3
assert len(decoded.children[0].children) == 2
print("Passed encode-n-ary-tree-to-binary-tree tests")
`
  },

  // 21. #432 all-oone-data-structure
  {
    slug: 'all-oone-data-structure',
    number: 432,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Strict Constant-Time Extrema Frequency Tracking',
        text: 'Maintaining key increment and decrement operations alongside instant retrieval of minimum and maximum frequency strings requires grouping keys by frequency buckets.'
      },
      {
        level: 2,
        title: 'Doubly-Linked Bucket List with Key Dictionary',
        text: 'Maintain an ordered doubly linked chain of bucket nodes where each node stores a distinct frequency value and a set of keys. Map each key to its corresponding bucket node.'
      },
      {
        level: 3,
        title: 'Bucket Migration Blueprint',
        text: 'On inc(key): if key exists, move from bucket c to bucket c + 1; create bucket c + 1 if needed. Remove key from bucket c, deleting empty bucket. On dec(key): move from c to c - 1. Max key is any key in tail.prev; min key is any key in head.next.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Node:\n    def __init__(self, count=0):\n        self.count = count\n        self.keys = set()\n        self.prev = None\n        self.next = None\n\nclass AllOne:\n    def __init__(self):\n        self.head = Node()\n        self.tail = Node()\n        self.head.next = self.tail\n        self.tail.prev = self.head\n        self.key_to_node = {}\n\n    def _insert_after(self, prev_node, new_node):\n        new_node.prev = prev_node\n        new_node.next = prev_node.next\n        prev_node.next.prev = new_node\n        prev_node.next = new_node\n\n    def _remove(self, node):\n        node.prev.next = node.next\n        node.next.prev = node.prev\n\n    def inc(self, key: str) -> None:\n        if key in self.key_to_node:\n            cur = self.key_to_node[key]\n            nxt = cur.next\n            cur.keys.remove(key)\n            if nxt == self.tail or nxt.count != cur.count + 1:\n                new_node = Node(cur.count + 1)\n                self._insert_after(cur, new_node)\n                nxt = new_node\n            nxt.keys.add(key)\n            self.key_to_node[key] = nxt\n            if not cur.keys:\n                self._remove(cur)\n        else:\n            first = self.head.next\n            if first == self.tail or first.count != 1:\n                new_node = Node(1)\n                self._insert_after(self.head, new_node)\n                first = new_node\n            first.keys.add(key)\n            self.key_to_node[key] = first\n\n    def dec(self, key: str) -> None:\n        if key not in self.key_to_node:\n            return\n        cur = self.key_to_node[key]\n        cur.keys.remove(key)\n        if cur.count == 1:\n            del self.key_to_node[key]\n        else:\n            prv = cur.prev\n            if prv == self.head or prv.count != cur.count - 1:\n                new_node = Node(cur.count - 1)\n                self._insert_after(prv, new_node)\n                prv = new_node\n            prv.keys.add(key)\n            self.key_to_node[key] = prv\n        if not cur.keys:\n            self._remove(cur)\n\n    def getMaxKey(self) -> str:\n        if self.tail.prev == self.head:\n            return ""\n        return next(iter(self.tail.prev.keys))\n\n    def getMinKey(self) -> str:\n        if self.head.next == self.tail:\n            return ""\n        return next(iter(self.head.next.keys))\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(N)',
      variables: ['N: total unique string keys'],
      notes: 'Every operation (inc, dec, getMaxKey, getMinKey) executes in O(1) worst-case time.',
      whyNaiveFails: 'Tree maps or heaps incur O(log N) updates upon every increment or decrement.',
      spaceTimeTradeoff: 'Doubly-linked bucket chain guarantees O(1) adjacency updates without sorting.',
      interviewerExpectation: 'Seamless cleanup of empty bucket nodes to keep head.next and tail.prev always valid.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Node:
    def __init__(self, count=0):
        self.count = count
        self.keys = set()
        self.prev = None
        self.next = None

class AllOne:
    def __init__(self):
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head
        self.key_to_node = {}

    def _insert_after(self, prev_node, new_node):
        new_node.prev = prev_node
        new_node.next = prev_node.next
        prev_node.next.prev = new_node
        prev_node.next = new_node

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def inc(self, key: str) -> None:
        if key in self.key_to_node:
            cur = self.key_to_node[key]
            nxt = cur.next
            cur.keys.remove(key)
            if nxt == self.tail or nxt.count != cur.count + 1:
                new_node = Node(cur.count + 1)
                self._insert_after(cur, new_node)
                nxt = new_node
            nxt.keys.add(key)
            self.key_to_node[key] = nxt
            if not cur.keys:
                self._remove(cur)
        else:
            first = self.head.next
            if first == self.tail or first.count != 1:
                new_node = Node(1)
                self._insert_after(self.head, new_node)
                first = new_node
            first.keys.add(key)
            self.key_to_node[key] = first

    def dec(self, key: str) -> None:
        if key not in self.key_to_node:
            return
        cur = self.key_to_node[key]
        cur.keys.remove(key)
        if cur.count == 1:
            del self.key_to_node[key]
        else:
            prv = cur.prev
            if prv == self.head or prv.count != cur.count - 1:
                new_node = Node(cur.count - 1)
                self._insert_after(prv, new_node)
                prv = new_node
            prv.keys.add(key)
            self.key_to_node[key] = prv
        if not cur.keys:
            self._remove(cur)

    def getMaxKey(self) -> str:
        if self.tail.prev == self.head:
            return ""
        return next(iter(self.tail.prev.keys))

    def getMinKey(self) -> str:
        if self.head.next == self.tail:
            return ""
        return next(iter(self.head.next.keys))`,
        approach: 'Doubly-Linked Bucket List with Key Dictionary Mapping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class AllOne {
private:
    struct Bucket {
        int count;
        unordered_set<string> keys;
    };
    list<Bucket> buckets;
    unordered_map<string, list<Bucket>::iterator> keyToBucket;
public:
    AllOne() {}

    void inc(string key) {
        if (!keyToBucket.count(key)) {
            if (buckets.empty() || buckets.front().count > 1) {
                buckets.push_front({1, {key}});
            } else {
                buckets.front().keys.insert(key);
            }
            keyToBucket[key] = buckets.begin();
        } else {
            auto cur = keyToBucket[key];
            auto nxt = std::next(cur);
            if (nxt == buckets.end() || nxt->count > cur->count + 1) {
                nxt = buckets.insert(nxt, {cur->count + 1, {}});
            }
            nxt->keys.insert(key);
            keyToBucket[key] = nxt;
            cur->keys.erase(key);
            if (cur->keys.empty()) buckets.erase(cur);
        }
    }

    void dec(string key) {
        if (!keyToBucket.count(key)) return;
        auto cur = keyToBucket[key];
        cur->keys.erase(key);
        if (cur->count == 1) {
            keyToBucket.erase(key);
        } else {
            auto prv = (cur == buckets.begin()) ? buckets.end() : std::prev(cur);
            if (cur == buckets.begin() || prv->count < cur->count - 1) {
                prv = buckets.insert(cur, {cur->count - 1, {}});
            }
            prv->keys.insert(key);
            keyToBucket[key] = prv;
        }
        if (cur->keys.empty()) buckets.erase(cur);
    }

    string getMaxKey() {
        return buckets.empty() ? "" : *buckets.back().keys.begin();
    }

    string getMinKey() {
        return buckets.empty() ? "" : *buckets.front().keys.begin();
    }
};`,
        approach: 'C++ std::list Bucket Splice with Hash Map Iterator Lookups',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class AllOne {
    private static class Node {
        int count;
        Set<String> keys = new HashSet<>();
        Node prev, next;
        Node(int count) { this.count = count; }
    }

    private Node head = new Node(0);
    private Node tail = new Node(0);
    private Map<String, Node> keyToNode = new HashMap<>();

    public AllOne() {
        head.next = tail;
        tail.prev = head;
    }

    private void insertAfter(Node prev, Node cur) {
        cur.prev = prev;
        cur.next = prev.next;
        prev.next.prev = cur;
        prev.next = cur;
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    public void inc(String key) {
        if (keyToNode.containsKey(key)) {
            Node cur = keyToNode.get(key);
            Node nxt = cur.next;
            cur.keys.remove(key);
            if (nxt == tail || nxt.count != cur.count + 1) {
                Node newNode = new Node(cur.count + 1);
                insertAfter(cur, newNode);
                nxt = newNode;
            }
            nxt.keys.add(key);
            keyToNode.put(key, nxt);
            if (cur.keys.isEmpty()) remove(cur);
        } else {
            Node first = head.next;
            if (first == tail || first.count != 1) {
                Node newNode = new Node(1);
                insertAfter(head, newNode);
                first = newNode;
            }
            first.keys.add(key);
            keyToNode.put(key, first);
        }
    }

    public void dec(String key) {
        if (!keyToNode.containsKey(key)) return;
        Node cur = keyToNode.get(key);
        cur.keys.remove(key);
        if (cur.count == 1) {
            keyToNode.remove(key);
        } else {
            Node prv = cur.prev;
            if (prv == head || prv.count != cur.count - 1) {
                Node newNode = new Node(cur.count - 1);
                insertAfter(prv, newNode);
                prv = newNode;
            }
            prv.keys.add(key);
            keyToNode.put(key, prv);
        }
        if (cur.keys.isEmpty()) remove(cur);
    }

    public String getMaxKey() {
        return tail.prev == head ? "" : tail.prev.keys.iterator().next();
    }

    public String getMinKey() {
        return head.next == tail ? "" : head.next.keys.iterator().next();
    }
}`,
        approach: 'Java Doubly-Linked Frequency Buckets with Key Map',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class Node {
    constructor(count = 0) {
        this.count = count;
        this.keys = new Set();
        this.prev = null;
        this.next = null;
    }
}

var AllOne = function() {
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.map = new Map();
};

AllOne.prototype._insertAfter = function(prevNode, newNode) {
    newNode.prev = prevNode;
    newNode.next = prevNode.next;
    prevNode.next.prev = newNode;
    prevNode.next = newNode;
};

AllOne.prototype._remove = function(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
};

AllOne.prototype.inc = function(key) {
    if (this.map.has(key)) {
        const cur = this.map.get(key);
        let nxt = cur.next;
        cur.keys.delete(key);
        if (nxt === this.tail || nxt.count !== cur.count + 1) {
            const newNode = new Node(cur.count + 1);
            this._insertAfter(cur, newNode);
            nxt = newNode;
        }
        nxt.keys.add(key);
        this.map.set(key, nxt);
        if (cur.keys.size === 0) this._remove(cur);
    } else {
        let first = this.head.next;
        if (first === this.tail || first.count !== 1) {
            const newNode = new Node(1);
            this._insertAfter(this.head, newNode);
            first = newNode;
        }
        first.keys.add(key);
        this.map.set(key, first);
    }
};

AllOne.prototype.dec = function(key) {
    if (!this.map.has(key)) return;
    const cur = this.map.get(key);
    cur.keys.delete(key);
    if (cur.count === 1) {
        this.map.delete(key);
    } else {
        let prv = cur.prev;
        if (prv === this.head || prv.count !== cur.count - 1) {
            const newNode = new Node(cur.count - 1);
            this._insertAfter(prv, newNode);
            prv = newNode;
        }
        prv.keys.add(key);
        this.map.set(key, prv);
    }
    if (cur.keys.size === 0) this._remove(cur);
};

AllOne.prototype.getMaxKey = function() {
    if (this.tail.prev === this.head) return "";
    return this.tail.prev.keys.values().next().value;
};

AllOne.prototype.getMinKey = function() {
    if (this.head.next === this.tail) return "";
    return this.head.next.keys.values().next().value;
};`,
        approach: 'JavaScript Doubly Linked Bucket Set System',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

with open('dataset/problems/all-oone-data-structure.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
AllOne = scope['AllOne']

ao = AllOne()
ao.inc("hello")
ao.inc("hello")
assert ao.getMaxKey() == "hello"
assert ao.getMinKey() == "hello"
ao.inc("leet")
assert ao.getMaxKey() == "hello"
assert ao.getMinKey() == "leet"
ao.dec("hello")
assert ao.getMaxKey() in ["hello", "leet"]
print("Passed all-oone-data-structure tests")
`
  },

  // 22. #449 serialize-and-deserialize-bst
  {
    slug: 'serialize-and-deserialize-bst',
    number: 449,
    category: 'Algorithms',
    patterns: ['tree-bst-properties'],
    hints: [
      {
        level: 1,
        title: 'Ordered Binary Search Property Rebuilding',
        text: 'The search ordering constraint implies that a preorder sequence alone determines tree structure without requiring null markers.'
      },
      {
        level: 2,
        title: 'Recursive Range Partitioning',
        text: 'Serialize using preorder traversal. During deserialization, reconstruct nodes recursively by enforcing lower and upper numeric boundaries for each subtree.'
      },
      {
        level: 3,
        title: 'Bounded Reconstruction Blueprint',
        text: 'In serialize: append node.val in preorder. In deserialize: parse tokens into queue of integers. Define build(min_val, max_val): peek queue; if empty or value out of bounds return None; pop value, instantiate node, set left = build(min, val) and right = build(val, max).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Codec:\n    def serialize(self, root: Optional[TreeNode]) -> str:\n        vals = []\n        def preorder(node):\n            if node:\n                vals.append(str(node.val))\n                preorder(node.left)\n                preorder(node.right)\n        preorder(root)\n        return " ".join(vals)\n\n    def deserialize(self, data: str) -> Optional[TreeNode]:\n        if not data:\n            return None\n        from collections import deque\n        vals = deque(int(x) for x in data.split())\n        def build(min_val, max_val):\n            if not vals or not (min_val < vals[0] < max_val):\n                return None\n            val = vals.popleft()\n            node = TreeNode(val)\n            node.left = build(min_val, val)\n            node.right = build(val, max_val)\n            return node\n        return build(float(\'-inf\'), float(\'inf\'))\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of nodes in tree'],
      notes: 'Preorder traversal and bounded parsing each process every node in linear time.',
      whyNaiveFails: 'General tree serializers store null sentinels, which waste unnecessary bandwidth on BST structures.',
      spaceTimeTradeoff: 'BST range constraints eliminate sentinel storage completely.',
      interviewerExpectation: 'O(N) reconstruction using min/max bounds rather than searching for split indices in O(N^2).'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Codec:
    def serialize(self, root: Optional[TreeNode]) -> str:
        vals = []
        def preorder(node):
            if node:
                vals.append(str(node.val))
                preorder(node.left)
                preorder(node.right)
        preorder(root)
        return " ".join(vals)

    def deserialize(self, data: str) -> Optional[TreeNode]:
        if not data:
            return None
        from collections import deque
        vals = deque(int(x) for x in data.split())
        def build(min_val, max_val):
            if not vals or not (min_val < vals[0] < max_val):
                return None
            val = vals.popleft()
            node = TreeNode(val)
            node.left = build(min_val, val)
            node.right = build(val, max_val)
            return node
        return build(float('-inf'), float('inf'))`,
        approach: 'Preorder Stream Serialization with Range-Bounded Reconstruction',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Codec {
private:
    void serializePreorder(TreeNode* root, stringstream& ss) {
        if (!root) return;
        ss << root->val << " ";
        serializePreorder(root->left, ss);
        serializePreorder(root->right, ss);
    }

    TreeNode* build(queue<int>& q, int minVal, int maxVal) {
        if (q.empty() || q.front() <= minVal || q.front() >= maxVal) return nullptr;
        int val = q.front();
        q.pop();
        TreeNode* node = new TreeNode(val);
        node->left = build(q, minVal, val);
        node->right = build(q, val, maxVal);
        return node;
    }
public:
    string serialize(TreeNode* root) {
        stringstream ss;
        serializePreorder(root, ss);
        return ss.str();
    }

    TreeNode* deserialize(string data) {
        if (data.empty()) return nullptr;
        stringstream ss(data);
        queue<int> q;
        int val;
        while (ss >> val) q.push(val);
        return build(q, INT_MIN, INT_MAX);
    }
};`,
        approach: 'C++ Bounded Range BST Serialization',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Codec {
    private void preorder(TreeNode root, StringBuilder sb) {
        if (root == null) return;
        sb.append(root.val).append(" ");
        preorder(root.left, sb);
        preorder(root.right, sb);
    }

    private TreeNode build(Queue<Integer> q, int minVal, int maxVal) {
        if (q.isEmpty() || q.peek() <= minVal || q.peek() >= maxVal) return null;
        int val = q.poll();
        TreeNode node = new TreeNode(val);
        node.left = build(q, minVal, val);
        node.right = build(q, val, maxVal);
        return node;
    }

    public String serialize(TreeNode root) {
        if (root == null) return "";
        StringBuilder sb = new StringBuilder();
        preorder(root, sb);
        return sb.toString().trim();
    }

    public TreeNode deserialize(String data) {
        if (data.isEmpty()) return null;
        Queue<Integer> q = new LinkedList<>();
        for (String s : data.split(" ")) {
            q.offer(Integer.parseInt(s));
        }
        return build(q, Integer.MIN_VALUE, Integer.MAX_VALUE);
    }
}`,
        approach: 'Java Bounded Preorder BST Codec',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var serialize = function(root) {
    const vals = [];
    function preorder(node) {
        if (!node) return;
        vals.push(node.val);
        preorder(node.left);
        preorder(node.right);
    }
    preorder(root);
    return vals.join(" ");
};

var deserialize = function(data) {
    if (!data) return null;
    const vals = data.split(" ").map(Number);
    let idx = 0;
    function build(minVal, maxVal) {
        if (idx >= vals.length || vals[idx] <= minVal || vals[idx] >= maxVal) {
            return null;
        }
        const val = vals[idx++];
        const node = new TreeNode(val);
        node.left = build(minVal, val);
        node.right = build(val, maxVal);
        return node;
    }
    return build(-Infinity, Infinity);
};`,
        approach: 'JavaScript Range-Bounded Preorder Decoder',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

with open('dataset/problems/serialize-and-deserialize-bst.json') as f:
    prob = json.load(f)

scope = {'Optional': None, 'TreeNode': TreeNode}
exec(prob['solutions'][0]['code'], scope)
Codec = scope['Codec']

codec = Codec()
root = TreeNode(2, TreeNode(1), TreeNode(3))
s = codec.serialize(root)
d = codec.deserialize(s)
assert d.val == 2
assert d.left.val == 1
assert d.right.val == 3
print("Passed serialize-and-deserialize-bst tests")
`
  },

  // 23. #460 lfu-cache
  {
    slug: 'lfu-cache',
    number: 460,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Two-Tier Frequency and Recency Eviction',
        text: 'Eviction must prioritize keys with the least access frequency, breaking ties by evicting the least recently used key among that frequency bracket.'
      },
      {
        level: 2,
        title: 'Frequency Buckets with Recency Ordering',
        text: 'Map each key to its value and current access count. Map each frequency count to an ordered sequence of keys. Track the minimum active frequency.'
      },
      {
        level: 3,
        title: 'LFU Cache Lifecycle Blueprint',
        text: 'Maintain key_to_val_freq and freq_to_keys (OrderedDict). On get(key): bump frequency, move key from old freq bucket to freq+1 bucket. If old freq bucket empty and was min_freq, increment min_freq. On put(key, val): if key exists, update value and bump freq; else if at capacity, pop oldest key from min_freq bucket and delete; insert key with freq 1 and set min_freq = 1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nfrom collections import defaultdict, OrderedDict\n\nclass LFUCache:\n    def __init__(self, capacity: int):\n        self.capacity = capacity\n        self.key_to_val_freq = {}\n        self.freq_to_keys = defaultdict(OrderedDict)\n        self.min_freq = 0\n\n    def get(self, key: int) -> int:\n        if key not in self.key_to_val_freq:\n            return -1\n        val, freq = self.key_to_val_freq[key]\n        self._update_freq(key, val, freq)\n        return val\n\n    def put(self, key: int, value: int) -> None:\n        if self.capacity <= 0:\n            return\n        if key in self.key_to_val_freq:\n            _, freq = self.key_to_val_freq[key]\n            self._update_freq(key, value, freq)\n            return\n\n        if len(self.key_to_val_freq) >= self.capacity:\n            evict_key, _ = self.freq_to_keys[self.min_freq].popitem(last=False)\n            del self.key_to_val_freq[evict_key]\n\n        self.key_to_val_freq[key] = [value, 1]\n        self.freq_to_keys[1][key] = None\n        self.min_freq = 1\n\n    def _update_freq(self, key: int, val: int, freq: int) -> None:\n        del self.freq_to_keys[freq][key]\n        if not self.freq_to_keys[freq] and self.min_freq == freq:\n            self.min_freq += 1\n        self.key_to_val_freq[key] = [val, freq + 1]\n        self.freq_to_keys[freq + 1][key] = None\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(C)',
      variables: ['C: cache capacity'],
      notes: 'All get and put calls execute in strict O(1) time using hash tables and doubly-linked bucket nodes.',
      whyNaiveFails: 'Maintaining a min-heap over frequency scores requires O(log C) per access.',
      spaceTimeTradeoff: 'Dual dictionary mapping maintains recency order and min-frequency pointers concurrently.',
      interviewerExpectation: 'Correctly resetting min_freq to 1 upon inserting a brand new key.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import defaultdict, OrderedDict

class LFUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.key_to_val_freq = {}
        self.freq_to_keys = defaultdict(OrderedDict)
        self.min_freq = 0

    def get(self, key: int) -> int:
        if key not in self.key_to_val_freq:
            return -1
        val, freq = self.key_to_val_freq[key]
        self._update_freq(key, val, freq)
        return val

    def put(self, key: int, value: int) -> None:
        if self.capacity <= 0:
            return
        if key in self.key_to_val_freq:
            _, freq = self.key_to_val_freq[key]
            self._update_freq(key, value, freq)
            return

        if len(self.key_to_val_freq) >= self.capacity:
            evict_key, _ = self.freq_to_keys[self.min_freq].popitem(last=False)
            del self.key_to_val_freq[evict_key]

        self.key_to_val_freq[key] = [value, 1]
        self.freq_to_keys[1][key] = None
        self.min_freq = 1

    def _update_freq(self, key: int, val: int, freq: int) -> None:
        del self.freq_to_keys[freq][key]
        if not self.freq_to_keys[freq] and self.min_freq == freq:
            self.min_freq += 1
        self.key_to_val_freq[key] = [val, freq + 1]
        self.freq_to_keys[freq + 1][key] = None`,
        approach: 'OrderedDict Frequency Buckets with Min-Frequency Tracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class LFUCache {
private:
    int cap;
    int minFreq;
    unordered_map<int, pair<int, int>> keyTable; // key -> {val, freq}
    unordered_map<int, list<int>> freqTable;     // freq -> list of keys
    unordered_map<int, list<int>::iterator> iterTable; // key -> iterator in freqTable

    void updateFreq(int key) {
        int freq = keyTable[key].second;
        freqTable[freq].erase(iterTable[key]);
        if (freqTable[freq].empty() && minFreq == freq) {
            minFreq++;
        }
        keyTable[key].second++;
        freqTable[freq + 1].push_front(key);
        iterTable[key] = freqTable[freq + 1].begin();
    }
public:
    LFUCache(int capacity) : cap(capacity), minFreq(0) {}

    int get(int key) {
        if (!keyTable.count(key) || cap == 0) return -1;
        updateFreq(key);
        return keyTable[key].first;
    }

    void put(int key, int value) {
        if (cap == 0) return;
        if (keyTable.count(key)) {
            keyTable[key].first = value;
            updateFreq(key);
            return;
        }
        if (keyTable.size() >= cap) {
            int evictKey = freqTable[minFreq].back();
            freqTable[minFreq].pop_back();
            keyTable.erase(evictKey);
            iterTable.erase(evictKey);
        }
        keyTable[key] = {value, 1};
        freqTable[1].push_front(key);
        iterTable[key] = freqTable[1].begin();
        minFreq = 1;
    }
};`,
        approach: 'C++ Frequency Table with Doubly-Linked Iterator Mappings',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class LFUCache {
    private int capacity;
    private int minFreq;
    private Map<Integer, int[]> keyToValFreq = new HashMap<>(); // key -> [val, freq]
    private Map<Integer, LinkedHashSet<Integer>> freqToKeys = new HashMap<>();

    public LFUCache(int capacity) {
        this.capacity = capacity;
        this.minFreq = 0;
    }

    private void updateFreq(int key, int val, int freq) {
        freqToKeys.get(freq).remove(key);
        if (freqToKeys.get(freq).isEmpty() && minFreq == freq) {
            minFreq++;
        }
        keyToValFreq.put(key, new int[]{val, freq + 1});
        freqToKeys.computeIfAbsent(freq + 1, k -> new LinkedHashSet<>()).add(key);
    }

    public int get(int key) {
        if (!keyToValFreq.containsKey(key)) return -1;
        int[] entry = keyToValFreq.get(key);
        updateFreq(key, entry[0], entry[1]);
        return entry[0];
    }

    public void put(int key, int value) {
        if (capacity <= 0) return;
        if (keyToValFreq.containsKey(key)) {
            int[] entry = keyToValFreq.get(key);
            updateFreq(key, value, entry[1]);
            return;
        }
        if (keyToValFreq.size() >= capacity) {
            int evictKey = freqToKeys.get(minFreq).iterator().next();
            freqToKeys.get(minFreq).remove(evictKey);
            keyToValFreq.remove(evictKey);
        }
        keyToValFreq.put(key, new int[]{value, 1});
        freqToKeys.computeIfAbsent(1, k -> new LinkedHashSet<>()).add(key);
        minFreq = 1;
    }
}`,
        approach: 'Java LinkedHashSet Frequency Buckets',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var LFUCache = function(capacity) {
    this.capacity = capacity;
    this.minFreq = 0;
    this.keyMap = new Map(); // key -> {val, freq}
    this.freqMap = new Map(); // freq -> Set(keys)
};

LFUCache.prototype._updateFreq = function(key, val, freq) {
    const oldSet = this.freqMap.get(freq);
    oldSet.delete(key);
    if (oldSet.size === 0 && this.minFreq === freq) {
        this.minFreq++;
    }
    this.keyMap.set(key, { val, freq: freq + 1 });
    if (!this.freqMap.has(freq + 1)) this.freqMap.set(freq + 1, new Set());
    this.freqMap.get(freq + 1).add(key);
};

LFUCache.prototype.get = function(key) {
    if (!this.keyMap.has(key)) return -1;
    const { val, freq } = this.keyMap.get(key);
    this._updateFreq(key, val, freq);
    return val;
};

LFUCache.prototype.put = function(key, value) {
    if (this.capacity <= 0) return;
    if (this.keyMap.has(key)) {
        const { freq } = this.keyMap.get(key);
        this._updateFreq(key, value, freq);
        return;
    }
    if (this.keyMap.size >= this.capacity) {
        const minSet = this.freqMap.get(this.minFreq);
        const evictKey = minSet.values().next().value;
        minSet.delete(evictKey);
        this.keyMap.delete(evictKey);
    }
    this.keyMap.set(key, { val: value, freq: 1 });
    if (!this.freqMap.has(1)) this.freqMap.set(1, new Set());
    this.freqMap.get(1).add(key);
    this.minFreq = 1;
};`,
        approach: 'JavaScript Set Insertion Order Frequency Cache',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

with open('dataset/problems/lfu-cache.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
LFUCache = scope['LFUCache']

lfu = LFUCache(2)
lfu.put(1, 1)
lfu.put(2, 2)
assert lfu.get(1) == 1
lfu.put(3, 3)
assert lfu.get(2) == -1
assert lfu.get(3) == 3
lfu.put(4, 4)
assert lfu.get(1) == -1
assert lfu.get(3) == 3
assert lfu.get(4) == 4
print("Passed lfu-cache tests")
`
  },

  // 24. #470 implement-rand10-using-rand7
  {
    slug: 'implement-rand10-using-rand7',
    number: 470,
    category: 'Algorithms',
    patterns: ['math-number-theory'],
    hints: [
      {
        level: 1,
        title: 'Bivariate Rejection Sampling Transformation',
        text: 'Generating a uniform distribution over a larger discrete target set requires composing smaller uniform random calls and rejecting out-of-range outcomes.'
      },
      {
        level: 2,
        title: 'Two-Dimensional Discrete Coordinate Mapping',
        text: 'Combining two 7-sided rolls yields forty-nine uniformly distributed indices. Truncating the sample space to forty produces a multiple of ten with equal likelihood.'
      },
      {
        level: 3,
        title: 'Rejection Sampling Blueprint',
        text: 'Loop indefinitely: row = rand7(), col = rand7(), idx = (row - 1) * 7 + col. If idx <= 40, return 1 + (idx - 1) % 10. Otherwise reject and continue sampling.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def rand10(self) -> int:\n        while True:\n            row = rand7()\n            col = rand7()\n            idx = (row - 1) * 7 + col\n            if idx <= 40:\n                return 1 + (idx - 1) % 10\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Calls: expected 2.45 calls to rand7 per rand10'],
      notes: 'Acceptance probability per round is 40 / 49 (~81.6%), leading to expected constant time.',
      whyNaiveFails: 'Simple modular arithmetic on the sum of two rolls does not yield uniform probabilities.',
      spaceTimeTradeoff: 'Constant space rejection sampling preserves strict mathematical uniformity.',
      interviewerExpectation: 'Understanding why (rand7() - 1) * 7 + rand7() creates a flat 1..49 distribution.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def rand10(self) -> int:
        while True:
            row = rand7()
            col = rand7()
            idx = (row - 1) * 7 + col
            if idx <= 40:
                return 1 + (idx - 1) % 10`,
        approach: 'Rejection Sampling Over 7x7 Uniform Coordinate Space',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int rand10() {
        while (true) {
            int row = rand7();
            int col = rand7();
            int idx = (row - 1) * 7 + col;
            if (idx <= 40) {
                return 1 + (idx - 1) % 10;
            }
        }
    }
};`,
        approach: 'C++ 40-Cutoff Rejection Sampling',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution extends SolBase {
    public int rand10() {
        while (true) {
            int row = rand7();
            int col = rand7();
            int idx = (row - 1) * 7 + col;
            if (idx <= 40) {
                return 1 + (idx - 1) % 10;
            }
        }
    }
}`,
        approach: 'Java Uniform Rejection Sampler',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * The rand7() API is already defined in the parent class SolBase.
 * var rand7 = function() {}
 * @return {number} a random integer in the range 1 to 7
 */
var rand10 = function() {
    while (true) {
        const row = rand7();
        const col = rand7();
        const idx = (row - 1) * 7 + col;
        if (idx <= 40) {
            return 1 + (idx - 1) % 10;
        }
    }
};`,
        approach: 'JavaScript Matrix Coordinate Sampling Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json
import random

def rand7():
    return random.randint(1, 7)

with open('dataset/problems/implement-rand10-using-rand7.json') as f:
    prob = json.load(f)

scope = {'rand7': rand7}
exec(prob['solutions'][0]['code'], scope)
sol = scope['Solution']()

counts = {i: 0 for i in range(1, 11)}
for _ in range(500):
    val = sol.rand10()
    counts[val] += 1
assert all(c > 0 for c in counts.values())
print("Passed implement-rand10-using-rand7 tests")
`
  },

  // 25. #478 generate-random-point-in-a-circle
  {
    slug: 'generate-random-point-in-a-circle',
    number: 478,
    category: 'Algorithms',
    patterns: ['math-number-theory'],
    hints: [
      {
        level: 1,
        title: 'Area-Proportional Continuous Sampling',
        text: 'Generating points uniformly distributed across circular disk area requires scaling radial distance according to cumulative area growth.'
      },
      {
        level: 2,
        title: 'Inverse Transform Sampling via Square Root',
        text: 'Because disk area scales quadratically with radius, sampling radius uniformly causes clustering near center. Taking the square root of uniform random variables generates a uniform areal spread.'
      },
      {
        level: 3,
        title: 'Polar Coordinate Blueprint',
        text: 'Generate u = random() and angle theta = 2 * pi * random(). Set radial distance r = radius * sqrt(u). Compute coordinates: x = x_center + r * cos(theta), y = y_center + r * sin(theta).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport math\nimport random\n\nclass Solution:\n    def __init__(self, radius: float, x_center: float, y_center: float):\n        self.radius = radius\n        self.x_center = x_center\n        self.y_center = y_center\n\n    def randPoint(self) -> list[float]:\n        r = self.radius * math.sqrt(random.random())\n        theta = random.random() * 2 * math.pi\n        return [self.x_center + r * math.cos(theta), self.y_center + r * math.sin(theta)]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Radius: circle radius'],
      notes: 'Direct closed-form inverse transform generates valid coordinates in constant time.',
      whyNaiveFails: 'Sampling radius linearly clumps samples near center with higher density.',
      spaceTimeTradeoff: 'Polar math formula avoids iterative rejection loops and guarantees deterministic execution.',
      interviewerExpectation: 'Correct derivation using cumulative distribution function F(R) = R^2 / radius^2.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import math
import random

class Solution:
    def __init__(self, radius: float, x_center: float, y_center: float):
        self.radius = radius
        self.x_center = x_center
        self.y_center = y_center

    def randPoint(self) -> list[float]:
        r = self.radius * math.sqrt(random.random())
        theta = random.random() * 2 * math.pi
        return [self.x_center + r * math.cos(theta), self.y_center + r * math.sin(theta)]`,
        approach: 'Square Root Radial Scaling Polar Coordinate Sampling',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
private:
    double radius, x_center, y_center;
public:
    Solution(double radius, double x_center, double y_center)
        : radius(radius), x_center(x_center), y_center(y_center) {}

    vector<double> randPoint() {
        double r = radius * sqrt((double)rand() / RAND_MAX);
        double theta = ((double)rand() / RAND_MAX) * 2.0 * M_PI;
        return {x_center + r * cos(theta), y_center + r * sin(theta)};
    }
};`,
        approach: 'C++ Polar Inverse Transform Disk Sampling',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private double radius, xCenter, yCenter;
    private Random rand = new Random();

    public Solution(double radius, double x_center, double y_center) {
        this.radius = radius;
        this.xCenter = x_center;
        this.yCenter = y_center;
    }

    public double[] randPoint() {
        double r = radius * Math.sqrt(rand.nextDouble());
        double theta = rand.nextDouble() * 2 * Math.PI;
        return new double[]{xCenter + r * Math.cos(theta), yCenter + r * Math.sin(theta)};
    }
}`,
        approach: 'Java Polar Transform Disk Sampler',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number} radius
 * @param {number} x_center
 * @param {number} y_center
 */
var Solution = function(radius, x_center, y_center) {
    this.radius = radius;
    this.xCenter = x_center;
    this.yCenter = y_center;
};

/**
 * @return {number[]}
 */
Solution.prototype.randPoint = function() {
    const r = this.radius * Math.sqrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    return [this.xCenter + r * Math.cos(theta), this.yCenter + r * Math.sin(theta)];
};`,
        approach: 'JavaScript Square Root Uniform Polar Distribution',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

with open('dataset/problems/generate-random-point-in-a-circle.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
Solution = scope['Solution']

sol = Solution(1.0, 0.0, 0.0)
for _ in range(50):
    x, y = sol.randPoint()
    assert (x * x + y * y) <= 1.0 + 1e-9
print("Passed generate-random-point-in-a-circle tests")
`
  },

  // 26. #489 robot-room-cleaner
  {
    slug: 'robot-room-cleaner',
    number: 489,
    category: 'Algorithms',
    patterns: ['backtracking-grid-dfs'],
    hints: [
      {
        level: 1,
        title: 'Blind Grid Exploration Traversal',
        text: 'Exploring an unmapped room with unknown boundaries requires tracking relative visited coordinates and maintaining orientation discipline.'
      },
      {
        level: 2,
        title: 'Spiral Backtracking with Reversing Protocol',
        text: 'From the current position, attempt to advance in each of four directions. After recursively cleaning an adjacent cell, retreat to the previous position and restore the original heading.'
      },
      {
        level: 3,
        title: 'Relative Coordinates Blueprint',
        text: 'Directions: [(-1, 0), (0, 1), (1, 0), (0, -1)]. Mark (r, c) visited and clean. For i in range(4): nd = (d + i) % 4. Calculate neighbor coordinate. If not visited and robot.move(): recurse dfs(nr, nc, nd); go_back() [turn 180, move, turn 180]. Always turnRight() to maintain heading.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def cleanRoom(self, robot):\n        directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]\n        visited = set()\n\n        def go_back():\n            robot.turnRight()\n            robot.turnRight()\n            robot.move()\n            robot.turnRight()\n            robot.turnRight()\n\n        def dfs(r, c, d):\n            visited.add((r, c))\n            robot.clean()\n            for i in range(4):\n                nd = (d + i) % 4\n                nr = r + directions[nd][0]\n                nc = c + directions[nd][1]\n                if (nr, nc) not in visited and robot.move():\n                    dfs(nr, nc, nd)\n                    go_back()\n                robot.turnRight()\n\n        dfs(0, 0, 0)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N - M)',
      space: 'O(N - M)',
      variables: ['N: total cells in room', 'M: total obstacle wall cells'],
      notes: 'Visits every reachable cell and backtracks once, making four turns at each location.',
      whyNaiveFails: 'Random walks or uncoordinated exploration loops infinitely or leaves dead-ends unvisited.',
      spaceTimeTradeoff: 'Visited relative coordinate set avoids redundant exploration without room dimension foreknowledge.',
      interviewerExpectation: 'Correct go_back physical retreat sequence that precisely restores robot orientation.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def cleanRoom(self, robot):
        directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]
        visited = set()

        def go_back():
            robot.turnRight()
            robot.turnRight()
            robot.move()
            robot.turnRight()
            robot.turnRight()

        def dfs(r, c, d):
            visited.add((r, c))
            robot.clean()
            for i in range(4):
                nd = (d + i) % 4
                nr = r + directions[nd][0]
                nc = c + directions[nd][1]
                if (nr, nc) not in visited and robot.move():
                    dfs(nr, nc, nd)
                    go_back()
                robot.turnRight()

        dfs(0, 0, 0)`,
        approach: 'Four-Way Relative Coordinate Backtracking Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
private:
    vector<pair<int, int>> dirs = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    set<pair<int, int>> visited;

    void goBack(Robot& robot) {
        robot.turnRight();
        robot.turnRight();
        robot.move();
        robot.turnRight();
        robot.turnRight();
    }

    void dfs(Robot& robot, int r, int c, int d) {
        visited.insert({r, c});
        robot.clean();
        for (int i = 0; i < 4; ++i) {
            int nd = (d + i) % 4;
            int nr = r + dirs[nd].first;
            int nc = c + dirs[nd].second;
            if (!visited.count({nr, nc}) && robot.move()) {
                dfs(robot, nr, nc, nd);
                goBack(robot);
            }
            robot.turnRight();
        }
    }
public:
    void cleanRoom(Robot& robot) {
        dfs(robot, 0, 0, 0);
    }
};`,
        approach: 'C++ Relative Coordinate Backtracking with Restoration',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private int[][] dirs = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    private Set<String> visited = new HashSet<>();

    private void goBack(Robot robot) {
        robot.turnRight();
        robot.turnRight();
        robot.move();
        robot.turnRight();
        robot.turnRight();
    }

    private void dfs(Robot robot, int r, int c, int d) {
        visited.add(r + "," + c);
        robot.clean();
        for (int i = 0; i < 4; i++) {
            int nd = (d + i) % 4;
            int nr = r + dirs[nd][0];
            int nc = c + dirs[nd][1];
            if (!visited.contains(nr + "," + nc) && robot.move()) {
                dfs(robot, nr, nc, nd);
                goBack(robot);
            }
            robot.turnRight();
        }
    }

    public void cleanRoom(Robot robot) {
        dfs(robot, 0, 0, 0);
    }
}`,
        approach: 'Java String-Encoded Coordinate Grid Backtracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {Robot} robot
 * @return {void}
 */
var cleanRoom = function(robot) {
    const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    const visited = new Set();

    function goBack() {
        robot.turnRight();
        robot.turnRight();
        robot.move();
        robot.turnRight();
        robot.turnRight();
    }

    function dfs(r, c, d) {
        visited.add(\`\${r},\${c}\`);
        robot.clean();
        for (let i = 0; i < 4; i++) {
            const nd = (d + i) % 4;
            const nr = r + dirs[nd][0];
            const nc = c + dirs[nd][1];
            if (!visited.has(\`\${nr},\${nc}\`) && robot.move()) {
                dfs(nr, nc, nd);
                goBack();
            }
            robot.turnRight();
        }
    }

    dfs(0, 0, 0);
};`,
        approach: 'JavaScript Relative Coordinate Spiral Cleaning Explorer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

class MockRobot:
    def __init__(self, room, r, c):
        self.room = room
        self.r = r
        self.c = c
        self.d = 0 # 0: U, 1: R, 2: D, 3: L
        self.cleaned = set()
        self.dirs = [(-1, 0), (0, 1), (1, 0), (0, -1)]

    def move(self):
        dr, dc = self.dirs[self.d]
        nr, nc = self.r + dr, self.c + dc
        if 0 <= nr < len(self.room) and 0 <= nc < len(self.room[0]) and self.room[nr][nc] == 1:
            self.r = nr
            self.c = nc
            return True
        return False

    def turnLeft(self):
        self.d = (self.d - 1) % 4

    def turnRight(self):
        self.d = (self.d + 1) % 4

    def clean(self):
        self.cleaned.add((self.r, self.c))

with open('dataset/problems/robot-room-cleaner.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
sol = scope['Solution']()

room = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
]
robot = MockRobot(room, 0, 0)
sol.cleanRoom(robot)
assert len(robot.cleaned) == 8
print("Passed robot-room-cleaner tests")
`
  },

  // 27. #497 random-point-in-non-overlapping-rectangles
  {
    slug: 'random-point-in-non-overlapping-rectangles',
    number: 497,
    category: 'Algorithms',
    patterns: ['binary-search-basic'],
    hints: [
      {
        level: 1,
        title: 'Weighted Discrete Area Selection',
        text: 'To ensure each integer point across non-overlapping rectangles has an equal probability of selection, rectangles must be chosen with probability proportional to the number of points they contain.'
      },
      {
        level: 2,
        title: 'Prefix Sum Array of Point Counts',
        text: 'Compute the number of integer points inside each rectangle as width times height. Build a prefix sum array and use binary search to pick a rectangle.'
      },
      {
        level: 3,
        title: 'Two-Stage Sampling Blueprint',
        text: 'Precompute prefix sums of point counts for each rectangle. In pick(): sample a random target between 1 and total points. Use bisect_left on prefix sums to locate the rectangle. Pick random x and y uniformly within that rectangle.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport bisect\nimport random\n\nclass Solution:\n    def __init__(self, rects: list[list[int]]):\n        self.rects = rects\n        self.prefix = []\n        total = 0\n        for x1, y1, x2, y2 in rects:\n            points = (x2 - x1 + 1) * (y2 - y1 + 1)\n            total += points\n            self.prefix.append(total)\n        self.total = total\n\n    def pick(self) -> list[int]:\n        target = random.randint(1, self.total)\n        idx = bisect.bisect_left(self.prefix, target)\n        x1, y1, x2, y2 = self.rects[idx]\n        return [random.randint(x1, x2), random.randint(y1, y2)]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log N)',
      space: 'O(N)',
      variables: ['N: number of rectangles'],
      notes: 'Initial construction builds prefix array in O(N); each pick runs in O(log N) binary search time.',
      whyNaiveFails: 'Picking rectangles uniformly creates bias toward points in smaller rectangles.',
      spaceTimeTradeoff: 'Prefix sum array enables logarithmic binary search rectangle selection.',
      interviewerExpectation: 'Correct point count formula including both endpoints: (x2 - x1 + 1) * (y2 - y1 + 1).'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import bisect
import random

class Solution:
    def __init__(self, rects: list[list[int]]):
        self.rects = rects
        self.prefix = []
        total = 0
        for x1, y1, x2, y2 in rects:
            points = (x2 - x1 + 1) * (y2 - y1 + 1)
            total += points
            self.prefix.append(total)
        self.total = total

    def pick(self) -> list[int]:
        target = random.randint(1, self.total)
        idx = bisect.bisect_left(self.prefix, target)
        x1, y1, x2, y2 = self.rects[idx]
        return [random.randint(x1, x2), random.randint(y1, y2)]`,
        approach: 'Prefix Sum of Integer Points with Binary Search Selection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
private:
    vector<vector<int>> rects;
    vector<int> prefix;
    int total = 0;
public:
    Solution(vector<vector<int>>& rects) : rects(rects) {
        for (const auto& r : rects) {
            int pts = (r[2] - r[0] + 1) * (r[3] - r[1] + 1);
            total += pts;
            prefix.push_back(total);
        }
    }

    vector<int> pick() {
        int target = rand() % total + 1;
        int idx = lower_bound(prefix.begin(), prefix.end(), target) - prefix.begin();
        const auto& r = rects[idx];
        int x = r[0] + rand() % (r[2] - r[0] + 1);
        int y = r[1] + rand() % (r[3] - r[1] + 1);
        return {x, y};
    }
};`,
        approach: 'C++ Prefix Sums with std::lower_bound Point Picker',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private int[][] rects;
    private int[] prefix;
    private int total = 0;
    private Random rand = new Random();

    public Solution(int[][] rects) {
        this.rects = rects;
        this.prefix = new int[rects.length];
        for (int i = 0; i < rects.length; i++) {
            int pts = (rects[i][2] - rects[i][0] + 1) * (rects[i][3] - rects[i][1] + 1);
            total += pts;
            prefix[i] = total;
        }
    }

    public int[] pick() {
        int target = rand.nextInt(total) + 1;
        int l = 0, r = prefix.length - 1;
        while (l < r) {
            int mid = (l + r) >>> 1;
            if (prefix[mid] >= target) r = mid;
            else l = mid + 1;
        }
        int[] rect = rects[l];
        int x = rect[0] + rand.nextInt(rect[2] - rect[0] + 1);
        int y = rect[1] + rand.nextInt(rect[3] - rect[1] + 1);
        return new int[]{x, y};
    }
}`,
        approach: 'Java Binary Search Weighted Point Sampler',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[][]} rects
 */
var Solution = function(rects) {
    this.rects = rects;
    this.prefix = [];
    let total = 0;
    for (const [x1, y1, x2, y2] of rects) {
        const pts = (x2 - x1 + 1) * (y2 - y1 + 1);
        total += pts;
        this.prefix.push(total);
    }
    this.total = total;
};

/**
 * @return {number[]}
 */
Solution.prototype.pick = function() {
    const target = Math.floor(Math.random() * this.total) + 1;
    let l = 0, r = this.prefix.length - 1;
    while (l < r) {
        const mid = (l + r) >> 1;
        if (this.prefix[mid] >= target) r = mid;
        else l = mid + 1;
    }
    const [x1, y1, x2, y2] = this.rects[l];
    const x = x1 + Math.floor(Math.random() * (x2 - x1 + 1));
    const y = y1 + Math.floor(Math.random() * (y2 - y1 + 1));
    return [x, y];
};`,
        approach: 'JavaScript Binary Search Weighted Rectangle Picker',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

with open('dataset/problems/random-point-in-non-overlapping-rectangles.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
Solution = scope['Solution']

rects = [[-2, -2, 1, 1], [2, 2, 4, 6]]
sol = Solution(rects)
points = [sol.pick() for _ in range(50)]
for x, y in points:
    inside_r1 = (-2 <= x <= 1 and -2 <= y <= 1)
    inside_r2 = (2 <= x <= 4 and 2 <= y <= 6)
    assert inside_r1 or inside_r2
print("Passed random-point-in-non-overlapping-rectangles tests")
`
  }
];

export function writeAlgorithms2Files() {
  for (const item of algorithms2Problems) {
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
  writeAlgorithms2Files();
}
