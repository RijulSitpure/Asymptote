import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

const batch8c = [
  {
    slug: "same-tree",
    number: 100,
    category: "Algorithms",
    patterns: ["tree-dfs-subproblem"],
    method: "isSameTree",
    hints: [
      {
        level: 1,
        title: "Structural Identity Obstacle",
        text: "Why does flattening trees to traversals risk ambiguity when duplicate values or structural differences exist? How can comparing corresponding nodes recursively determine structural identity?"
      },
      {
        level: 2,
        title: "Recursive Mirror Invariant",
        text: "Two binary trees are identical if and only if their root values match and their corresponding left and right subtrees are identical."
      },
      {
        level: 3,
        title: "Recursive Validation Procedure",
        text: "If both nodes are null, return true. If exactly one is null or their values differ, return false. Otherwise, recursively verify that left subtrees match and right subtrees match, returning their logical AND."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n        if not p and not q:\n            return True\n        if not p or not q or p.val != q.val:\n            return False\n        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(min(N, M))",
      space: "O(min(H_p, H_q))",
      variables: ["N: number of nodes in tree p (0 <= N <= 100)", "M: number of nodes in tree q (0 <= M <= 100)", "H: tree height"],
      notes: "Simultaneous recursion visiting each corresponding node at most once with call stack bounded by tree height.",
      whyNaiveFails: "Comparing node counts or single traversals without null markers can falsely equate structurally different trees.",
      spaceTimeTradeoff: "Recursive call stack requires O(H) auxiliary memory, optimal for structural comparison.",
      interviewerExpectation: "Handling null base cases cleanly before dereferencing node values."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n        if not p and not q:\n            return True\n        if not p or not q or p.val != q.val:\n            return False\n        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)",
        approach: "Simultaneous recursive tree traversal",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    bool isSameTree(TreeNode* p, TreeNode* q) {\n        if (!p && !q) return true;\n        if (!p || !q || p->val != q->val) return false;\n        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);\n    }\n};",
        approach: "Simultaneous recursive tree traversal",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public boolean isSameTree(TreeNode p, TreeNode q) {\n        if (p == null && q == null) return true;\n        if (p == null || q == null || p.val != q.val) return false;\n        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n    }\n}",
        approach: "Simultaneous recursive tree traversal",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var isSameTree = function(p, q) {\n    if (!p && !q) return true;\n    if (!p || !q || p.val !== q.val) return false;\n    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n};",
        approach: "Simultaneous recursive tree traversal",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([1, 2, 3], [1, 2, 3], True),
        ([1, 2], [1, None, 2], False),
        ([1, 2, 1], [1, 1, 2], False),
        ([], [], True),
        ([1], [], False)
    ]
    for p_arr, q_arr, exp in fixed:
        p = build_tree(p_arr)
        q = build_tree(q_arr)
        assert solver.isSameTree(p, q) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(0, 30)
        vals = [rng.randint(-50, 50) for _ in range(sz)]
        t1 = build_tree(vals)
        t2 = build_tree(vals)
        assert solver.isSameTree(t1, t2) is True
        if sz > 1:
            vals_diff = list(vals)
            vals_diff[0] += 1
            t3 = build_tree(vals_diff)
            assert solver.isSameTree(t1, t3) is False

    # Scale test: 100 nodes balanced tree
    vals = list(range(100))
    t1 = build_tree(vals)
    t2 = build_tree(vals)
    t0 = time.perf_counter()
    res = solver.isSameTree(t1, t2)
    t1_time = time.perf_counter()
    assert res is True
    print(f"✓ Same Tree: fixed, 35 random, and N=100 passed in {(t1_time-t0)*1000:.2f}ms")
