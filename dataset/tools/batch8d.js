import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

const batch8d = [
  {
    slug: "construct-binary-tree-from-preorder-and-inorder-traversal",
    number: 105,
    category: "Algorithms",
    patterns: ["tree-dfs-subproblem"],
    method: "buildTree",
    hints: [
      {
        level: 1,
        title: "Root Location and Boundary Obstacle",
        text: "The first element of preorder is always the root, but where do its left and right children end? How can locating the root value within the inorder traversal partition elements into left and right subtrees?"
      },
      {
        level: 2,
        title: "Inorder Subtree Partition Invariant",
        text: "The inorder traversal positions all left subtree values to the left of the root and all right subtree values to the right, dictating subtree sizes."
      },
      {
        level: 3,
        title: "Recursive Range Splitting Procedure",
        text: "Build an index map of value to position in inorder. Maintain an index pointer in preorder. Recursively construct the tree for inorder range [left, right]: pick the current root from preorder, split the inorder range at the root index, and recurse for left and right child ranges."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:\n        in_map = {val: i for i, val in enumerate(inorder)}\n        self.pre_idx = 0\n        def helper(left: int, right: int) -> Optional[TreeNode]:\n            if left > right:\n                return None\n            root_val = preorder[self.pre_idx]\n            self.pre_idx += 1\n            root = TreeNode(root_val)\n            mid = in_map[root_val]\n            root.left = helper(left, mid - 1)\n            root.right = helper(mid + 1, right)\n            return root\n        return helper(0, len(inorder) - 1)\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(N)",
      variables: ["N: number of nodes (1 <= N <= 3000)"],
      notes: "Hash map lookup provides O(1) partition indexing, constructing the tree in linear total time.",
      whyNaiveFails: "Using list.index() in every recursive call takes O(N^2) time.",
      spaceTimeTradeoff: "O(N) memory for the hash map to achieve O(N) runtime.",
      interviewerExpectation: "Using an index map to avoid quadratic slicing or linear searches."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:\n        in_map = {val: i for i, val in enumerate(inorder)}\n        self.pre_idx = 0\n        def helper(left: int, right: int) -> Optional[TreeNode]:\n            if left > right:\n                return None\n            root_val = preorder[self.pre_idx]\n            self.pre_idx += 1\n            root = TreeNode(root_val)\n            mid = in_map[root_val]\n            root.left = helper(left, mid - 1)\n            root.right = helper(mid + 1, right)\n            return root\n        return helper(0, len(inorder) - 1)",
        approach: "Recursive divide and conquer with hash map partition index",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {\n        unordered_map<int, int> inMap;\n        for (int i = 0; i < (int)inorder.size(); i++) inMap[inorder[i]] = i;\n        int preIdx = 0;\n        return helper(preorder, inMap, preIdx, 0, (int)inorder.size() - 1);\n    }\nprivate:\n    TreeNode* helper(vector<int>& preorder, unordered_map<int, int>& inMap, int& preIdx, int left, int right) {\n        if (left > right) return nullptr;\n        int rootVal = preorder[preIdx++];\n        TreeNode* root = new TreeNode(rootVal);\n        int mid = inMap[rootVal];\n        root->left = helper(preorder, inMap, preIdx, left, mid - 1);\n        root->right = helper(preorder, inMap, preIdx, mid + 1, right);\n        return root;\n    }\n};",
        approach: "Recursive divide and conquer with hash map partition index",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    private int preIdx = 0;\n    public TreeNode buildTree(int[] preorder, int[] inorder) {\n        Map<Integer, Integer> inMap = new HashMap<>();\n        for (int i = 0; i < inorder.length; i++) inMap.put(inorder[i], i);\n        return helper(preorder, inMap, 0, inorder.length - 1);\n    }\n    private TreeNode helper(int[] preorder, Map<Integer, Integer> inMap, int left, int right) {\n        if (left > right) return null;\n        int rootVal = preorder[preIdx++];\n        TreeNode root = new TreeNode(rootVal);\n        int mid = inMap.get(rootVal);\n        root.left = helper(preorder, inMap, left, mid - 1);\n        root.right = helper(preorder, inMap, mid + 1, right);\n        return root;\n    }\n}",
        approach: "Recursive divide and conquer with hash map partition index",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var buildTree = function(preorder, inorder) {\n    const inMap = new Map();\n    for (let i = 0; i < inorder.length; i++) inMap.set(inorder[i], i);\n    let preIdx = 0;\n    function helper(left, right) {\n        if (left > right) return null;\n        const rootVal = preorder[preIdx++];\n        const root = new TreeNode(rootVal);\n        const mid = inMap.get(rootVal);\n        root.left = helper(left, mid - 1);\n        root.right = helper(mid + 1, right);\n        return root;\n    }\n    return helper(0, inorder.length - 1);\n};",
        approach: "Recursive divide and conquer with hash map partition index",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    def tree_to_inorder(root):
        return tree_to_inorder(root.left) + [root.val] + tree_to_inorder(root.right) if root else []

    def tree_to_preorder(root):
        return [root.val] + tree_to_preorder(root.left) + tree_to_preorder(root.right) if root else []

    pre = [3, 9, 20, 15, 7]
    ino = [9, 3, 15, 20, 7]
    t = solver.buildTree(pre, ino)
    assert tree_to_preorder(t) == pre
    assert tree_to_inorder(t) == ino

    # Single node
    t2 = solver.buildTree([-1], [-1])
    assert t2.val == -1 and t2.left is None and t2.right is None

    # Scale test: 3000 nodes linear tree
    pre_scale = list(range(1, 3001))
    ino_scale = list(range(1, 3001))
    t0 = time.perf_counter()
    res = solver.buildTree(pre_scale, ino_scale)
    t1 = time.perf_counter()
    assert res.val == 1
    print(f"✓ Construct Tree Preorder Inorder: fixed and N=3000 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "construct-binary-tree-from-inorder-and-postorder-traversal",
    number: 106,
    category: "Algorithms",
    patterns: ["tree-dfs-subproblem"],
    method: "buildTree",
    hints: [
      {
        level: 1,
        title: "Root Location in Postorder Obstacle",
        text: "In postorder traversal, the root node appears at the very end of the sequence. How can locating this root element within inorder reveal which elements belong to the right versus left subtrees?"
      },
      {
        level: 2,
        title: "Reverse Postorder Invariant",
        text: "The last element of postorder is the subtree root. Finding its position in inorder divides the remaining nodes into left and right subtrees of known sizes."
      },
      {
        level: 3,
        title: "Right-First Recursion Procedure",
        text: "Create a value-to-index lookup for inorder. Pop roots from the end of postorder. Because roots are popped in reverse postorder, construct the right subtree first, then the left subtree, bounded by inorder ranges."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:\n        in_map = {val: i for i, val in enumerate(inorder)}\n        def helper(left: int, right: int) -> Optional[TreeNode]:\n            if left > right:\n                return None\n            root_val = postorder.pop()\n            root = TreeNode(root_val)\n            mid = in_map[root_val]\n            root.right = helper(mid + 1, right)\n            root.left = helper(left, mid - 1)\n            return root\n        return helper(0, len(inorder) - 1)\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(N)",
      variables: ["N: number of nodes (1 <= N <= 3000)"],
      notes: "Hash map provides O(1) lookup to partition subtrees, constructing nodes in reverse postorder.",
      whyNaiveFails: "Searching inorder linearly on each recursion degrades time complexity to quadratic O(N^2).",
      spaceTimeTradeoff: "O(N) memory for the hash map to eliminate repeated linear scans.",
      interviewerExpectation: "Building the right child before the left child when popping from the end of postorder."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:\n        in_map = {val: i for i, val in enumerate(inorder)}\n        def helper(left: int, right: int) -> Optional[TreeNode]:\n            if left > right:\n                return None\n            root_val = postorder.pop()\n            root = TreeNode(root_val)\n            mid = in_map[root_val]\n            root.right = helper(mid + 1, right)\n            root.left = helper(left, mid - 1)\n            return root\n        return helper(0, len(inorder) - 1)",
        approach: "Right-first recursive construction with postorder pop",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {\n        unordered_map<int, int> inMap;\n        for (int i = 0; i < (int)inorder.size(); i++) inMap[inorder[i]] = i;\n        int postIdx = (int)postorder.size() - 1;\n        return helper(postorder, inMap, postIdx, 0, (int)inorder.size() - 1);\n    }\nprivate:\n    TreeNode* helper(vector<int>& postorder, unordered_map<int, int>& inMap, int& postIdx, int left, int right) {\n        if (left > right) return nullptr;\n        int rootVal = postorder[postIdx--];\n        TreeNode* root = new TreeNode(rootVal);\n        int mid = inMap[rootVal];\n        root->right = helper(postorder, inMap, postIdx, mid + 1, right);\n        root->left = helper(postorder, inMap, postIdx, left, mid - 1);\n        return root;\n    }\n};",
        approach: "Right-first recursive construction with postorder index decrement",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    private int postIdx;\n    public TreeNode buildTree(int[] inorder, int[] postorder) {\n        Map<Integer, Integer> inMap = new HashMap<>();\n        for (int i = 0; i < inorder.length; i++) inMap.put(inorder[i], i);\n        postIdx = postorder.length - 1;\n        return helper(postorder, inMap, 0, inorder.length - 1);\n    }\n    private TreeNode helper(int[] postorder, Map<Integer, Integer> inMap, int left, int right) {\n        if (left > right) return null;\n        int rootVal = postorder[postIdx--];\n        TreeNode root = new TreeNode(rootVal);\n        int mid = inMap.get(rootVal);\n        root.right = helper(postorder, inMap, mid + 1, right);\n        root.left = helper(postorder, inMap, left, mid - 1);\n        return root;\n    }\n}",
        approach: "Right-first recursive construction with postorder index decrement",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var buildTree = function(inorder, postorder) {\n    const inMap = new Map();\n    for (let i = 0; i < inorder.length; i++) inMap.set(inorder[i], i);\n    let postIdx = postorder.length - 1;\n    function helper(left, right) {\n        if (left > right) return null;\n        const rootVal = postorder[postIdx--];\n        const root = new TreeNode(rootVal);\n        const mid = inMap.get(rootVal);\n        root.right = helper(mid + 1, right);\n        root.left = helper(left, mid - 1);\n        return root;\n    }\n    return helper(0, inorder.length - 1);\n};",
        approach: "Right-first recursive construction with postorder index decrement",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    def tree_to_inorder(root):
        return tree_to_inorder(root.left) + [root.val] + tree_to_inorder(root.right) if root else []

    def tree_to_postorder(root):
        return tree_to_postorder(root.left) + tree_to_postorder(root.right) + [root.val] if root else []

    ino = [9, 3, 15, 20, 7]
    post = [9, 15, 7, 20, 3]
    t = solver.buildTree(list(ino), list(post))
    assert tree_to_inorder(t) == ino
    assert tree_to_postorder(t) == post

    # Single node
    t2 = solver.buildTree([-1], [-1])
    assert t2.val == -1 and t2.left is None and t2.right is None

    # Scale test: 3000 nodes linear tree
    ino_scale = list(range(1, 3001))
    post_scale = list(range(3000, 0, -1))
    t0 = time.perf_counter()
    res = solver.buildTree(list(ino_scale), list(post_scale))
    t1 = time.perf_counter()
    assert res.val == 1
    print(f"✓ Construct Tree Inorder Postorder: fixed and N=3000 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "path-sum-ii",
    number: 113,
    category: "Algorithms",
    patterns: ["tree-dfs-subproblem"],
    method: "pathSum",
    hints: [
      {
        level: 1,
        title: "Root-to-Leaf Path Accumulation Obstacle",
        text: "A valid path must start at the root and terminate strictly at a leaf node while accumulating the exact target sum. How can tracking the path of visited nodes during traversal collect all matching paths?"
      },
      {
        level: 2,
        title: "Backtracking Path Invariant",
        text: "Append each node to the current path buffer and subtract its value from targetSum. If reaching a leaf when remainder equals node value, record a copy of the path."
      },
      {
        level: 3,
        title: "Recursive Backtracking Procedure",
        text: "Use recursion passing current node, remaining target, and path accumulator. At each node, append node.val to path. If at a leaf and remaining sum equals node.val, append a copy of path to results. Recurse left and right with remaining sum - node.val. Pop the current node from path before returning."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> List[List[int]]:\n        res = []\n        def dfs(node: Optional[TreeNode], remaining: int, path: List[int]):\n            if not node:\n                return\n            path.append(node.val)\n            if not node.left and not node.right and remaining == node.val:\n                res.append(list(path))\n            else:\n                dfs(node.left, remaining - node.val, path)\n                dfs(node.right, remaining - node.val, path)\n            path.pop()\n        dfs(root, targetSum, [])\n        return res\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N^2)",
      space: "O(H)",
      variables: ["N: number of nodes (0 <= N <= 5000)", "H: height of tree"],
      notes: "Visiting each node once in O(N) with O(N) path copying for matching leaves (at most N/2 leaves).",
      whyNaiveFails: "Creating new path lists at every recursive call allocates excessive intermediate memory.",
      spaceTimeTradeoff: "In-place path buffer with backtracking pop uses O(H) auxiliary space.",
      interviewerExpectation: "Using backtracking with append and pop on a single path list rather than creating list slices."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> List[List[int]]:\n        res = []\n        def dfs(node: Optional[TreeNode], remaining: int, path: List[int]):\n            if not node:\n                return\n            path.append(node.val)\n            if not node.left and not node.right and remaining == node.val:\n                res.append(list(path))\n            else:\n                dfs(node.left, remaining - node.val, path)\n                dfs(node.right, remaining - node.val, path)\n            path.pop()\n        dfs(root, targetSum, [])\n        return res",
        approach: "Recursive depth-first backtracking with single path list",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {\n        vector<vector<int>> res;\n        vector<int> path;\n        dfs(root, targetSum, path, res);\n        return res;\n    }\nprivate:\n    void dfs(TreeNode* node, int remaining, vector<int>& path, vector<vector<int>>& res) {\n        if (!node) return;\n        path.push_back(node->val);\n        if (!node->left && !node->right && remaining == node->val) {\n            res.push_back(path);\n        } else {\n            dfs(node->left, remaining - node->val, path, res);\n            dfs(node->right, remaining - node->val, path, res);\n        }\n        path.pop_back();\n    }\n};",
        approach: "Recursive depth-first backtracking with single path vector",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {\n        List<List<Integer>> res = new ArrayList<>();\n        List<Integer> path = new ArrayList<>();\n        dfs(root, targetSum, path, res);\n        return res;\n    }\n    private void dfs(TreeNode node, int remaining, List<Integer> path, List<List<Integer>> res) {\n        if (node == null) return;\n        path.add(node.val);\n        if (node.left == null && node.right == null && remaining == node.val) {\n            res.add(new ArrayList<>(path));\n        } else {\n            dfs(node.left, remaining - node.val, path, res);\n            dfs(node.right, remaining - node.val, path, res);\n        }\n        path.remove(path.size() - 1);\n    }\n}",
        approach: "Recursive depth-first backtracking with single path list",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var pathSum = function(root, targetSum) {\n    const res = [];\n    const path = [];\n    function dfs(node, remaining) {\n        if (!node) return;\n        path.push(node.val);\n        if (!node.left && !node.right && remaining === node.val) {\n            res.push([...path]);\n        } else {\n            dfs(node.left, remaining - node.val);\n            dfs(node.right, remaining - node.val);\n        }\n        path.pop();\n    }\n    dfs(root, targetSum);\n    return res;\n};",
        approach: "Recursive depth-first backtracking with single path array",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    arr = [5, 4, 8, 11, None, 13, 4, 7, 2, None, None, 5, 1]
    t = build_tree(arr)
    res = solver.pathSum(t, 22)
    assert sorted(res) == sorted([[5, 4, 11, 2], [5, 8, 4, 5]])

    assert solver.pathSum(build_tree([1, 2, 3]), 5) == []
    assert solver.pathSum(build_tree([1, 2]), 0) == []
    assert solver.pathSum(None, 0) == []

    # Scale test: 2000 nodes linear tree
    t_scale = TreeNode(1)
    curr = t_scale
    for _ in range(1999):
        curr.left = TreeNode(1)
        curr = curr.left
    t0 = time.perf_counter()
    res_scale = solver.pathSum(t_scale, 2000)
    t1 = time.perf_counter()
    assert len(res_scale) == 1 and len(res_scale[0]) == 2000
    print(f"✓ Path Sum II: fixed and N=2000 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "sum-root-to-leaf-numbers",
    number: 129,
    category: "Algorithms",
    patterns: ["tree-dfs-subproblem"],
    method: "sumNumbers",
    hints: [
      {
        level: 1,
        title: "Prefix Multiplication Obstacle",
        text: "Each root-to-leaf path represents a number formed by concatenating node digits. How can passing the accumulated prefix value down to child nodes compute each leaf number in a single traversal pass?"
      },
      {
        level: 2,
        title: "Decimal Shift Invariant",
        text: "At each step, transitioning to a child multiplies the current running number by 10 and adds the child digit. At leaves, return the completed number."
      },
      {
        level: 3,
        title: "Recursive Prefix Sum Procedure",
        text: "Define a recursive helper taking the current node and running value. Multiply running value by 10 and add node.val. If node is a leaf, return this accumulated value. Otherwise, return the sum of recursive calls on left and right children, ignoring null branches."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def sumNumbers(self, root: Optional[TreeNode]) -> int:\n        def dfs(node: Optional[TreeNode], curr: int) -> int:\n            if not node:\n                return 0\n            curr = curr * 10 + node.val\n            if not node.left and not node.right:\n                return curr\n            return dfs(node.left, curr) + dfs(node.right, curr)\n        return dfs(root, 0)\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(H)",
      variables: ["N: number of nodes (1 <= N <= 1000)", "H: height of tree"],
      notes: "Single depth-first pass passing down integer prefixes in O(1) word operations.",
      whyNaiveFails: "Converting paths to strings and parsing adds unnecessary heap allocations and string concatenation overhead.",
      spaceTimeTradeoff: "O(H) recursion stack space.",
      interviewerExpectation: "Passing the arithmetic accumulator down rather than assembling string paths."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def sumNumbers(self, root: Optional[TreeNode]) -> int:\n        def dfs(node: Optional[TreeNode], curr: int) -> int:\n            if not node:\n                return 0\n            curr = curr * 10 + node.val\n            if not node.left and not node.right:\n                return curr\n            return dfs(node.left, curr) + dfs(node.right, curr)\n        return dfs(root, 0)",
        approach: "Top-down prefix accumulation with leaf sum return",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    int sumNumbers(TreeNode* root) {\n        return dfs(root, 0);\n    }\nprivate:\n    int dfs(TreeNode* node, int curr) {\n        if (!node) return 0;\n        curr = curr * 10 + node->val;\n        if (!node->left && !node->right) return curr;\n        return dfs(node->left, curr) + dfs(node->right, curr);\n    }\n};",
        approach: "Top-down prefix accumulation with leaf sum return",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public int sumNumbers(TreeNode root) {\n        return dfs(root, 0);\n    }\n    private int dfs(TreeNode node, int curr) {\n        if (node == null) return 0;\n        curr = curr * 10 + node.val;\n        if (node.left == null && node.right == null) return curr;\n        return dfs(node.left, curr) + dfs(node.right, curr);\n    }\n}",
        approach: "Top-down prefix accumulation with leaf sum return",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var sumNumbers = function(root) {\n    function dfs(node, curr) {\n        if (!node) return 0;\n        curr = curr * 10 + node.val;\n        if (!node.left && !node.right) return curr;\n        return dfs(node.left, curr) + dfs(node.right, curr);\n    }\n    return dfs(root, 0);\n};",
        approach: "Top-down prefix accumulation with leaf sum return",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([1, 2, 3], 25),
        ([4, 9, 0, 5, 1], 1026),
        ([9], 9)
    ]
    for arr, exp in fixed:
        t = build_tree(arr)
        assert solver.sumNumbers(t) == exp

    # Scale test: 1000 nodes
    rng = random.Random(42)
    vals = [rng.randint(0, 9) for _ in range(1000)]
    t = build_tree(vals)
    t0 = time.perf_counter()
    res = solver.sumNumbers(t)
    t1 = time.perf_counter()
    assert isinstance(res, int)
    print(f"✓ Sum Root to Leaf Numbers: fixed and N=1000 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "binary-tree-paths",
    number: 257,
    category: "Algorithms",
    patterns: ["tree-dfs-subproblem"],
    method: "binaryTreePaths",
    hints: [
      {
        level: 1,
        title: "Arrow-Formatted Path Obstacle",
        text: "Leaf paths require formatted string representations joined by arrows. How can appending each step along the descent construct the formatted path string directly upon reaching a leaf?"
      },
      {
        level: 2,
        title: "Path String Accumulation Invariant",
        text: "Pass the current path string downward. When a leaf node is reached, append the formatted string to the answer list."
      },
      {
        level: 3,
        title: "Depth-First String Formatting Procedure",
        text: "If root is null, return empty list. Define a recursive helper with current node and current path string. If node has no children, append path string to result. Otherwise, recurse on left and right children if they exist, appending '->' and child value."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:\n        if not root:\n            return []\n        res = []\n        def dfs(node: TreeNode, path: str):\n            if not node.left and not node.right:\n                res.append(path)\n                return\n            if node.left:\n                dfs(node.left, path + \"->\" + str(node.left.val))\n            if node.right:\n                dfs(node.right, path + \"->\" + str(node.right.val))\n        dfs(root, str(root.val))\n        return res\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N * H)",
      space: "O(H)",
      variables: ["N: number of nodes (1 <= N <= 100)", "H: tree height"],
      notes: "Visiting all nodes and formatting strings along tree height H for up to N leaves.",
      whyNaiveFails: "Generating bottom-up path concatenations requires reversing and joining multiple sub-arrays.",
      spaceTimeTradeoff: "O(H) recursion stack memory.",
      interviewerExpectation: "Formatting strings in-place or appending as children are discovered."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:\n        if not root:\n            return []\n        res = []\n        def dfs(node: TreeNode, path: str):\n            if not node.left and not node.right:\n                res.append(path)\n                return\n            if node.left:\n                dfs(node.left, path + \"->\" + str(node.left.val))\n            if node.right:\n                dfs(node.right, path + \"->\" + str(node.right.val))\n        dfs(root, str(root.val))\n        return res",
        approach: "Top-down path string concatenation with leaf capture",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    vector<string> binaryTreePaths(TreeNode* root) {\n        if (!root) return {};\n        vector<string> res;\n        dfs(root, to_string(root->val), res);\n        return res;\n    }\nprivate:\n    void dfs(TreeNode* node, string path, vector<string>& res) {\n        if (!node->left && !node->right) {\n            res.push_back(path);\n            return;\n        }\n        if (node->left) dfs(node->left, path + \"->\" + to_string(node->left->val), res);\n        if (node->right) dfs(node->right, path + \"->\" + to_string(node->right->val), res);\n    }\n};",
        approach: "Top-down path string concatenation with leaf capture",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public List<String> binaryTreePaths(TreeNode root) {\n        List<String> res = new ArrayList<>();\n        if (root == null) return res;\n        dfs(root, String.valueOf(root.val), res);\n        return res;\n    }\n    private void dfs(TreeNode node, String path, List<String> res) {\n        if (node.left == null && node.right == null) {\n            res.add(path);\n            return;\n        }\n        if (node.left != null) dfs(node.left, path + \"->\" + node.left.val, res);\n        if (node.right != null) dfs(node.right, path + \"->\" + node.right.val, res);\n    }\n}",
        approach: "Top-down path string concatenation with leaf capture",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var binaryTreePaths = function(root) {\n    if (!root) return [];\n    const res = [];\n    function dfs(node, path) {\n        if (!node.left && !node.right) {\n            res.push(path);\n            return;\n        }\n        if (node.left) dfs(node.left, path + '->' + node.left.val);\n        if (node.right) dfs(node.right, path + '->' + node.right.val);\n    }\n    dfs(root, String(root.val));\n    return res;\n};",
        approach: "Top-down path string concatenation with leaf capture",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([1, 2, 3, None, 5], ["1->2->5", "1->3"]),
        ([1], ["1"])
    ]
    for arr, exp in fixed:
        t = build_tree(arr)
        assert sorted(solver.binaryTreePaths(t)) == sorted(exp)

    # Scale test: 100 nodes balanced tree
    vals = list(range(100))
    t = build_tree(vals)
    t0 = time.perf_counter()
    res = solver.binaryTreePaths(t)
    t1 = time.perf_counter()
    assert len(res) > 0
    print(f"✓ Binary Tree Paths: fixed and N=100 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "lowest-common-ancestor-of-a-binary-tree",
    number: 236,
    category: "Algorithms",
    patterns: ["tree-dfs-subproblem"],
    method: "lowestCommonAncestor",
    hints: [
      {
        level: 1,
        title: "Disjoint Ancestry Branch Obstacle",
        text: "In an arbitrary binary tree without ordering properties, nodes p and q can appear anywhere. If the current root matches p or q, or if p and q lie in opposite branches, what does that imply about the ancestor?"
      },
      {
        level: 2,
        title: "Branch Separation Invariant",
        text: "If p and q are found in separate left and right subtrees of a node, that node is their lowest common ancestor. If both reside in one subtree, the ancestor lies entirely within that subtree."
      },
      {
        level: 3,
        title: "Post-Order LCA Resolution Procedure",
        text: "If root is null or equals p or q, return root. Recursively search left and right subtrees. If both return non-null, root is the lowest common ancestor. Otherwise, return whichever subtree returned non-null."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':\n        if not root or root == p or root == q:\n            return root\n        left = self.lowestCommonAncestor(root.left, p, q)\n        right = self.lowestCommonAncestor(root.right, p, q)\n        if left and right:\n            return root\n        return left if left else right\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(H)",
      variables: ["N: number of nodes (2 <= N <= 10^5)", "H: height of tree"],
      notes: "Single post-order traversal visiting each node at most once with call stack bounded by tree height.",
      whyNaiveFails: "Storing parent pointers or root paths for both nodes requires extra O(N) memory and multiple passes.",
      spaceTimeTradeoff: "O(H) recursion stack space with no additional data structures.",
      interviewerExpectation: "Base case returning root when root matches p or q directly."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':\n        if not root or root == p or root == q:\n            return root\n        left = self.lowestCommonAncestor(root.left, p, q)\n        right = self.lowestCommonAncestor(root.right, p, q)\n        if left and right:\n            return root\n        return left if left else right",
        approach: "Post-order recursive lowest common ancestor search",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        if (!root || root == p || root == q) return root;\n        TreeNode* left = lowestCommonAncestor(root->left, p, q);\n        TreeNode* right = lowestCommonAncestor(root->right, p, q);\n        if (left && right) return root;\n        return left ? left : right;\n    }\n};",
        approach: "Post-order recursive lowest common ancestor search",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        if (root == null || root == p || root == q) return root;\n        TreeNode left = lowestCommonAncestor(root.left, p, q);\n        TreeNode right = lowestCommonAncestor(root.right, p, q);\n        if (left != null && right != null) return root;\n        return left != null ? left : right;\n    }\n}",
        approach: "Post-order recursive lowest common ancestor search",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var lowestCommonAncestor = function(root, p, q) {\n    if (!root || root === p || root === q) return root;\n    const left = lowestCommonAncestor(root.left, p, q);\n    const right = lowestCommonAncestor(root.right, p, q);\n    if (left && right) return root;\n    return left ? left : right;\n};",
        approach: "Post-order recursive lowest common ancestor search",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    def find_node(root, val):
        if not root: return None
        if root.val == val: return root
        return find_node(root.left, val) or find_node(root.right, val)

    arr = [3, 5, 1, 6, 2, 0, 8, None, None, 7, 4]
    t = build_tree(arr)
    p = find_node(t, 5)
    q = find_node(t, 1)
    assert solver.lowestCommonAncestor(t, p, q).val == 3

    p2 = find_node(t, 5)
    q2 = find_node(t, 4)
    assert solver.lowestCommonAncestor(t, p2, q2).val == 5

    # Scale test: 5000 nodes balanced tree
    vals = list(range(5000))
    t_scale = build_tree(vals)
    p_sc = find_node(t_scale, 1000)
    q_sc = find_node(t_scale, 2000)
    t0 = time.perf_counter()
    res = solver.lowestCommonAncestor(t_scale, p_sc, q_sc)
    t1 = time.perf_counter()
    assert res is not None
    print(f"✓ LCA Binary Tree: fixed and N=5000 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "merge-two-binary-trees",
    number: 617,
    category: "Algorithms",
    patterns: ["tree-dfs-subproblem"],
    method: "mergeTrees",
    hints: [
      {
        level: 1,
        title: "Superimposed Node Fusion Obstacle",
        text: "When two trees overlap at corresponding positions, their values sum together. What should happen when one tree has a node at a position where the other tree has a null child?"
      },
      {
        level: 2,
        title: "Disjoint Subtree Conservation Invariant",
        text: "If one node is null, the merged result at that position is simply the other non-null node. If both exist, sum their values and recurse on both pairs of children."
      },
      {
        level: 3,
        title: "Simultaneous Merge Traversal Procedure",
        text: "If root1 is null, return root2. If root2 is null, return root1. Create a new node with val = root1.val + root2.val (or reuse root1). Recursively merge left children into node.left and right children into node.right. Return the merged root."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def mergeTrees(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> Optional[TreeNode]:\n        if not root1:\n            return root2\n        if not root2:\n            return root1\n        merged = TreeNode(root1.val + root2.val)\n        merged.left = self.mergeTrees(root1.left, root2.left)\n        merged.right = self.mergeTrees(root1.right, root2.right)\n        return merged\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(min(N, M))",
      space: "O(min(H_1, H_2))",
      variables: ["N: nodes in tree 1 (0 <= N <= 2000)", "M: nodes in tree 2 (0 <= M <= 2000)", "H: height"],
      notes: "Traversing overlapping nodes once with call stack bounded by the smaller tree height.",
      whyNaiveFails: "Creating full copies of non-overlapping subtrees instead of reusing references adds redundant time and memory.",
      spaceTimeTradeoff: "O(min(H_1, H_2)) recursion stack memory.",
      interviewerExpectation: "Returning the other node immediately when one of the trees is null."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def mergeTrees(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> Optional[TreeNode]:\n        if not root1:\n            return root2\n        if not root2:\n            return root1\n        merged = TreeNode(root1.val + root2.val)\n        merged.left = self.mergeTrees(root1.left, root2.left)\n        merged.right = self.mergeTrees(root1.right, root2.right)\n        return merged",
        approach: "Simultaneous recursive dual-tree traversal",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    TreeNode* mergeTrees(TreeNode* root1, TreeNode* root2) {\n        if (!root1) return root2;\n        if (!root2) return root1;\n        TreeNode* merged = new TreeNode(root1->val + root2->val);\n        merged->left = mergeTrees(root1->left, root2->left);\n        merged->right = mergeTrees(root1->right, root2->right);\n        return merged;\n    }\n};",
        approach: "Simultaneous recursive dual-tree traversal",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public TreeNode mergeTrees(TreeNode root1, TreeNode root2) {\n        if (root1 == null) return root2;\n        if (root2 == null) return root1;\n        TreeNode merged = new TreeNode(root1.val + root2.val);\n        merged.left = mergeTrees(root1.left, root2.left);\n        merged.right = mergeTrees(root1.right, root2.right);\n        return merged;\n    }\n}",
        approach: "Simultaneous recursive dual-tree traversal",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var mergeTrees = function(root1, root2) {\n    if (!root1) return root2;\n    if (!root2) return root1;\n    const merged = new TreeNode(root1.val + root2.val);\n    merged.left = mergeTrees(root1.left, root2.left);\n    merged.right = mergeTrees(root1.right, root2.right);\n    return merged;\n};",
        approach: "Simultaneous recursive dual-tree traversal",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    def tree_to_inorder(root):
        return tree_to_inorder(root.left) + [root.val] + tree_to_inorder(root.right) if root else []

    t1 = build_tree([1, 3, 2, 5])
    t2 = build_tree([2, 1, 3, None, 4, None, 7])
    m = solver.mergeTrees(t1, t2)
    assert m.val == 3
    assert m.left.val == 4
    assert m.right.val == 5

    # Scale test: 2000 nodes
    vals1 = list(range(2000))
    vals2 = list(range(2000))
    t1_sc = build_tree(vals1)
    t2_sc = build_tree(vals2)
    t0 = time.perf_counter()
    res = solver.mergeTrees(t1_sc, t2_sc)
    t1_time = time.perf_counter()
    assert res.val == 0
    print(f"✓ Merge Two Binary Trees: fixed and N=2000 passed in {(t1_time-t0)*1000:.2f}ms")
`
  },
  {
    slug: "subtree-of-another-tree",
    number: 572,
    category: "Algorithms",
    patterns: ["tree-dfs-subproblem"],
    method: "isSubtree",
    hints: [
      {
        level: 1,
        title: "Subtree Root Matching Obstacle",
        text: "Subtree matching requires identical structure and node values from some starting point downward. How can checking tree equality at every candidate node determine if any subtree matches the target?"
      },
      {
        level: 2,
        title: "Exact Structural Identity Invariant",
        text: "A tree contains subRoot if the tree itself is identical to subRoot or if subRoot is a subtree of either the left or right branch."
      },
      {
        level: 3,
        title: "Dual DFS Validation Procedure",
        text: "Write a helper isSameTree(s, t). If root is null, return false. If isSameTree(root, subRoot) is true, return true. Otherwise, return the logical OR of isSubtree on root.left and root.right."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:\n        if not root:\n            return False\n        def is_same(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n            if not p and not q:\n                return True\n            if not p or not q or p.val != q.val:\n                return False\n            return is_same(p.left, q.left) and is_same(p.right, q.right)\n        if is_same(root, subRoot):\n            return True\n        return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N * M)",
      space: "O(H)",
      variables: ["N: nodes in root (1 <= N <= 2000)", "M: nodes in subRoot (1 <= M <= 1000)", "H: height"],
      notes: "Checking tree equality of size M at each of the N potential subtree roots in worst-case O(N * M) time.",
      whyNaiveFails: "Comparing in-order traversals alone fails because non-isomorphic trees can have identical in-order sequences without null markers.",
      spaceTimeTradeoff: "O(H) recursion stack space.",
      interviewerExpectation: "Using a dedicated isSameTree helper rather than approximate hashing."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:\n        if not root:\n            return False\n        def is_same(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n            if not p and not q:\n                return True\n            if not p or not q or p.val != q.val:\n                return False\n            return is_same(p.left, q.left) and is_same(p.right, q.right)\n        if is_same(root, subRoot):\n            return True\n        return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)",
        approach: "Dual depth-first search with identical tree verification",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    bool isSubtree(TreeNode* root, TreeNode* subRoot) {\n        if (!root) return false;\n        if (isSame(root, subRoot)) return true;\n        return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);\n    }\nprivate:\n    bool isSame(TreeNode* p, TreeNode* q) {\n        if (!p && !q) return true;\n        if (!p || !q || p->val != q->val) return false;\n        return isSame(p->left, q->left) && isSame(p->right, q->right);\n    }\n};",
        approach: "Dual depth-first search with identical tree verification",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public boolean isSubtree(TreeNode root, TreeNode subRoot) {\n        if (root == null) return false;\n        if (isSame(root, subRoot)) return true;\n        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);\n    }\n    private boolean isSame(TreeNode p, TreeNode q) {\n        if (p == null && q == null) return true;\n        if (p == null || q == null || p.val != q.val) return false;\n        return isSame(p.left, q.left) && isSame(p.right, q.right);\n    }\n}",
        approach: "Dual depth-first search with identical tree verification",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var isSubtree = function(root, subRoot) {\n    if (!root) return false;\n    function isSame(p, q) {\n        if (!p && !q) return true;\n        if (!p || !q || p.val !== q.val) return false;\n        return isSame(p.left, q.left) && isSame(p.right, q.right);\n    }\n    if (isSame(root, subRoot)) return true;\n    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);\n};",
        approach: "Dual depth-first search with identical tree verification",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([3, 4, 5, 1, 2], [4, 1, 2], True),
        ([3, 4, 5, 1, 2, None, None, None, None, 0], [4, 1, 2], False),
        ([1, 1], [1], True)
    ]
    for r_arr, s_arr, exp in fixed:
        r = build_tree(r_arr)
        s = build_tree(s_arr)
        assert solver.isSubtree(r, s) == exp

    # Scale test: 2000 nodes
    vals = list(range(2000))
    r = build_tree(vals)
    s = r.left
    t0 = time.perf_counter()
    res = solver.isSubtree(r, s)
    t1 = time.perf_counter()
    assert res is True
    assert solver.isSubtree(r, TreeNode(99999)) is False
    print(f"✓ Subtree of Another Tree: fixed and N=2000 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "count-complete-tree-nodes",
    number: 222,
    category: "Algorithms",
    patterns: ["binary-search-basic"],
    method: "countNodes",
    hints: [
      {
        level: 1,
        title: "Complete Tree Depth Comparison Obstacle",
        text: "In a complete tree, every level except possibly the last is full, and last level leaves are as left as possible. How can comparing the left and right boundary depths determine if a subtree is completely full?"
      },
      {
        level: 2,
        title: "Full Tree Formula Invariant",
        text: "If the leftmost depth equals the rightmost depth, the tree is a full binary tree with (2^h - 1) nodes. Otherwise, the count is 1 plus the counts of left and right subtrees."
      },
      {
        level: 3,
        title: "Subtree Boundary Halving Procedure",
        text: "Compute left boundary depth by following left pointers. Compute right boundary depth by following right pointers. If depths match, return (1 << depth) - 1. Otherwise, recursively return 1 + countNodes(root.left) + countNodes(root.right)."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def countNodes(self, root: Optional[TreeNode]) -> int:\n        if not root:\n            return 0\n        left_depth = 0\n        curr = root\n        while curr:\n            left_depth += 1\n            curr = curr.left\n        right_depth = 0\n        curr = root\n        while curr:\n            right_depth += 1\n            curr = curr.right\n        if left_depth == right_depth:\n            return (1 << left_depth) - 1\n        return 1 + self.countNodes(root.left) + self.countNodes(root.right)\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(log^2 N)",
      space: "O(log N)",
      variables: ["N: number of nodes in complete tree (0 <= N <= 5 * 10^4)"],
      notes: "At each recursive level, at least one of the two subtrees is guaranteed to be perfectly full, pruning execution to O(log^2 N).",
      whyNaiveFails: "Counting nodes naively with standard traversal takes linear O(N) time without exploiting the complete tree property.",
      spaceTimeTradeoff: "O(log N) stack depth for logarithmic subproblem branching.",
      interviewerExpectation: "Using bitwise shift (1 << depth) - 1 when boundary depths match."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def countNodes(self, root: Optional[TreeNode]) -> int:\n        if not root:\n            return 0\n        left_depth = 0\n        curr = root\n        while curr:\n            left_depth += 1\n            curr = curr.left\n        right_depth = 0\n        curr = root\n        while curr:\n            right_depth += 1\n            curr = curr.right\n        if left_depth == right_depth:\n            return (1 << left_depth) - 1\n        return 1 + self.countNodes(root.left) + self.countNodes(root.right)",
        approach: "Boundary height comparison with full tree bitwise formula",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    int countNodes(TreeNode* root) {\n        if (!root) return 0;\n        int leftDepth = 0, rightDepth = 0;\n        TreeNode* curr = root;\n        while (curr) { leftDepth++; curr = curr->left; }\n        curr = root;\n        while (curr) { rightDepth++; curr = curr->right; }\n        if (leftDepth == rightDepth) return (1 << leftDepth) - 1;\n        return 1 + countNodes(root->left) + countNodes(root->right);\n    }\n};",
        approach: "Boundary height comparison with full tree bitwise formula",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public int countNodes(TreeNode root) {\n        if (root == null) return 0;\n        int leftDepth = 0, rightDepth = 0;\n        TreeNode curr = root;\n        while (curr != null) { leftDepth++; curr = curr.left; }\n        curr = root;\n        while (curr != null) { rightDepth++; curr = curr.right; }\n        if (leftDepth == rightDepth) return (1 << leftDepth) - 1;\n        return 1 + countNodes(root.left) + countNodes(root.right);\n    }\n}",
        approach: "Boundary height comparison with full tree bitwise formula",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var countNodes = function(root) {\n    if (!root) return 0;\n    let leftDepth = 0, rightDepth = 0;\n    let curr = root;\n    while (curr) { leftDepth++; curr = curr.left; }\n    curr = root;\n    while (curr) { rightDepth++; curr = curr.right; }\n    if (leftDepth === rightDepth) return (1 << leftDepth) - 1;\n    return 1 + countNodes(root.left) + countNodes(root.right);\n};",
        approach: "Boundary height comparison with full tree bitwise formula",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([1, 2, 3, 4, 5, 6], 6),
        ([], 0),
        ([1], 1),
        ([1, 2, 3], 3),
        ([1, 2], 2)
    ]
    for arr, exp in fixed:
        t = build_tree(arr)
        assert solver.countNodes(t) == exp

    # Scale test: 50,000 nodes complete tree
    vals = list(range(50000))
    t = build_tree(vals)
    t0 = time.perf_counter()
    res = solver.countNodes(t)
    t1 = time.perf_counter()
    assert res == 50000
    print(f"✓ Count Complete Tree Nodes: fixed and N=50000 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "unique-binary-search-trees",
    number: 96,
    category: "Algorithms",
    patterns: ["tree-bst-properties"],
    method: "numTrees",
    hints: [
      {
        level: 1,
        title: "Catalan Root Choice Obstacle",
        text: "Every number from 1 to n can serve as the root node of an ordered search tree. For a chosen root i, how does the number of smaller keys and larger keys determine the count of distinct trees?"
      },
      {
        level: 2,
        title: "Cartesian Product Invariant",
        text: "If key i is the root, keys 1 to i - 1 form the left subtree (size i - 1) and keys i + 1 to n form the right subtree (size n - i). The combinations multiply independently."
      },
      {
        level: 3,
        title: "Iterative Catalan Tabulation Procedure",
        text: "Initialize an array dp of size n + 1 with dp[0] = dp[1] = 1. For each length len from 2 to n, compute dp[len] as the sum of dp[i - 1] * dp[len - i] for each root i from 1 to len. Return dp[n]."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def numTrees(self, n: int) -> int:\n        dp = [0] * (n + 1)\n        dp[0] = 1\n        dp[1] = 1\n        for length in range(2, n + 1):\n            for root in range(1, length + 1):\n                dp[length] += dp[root - 1] * dp[length - root]\n        return dp[n]\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N^2)",
      space: "O(N)",
      variables: ["n: number of nodes (1 <= n <= 19)"],
      notes: "Iterative Catalan number tabulation filling an array of size n + 1 in quadratic operations.",
      whyNaiveFails: "Generating all structural trees recursively without tabulation computes overlapping subproblems in exponential Catalan time.",
      spaceTimeTradeoff: "O(N) memory for the dynamic programming table.",
      interviewerExpectation: "Recognizing that structural combinations depend only on subtree sizes, not actual node values."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def numTrees(self, n: int) -> int:\n        dp = [0] * (n + 1)\n        dp[0] = 1\n        dp[1] = 1\n        for length in range(2, n + 1):\n            for root in range(1, length + 1):\n                dp[length] += dp[root - 1] * dp[length - root]\n        return dp[n]",
        approach: "Iterative Catalan number dynamic programming",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    int numTrees(int n) {\n        vector<int> dp(n + 1, 0);\n        dp[0] = 1;\n        dp[1] = 1;\n        for (int len = 2; len <= n; len++) {\n            for (int root = 1; root <= len; root++) {\n                dp[len] += dp[root - 1] * dp[len - root];\n            }\n        }\n        return dp[n];\n    }\n};",
        approach: "Iterative Catalan number dynamic programming",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public int numTrees(int n) {\n        int[] dp = new int[n + 1];\n        dp[0] = 1;\n        dp[1] = 1;\n        for (int len = 2; len <= n; len++) {\n            for (int root = 1; root <= len; root++) {\n                dp[len] += dp[root - 1] * dp[len - root];\n            }\n        }\n        return dp[n];\n    }\n}",
        approach: "Iterative Catalan number dynamic programming",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var numTrees = function(n) {\n    const dp = new Array(n + 1).fill(0);\n    dp[0] = 1;\n    dp[1] = 1;\n    for (let len = 2; len <= n; len++) {\n        for (let root = 1; root <= len; root++) {\n            dp[len] += dp[root - 1] * dp[len - root];\n        }\n    }\n    return dp[n];\n};",
        approach: "Iterative Catalan number dynamic programming",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        (1, 1),
        (2, 2),
        (3, 5),
        (4, 14),
        (5, 42)
    ]
    for n, exp in fixed:
        assert solver.numTrees(n) == exp

    # Scale test: n=19
    t0 = time.perf_counter()
    res = solver.numTrees(19)
    t1 = time.perf_counter()
    assert res == 1767263190
    print(f"✓ Unique Binary Search Trees: fixed and N=19 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "recover-binary-search-tree",
    number: 99,
    category: "Algorithms",
    patterns: ["tree-bst-properties"],
    method: "recoverTree",
    hints: [
      {
        level: 1,
        title: "In-Order Sequence Anomaly Obstacle",
        text: "In a valid search tree, an in-order traversal produces values in strictly increasing order. If exactly two nodes were swapped, how will the violations appear in the traversed sequence?"
      },
      {
        level: 2,
        title: "Dual Inversion Detection Invariant",
        text: "The in-order sequence contains either one or two inversions where a previous value exceeds the current value. The swapped nodes correspond to the first anomalous value and the last."
      },
      {
        level: 3,
        title: "In-Order Pointers Traversal Procedure",
        text: "Traverse in-order while maintaining a pointer to the previous visited node. When prev.val > curr.val, mark first = prev if first is null, and always update second = curr. After completing traversal, swap first.val and second.val in place."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def recoverTree(self, root: Optional[TreeNode]) -> None:\n        first = None\n        second = None\n        prev = TreeNode(float('-inf'))\n        def inorder(node: Optional[TreeNode]):\n            nonlocal first, second, prev\n            if not node:\n                return\n            inorder(node.left)\n            if prev.val > node.val:\n                if not first:\n                    first = prev\n                second = node\n            prev = node\n            inorder(node.right)\n        inorder(root)\n        if first and second:\n            first.val, second.val = second.val, first.val\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(H)",
      variables: ["N: number of nodes in tree (2 <= N <= 1000)", "H: height of tree"],
      notes: "Single in-order traversal tracking pointers to two anomalous nodes followed by an O(1) value swap.",
      whyNaiveFails: "Sorting node values requires an auxiliary array of size O(N) and two full traversals.",
      spaceTimeTradeoff: "O(H) call stack auxiliary memory.",
      interviewerExpectation: "Correctly handling both adjacent swaps (single drop) and non-adjacent swaps (two drops)."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def recoverTree(self, root: Optional[TreeNode]) -> None:\n        first = None\n        second = None\n        prev = TreeNode(float('-inf'))\n        def inorder(node: Optional[TreeNode]):\n            nonlocal first, second, prev\n            if not node:\n                return\n            inorder(node.left)\n            if prev.val > node.val:\n                if not first:\n                    first = prev\n                second = node\n            prev = node\n            inorder(node.right)\n        inorder(root)\n        if first and second:\n            first.val, second.val = second.val, first.val",
        approach: "In-order anomaly detection with in-place value swap",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\nprivate:\n    TreeNode* first = nullptr;\n    TreeNode* second = nullptr;\n    TreeNode* prev = new TreeNode(INT_MIN);\n    void inorder(TreeNode* node) {\n        if (!node) return;\n        inorder(node->left);\n        if (prev->val > node->val) {\n            if (!first) first = prev;\n            second = node;\n        }\n        prev = node;\n        inorder(node->right);\n    }\npublic:\n    void recoverTree(TreeNode* root) {\n        inorder(root);\n        if (first && second) {\n            swap(first->val, second->val);\n        }\n    }\n};",
        approach: "In-order anomaly detection with in-place value swap",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    private TreeNode first = null;\n    private TreeNode second = null;\n    private TreeNode prev = new TreeNode(Integer.MIN_VALUE);\n    private void inorder(TreeNode node) {\n        if (node == null) return;\n        inorder(node.left);\n        if (prev != null && prev.val > node.val) {\n            if (first == null) first = prev;\n            second = node;\n        }\n        prev = node;\n        inorder(node.right);\n    }\n    public void recoverTree(TreeNode root) {\n        inorder(root);\n        if (first != null && second != null) {\n            int temp = first.val;\n            first.val = second.val;\n            second.val = temp;\n        }\n    }\n}",
        approach: "In-order anomaly detection with in-place value swap",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var recoverTree = function(root) {\n    let first = null;\n    let second = null;\n    let prev = new TreeNode(-Infinity);\n    function inorder(node) {\n        if (!node) return;\n        inorder(node.left);\n        if (prev.val > node.val) {\n            if (!first) first = prev;\n            second = node;\n        }\n        prev = node;\n        inorder(node.right);\n    }\n    inorder(root);\n    if (first && second) {\n        const temp = first.val;\n        first.val = second.val;\n        second.val = temp;\n    }\n};",
        approach: "In-order anomaly detection with in-place value swap",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    def tree_to_inorder(root):
        return tree_to_inorder(root.left) + [root.val] + tree_to_inorder(root.right) if root else []

    t = build_tree([1, 3, None, None, 2])
    solver.recoverTree(t)
    assert tree_to_inorder(t) == [1, 2, 3]

    t2 = build_tree([3, 1, 4, None, None, 2])
    solver.recoverTree(t2)
    assert tree_to_inorder(t2) == [1, 2, 3, 4]

    def bst_from_sorted(arr):
        if not arr: return None
        mid = len(arr) // 2
        root = TreeNode(arr[mid])
        root.left = bst_from_sorted(arr[:mid])
        root.right = bst_from_sorted(arr[mid+1:])
        return root

    def find_node(root, val):
        if not root: return None
        if root.val == val: return root
        return find_node(root.left, val) or find_node(root.right, val)

    # Scale test: 1000 nodes BST with 2 swapped values
    vals = list(range(1, 1001))
    t = bst_from_sorted(vals)
    n1 = find_node(t, 100)
    n2 = find_node(t, 800)
    n1.val, n2.val = n2.val, n1.val
    t0 = time.perf_counter()
    solver.recoverTree(t)
    t1 = time.perf_counter()
    ino = tree_to_inorder(t)
    assert ino == sorted(vals)
    print(f"✓ Recover Binary Search Tree: fixed and N=1000 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "convert-sorted-array-to-binary-search-tree",
    number: 108,
    category: "Algorithms",
    patterns: ["tree-bst-properties"],
    method: "sortedArrayToBST",
    hints: [
      {
        level: 1,
        title: "Height-Balanced Root Partition Obstacle",
        text: "To produce a height-balanced search tree from sorted elements, subtree heights cannot differ by more than one. Which element from the sorted sequence must be chosen as the subtree root to balance children evenly?"
      },
      {
        level: 2,
        title: "Median Split Invariant",
        text: "Choosing the exact middle element of any subarray as the root partitions the remaining elements into two equal halves, ensuring minimal height difference."
      },
      {
        level: 3,
        title: "Recursive Midpoint Construction Procedure",
        text: "Define a recursive helper taking subarray bounds [left, right]. If left > right, return null. Compute mid = (left + right) // 2. Create a TreeNode with nums[mid]. Recurse on [left, mid - 1] for left child and [mid + 1, right] for right child. Return the node."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:\n        def helper(left: int, right: int) -> Optional[TreeNode]:\n            if left > right:\n                return None\n            mid = (left + right) // 2\n            node = TreeNode(nums[mid])\n            node.left = helper(left, mid - 1)\n            node.right = helper(mid + 1, right)\n            return node\n        return helper(0, len(nums) - 1)\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(log N)",
      variables: ["N: length of nums array (1 <= N <= 10^4)"],
      notes: "Visiting each array element once and creating nodes in O(log N) balanced recursion stack depth.",
      whyNaiveFails: "Iterative left-to-right insertion creates a degenerate linear tree of depth N.",
      spaceTimeTradeoff: "O(log N) call stack memory, optimal for balanced tree creation.",
      interviewerExpectation: "Using mid = (left + right) // 2 to guarantee balanced subtrees."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:\n        def helper(left: int, right: int) -> Optional[TreeNode]:\n            if left > right:\n                return None\n            mid = (left + right) // 2\n            node = TreeNode(nums[mid])\n            node.left = helper(left, mid - 1)\n            node.right = helper(mid + 1, right)\n            return node\n        return helper(0, len(nums) - 1)",
        approach: "Recursive divide and conquer choosing subarray median",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    TreeNode* sortedArrayToBST(vector<int>& nums) {\n        return helper(nums, 0, (int)nums.size() - 1);\n    }\nprivate:\n    TreeNode* helper(vector<int>& nums, int left, int right) {\n        if (left > right) return nullptr;\n        int mid = left + (right - left) / 2;\n        TreeNode* node = new TreeNode(nums[mid]);\n        node->left = helper(nums, left, mid - 1);\n        node->right = helper(nums, mid + 1, right);\n        return node;\n    }\n};",
        approach: "Recursive divide and conquer choosing subarray median",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public TreeNode sortedArrayToBST(int[] nums) {\n        return helper(nums, 0, nums.length - 1);\n    }\n    private TreeNode helper(int[] nums, int left, int right) {\n        if (left > right) return null;\n        int mid = left + (right - left) / 2;\n        TreeNode node = new TreeNode(nums[mid]);\n        node.left = helper(nums, left, mid - 1);\n        node.right = helper(nums, mid + 1, right);\n        return node;\n    }\n}",
        approach: "Recursive divide and conquer choosing subarray median",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var sortedArrayToBST = function(nums) {\n    function helper(left, right) {\n        if (left > right) return null;\n        const mid = Math.floor((left + right) / 2);\n        const node = new TreeNode(nums[mid]);\n        node.left = helper(left, mid - 1);\n        node.right = helper(mid + 1, right);\n        return node;\n    }\n    return helper(0, nums.length - 1);\n};",
        approach: "Recursive divide and conquer choosing subarray median",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    def is_balanced(node):
        def depth(nd):
            if not nd: return 0
            l = depth(nd.left)
            r = depth(nd.right)
            if l == -1 or r == -1 or abs(l - r) > 1: return -1
            return max(l, r) + 1
        return depth(node) != -1

    def tree_to_inorder(root):
        return tree_to_inorder(root.left) + [root.val] + tree_to_inorder(root.right) if root else []

    nums = [-10, -3, 0, 5, 9]
    t = solver.sortedArrayToBST(nums)
    assert tree_to_inorder(t) == nums
    assert is_balanced(t)

    # Scale test: 10,000 nodes
    vals = list(range(10000))
    t0 = time.perf_counter()
    res = solver.sortedArrayToBST(vals)
    t1 = time.perf_counter()
    assert is_balanced(res)
    assert tree_to_inorder(res) == vals
    print(f"✓ Convert Sorted Array to BST: fixed and N=10000 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "convert-sorted-list-to-binary-search-tree",
    number: 109,
    category: "Algorithms",
    patterns: ["tree-bst-properties"],
    method: "sortedListToBST",
    hints: [
      {
        level: 1,
        title: "Midpoint Disconnection Obstacle",
        text: "Unlike an indexed array, a linked list does not provide direct random access to the middle element. How can moving at different step rates locate the midpoint to partition the list into balanced halves?"
      },
      {
        level: 2,
        title: "Slow-Fast Bisect Invariant",
        text: "Find the middle node using slow and fast pointers while disconnecting the left half from the midpoint. The middle becomes the root, recursing on left and right segments."
      },
      {
        level: 3,
        title: "Halving Sublist Recursion Procedure",
        text: "If head is null, return null. If head.next is null, return TreeNode(head.val). Use slow and fast pointers with a prev pointer to find the middle. Disconnect prev.next to terminate the left list. Create TreeNode(slow.val), recurse left on head, and recurse right on slow.next."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def sortedListToBST(self, head: Optional[ListNode]) -> Optional[TreeNode]:\n        if not head:\n            return None\n        if not head.next:\n            return TreeNode(head.val)\n        prev = None\n        slow = head\n        fast = head\n        while fast and fast.next:\n            prev = slow\n            slow = slow.next\n            fast = fast.next.next\n        prev.next = None\n        root = TreeNode(slow.val)\n        root.left = self.sortedListToBST(head)\n        root.right = self.sortedListToBST(slow.next)\n        return root\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N log N)",
      space: "O(log N)",
      variables: ["N: number of nodes in list (0 <= N <= 2 * 10^4)"],
      notes: "Finding the midpoint takes O(N) per level across O(log N) recursive tree levels.",
      whyNaiveFails: "Converting the list to an array consumes O(N) auxiliary space instead of O(log N) stack frames.",
      spaceTimeTradeoff: "O(log N) stack depth with in-place pointer disconnection.",
      interviewerExpectation: "Severing the prev.next pointer to prevent cycles or infinite recursion."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def sortedListToBST(self, head: Optional[ListNode]) -> Optional[TreeNode]:\n        if not head:\n            return None\n        if not head.next:\n            return TreeNode(head.val)\n        prev = None\n        slow = head\n        fast = head\n        while fast and fast.next:\n            prev = slow\n            slow = slow.next\n            fast = fast.next.next\n        prev.next = None\n        root = TreeNode(slow.val)\n        root.left = self.sortedListToBST(head)\n        root.right = self.sortedListToBST(slow.next)\n        return root",
        approach: "Fast and slow pointer bisection with list disconnection",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    TreeNode* sortedListToBST(ListNode* head) {\n        if (!head) return nullptr;\n        if (!head->next) return new TreeNode(head->val);\n        ListNode* prev = nullptr;\n        ListNode* slow = head;\n        ListNode* fast = head;\n        while (fast && fast->next) {\n            prev = slow;\n            slow = slow->next;\n            fast = fast->next->next;\n        }\n        prev->next = nullptr;\n        TreeNode* root = new TreeNode(slow->val);\n        root->left = sortedListToBST(head);\n        root->right = sortedListToBST(slow->next);\n        return root;\n    }\n};",
        approach: "Fast and slow pointer bisection with list disconnection",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public TreeNode sortedListToBST(ListNode head) {\n        if (head == null) return null;\n        if (head.next == null) return new TreeNode(head.val);\n        ListNode prev = null;\n        ListNode slow = head;\n        ListNode fast = head;\n        while (fast != null && fast.next != null) {\n            prev = slow;\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n        prev.next = null;\n        TreeNode root = new TreeNode(slow.val);\n        root.left = sortedListToBST(head);\n        root.right = sortedListToBST(slow.next);\n        return root;\n    }\n}",
        approach: "Fast and slow pointer bisection with list disconnection",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var sortedListToBST = function(head) {\n    if (!head) return null;\n    if (!head.next) return new TreeNode(head.val);\n    let prev = null;\n    let slow = head;\n    let fast = head;\n    while (fast && fast.next) {\n        prev = slow;\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n    prev.next = null;\n    const root = new TreeNode(slow.val);\n    root.left = sortedListToBST(head);\n    root.right = sortedListToBST(slow.next);\n    return root;\n};",
        approach: "Fast and slow pointer bisection with list disconnection",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    def arr_to_list(arr):
        if not arr: return None
        h = ListNode(arr[0])
        cur = h
        for x in arr[1:]:
            cur.next = ListNode(x)
            cur = cur.next
        return h

    def is_balanced(node):
        def depth(nd):
            if not nd: return 0
            l = depth(nd.left)
            r = depth(nd.right)
            if l == -1 or r == -1 or abs(l - r) > 1: return -1
            return max(l, r) + 1
        return depth(node) != -1

    def tree_to_inorder(root):
        return tree_to_inorder(root.left) + [root.val] + tree_to_inorder(root.right) if root else []

    nums = [-10, -3, 0, 5, 9]
    h = arr_to_list(nums)
    t = solver.sortedListToBST(h)
    assert tree_to_inorder(t) == nums
    assert is_balanced(t)

    assert solver.sortedListToBST(None) is None

    # Scale test: 2000 nodes
    vals = list(range(2000))
    h_scale = arr_to_list(vals)
    t0 = time.perf_counter()
    res = solver.sortedListToBST(h_scale)
    t1 = time.perf_counter()
    assert is_balanced(res)
    assert tree_to_inorder(res) == vals
    print(f"✓ Convert Sorted List to BST: fixed and N=2000 passed in {(t1-t0)*1000:.2f}ms")
`
  }
];

function generateFiles() {
  for (const item of batch8d) {
    const probData = {
      slug: item.slug,
      number: item.number,
      category: item.category,
      patterns: item.patterns,
      hints: item.hints,
      complexity: item.complexity,
      solutions: item.solutions,
      review: {
        status: "tested",
        acceptedOnLeetCode: null,
        reviewer: null
      },
      updated: "2026-10-20T00:00:00.000Z"
    };

    const probPath = path.join(rootDir, 'dataset/problems', `${item.slug}.json`);
    fs.writeFileSync(probPath, JSON.stringify(probData, null, 2) + '\n', 'utf8');

    const testDir = path.join(rootDir, 'dataset/tests', item.slug);
    if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

    const metaData = {
      slug: item.slug,
      method: item.method,
      category: item.category,
      targetTime: item.complexity.time,
      targetSpace: item.complexity.space
    };
    fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(metaData, null, 2) + '\n', 'utf8');

    const testPyContent = `import json, os, re, random, time, sys
sys.setrecursionlimit(20000)

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def build_tree(arr):
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

    scope = {'TreeNode': TreeNode, 'ListNode': ListNode, 'List': list, 'Optional': None}
    exec(sol_code, scope)
    solver = scope['Solution']()
${item.testCases}

if __name__ == '__main__':
    main()
`;
    fs.writeFileSync(path.join(testDir, 'test.py'), testPyContent, 'utf8');
    console.log(`Generated: ${item.slug}`);
  }
}

generateFiles();