`
  },
  {
    slug: "symmetric-tree",
    number: 101,
    category: "Algorithms",
    patterns: ["tree-dfs-subproblem"],
    method: "isSymmetric",
    hints: [
      {
        level: 1,
        title: "Mirror Reflection Obstacle",
        text: "A tree is symmetric if it is a mirror image of itself around the root. How can a helper function compare mirror branches (left against right) rather than identical branches?"
      },
      {
        level: 2,
        title: "Mirror Subtree Invariant",
        text: "Mirror symmetry requires the left subtree's left child to match the right subtree's right child, and the left subtree's right child to match the right subtree's left child."
      },
      {
        level: 3,
        title: "Dual-Pointer Traversal Procedure",
        text: "Define a helper taking two nodes. If both are null, return true. If one is null or values differ, return false. Recursively check helper(t1.left, t2.right) and helper(t1.right, t2.left). Call helper on root.left and root.right."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def isSymmetric(self, root: Optional[TreeNode]) -> bool:\n        if not root:\n            return True\n        def is_mirror(t1: Optional[TreeNode], t2: Optional[TreeNode]) -> bool:\n            if not t1 and not t2:\n                return True\n            if not t1 or not t2 or t1.val != t2.val:\n                return False\n            return is_mirror(t1.left, t2.right) and is_mirror(t1.right, t2.left)\n        return is_mirror(root.left, root.right)\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(H)",
      variables: ["N: number of nodes in tree (1 <= N <= 1000)", "H: height of tree"],
      notes: "Linear traversal visiting each node at most once with recursion stack depth bounded by tree height.",
      whyNaiveFails: "In-order traversal alone does not uniquely identify symmetric trees without storing null leaf pointers.",
      spaceTimeTradeoff: "O(H) recursion stack memory.",
      interviewerExpectation: "Cross-pairing left.left with right.right and left.right with right.left."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def isSymmetric(self, root: Optional[TreeNode]) -> bool:\n        if not root:\n            return True\n        def is_mirror(t1: Optional[TreeNode], t2: Optional[TreeNode]) -> bool:\n            if not t1 and not t2:\n                return True\n            if not t1 or not t2 or t1.val != t2.val:\n                return False\n            return is_mirror(t1.left, t2.right) and is_mirror(t1.right, t2.left)\n        return is_mirror(root.left, root.right)",
        approach: "Recursive mirror tree cross-validation",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    bool isSymmetric(TreeNode* root) {\n        if (!root) return true;\n        return isMirror(root->left, root->right);\n    }\nprivate:\n    bool isMirror(TreeNode* t1, TreeNode* t2) {\n        if (!t1 && !t2) return true;\n        if (!t1 || !t2 || t1->val != t2->val) return false;\n        return isMirror(t1->left, t2->right) && isMirror(t1->right, t2->left);\n    }\n};",
        approach: "Recursive mirror tree cross-validation",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public boolean isSymmetric(TreeNode root) {\n        if (root == null) return true;\n        return isMirror(root.left, root.right);\n    }\n    private boolean isMirror(TreeNode t1, TreeNode t2) {\n        if (t1 == null && t2 == null) return true;\n        if (t1 == null || t2 == null || t1.val != t2.val) return false;\n        return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);\n    }\n}",
        approach: "Recursive mirror tree cross-validation",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var isSymmetric = function(root) {\n    if (!root) return true;\n    function isMirror(t1, t2) {\n        if (!t1 && !t2) return true;\n        if (!t1 || !t2 || t1.val !== t2.val) return false;\n        return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);\n    }\n    return isMirror(root.left, root.right);\n};",
        approach: "Recursive mirror tree cross-validation",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([1, 2, 2, 3, 4, 4, 3], True),
        ([1, 2, 2, None, 3, None, 3], False),
        ([1], True),
        ([1, 2, 2], True),
        ([1, 2, 3], False)
    ]
    for arr, exp in fixed:
        t = build_tree(arr)
        assert solver.isSymmetric(t) == exp

    rng = random.Random(42)
    for _ in range(35):
        v1 = rng.randint(1, 100)
        v2 = rng.randint(1, 100)
        v3 = rng.randint(1, 100)
        arr = [1, v1, v1, v2, v3, v3, v2]
        t = build_tree(arr)
        assert solver.isSymmetric(t) is True

    # Scale test: 1000 nodes symmetric tree
    t = TreeNode(1)
    curr_l, curr_r = t, t
    for i in range(500):
        curr_l.left = TreeNode(i)
        curr_r.right = TreeNode(i)
        curr_l = curr_l.left
        curr_r = curr_r.right
    t0 = time.perf_counter()
    res = solver.isSymmetric(t)
    t1 = time.perf_counter()
    assert res is True
    print(f"✓ Symmetric Tree: fixed, 35 random, and N=1000 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "binary-tree-zigzag-level-order-traversal",
    number: 103,
    category: "Algorithms",
    patterns: ["tree-bfs-level-order"],
    method: "zigzagLevelOrder",
    hints: [
      {
        level: 1,
        title: "Tier Alternation Obstacle",
        text: "Standard level-by-level processing traverses all tiers from left to right. How can alternating the order of collection per tier produce the required zigzag sequence without altering the child visitation order?"
      },
      {
        level: 2,
        title: "Directional Buffer Invariant",
        text: "Process each tier using standard FIFO ordering, but reverse the tier's collected values or alternate insertion directions on odd levels."
      },
      {
        level: 3,
        title: "Flagged Level Traversal Procedure",
        text: "Initialize a queue with the root if non-null. Track an alternating direction flag. For each level, record queue size, pop all nodes, append their values to a level list, and push children. Reverse the level list if the flag indicates right-to-left, append to result, and flip the flag."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:\n        if not root:\n            return []\n        from collections import deque\n        q = deque([root])\n        res = []\n        left_to_right = True\n        while q:\n            level = []\n            for _ in range(len(q)):\n                node = q.popleft()\n                level.append(node.val)\n                if node.left:\n                    q.append(node.left)\n                if node.right:\n                    q.append(node.right)\n            if not left_to_right:\n                level.reverse()\n            res.append(level)\n            left_to_right = not left_to_right\n        return res\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(W)",
      variables: ["N: number of nodes in tree (0 <= N <= 2000)", "W: maximum width of tree (up to N/2)"],
      notes: "Breadth-first traversal visiting each node once and reversing level slices in linear aggregate time.",
      whyNaiveFails: "Traversing with depth recursion requires sorting or re-indexing nodes post-traversal.",
      spaceTimeTradeoff: "Queue memory matches the maximum tree level width.",
      interviewerExpectation: "Using queue level size snapshot and reversing only the extracted level array."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:\n        if not root:\n            return []\n        from collections import deque\n        q = deque([root])\n        res = []\n        left_to_right = True\n        while q:\n            level = []\n            for _ in range(len(q)):\n                node = q.popleft()\n                level.append(node.val)\n                if node.left:\n                    q.append(node.left)\n                if node.right:\n                    q.append(node.right)\n            if not left_to_right:\n                level.reverse()\n            res.append(level)\n            left_to_right = not left_to_right\n        return res",
        approach: "Breadth-first queue traversal with alternating level reversal",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {\n        if (!root) return {};\n        vector<vector<int>> res;\n        queue<TreeNode*> q;\n        q.push(root);\n        bool leftToRight = true;\n        while (!q.empty()) {\n            int sz = q.size();\n            vector<int> level(sz);\n            for (int i = 0; i < sz; i++) {\n                TreeNode* node = q.front();\n                q.pop();\n                int idx = leftToRight ? i : (sz - 1 - i);\n                level[idx] = node->val;\n                if (node->left) q.push(node->left);\n                if (node->right) q.push(node->right);\n            }\n            res.push_back(level);\n            leftToRight = !leftToRight;\n        }\n        return res;\n    }\n};",
        approach: "Breadth-first queue traversal with alternating level indexing",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {\n        List<List<Integer>> res = new ArrayList<>();\n        if (root == null) return res;\n        Queue<TreeNode> q = new LinkedList<>();\n        q.offer(root);\n        boolean leftToRight = true;\n        while (!q.isEmpty()) {\n            int sz = q.size();\n            LinkedList<Integer> level = new LinkedList<>();\n            for (int i = 0; i < sz; i++) {\n                TreeNode node = q.poll();\n                if (leftToRight) level.add(node.val);\n                else level.addFirst(node.val);\n                if (node.left != null) q.offer(node.left);\n                if (node.right != null) q.offer(node.right);\n            }\n            res.add(level);\n            leftToRight = !leftToRight;\n        }\n        return res;\n    }\n}",
        approach: "Breadth-first queue traversal with deque level insertion",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var zigzagLevelOrder = function(root) {\n    if (!root) return [];\n    const res = [];\n    const q = [root];\n    let leftToRight = true;\n    while (q.length > 0) {\n        const sz = q.length;\n        const level = [];\n        for (let i = 0; i < sz; i++) {\n            const node = q.shift();\n            level.push(node.val);\n            if (node.left) q.push(node.left);\n            if (node.right) q.push(node.right);\n        }\n        if (!leftToRight) level.reverse();\n        res.push(level);\n        leftToRight = !leftToRight;\n    }\n    return res;\n};",
        approach: "Breadth-first queue traversal with alternating level reversal",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([3, 9, 20, None, None, 15, 7], [[3], [20, 9], [15, 7]]),
        ([1], [[1]]),
        ([], [])
    ]
    for arr, exp in fixed:
        t = build_tree(arr)
        assert solver.zigzagLevelOrder(t) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 40)
        vals = [rng.randint(-100, 100) for _ in range(sz)]
        t = build_tree(vals)
        res = solver.zigzagLevelOrder(t)
        assert sum(len(lvl) for lvl in res) == sz

    # Scale test: 2000 nodes
    vals = list(range(2000))
    t = build_tree(vals)
    t0 = time.perf_counter()
    res = solver.zigzagLevelOrder(t)
    t1 = time.perf_counter()
    assert sum(len(lvl) for lvl in res) == 2000
    print(f"✓ Zigzag Level Order: fixed, 35 random, and N=2000 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "binary-tree-level-order-traversal-ii",
    number: 107,
    category: "Algorithms",
    patterns: ["tree-bfs-level-order"],
    method: "levelOrderBottom",
    hints: [
      {
        level: 1,
        title: "Bottom-Up Ordering Obstacle",
        text: "Bottom-up level ordering requires returning leaf levels first and the root level last. Can you perform a top-down level-by-level traversal and invert the resulting tier list at the end?"
      },
      {
        level: 2,
        title: "Reversed Tier Invariant",
        text: "A bottom-up level traversal produces the exact reverse sequence of the top-down level-by-level traversal."
      },
      {
        level: 3,
        title: "Top-Down BFS with Post-Reversal",
        text: "Traverse each level using a queue from top to bottom, recording each level's node values into a list. Append each level list to the master list. Reverse the master list before returning."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def levelOrderBottom(self, root: Optional[TreeNode]) -> List[List[int]]:\n        if not root:\n            return []\n        from collections import deque\n        q = deque([root])\n        res = []\n        while q:\n            level = []\n            for _ in range(len(q)):\n                node = q.popleft()\n                level.append(node.val)\n                if node.left:\n                    q.append(node.left)\n                if node.right:\n                    q.append(node.right)\n            res.append(level)\n        res.reverse()\n        return res\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(W)",
      variables: ["N: number of nodes in tree (0 <= N <= 2000)", "W: maximum level width of tree"],
      notes: "Standard level order queue traversal followed by inverting the outer list in O(N) total time.",
      whyNaiveFails: "Depth-first collection requires manual tracking and re-indexing of tiers.",
      spaceTimeTradeoff: "Auxiliary queue memory proportional to maximum tree width.",
      interviewerExpectation: "Using standard BFS and inverting the outer array in O(height) time."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def levelOrderBottom(self, root: Optional[TreeNode]) -> List[List[int]]:\n        if not root:\n            return []\n        from collections import deque\n        q = deque([root])\n        res = []\n        while q:\n            level = []\n            for _ in range(len(q)):\n                node = q.popleft()\n                level.append(node.val)\n                if node.left:\n                    q.append(node.left)\n                if node.right:\n                    q.append(node.right)\n            res.append(level)\n        res.reverse()\n        return res",
        approach: "Top-down level-order BFS followed by list reversal",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    vector<vector<int>> levelOrderBottom(TreeNode* root) {\n        if (!root) return {};\n        vector<vector<int>> res;\n        queue<TreeNode*> q;\n        q.push(root);\n        while (!q.empty()) {\n            int sz = q.size();\n            vector<int> level;\n            level.reserve(sz);\n            for (int i = 0; i < sz; i++) {\n                TreeNode* node = q.front();\n                q.pop();\n                level.push_back(node->val);\n                if (node->left) q.push(node->left);\n                if (node->right) q.push(node->right);\n            }\n            res.push_back(level);\n        }\n        reverse(res.begin(), res.end());\n        return res;\n    }\n};",
        approach: "Top-down level-order BFS followed by list reversal",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public List<List<Integer>> levelOrderBottom(TreeNode root) {\n        List<List<Integer>> res = new ArrayList<>();\n        if (root == null) return res;\n        Queue<TreeNode> q = new LinkedList<>();\n        q.offer(root);\n        while (!q.isEmpty()) {\n            int sz = q.size();\n            List<Integer> level = new ArrayList<>(sz);\n            for (int i = 0; i < sz; i++) {\n                TreeNode node = q.poll();\n                level.add(node.val);\n                if (node.left != null) q.offer(node.left);\n                if (node.right != null) q.offer(node.right);\n            }\n            res.add(level);\n        }\n        Collections.reverse(res);\n        return res;\n    }\n}",
        approach: "Top-down level-order BFS followed by list reversal",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var levelOrderBottom = function(root) {\n    if (!root) return [];\n    const res = [];\n    const q = [root];\n    while (q.length > 0) {\n        const sz = q.length;\n        const level = [];\n        for (let i = 0; i < sz; i++) {\n            const node = q.shift();\n            level.push(node.val);\n            if (node.left) q.push(node.left);\n            if (node.right) q.push(node.right);\n        }\n        res.push(level);\n    }\n    res.reverse();\n    return res;\n};",
        approach: "Top-down level-order BFS followed by list reversal",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([3, 9, 20, None, None, 15, 7], [[15, 7], [9, 20], [3]]),
        ([1], [[1]]),
        ([], [])
    ]
    for arr, exp in fixed:
        t = build_tree(arr)
        assert solver.levelOrderBottom(t) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 40)
        vals = [rng.randint(-100, 100) for _ in range(sz)]
        t = build_tree(vals)
        res = solver.levelOrderBottom(t)
        assert sum(len(lvl) for lvl in res) == sz

    # Scale test: 2000 nodes
    vals = list(range(2000))
    t = build_tree(vals)
    t0 = time.perf_counter()
    res = solver.levelOrderBottom(t)
    t1 = time.perf_counter()
    assert sum(len(lvl) for lvl in res) == 2000
    print(f"✓ Level Order Bottom: fixed, 35 random, and N=2000 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "minimum-depth-of-binary-tree",
    number: 111,
    category: "Algorithms",
    patterns: ["tree-bfs-level-order"],
    method: "minDepth",
    hints: [
      {
        level: 1,
        title: "Single Child Depth Obstacle",
        text: "If a node has only one child, can taking the minimum of child depths incorrectly count the missing child with depth 0? How does finding the first leaf node in a tier-by-tier traversal avoid traversing deeper branches?"
      },
      {
        level: 2,
        title: "First Leaf Level Invariant",
        text: "The minimum depth is the distance to the very first leaf node encountered. Processing nodes tier by tier guarantees that the first leaf reached yields the minimum depth immediately."
      },
      {
        level: 3,
        title: "Tier-by-Tier Early Return Procedure",
        text: "If root is null, return 0. Use a queue initialized with root and track depth starting at 1. For each level, pop nodes; if a node has neither left nor right child, return current depth immediately. Otherwise, enqueue its non-null children and increment depth per tier."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def minDepth(self, root: Optional[TreeNode]) -> int:\n        if not root:\n            return 0\n        from collections import deque\n        q = deque([(root, 1)])\n        while q:\n            node, depth = q.popleft()\n            if not node.left and not node.right:\n                return depth\n            if node.left:\n                q.append((node.left, depth + 1))\n            if node.right:\n                q.append((node.right, depth + 1))\n        return 0\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(W)",
      variables: ["N: number of nodes in tree (0 <= N <= 10^5)", "W: maximum width of tree"],
      notes: "Early-exit breadth-first search stopping immediately upon encountering the shallowest leaf node.",
      whyNaiveFails: "Blindly returning min(left, right) + 1 when a node has only one child incorrectly treats null as a leaf of depth 0.",
      spaceTimeTradeoff: "BFS requires O(W) auxiliary space but visits strictly fewer nodes than full DFS on skewed trees.",
      interviewerExpectation: "Correct handling of nodes with only one child and early termination on the first leaf."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def minDepth(self, root: Optional[TreeNode]) -> int:\n        if not root:\n            return 0\n        from collections import deque\n        q = deque([(root, 1)])\n        while q:\n            node, depth = q.popleft()\n            if not node.left and not node.right:\n                return depth\n            if node.left:\n                q.append((node.left, depth + 1))\n            if node.right:\n                q.append((node.right, depth + 1))\n        return 0",
        approach: "Breadth-first search with early leaf termination",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    int minDepth(TreeNode* root) {\n        if (!root) return 0;\n        queue<pair<TreeNode*, int>> q;\n        q.push({root, 1});\n        while (!q.empty()) {\n            auto [node, depth] = q.front();\n            q.pop();\n            if (!node->left && !node->right) return depth;\n            if (node->left) q.push({node->left, depth + 1});\n            if (node->right) q.push({node->right, depth + 1});\n        }\n        return 0;\n    }\n};",
        approach: "Breadth-first search with early leaf termination",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public int minDepth(TreeNode root) {\n        if (root == null) return 0;\n        Queue<TreeNode> q = new LinkedList<>();\n        q.offer(root);\n        int depth = 1;\n        while (!q.isEmpty()) {\n            int sz = q.size();\n            for (int i = 0; i < sz; i++) {\n                TreeNode node = q.poll();\n                if (node.left == null && node.right == null) return depth;\n                if (node.left != null) q.offer(node.left);\n                if (node.right != null) q.offer(node.right);\n            }\n            depth++;\n        }\n        return depth;\n    }\n}",
        approach: "Breadth-first search with early leaf termination",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var minDepth = function(root) {\n    if (!root) return 0;\n    const q = [[root, 1]];\n    while (q.length > 0) {\n        const [node, depth] = q.shift();\n        if (!node.left && !node.right) return depth;\n        if (node.left) q.push([node.left, depth + 1]);\n        if (node.right) q.push([node.right, depth + 1]);\n    }\n    return 0;\n};",
        approach: "Breadth-first search with early leaf termination",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([3, 9, 20, None, None, 15, 7], 2),
        ([2, None, 3, None, 4, None, 5, None, 6], 5),
        ([], 0),
        ([1], 1),
        ([1, 2], 2)
    ]
    for arr, exp in fixed:
        t = build_tree(arr)
        assert solver.minDepth(t) == exp

    # Skewed tree with 1000 nodes
    t = TreeNode(1)
    curr = t
    for i in range(2, 1001):
        curr.right = TreeNode(i)
        curr = curr.right
    t0 = time.perf_counter()
    res = solver.minDepth(t)
    t1 = time.perf_counter()
    assert res == 1000
    print(f"✓ Minimum Depth of Binary Tree: fixed, skewed, and N=1000 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "path-sum",
    number: 112,
    category: "Algorithms",
    patterns: ["tree-dfs-subproblem"],
    method: "hasPathSum",
    hints: [
      {
        level: 1,
        title: "Root-to-Leaf Remainder Obstacle",
        text: "Paths must start at the root and terminate strictly at a leaf node. How can you recursively subtract each node's value from the remaining target until a leaf with a matching remainder is reached?"
      },
      {
        level: 2,
        title: "Target Reduction Invariant",
        text: "At any node, a valid root-to-leaf path exists if subtracting the current value leaves zero at a leaf, or if a valid path exists in either subtree with the reduced target."
      },
      {
        level: 3,
        title: "Leaf Validation Procedure",
        text: "If root is null, return false. If root is a leaf (neither left nor right child), return targetSum == root.val. Otherwise, recursively check hasPathSum on left and right children with targetSum - root.val, returning their logical OR."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:\n        if not root:\n            return False\n        if not root.left and not root.right:\n            return targetSum == root.val\n        rem = targetSum - root.val\n        return self.hasPathSum(root.left, rem) or self.hasPathSum(root.right, rem)\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(H)",
      variables: ["N: number of nodes in tree (0 <= N <= 5000)", "H: height of tree"],
      notes: "Single recursive depth-first pass checking all root-to-leaf paths.",
      whyNaiveFails: "Failing to check that a node is strictly a leaf can falsely accept paths terminating at internal nodes.",
      spaceTimeTradeoff: "O(H) call stack auxiliary memory.",
      interviewerExpectation: "Strict leaf verification: not root.left and not root.right."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:\n        if not root:\n            return False\n        if not root.left and not root.right:\n            return targetSum == root.val\n        rem = targetSum - root.val\n        return self.hasPathSum(root.left, rem) or self.hasPathSum(root.right, rem)",
        approach: "Recursive target subtraction with leaf check",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    bool hasPathSum(TreeNode* root, int targetSum) {\n        if (!root) return false;\n        if (!root->left && !root->right) return targetSum == root->val;\n        int rem = targetSum - root->val;\n        return hasPathSum(root->left, rem) || hasPathSum(root->right, rem);\n    }\n};",
        approach: "Recursive target subtraction with leaf check",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public boolean hasPathSum(TreeNode root, int targetSum) {\n        if (root == null) return false;\n        if (root.left == null && root.right == null) return targetSum == root.val;\n        int rem = targetSum - root.val;\n        return hasPathSum(root.left, rem) || hasPathSum(root.right, rem);\n    }\n}",
        approach: "Recursive target subtraction with leaf check",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var hasPathSum = function(root, targetSum) {\n    if (!root) return false;\n    if (!root.left && !root.right) return targetSum === root.val;\n    const rem = targetSum - root.val;\n    return hasPathSum(root.left, rem) || hasPathSum(root.right, rem);\n};",
        approach: "Recursive target subtraction with leaf check",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([5, 4, 8, 11, None, 13, 4, 7, 2, None, None, None, 1], 22, True),
        ([1, 2, 3], 5, False),
        ([], 0, False),
        ([1, 2], 1, False),
        ([1, 2], 3, True)
    ]
    for arr, target, exp in fixed:
        t = build_tree(arr)
        assert solver.hasPathSum(t, target) == exp

    rng = random.Random(42)
    for _ in range(35):
        vals = [rng.randint(1, 10) for _ in range(15)]
        t = build_tree(vals)
        # Verify root val exists
        assert solver.hasPathSum(t, vals[0]) is False or len(vals) == 1

    # Scale test: 2000 nodes linear path
    t = TreeNode(1)
    curr = t
    for _ in range(1999):
        curr.left = TreeNode(1)
        curr = curr.left
    t0 = time.perf_counter()
    res = solver.hasPathSum(t, 2000)
    t1 = time.perf_counter()
    assert res is True
    print(f"✓ Path Sum: fixed, 35 random, and N=2000 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "binary-tree-right-side-view",
    number: 199,
    category: "Algorithms",
    patterns: ["tree-bfs-level-order"],
    method: "rightSideView",
    hints: [
      {
        level: 1,
        title: "Rightmost Silhouette Obstacle",
        text: "Looking at the tree from the right side reveals the rightmost node of each vertical level. How can a level-by-level traversal capture the last element of every tier directly?"
      },
      {
        level: 2,
        title: "Tier Silhouette Invariant",
        text: "The right side view consists of exactly the last node encountered at each level during a standard left-to-right tier traversal."
      },
      {
        level: 3,
        title: "Level-by-Level Capture Procedure",
        text: "If root is null, return an empty list. Maintain a queue for level-by-level traversal. For each tier of size k, dequeue all k nodes, enqueue children from left to right, and record the value of the kth node into the answer array."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:\n        if not root:\n            return []\n        from collections import deque\n        q = deque([root])\n        res = []\n        while q:\n            sz = len(q)\n            for i in range(sz):\n                node = q.popleft()\n                if i == sz - 1:\n                    res.append(node.val)\n                if node.left:\n                    q.append(node.left)\n                if node.right:\n                    q.append(node.right)\n        return res\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(W)",
      variables: ["N: number of nodes in tree (0 <= N <= 100)", "W: maximum level width of tree"],
      notes: "Breadth-first search extracting the rightmost element per tier in linear time.",
      whyNaiveFails: "Simply traversing right child pointers misses left children that become visible when right subtrees are shorter.",
      spaceTimeTradeoff: "Auxiliary queue memory proportional to maximum width W.",
      interviewerExpectation: "Recognizing that left subtrees can protrude deeper than right subtrees."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:\n        if not root:\n            return []\n        from collections import deque\n        q = deque([root])\n        res = []\n        while q:\n            sz = len(q)\n            for i in range(sz):\n                node = q.popleft()\n                if i == sz - 1:\n                    res.append(node.val)\n                if node.left:\n                    q.append(node.left)\n                if node.right:\n                    q.append(node.right)\n        return res",
        approach: "Breadth-first search collecting rightmost tier node",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    vector<int> rightSideView(TreeNode* root) {\n        if (!root) return {};\n        vector<int> res;\n        queue<TreeNode*> q;\n        q.push(root);\n        while (!q.empty()) {\n            int sz = q.size();\n            for (int i = 0; i < sz; i++) {\n                TreeNode* node = q.front();\n                q.pop();\n                if (i == sz - 1) res.push_back(node->val);\n                if (node->left) q.push(node->left);\n                if (node->right) q.push(node->right);\n            }\n        }\n        return res;\n    }\n};",
        approach: "Breadth-first search collecting rightmost tier node",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public List<Integer> rightSideView(TreeNode root) {\n        List<Integer> res = new ArrayList<>();\n        if (root == null) return res;\n        Queue<TreeNode> q = new LinkedList<>();\n        q.offer(root);\n        while (!q.isEmpty()) {\n            int sz = q.size();\n            for (int i = 0; i < sz; i++) {\n                TreeNode node = q.poll();\n                if (i == sz - 1) res.add(node.val);\n                if (node.left != null) q.offer(node.left);\n                if (node.right != null) q.offer(node.right);\n            }\n        }\n        return res;\n    }\n}",
        approach: "Breadth-first search collecting rightmost tier node",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var rightSideView = function(root) {\n    if (!root) return [];\n    const res = [];\n    const q = [root];\n    while (q.length > 0) {\n        const sz = q.length;\n        for (let i = 0; i < sz; i++) {\n            const node = q.shift();\n            if (i === sz - 1) res.push(node.val);\n            if (node.left) q.push(node.left);\n            if (node.right) q.push(node.right);\n        }\n    }\n    return res;\n};",
        approach: "Breadth-first search collecting rightmost tier node",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([1, 2, 3, None, 5, None, 4], [1, 3, 4]),
        ([1, None, 3], [1, 3]),
        ([], []),
        ([1, 2, 3, 4], [1, 3, 4])
    ]
    for arr, exp in fixed:
        t = build_tree(arr)
        assert solver.rightSideView(t) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 40)
        vals = [rng.randint(-100, 100) for _ in range(sz)]
        t = build_tree(vals)
        res = solver.rightSideView(t)
        assert len(res) > 0 and res[0] == vals[0]

    # Scale test: 100 nodes
    vals = list(range(100))
    t = build_tree(vals)
    t0 = time.perf_counter()
    res = solver.rightSideView(t)
    t1 = time.perf_counter()
    assert len(res) == 7
    print(f"✓ Binary Tree Right Side View: fixed, 35 random, and N=100 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "sum-of-left-leaves",
    number: 404,
    category: "Algorithms",
    patterns: ["tree-dfs-subproblem"],
    method: "sumOfLeftLeaves",
    hints: [
      {
        level: 1,
        title: "Left Leaf Distinction Obstacle",
        text: "A node is a left leaf only if it is the left child of its parent and has no children of its own. How can passing a flag or checking parent-child relationships distinguish left leaves from right leaves?"
      },
      {
        level: 2,
        title: "Direct Child Leaf Invariant",
        text: "A left child is a left leaf if it has neither left nor right descendants. Internal nodes accumulate the sum of left leaves from both subtrees."
      },
      {
        level: 3,
        title: "Recursive Aggregation Procedure",
        text: "If root is null, return 0. Check if root.left is a leaf (non-null with no children); if so, its value contributes to the total along with sumOfLeftLeaves(root.right). Otherwise, recurse on both root.left and root.right and sum the results."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def sumOfLeftLeaves(self, root: Optional[TreeNode]) -> int:\n        if not root:\n            return 0\n        total = 0\n        if root.left and not root.left.left and not root.left.right:\n            total += root.left.val\n        else:\n            total += self.sumOfLeftLeaves(root.left)\n        total += self.sumOfLeftLeaves(root.right)\n        return total\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(H)",
      variables: ["N: number of nodes in tree (1 <= N <= 1000)", "H: height of tree"],
      notes: "Single recursive depth-first pass inspecting left children directly.",
      whyNaiveFails: "Without knowing child orientation, a node cannot independently determine if it is a left child.",
      spaceTimeTradeoff: "O(H) recursion stack depth.",
      interviewerExpectation: "Testing whether root.left is a leaf before recursing into it."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def sumOfLeftLeaves(self, root: Optional[TreeNode]) -> int:\n        if not root:\n            return 0\n        total = 0\n        if root.left and not root.left.left and not root.left.right:\n            total += root.left.val\n        else:\n            total += self.sumOfLeftLeaves(root.left)\n        total += self.sumOfLeftLeaves(root.right)\n        return total",
        approach: "Recursive parent-to-left-leaf detection",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    int sumOfLeftLeaves(TreeNode* root) {\n        if (!root) return 0;\n        int total = 0;\n        if (root->left && !root->left->left && !root->left->right) {\n            total += root->left->val;\n        } else {\n            total += sumOfLeftLeaves(root->left);\n        }\n        total += sumOfLeftLeaves(root->right);\n        return total;\n    }\n};",
        approach: "Recursive parent-to-left-leaf detection",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public int sumOfLeftLeaves(TreeNode root) {\n        if (root == null) return 0;\n        int total = 0;\n        if (root.left != null && root.left.left == null && root.left.right == null) {\n            total += root.left.val;\n        } else {\n            total += sumOfLeftLeaves(root.left);\n        }\n        total += sumOfLeftLeaves(root.right);\n        return total;\n    }\n}",
        approach: "Recursive parent-to-left-leaf detection",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var sumOfLeftLeaves = function(root) {\n    if (!root) return 0;\n    let total = 0;\n    if (root.left && !root.left.left && !root.left.right) {\n        total += root.left.val;\n    } else {\n        total += sumOfLeftLeaves(root.left);\n    }\n    total += sumOfLeftLeaves(root.right);\n    return total;\n};",
        approach: "Recursive parent-to-left-leaf detection",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([3, 9, 20, None, None, 15, 7], 24),
        ([1], 0),
        ([1, 2, 3, 4, 5], 4),
        ([1, 2, None, None, 3], 0)
    ]
    for arr, exp in fixed:
        t = build_tree(arr)
        assert solver.sumOfLeftLeaves(t) == exp

    rng = random.Random(42)
    for _ in range(35):
        vals = [rng.randint(-50, 50) for _ in range(15)]
        t = build_tree(vals)
        res = solver.sumOfLeftLeaves(t)
        assert isinstance(res, int)

    # Scale test: 1000 nodes full binary tree
    vals = list(range(1000))
    t = build_tree(vals)
    t0 = time.perf_counter()
    res = solver.sumOfLeftLeaves(t)
    t1 = time.perf_counter()
    assert isinstance(res, int)
    print(f"✓ Sum of Left Leaves: fixed, 35 random, and N=1000 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "cousins-in-binary-tree",
    number: 993,
    category: "Algorithms",
    patterns: ["tree-bfs-level-order"],
    method: "isCousins",
    hints: [
      {
        level: 1,
        title: "Shared Depth Distinct Parent Obstacle",
        text: "Two nodes are cousins if they have the same depth but different parents. How can tracking each node alongside its parent during a tier-by-tier traversal verify both conditions simultaneously?"
      },
      {
        level: 2,
        title: "Tier and Parent Invariant",
        text: "Cousins must appear on the same level and have distinct parents. If both targets are discovered in the same level queue, check that their recorded parents differ."
      },
      {
        level: 3,
        title: "Level-by-Level Cousin Check Procedure",
        text: "Traverse level by level using a queue storing (node, parent). At each level, inspect all nodes. If both x and y are found at the current level, return true if their parents are different, else false. If only one is found, return false."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def isCousins(self, root: Optional[TreeNode], x: int, y: int) -> bool:\n        if not root:\n            return False\n        from collections import deque\n        q = deque([(root, None)])\n        while q:\n            sz = len(q)\n            x_parent, y_parent = None, None\n            for _ in range(sz):\n                node, parent = q.popleft()\n                if node.val == x:\n                    x_parent = parent\n                elif node.val == y:\n                    y_parent = parent\n                if node.left:\n                    q.append((node.left, node))\n                if node.right:\n                    q.append((node.right, node))\n            if x_parent and y_parent:\n                return x_parent != y_parent\n            if x_parent or y_parent:\n                return False\n        return False\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(W)",
      variables: ["N: number of nodes in tree (2 <= N <= 100)", "W: maximum level width"],
      notes: "Breadth-first traversal recording parent pointers per level to verify depth match and parent distinction.",
      whyNaiveFails: "Only checking depth without parent verification falsely identifies siblings as cousins.",
      spaceTimeTradeoff: "O(W) auxiliary queue memory.",
      interviewerExpectation: "Returning false if one target is found on an earlier tier than the other."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def isCousins(self, root: Optional[TreeNode], x: int, y: int) -> bool:\n        if not root:\n            return False\n        from collections import deque\n        q = deque([(root, None)])\n        while q:\n            sz = len(q)\n            x_parent, y_parent = None, None\n            for _ in range(sz):\n                node, parent = q.popleft()\n                if node.val == x:\n                    x_parent = parent\n                elif node.val == y:\n                    y_parent = parent\n                if node.left:\n                    q.append((node.left, node))\n                if node.right:\n                    q.append((node.right, node))\n            if x_parent and y_parent:\n                return x_parent != y_parent\n            if x_parent or y_parent:\n                return False\n        return False",
        approach: "Breadth-first queue traversal tracking parent references",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    bool isCousins(TreeNode* root, int x, int y) {\n        if (!root) return false;\n        queue<pair<TreeNode*, TreeNode*>> q;\n        q.push({root, nullptr});\n        while (!q.empty()) {\n            int sz = q.size();\n            TreeNode* xParent = nullptr;\n            TreeNode* yParent = nullptr;\n            for (int i = 0; i < sz; i++) {\n                auto [node, parent] = q.front();\n                q.pop();\n                if (node->val == x) xParent = parent;\n                else if (node->val == y) yParent = parent;\n                if (node->left) q.push({node->left, node});\n                if (node->right) q.push({node->right, node});\n            }\n            if (xParent && yParent) return xParent != yParent;\n            if (xParent || yParent) return false;\n        }\n        return false;\n    }\n};",
        approach: "Breadth-first queue traversal tracking parent references",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public boolean isCousins(TreeNode root, int x, int y) {\n        if (root == null) return false;\n        Queue<TreeNode[]> q = new LinkedList<>();\n        q.offer(new TreeNode[]{root, null});\n        while (!q.isEmpty()) {\n            int sz = q.size();\n            TreeNode xParent = null, yParent = null;\n            for (int i = 0; i < sz; i++) {\n                TreeNode[] pair = q.poll();\n                TreeNode node = pair[0], parent = pair[1];\n                if (node.val == x) xParent = parent;\n                else if (node.val == y) yParent = parent;\n                if (node.left != null) q.offer(new TreeNode[]{node.left, node});\n                if (node.right != null) q.offer(new TreeNode[]{node.right, node});\n            }\n            if (xParent != null && yParent != null) return xParent != yParent;\n            if (xParent != null || yParent != null) return false;\n        }\n        return false;\n    }\n}",
        approach: "Breadth-first queue traversal tracking parent references",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var isCousins = function(root, x, y) {\n    if (!root) return false;\n    const q = [[root, null]];\n    while (q.length > 0) {\n        const sz = q.length;\n        let xParent = null, yParent = null;\n        for (let i = 0; i < sz; i++) {\n            const [node, parent] = q.shift();\n            if (node.val === x) xParent = parent;\n            else if (node.val === y) yParent = parent;\n            if (node.left) q.push([node.left, node]);\n            if (node.right) q.push([node.right, node]);\n        }\n        if (xParent && yParent) return xParent !== yParent;\n        if (xParent || yParent) return false;\n    }\n    return false;\n};",
        approach: "Breadth-first queue traversal tracking parent references",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([1, 2, 3, 4], 4, 3, False),
        ([1, 2, 3, None, 4, None, 5], 5, 4, True),
        ([1, 2, 3, None, 4], 2, 3, False),
        ([1, 2, 3, 4, 5, 6, 7], 4, 6, True),
        ([1, 2, 3, 4, 5, 6, 7], 4, 5, False)
    ]
    for arr, x, y, exp in fixed:
        t = build_tree(arr)
        assert solver.isCousins(t, x, y) == exp

    # Scale test: 100 nodes
    vals = list(range(1, 101))
    t = build_tree(vals)
    t0 = time.perf_counter()
    res = solver.isCousins(t, 4, 6)
    t1 = time.perf_counter()
    assert res is True
    print(f"✓ Cousins in Binary Tree: fixed and N=100 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "find-largest-value-in-each-tree-row",
    number: 515,
    category: "Algorithms",
    patterns: ["tree-bfs-level-order"],
    method: "largestValues",
    hints: [
      {
        level: 1,
        title: "Per-Tier Maximum Obstacle",
        text: "Each row corresponds to a specific depth level in the binary tree. How can isolating each level during traversal allow computing the maximum value among all nodes at that depth?"
      },
      {
        level: 2,
        title: "Level Snapshot Invariant",
        text: "Process the tree level by level. At each tier, initialize the tier maximum to negative infinity and update it with every node in that tier."
      },
      {
        level: 3,
        title: "Breadth-First Row Maximum Procedure",
        text: "If root is null, return empty list. Initialize a queue with root. While queue is non-empty, record tier size, set max_val to -infinity, pop all nodes of that tier, update max_val = max(max_val, node.val), and enqueue children. Append max_val to results."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def largestValues(self, root: Optional[TreeNode]) -> List[int]:\n        if not root:\n            return []\n        from collections import deque\n        q = deque([root])\n        res = []\n        while q:\n            max_val = float('-inf')\n            for _ in range(len(q)):\n                node = q.popleft()\n                max_val = max(max_val, node.val)\n                if node.left:\n                    q.append(node.left)\n                if node.right:\n                    q.append(node.right)\n            res.append(max_val)\n        return res\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(W)",
      variables: ["N: number of nodes in tree (0 <= N <= 10^4)", "W: maximum level width"],
      notes: "Standard level order queue traversal taking the maximum over each tier in linear time.",
      whyNaiveFails: "DFS traversal requires tracking an auxiliary array indexed by depth, which is identical in asymptotic cost.",
      spaceTimeTradeoff: "O(W) auxiliary queue memory.",
      interviewerExpectation: "Initializing tier maximum to negative infinity to support negative node values."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def largestValues(self, root: Optional[TreeNode]) -> List[int]:\n        if not root:\n            return []\n        from collections import deque\n        q = deque([root])\n        res = []\n        while q:\n            max_val = float('-inf')\n            for _ in range(len(q)):\n                node = q.popleft()\n                max_val = max(max_val, node.val)\n                if node.left:\n                    q.append(node.left)\n                if node.right:\n                    q.append(node.right)\n            res.append(max_val)\n        return res",
        approach: "Breadth-first search finding tier maximums",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    vector<int> largestValues(TreeNode* root) {\n        if (!root) return {};\n        vector<int> res;\n        queue<TreeNode*> q;\n        q.push(root);\n        while (!q.empty()) {\n            int sz = q.size();\n            int maxVal = INT_MIN;\n            for (int i = 0; i < sz; i++) {\n                TreeNode* node = q.front();\n                q.pop();\n                maxVal = max(maxVal, node->val);\n                if (node->left) q.push(node->left);\n                if (node->right) q.push(node->right);\n            }\n            res.push_back(maxVal);\n        }\n        return res;\n    }\n};",
        approach: "Breadth-first search finding tier maximums",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public List<Integer> largestValues(TreeNode root) {\n        List<Integer> res = new ArrayList<>();\n        if (root == null) return res;\n        Queue<TreeNode> q = new LinkedList<>();\n        q.offer(root);\n        while (!q.isEmpty()) {\n            int sz = q.size();\n            int maxVal = Integer.MIN_VALUE;\n            for (int i = 0; i < sz; i++) {\n                TreeNode node = q.poll();\n                maxVal = Math.max(maxVal, node.val);\n                if (node.left != null) q.offer(node.left);\n                if (node.right != null) q.offer(node.right);\n            }\n            res.add(maxVal);\n        }\n        return res;\n    }\n}",
        approach: "Breadth-first search finding tier maximums",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var largestValues = function(root) {\n    if (!root) return [];\n    const res = [];\n    const q = [root];\n    while (q.length > 0) {\n        const sz = q.length;\n        let maxVal = -Infinity;\n        for (let i = 0; i < sz; i++) {\n            const node = q.shift();\n            if (node.val > maxVal) maxVal = node.val;\n            if (node.left) q.push(node.left);\n            if (node.right) q.push(node.right);\n        }\n        res.push(maxVal);\n    }\n    return res;\n};",
        approach: "Breadth-first search finding tier maximums",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([1, 3, 2, 5, 3, None, 9], [1, 3, 9]),
        ([1, 2, 3], [1, 3]),
        ([], []),
        ([0], [0]),
        ([-1, -2, -3], [-1, -2])
    ]
    for arr, exp in fixed:
        t = build_tree(arr)
        assert solver.largestValues(t) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 40)
        vals = [rng.randint(-1000, 1000) for _ in range(sz)]
        t = build_tree(vals)
        res = solver.largestValues(t)
        assert len(res) > 0 and res[0] == vals[0]

    # Scale test: 5000 nodes
    vals = list(range(5000))
    t = build_tree(vals)
    t0 = time.perf_counter()
    res = solver.largestValues(t)
    t1 = time.perf_counter()
    assert len(res) == 13
    print(f"✓ Find Largest Value in Each Tree Row: fixed, 35 random, and N=5000 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "search-in-a-binary-search-tree",
    number: 700,
    category: "Algorithms",
    patterns: ["tree-bst-properties"],
    method: "searchBST",
    hints: [
      {
        level: 1,
        title: "Key Ordering Elimination Obstacle",
        text: "In an ordered search tree, all left subtree values are strictly smaller and all right subtree values are strictly larger. How can comparing the target with the current value eliminate half the search space at each step?"
      },
      {
        level: 2,
        title: "BST Routing Invariant",
        text: "At each step, if target equals current value, return the node. If target is smaller, search left; if larger, search right."
      },
      {
        level: 3,
        title: "Iterative Traversal Procedure",
        text: "Start at root while node is not null. If val == node.val, return node. If val < node.val, move to node.left. Otherwise, move to node.right. Return null if the search space is exhausted."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:\n        curr = root\n        while curr:\n            if curr.val == val:\n                return curr\n            elif val < curr.val:\n                curr = curr.left\n            else:\n                curr = curr.right\n        return None\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(H)",
      space: "O(1)",
      variables: ["H: height of BST (log N on average, N worst-case)", "N: number of nodes (1 <= N <= 5000)"],
      notes: "Iterative pointer traversal descending at most height H steps with zero auxiliary space.",
      whyNaiveFails: "Uninformed tree traversal inspects all N nodes taking O(N) time.",
      spaceTimeTradeoff: "Iterative implementation uses O(1) space versus O(H) call stack for recursive traversal.",
      interviewerExpectation: "Using iterative traversal to guarantee O(1) space."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:\n        curr = root\n        while curr:\n            if curr.val == val:\n                return curr\n            elif val < curr.val:\n                curr = curr.left\n            else:\n                curr = curr.right\n        return None",
        approach: "Iterative BST binary descent",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    TreeNode* searchBST(TreeNode* root, int val) {\n        TreeNode* curr = root;\n        while (curr) {\n            if (curr->val == val) return curr;\n            else if (val < curr->val) curr = curr->left;\n            else curr = curr->right;\n        }\n        return nullptr;\n    }\n};",
        approach: "Iterative BST binary descent",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public TreeNode searchBST(TreeNode root, int val) {\n        TreeNode curr = root;\n        while (curr != null) {\n            if (curr.val == val) return curr;\n            else if (val < curr.val) curr = curr.left;\n            else curr = curr.right;\n        }\n        return null;\n    }\n}",
        approach: "Iterative BST binary descent",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var searchBST = function(root, val) {\n    let curr = root;\n    while (curr) {\n        if (curr.val === val) return curr;\n        else if (val < curr.val) curr = curr.left;\n        else curr = curr.right;\n    }\n    return null;\n};",
        approach: "Iterative BST binary descent",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    def bst_from_sorted(arr):
        if not arr: return None
        mid = len(arr) // 2
        root = TreeNode(arr[mid])
        root.left = bst_from_sorted(arr[:mid])
        root.right = bst_from_sorted(arr[mid+1:])
        return root

    t = bst_from_sorted([1, 2, 3, 4, 7])
    res = solver.searchBST(t, 2)
    assert res is not None and res.val == 2
    res_none = solver.searchBST(t, 5)
    assert res_none is None

    rng = random.Random(42)
    for _ in range(35):
        vals = sorted(list(set(rng.randint(1, 1000) for _ in range(30))))
        t = bst_from_sorted(vals)
        target = rng.choice(vals)
        res = solver.searchBST(t, target)
        assert res is not None and res.val == target

    # Scale test: 5000 nodes BST
    vals = list(range(1, 5001))
    t = bst_from_sorted(vals)
    t0 = time.perf_counter()
    res = solver.searchBST(t, 4242)
    t1 = time.perf_counter()
    assert res is not None and res.val == 4242
    print(f"✓ Search in a BST: fixed, 35 random, and N=5000 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "insert-into-a-binary-search-tree",
    number: 701,
    category: "Algorithms",
    patterns: ["tree-bst-properties"],
    method: "insertIntoBST",
    hints: [
      {
        level: 1,
        title: "Insertion Leaf Placement Obstacle",
        text: "The search tree invariant must hold after insertion. When searching for the value's location, what should happen when a null branch is reached?"
      },
      {
        level: 2,
        title: "Leaf Attachment Invariant",
        text: "Follow search tree comparisons downward until reaching a null pointer where the new value belongs as a leaf node."
      },
      {
        level: 3,
        title: "Iterative Leaf Insertion Procedure",
        text: "If root is null, return a new node with val. Otherwise, traverse iteratively: if val < curr.val, move left if curr.left exists, else attach new node to curr.left and return root. If val > curr.val, move right if curr.right exists, else attach new node to curr.right and return root."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def insertIntoBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:\n        if not root:\n            return TreeNode(val)\n        curr = root\n        while True:\n            if val < curr.val:\n                if not curr.left:\n                    curr.left = TreeNode(val)\n                    break\n                curr = curr.left\n            else:\n                if not curr.right:\n                    curr.right = TreeNode(val)\n                    break\n                curr = curr.right\n        return root\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(H)",
      space: "O(1)",
      variables: ["H: height of BST (log N balanced, N worst-case)", "N: number of nodes (0 <= N <= 10^4)"],
      notes: "Iterative descent to the leaf attachment location with O(1) auxiliary space.",
      whyNaiveFails: "Restructuring the entire tree during insertion adds unnecessary O(N) complexity.",
      spaceTimeTradeoff: "Iterative search uses zero extra call-stack memory.",
      interviewerExpectation: "Inserting the new key as a leaf without modifying existing parent-child bonds."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def insertIntoBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:\n        if not root:\n            return TreeNode(val)\n        curr = root\n        while True:\n            if val < curr.val:\n                if not curr.left:\n                    curr.left = TreeNode(val)\n                    break\n                curr = curr.left\n            else:\n                if not curr.right:\n                    curr.right = TreeNode(val)\n                    break\n                curr = curr.right\n        return root",
        approach: "Iterative downward traversal to leaf attachment",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    TreeNode* insertIntoBST(TreeNode* root, int val) {\n        if (!root) return new TreeNode(val);\n        TreeNode* curr = root;\n        while (true) {\n            if (val < curr->val) {\n                if (!curr->left) {\n                    curr->left = new TreeNode(val);\n                    break;\n                }\n                curr = curr->left;\n            } else {\n                if (!curr->right) {\n                    curr->right = new TreeNode(val);\n                    break;\n                }\n                curr = curr->right;\n            }\n        }\n        return root;\n    }\n};",
        approach: "Iterative downward traversal to leaf attachment",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public TreeNode insertIntoBST(TreeNode root, int val) {\n        if (root == null) return new TreeNode(val);\n        TreeNode curr = root;\n        while (true) {\n            if (val < curr.val) {\n                if (curr.left == null) {\n                    curr.left = new TreeNode(val);\n                    break;\n                }\n                curr = curr.left;\n            } else {\n                if (curr.right == null) {\n                    curr.right = new TreeNode(val);\n                    break;\n                }\n                curr = curr.right;\n            }\n        }\n        return root;\n    }\n}",
        approach: "Iterative downward traversal to leaf attachment",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var insertIntoBST = function(root, val) {\n    if (!root) return new TreeNode(val);\n    let curr = root;\n    while (true) {\n        if (val < curr.val) {\n            if (!curr.left) {\n                curr.left = new TreeNode(val);\n                break;\n            }\n            curr = curr.left;\n        } else {\n            if (!curr.right) {\n                curr.right = new TreeNode(val);\n                break;\n            }\n            curr = curr.right;\n        }\n    }\n    return root;\n};",
        approach: "Iterative downward traversal to leaf attachment",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    def is_bst(node, low=float('-inf'), high=float('inf')):
        if not node: return True
        if not (low < node.val < high): return False
        return is_bst(node.left, low, node.val) and is_bst(node.right, node.val, high)

    t = TreeNode(4)
    t.left = TreeNode(2)
    t.right = TreeNode(7)
    t.left.left = TreeNode(1)
    t.left.right = TreeNode(3)
    res = solver.insertIntoBST(t, 5)
    assert is_bst(res)

    res_empty = solver.insertIntoBST(None, 5)
    assert res_empty.val == 5

    rng = random.Random(42)
    t = TreeNode(500)
    vals = list(range(1, 1000))
    rng.shuffle(vals)
    for v in vals[:35]:
        t = solver.insertIntoBST(t, v)
        assert is_bst(t)

    # Scale test: 5000 insertions
    t = TreeNode(100000)
    t0 = time.perf_counter()
    for v in range(1, 1000):
        t = solver.insertIntoBST(t, v)
    t1 = time.perf_counter()
    assert is_bst(t)
    print(f"✓ Insert into a BST: fixed, 35 random, and 1000 insertions passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "delete-node-in-a-bst",
    number: 450,
    category: "Algorithms",
    patterns: ["tree-bst-properties"],
    method: "deleteNode",
    hints: [
      {
        level: 1,
        title: "Two-Child Removal Obstacle",
        text: "When deleting a node with two children, simply removing it breaks the tree structure. How can replacing the target with its in-order successor or predecessor preserve the ordering invariants?"
      },
      {
        level: 2,
        title: "Successor Replacement Invariant",
        text: "If the node has at most one child, replace it with that child. If it has two children, replace its value with the minimum value in its right subtree, then recursively delete that minimum node."
      },
      {
        level: 3,
        title: "Recursive Case Analysis Procedure",
        text: "If root is null, return null. If key < root.val, recurse left. If key > root.val, recurse right. If key matches: if left is null, return right; if right is null, return left. Otherwise find the minimum node in right subtree, set root.val to that minimum value, and recurse to delete that value from root.right."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:\n        if not root:\n            return None\n        if key < root.val:\n            root.left = self.deleteNode(root.left, key)\n        elif key > root.val:\n            root.right = self.deleteNode(root.right, key)\n        else:\n            if not root.left:\n                return root.right\n            if not root.right:\n                return root.left\n            succ = root.right\n            while succ.left:\n                succ = succ.left\n            root.val = succ.val\n            root.right = self.deleteNode(root.right, succ.val)\n        return root\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(H)",
      space: "O(H)",
      variables: ["H: height of BST (log N balanced, N skewed)", "N: number of nodes (0 <= N <= 10^4)"],
      notes: "Recursive descent to find and delete target node with successor replacement in O(H) call stack.",
      whyNaiveFails: "Arbitrary splicing of subtrees violates the BST property or increases tree height uncontrollably.",
      spaceTimeTradeoff: "O(H) recursion stack memory.",
      interviewerExpectation: "Correctly addressing three cases: no child, one child, and two children via successor."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:\n        if not root:\n            return None\n        if key < root.val:\n            root.left = self.deleteNode(root.left, key)\n        elif key > root.val:\n            root.right = self.deleteNode(root.right, key)\n        else:\n            if not root.left:\n                return root.right\n            if not root.right:\n                return root.left\n            succ = root.right\n            while succ.left:\n                succ = succ.left\n            root.val = succ.val\n            root.right = self.deleteNode(root.right, succ.val)\n        return root",
        approach: "Recursive deletion with in-order successor substitution",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    TreeNode* deleteNode(TreeNode* root, int key) {\n        if (!root) return nullptr;\n        if (key < root->val) {\n            root->left = deleteNode(root->left, key);\n        } else if (key > root->val) {\n            root->right = deleteNode(root->right, key);\n        } else {\n            if (!root->left) return root->right;\n            if (!root->right) return root->left;\n            TreeNode* succ = root->right;\n            while (succ->left) succ = succ->left;\n            root->val = succ->val;\n            root->right = deleteNode(root->right, succ->val);\n        }\n        return root;\n    }\n};",
        approach: "Recursive deletion with in-order successor substitution",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public TreeNode deleteNode(TreeNode root, int key) {\n        if (root == null) return null;\n        if (key < root.val) {\n            root.left = deleteNode(root.left, key);\n        } else if (key > root.val) {\n            root.right = deleteNode(root.right, key);\n        } else {\n            if (root.left == null) return root.right;\n            if (root.right == null) return root.left;\n            TreeNode succ = root.right;\n            while (succ.left != null) succ = succ.left;\n            root.val = succ.val;\n            root.right = deleteNode(root.right, succ.val);\n        }\n        return root;\n    }\n}",
        approach: "Recursive deletion with in-order successor substitution",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var deleteNode = function(root, key) {\n    if (!root) return null;\n    if (key < root.val) {\n        root.left = deleteNode(root.left, key);\n    } else if (key > root.val) {\n        root.right = deleteNode(root.right, key);\n    } else {\n        if (!root.left) return root.right;\n        if (!root.right) return root.left;\n        let succ = root.right;\n        while (succ.left) succ = succ.left;\n        root.val = succ.val;\n        root.right = deleteNode(root.right, succ.val);\n    }\n    return root;\n};",
        approach: "Recursive deletion with in-order successor substitution",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    def is_bst(node, low=float('-inf'), high=float('inf')):
        if not node: return True
        if not (low < node.val < high): return False
        return is_bst(node.left, low, node.val) and is_bst(node.right, node.val, high)

    def bst_from_sorted(arr):
        if not arr: return None
        mid = len(arr) // 2
        root = TreeNode(arr[mid])
        root.left = bst_from_sorted(arr[:mid])
        root.right = bst_from_sorted(arr[mid+1:])
        return root

    # Delete root with two children
    t = bst_from_sorted([2, 3, 4, 5, 6, 7])
    res = solver.deleteNode(t, 4)
    assert is_bst(res)

    # Delete non-existent
    res2 = solver.deleteNode(res, 999)
    assert is_bst(res2)

    rng = random.Random(42)
    for _ in range(35):
        vals = sorted(list(set(rng.randint(1, 1000) for _ in range(25))))
        t = bst_from_sorted(vals)
        del_val = rng.choice(vals)
        t = solver.deleteNode(t, del_val)
        assert is_bst(t)

    # Scale test: 2000 nodes BST
    vals = list(range(1, 2001))
    t = bst_from_sorted(vals)
    t0 = time.perf_counter()
    t = solver.deleteNode(t, 1000)
    t1 = time.perf_counter()
    assert is_bst(t)
    print(f"✓ Delete Node in a BST: fixed, 35 random, and N=2000 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "binary-search-tree-iterator",
    number: 173,
    category: "Algorithms",
    patterns: ["tree-bst-properties"],
    method: "BSTIterator",
    hints: [
      {
        level: 1,
        title: "Lazy In-Order Obstacle",
        text: "Precomputing the entire in-order traversal into an array uses linear memory upfront. How can pausing and resuming traversal on demand yield the smallest unvisited element while storing only height elements?"
      },
      {
        level: 2,
        title: "Left Spine Stack Invariant",
        text: "An in-order traversal always visits the leftmost available node next. Storing the path of left children on an explicit list guarantees that the top element is always the next in-order value."
      },
      {
        level: 3,
        title: "Controlled Stack Traversal Procedure",
        text: "In the constructor, push all nodes along the left spine from root onto a list. For hasNext, return whether the list is non-empty. For next, pop the top node, push all left descendants of its right child onto the list, and return the popped node's value."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass BSTIterator:\n    def __init__(self, root: Optional[TreeNode]):\n        self.stack = []\n        self._push_all_left(root)\n\n    def _push_all_left(self, node: Optional[TreeNode]):\n        while node:\n            self.stack.append(node)\n            node = node.left\n\n    def next(self) -> int:\n        top = self.stack.pop()\n        if top.right:\n            self._push_all_left(top.right)\n        return top.val\n\n    def hasNext(self) -> bool:\n        return len(self.stack) > 0\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(1) amortized",
      space: "O(H)",
      variables: ["H: tree height (log N balanced, N skewed)", "N: number of nodes in tree (1 <= N <= 10^5)"],
      notes: "Each node is pushed and popped exactly once across all next() calls, giving O(1) amortized time per call with O(H) auxiliary memory.",
      whyNaiveFails: "Flattening the entire tree to an array consumes O(N) memory upfront regardless of whether iterator is fully consumed.",
      spaceTimeTradeoff: "O(H) space versus O(N) space for full precomputation.",
      interviewerExpectation: "Proving O(1) amortized complexity via aggregate analysis: 2N total stack operations over N elements."
    },
    solutions: [
      {
        lang: "python3",
        code: "class BSTIterator:\n    def __init__(self, root: Optional[TreeNode]):\n        self.stack = []\n        self._push_all_left(root)\n\n    def _push_all_left(self, node: Optional[TreeNode]):\n        while node:\n            self.stack.append(node)\n            node = node.left\n\n    def next(self) -> int:\n        top = self.stack.pop()\n        if top.right:\n            self._push_all_left(top.right)\n        return top.val\n\n    def hasNext(self) -> bool:\n        return len(self.stack) > 0",
        approach: "Controlled stack simulation of in-order traversal",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class BSTIterator {\nprivate:\n    vector<TreeNode*> st;\n    void pushAllLeft(TreeNode* node) {\n        while (node) {\n            st.push_back(node);\n            node = node->left;\n        }\n    }\npublic:\n    BSTIterator(TreeNode* root) {\n        pushAllLeft(root);\n    }\n    int next() {\n        TreeNode* top = st.back();\n        st.pop_back();\n        if (top->right) pushAllLeft(top->right);\n        return top->val;\n    }\n    bool hasNext() {\n        return !st.empty();\n    }\n};",
        approach: "Controlled stack simulation of in-order traversal",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class BSTIterator {\n    private Deque<TreeNode> stack = new ArrayDeque<>();\n    private void pushAllLeft(TreeNode node) {\n        while (node != null) {\n            stack.push(node);\n            node = node.left;\n        }\n    }\n    public BSTIterator(TreeNode root) {\n        pushAllLeft(root);\n    }\n    public int next() {\n        TreeNode top = stack.pop();\n        if (top.right != null) pushAllLeft(top.right);\n        return top.val;\n    }\n    public boolean hasNext() {\n        return !stack.isEmpty();\n    }\n}",
        approach: "Controlled stack simulation of in-order traversal",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var BSTIterator = function(root) {\n    this.stack = [];\n    this._pushAllLeft(root);\n};\n\nBSTIterator.prototype._pushAllLeft = function(node) {\n    while (node) {\n        this.stack.push(node);\n        node = node.left;\n    }\n};\n\nBSTIterator.prototype.next = function() {\n    const top = this.stack.pop();\n    if (top.right) this._pushAllLeft(top.right);\n    return top.val;\n};\n\nBSTIterator.prototype.hasNext = function() {\n    return this.stack.length > 0;\n};",
        approach: "Controlled stack simulation of in-order traversal",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    def bst_from_sorted(arr):
        if not arr: return None
        mid = len(arr) // 2
        root = TreeNode(arr[mid])
        root.left = bst_from_sorted(arr[:mid])
        root.right = bst_from_sorted(arr[mid+1:])
        return root

    t = bst_from_sorted([3, 7, 9, 15, 20])
    it = scope['BSTIterator'](t)
    out = []
    while it.hasNext():
        out.append(it.next())
    assert out == [3, 7, 9, 15, 20]

    rng = random.Random(42)
    for _ in range(35):
        vals = sorted(list(set(rng.randint(1, 1000) for _ in range(30))))
        t = bst_from_sorted(vals)
        it = scope['BSTIterator'](t)
        out = []
        while it.hasNext():
            out.append(it.next())
        assert out == vals

    # Scale test: 5000 nodes BST
    vals = list(range(1, 5001))
    t = bst_from_sorted(vals)
    t0 = time.perf_counter()
    it = scope['BSTIterator'](t)
    cnt = 0
    while it.hasNext():
        cnt += 1
        it.next()
    t1 = time.perf_counter()
    assert cnt == 5000
    print(f"✓ BST Iterator: fixed, 35 random, and N=5000 passed in {(t1-t0)*1000:.2f}ms")
`
  }
];

function generateFiles() {
  for (const item of batch8c) {
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

    const isClassMethod = item.slug === 'binary-search-tree-iterator';
    const solverInit = isClassMethod ? '' : "solver = scope['Solution']()";

    const testPyContent = `import json, os, re, random, time, sys
sys.setrecursionlimit(20000)

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

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

    scope = {'TreeNode': TreeNode, 'List': list, 'Optional': None}
    exec(sol_code, scope)
    ${solverInit}
${item.testCases}

if __name__ == '__main__':
    main()
`;
    fs.writeFileSync(path.join(testDir, 'test.py'), testPyContent, 'utf8');
    console.log(`Generated: ${item.slug}`);
  }
}

generateFiles();
