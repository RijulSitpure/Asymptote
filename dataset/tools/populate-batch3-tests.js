import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');

const TESTS = {
  'invert-binary-tree': `#!/usr/bin/env python3
import json, os, re, random, time
from typing import Optional

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'invert-binary-tree.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

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

def ref_invert(root):
    if not root:
        return None
    root.left, root.right = ref_invert(root.right), ref_invert(root.left)
    return root

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'TreeNode': TreeNode, 'Optional': Optional}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        [4, 2, 7, 1, 3, 6, 9],
        [2, 1, 3],
        [],
        [1],
        [1, 2],
        [1, None, 2],
        [1, 2, 3, 4, None, None, 5]
    ]

    for arr in fixed:
        t1 = arr_to_tree(arr)
        t2 = arr_to_tree(arr)
        exp = tree_to_arr(ref_invert(t1))
        ans = tree_to_arr(solver.invertTree(t2))
        assert ans == exp, f"Failed on {arr}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(30):
        sz = rng.randint(1, 40)
        nodes = [rng.randint(-100, 100) if rng.random() > 0.15 else None for _ in range(sz)]
        if nodes and nodes[0] is None:
            nodes[0] = 1
        t1 = arr_to_tree(nodes)
        t2 = arr_to_tree(nodes)
        exp = tree_to_arr(ref_invert(t1))
        ans = tree_to_arr(solver.invertTree(t2))
        assert ans == exp

    # Scale test: 1,000 nodes
    big_arr = list(range(1000))
    t0 = time.perf_counter()
    _ = solver.invertTree(arr_to_tree(big_arr))
    t1 = time.perf_counter()
    print(f"✓ Invert Binary Tree: fixed and 30 random cases passed. Scale (1k nodes): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'maximum-depth-of-binary-tree': `#!/usr/bin/env python3
import json, os, re, random, time
from typing import Optional

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'maximum-depth-of-binary-tree.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

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

def ref_max_depth(root):
    if not root:
        return 0
    return 1 + max(ref_max_depth(root.left), ref_max_depth(root.right))

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'TreeNode': TreeNode, 'Optional': Optional}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([3, 9, 20, None, None, 15, 7], 3),
        ([1, None, 2], 2),
        ([], 0),
        ([0], 1),
        ([1, 2, None, 3, None, 4], 4)
    ]

    for arr, exp in fixed:
        t = arr_to_tree(arr)
        assert solver.maxDepth(t) == exp, f"Failed on {arr}: expected {exp}"

    rng = random.Random(42)
    for _ in range(30):
        sz = rng.randint(1, 40)
        nodes = [rng.randint(-100, 100) if rng.random() > 0.15 else None for _ in range(sz)]
        if nodes and nodes[0] is None:
            nodes[0] = 1
        t = arr_to_tree(nodes)
        exp = ref_max_depth(t)
        assert solver.maxDepth(t) == exp

    # Scale test
    big_arr = list(range(2000))
    t0 = time.perf_counter()
    _ = solver.maxDepth(arr_to_tree(big_arr))
    t1 = time.perf_counter()
    print(f"✓ Maximum Depth of Binary Tree: fixed and 30 random cases passed. Scale (2k nodes): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'diameter-of-binary-tree': `#!/usr/bin/env python3
import json, os, re, random, time
from typing import Optional

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'diameter-of-binary-tree.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

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

def ref_diameter(root):
    d = 0
    def depth(node):
        nonlocal d
        if not node: return 0
        l = depth(node.left)
        r = depth(node.right)
        d = max(d, l + r)
        return 1 + max(l, r)
    depth(root)
    return d

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'TreeNode': TreeNode, 'Optional': Optional}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 2, 3, 4, 5], 3),
        ([1, 2], 1),
        ([1], 0),
        ([], 0),
        ([1, 2, None, 3, None, 4], 3)
    ]

    for arr, exp in fixed:
        t = arr_to_tree(arr)
        ans = solver.diameterOfBinaryTree(t)
        assert ans == exp, f"Failed on {arr}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(30):
        sz = rng.randint(1, 40)
        nodes = [rng.randint(-100, 100) if rng.random() > 0.15 else None for _ in range(sz)]
        if nodes and nodes[0] is None:
            nodes[0] = 1
        t = arr_to_tree(nodes)
        exp = ref_diameter(t)
        ans = solver.diameterOfBinaryTree(t)
        assert ans == exp

    # Scale test
    big_arr = list(range(2000))
    t0 = time.perf_counter()
    _ = solver.diameterOfBinaryTree(arr_to_tree(big_arr))
    t1 = time.perf_counter()
    print(f"✓ Diameter of Binary Tree: fixed and 30 random cases passed. Scale (2k nodes): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'balanced-binary-tree': `#!/usr/bin/env python3
import json, os, re, random, time
from typing import Optional

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'balanced-binary-tree.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

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

def ref_is_balanced(root):
    def check(node):
        if not node: return 0
        l = check(node.left)
        if l == -1: return -1
        r = check(node.right)
        if r == -1: return -1
        if abs(l - r) > 1: return -1
        return 1 + max(l, r)
    return check(root) != -1

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'TreeNode': TreeNode, 'Optional': Optional}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([3, 9, 20, None, None, 15, 7], True),
        ([1, 2, 2, 3, 3, None, None, 4, 4], False),
        ([], True),
        ([1], True),
        ([1, 2], True),
        ([1, 2, None, 3], False)
    ]

    for arr, exp in fixed:
        t = arr_to_tree(arr)
        ans = solver.isBalanced(t)
        assert ans == exp, f"Failed on {arr}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(30):
        sz = rng.randint(1, 40)
        nodes = [rng.randint(-100, 100) if rng.random() > 0.15 else None for _ in range(sz)]
        if nodes and nodes[0] is None:
            nodes[0] = 1
        t = arr_to_tree(nodes)
        exp = ref_is_balanced(t)
        ans = solver.isBalanced(t)
        assert ans == exp

    # Scale test
    big_arr = list(range(2000))
    t0 = time.perf_counter()
    _ = solver.isBalanced(arr_to_tree(big_arr))
    t1 = time.perf_counter()
    print(f"✓ Balanced Binary Tree: fixed and 30 random cases passed. Scale (2k nodes): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'lowest-common-ancestor-of-a-binary-search-tree': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'lowest-common-ancestor-of-a-binary-search-tree.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

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

def find_node(root, val):
    curr = root
    while curr:
        if curr.val == val:
            return curr
        elif val < curr.val:
            curr = curr.left
        else:
            curr = curr.right
    return None

def ref_lca(root, p, q):
    curr = root
    while curr:
        if p.val < curr.val and q.val < curr.val:
            curr = curr.left
        elif p.val > curr.val and q.val > curr.val:
            curr = curr.right
        else:
            return curr
    return None

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'TreeNode': TreeNode}
    exec(sol_code, scope)
    solver = scope['Solution']()

    tree_vals = [6, 2, 8, 0, 4, 7, 9, None, None, 3, 5]
    root = arr_to_tree(tree_vals)

    queries = [
        (2, 8, 6),
        (2, 4, 2),
        (3, 5, 4),
        (7, 9, 8),
        (0, 5, 2),
        (0, 4, 2)
    ]

    for pv, qv, exp in queries:
        p = find_node(root, pv)
        q = find_node(root, qv)
        res = solver.lowestCommonAncestor(root, p, q)
        assert res is not None and res.val == exp, f"Failed on p={pv}, q={qv}: expected {exp}, got {res.val if res else None}"

    # Small tree [2, 1]
    root2 = arr_to_tree([2, 1])
    p2 = find_node(root2, 2)
    q2 = find_node(root2, 1)
    res2 = solver.lowestCommonAncestor(root2, p2, q2)
    assert res2 is not None and res2.val == 2

    # Scale test: full BST
    def make_bst(vals):
        if not vals: return None
        mid = len(vals) // 2
        node = TreeNode(vals[mid])
        node.left = make_bst(vals[:mid])
        node.right = make_bst(vals[mid + 1:])
        return node

    large_bst = make_bst(list(range(1000)))
    p_large = find_node(large_bst, 100)
    q_large = find_node(large_bst, 900)
    t0 = time.perf_counter()
    ans_large = solver.lowestCommonAncestor(large_bst, p_large, q_large)
    t1 = time.perf_counter()
    assert ans_large is not None
    print(f"✓ LCA of BST: queries on fixed trees passed. Scale (1k nodes): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'binary-tree-level-order-traversal': `#!/usr/bin/env python3
import json, os, re, random, time
from typing import Optional

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'binary-tree-level-order-traversal.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

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

def ref_level_order(root):
    if not root:
        return []
    res = []
    q = [root]
    while q:
        level = []
        for _ in range(len(q)):
            curr = q.pop(0)
            level.append(curr.val)
            if curr.left: q.append(curr.left)
            if curr.right: q.append(curr.right)
        res.append(level)
    return res

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'TreeNode': TreeNode, 'Optional': Optional}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([3, 9, 20, None, None, 15, 7], [[3], [9, 20], [15, 7]]),
        ([1], [[1]]),
        ([], []),
        ([1, 2, None, 3, None, 4], [[1], [2], [3], [4]])
    ]

    for arr, exp in fixed:
        t = arr_to_tree(arr)
        ans = solver.levelOrder(t)
        assert ans == exp, f"Failed on {arr}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(30):
        sz = rng.randint(1, 40)
        nodes = [rng.randint(-100, 100) if rng.random() > 0.15 else None for _ in range(sz)]
        if nodes and nodes[0] is None:
            nodes[0] = 1
        t = arr_to_tree(nodes)
        exp = ref_level_order(t)
        ans = solver.levelOrder(t)
        assert ans == exp

    # Scale test: 2,000 nodes
    big_arr = list(range(2000))
    t0 = time.perf_counter()
    _ = solver.levelOrder(arr_to_tree(big_arr))
    t1 = time.perf_counter()
    print(f"✓ Binary Tree Level Order Traversal: fixed and 30 random cases passed. Scale (2k nodes): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'validate-binary-search-tree': `#!/usr/bin/env python3
import json, os, re, random, time
from typing import Optional

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'validate-binary-search-tree.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

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

def ref_is_valid_bst(root):
    def validate(node, low, high):
        if not node: return True
        if node.val <= low or node.val >= high: return False
        return validate(node.left, low, node.val) and validate(node.right, node.val, high)
    return validate(root, float('-inf'), float('inf'))

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'TreeNode': TreeNode, 'Optional': Optional}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([2, 1, 3], True),
        ([5, 1, 4, None, None, 3, 6], False),
        ([1, 1], False),
        ([2, 2, 2], False),
        ([5, 4, 6, None, None, 3, 7], False),
        ([2147483647], True),
        ([-2147483648], True),
        ([0, -1], True),
        ([], True)
    ]

    for arr, exp in fixed:
        t = arr_to_tree(arr)
        ans = solver.isValidBST(t)
        assert ans == exp, f"Failed on {arr}: expected {exp}, got {ans}"

    rng = random.Random(42)
    def make_bst(vals):
        if not vals: return None
        mid = len(vals) // 2
        node = TreeNode(vals[mid])
        node.left = make_bst(vals[:mid])
        node.right = make_bst(vals[mid + 1:])
        return node

    for _ in range(30):
        sz = rng.randint(1, 40)
        sorted_vals = sorted(list(set(rng.randint(-500, 500) for _ in range(sz))))
        t = make_bst(sorted_vals)
        if rng.random() < 0.5 and t and (t.left or t.right):
            # Corrupt BST
            node = t.left if t.left else t.right
            node.val = 999999
        exp = ref_is_valid_bst(t)
        ans = solver.isValidBST(t)
        assert ans == exp

    # Scale test: BST of 2,000 nodes
    big_bst = make_bst(list(range(2000)))
    t0 = time.perf_counter()
    _ = solver.isValidBST(big_bst)
    t1 = time.perf_counter()
    print(f"✓ Validate BST: fixed and 30 random cases passed. Scale (2k nodes): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'kth-smallest-element-in-a-bst': `#!/usr/bin/env python3
import json, os, re, random, time
from typing import Optional

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'kth-smallest-element-in-a-bst.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

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

def ref_kth_smallest(root, k):
    res = []
    def inorder(node):
        if not node: return
        inorder(node.left)
        res.append(node.val)
        inorder(node.right)
    inorder(root)
    return res[k - 1]

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'TreeNode': TreeNode, 'Optional': Optional}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([3, 1, 4, None, 2], 1, 1),
        ([5, 3, 6, 2, 4, None, None, 1], 3, 3),
        ([1], 1, 1),
        ([2, 1, 3], 2, 2)
    ]

    for arr, k, exp in fixed:
        t = arr_to_tree(arr)
        ans = solver.kthSmallest(t, k)
        assert ans == exp, f"Failed on {arr}, k={k}: expected {exp}, got {ans}"

    rng = random.Random(42)
    def make_bst(vals):
        if not vals: return None
        mid = len(vals) // 2
        node = TreeNode(vals[mid])
        node.left = make_bst(vals[:mid])
        node.right = make_bst(vals[mid + 1:])
        return node

    for _ in range(30):
        sz = rng.randint(1, 50)
        sorted_vals = sorted(list(set(rng.randint(-500, 500) for _ in range(sz))))
        t = make_bst(sorted_vals)
        k = rng.randint(1, len(sorted_vals))
        exp = sorted_vals[k - 1]
        ans = solver.kthSmallest(t, k)
        assert ans == exp, f"Failed on k={k}: expected {exp}, got {ans}"

    # Scale test: 2,000 nodes
    big_vals = list(range(2000))
    big_bst = make_bst(big_vals)
    t0 = time.perf_counter()
    ans = solver.kthSmallest(big_bst, 1000)
    t1 = time.perf_counter()
    assert ans == 999
    print(f"✓ Kth Smallest in BST: fixed and 30 random cases passed. Scale (2k nodes): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'implement-trie-prefix-tree': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'implement-trie-prefix-tree.json'), 'r') as f:
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

    scope = {}
    exec(sol_code, scope)
    Trie = scope['Trie']

    # Test 1: Standard LeetCode example
    trie = Trie()
    trie.insert("apple")
    assert trie.search("apple") is True
    assert trie.search("app") is False
    assert trie.startsWith("app") is True
    trie.insert("app")
    assert trie.search("app") is True

    # Test 2: Overlapping prefixes
    trie2 = Trie()
    words = ["banana", "band", "bandana", "bee", "be"]
    for w in words: trie2.insert(w)
    for w in words: assert trie2.search(w) is True
    assert trie2.search("ban") is False
    assert trie2.startsWith("ban") is True
    assert trie2.search("beer") is False
    assert trie2.startsWith("beer") is False

    # Test 3: Randomized against set of words
    rng = random.Random(42)
    letters = "abcdef"
    ref_words = set()
    trie3 = Trie()
    for _ in range(200):
        w = ''.join(rng.choice(letters) for _ in range(rng.randint(1, 8)))
        op = rng.choice(["insert", "search", "startsWith"])
        if op == "insert":
            ref_words.add(w)
            trie3.insert(w)
        elif op == "search":
            assert trie3.search(w) == (w in ref_words)
        elif op == "startsWith":
            exp = any(x.startswith(w) for x in ref_words)
            assert trie3.startsWith(w) == exp

    # Scale test: 2,000 insertions
    trie_scale = Trie()
    t0 = time.perf_counter()
    for i in range(2000):
        trie_scale.insert(f"word{i}")
    for i in range(2000):
        assert trie_scale.search(f"word{i}") is True
    t1 = time.perf_counter()
    print(f"✓ Implement Trie: standard, prefix, and 200 random ops passed. Scale (2k words): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'kth-largest-element-in-an-array': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'kth-largest-element-in-an-array.json'), 'r') as f:
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

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([3, 2, 1, 5, 6, 4], 2, 5),
        ([3, 2, 3, 1, 2, 4, 5, 5, 6], 4, 4),
        ([1], 1, 1),
        ([-1, -1], 2, -1),
        ([-1, 2, 0], 1, 2),
        ([7, 6, 5, 4, 3, 2, 1], 5, 3)
    ]

    for nums, k, exp in fixed:
        ans = solver.findKthLargest(list(nums), k)
        assert ans == exp, f"Failed on nums={nums}, k={k}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(1, 100)
        nums = [rng.randint(-1000, 1000) for _ in range(sz)]
        k = rng.randint(1, sz)
        exp = sorted(nums, reverse=True)[k - 1]
        ans = solver.findKthLargest(list(nums), k)
        assert ans == exp, f"Failed on random test: expected {exp}, got {ans}"

    # Scale test: N = 50,000, k = 100
    big = [rng.randint(-100000, 100000) for _ in range(50000)]
    t0 = time.perf_counter()
    ans = solver.findKthLargest(big, 100)
    t1 = time.perf_counter()
    exp = sorted(big, reverse=True)[99]
    assert ans == exp
    print(f"✓ Kth Largest Element in an Array: fixed and 50 random cases passed. Scale (50k elements): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'find-median-from-data-stream': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'find-median-from-data-stream.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_median(arr):
    s = sorted(arr)
    n = len(s)
    if n % 2 == 1:
        return float(s[n // 2])
    return (s[n // 2 - 1] + s[n // 2]) / 2.0

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    MedianFinder = scope['MedianFinder']

    # Test 1: Standard sequence
    mf = MedianFinder()
    mf.addNum(1)
    assert mf.findMedian() == 1.0
    mf.addNum(2)
    assert mf.findMedian() == 1.5
    mf.addNum(3)
    assert mf.findMedian() == 2.0

    # Test 2: Negative numbers
    mf2 = MedianFinder()
    mf2.addNum(-1)
    assert mf2.findMedian() == -1.0
    mf2.addNum(-2)
    assert mf2.findMedian() == -1.5
    mf2.addNum(-3)
    assert mf2.findMedian() == -2.0

    # Test 3: Duplicates
    mf3 = MedianFinder()
    for _ in range(5): mf3.addNum(7)
    assert mf3.findMedian() == 7.0

    # Test 4: Randomized stream
    rng = random.Random(42)
    mf4 = MedianFinder()
    ref = []
    for _ in range(100):
        val = rng.randint(-100, 100)
        mf4.addNum(val)
        ref.append(val)
        exp = ref_median(ref)
        ans = mf4.findMedian()
        assert abs(ans - exp) < 1e-6, f"Expected {exp}, got {ans}"

    # Scale test: 5,000 insertions
    mf_scale = MedianFinder()
    t0 = time.perf_counter()
    for _ in range(5000):
        mf_scale.addNum(rng.randint(-10000, 10000))
    _ = mf_scale.findMedian()
    t1 = time.perf_counter()
    print(f"✓ Find Median from Data Stream: fixed and 100 stream ops passed. Scale (5k nums): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'subsets': `#!/usr/bin/env python3
import json, os, re, random, time, itertools

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'subsets.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def norm_subsets(subs):
    return sorted([sorted(list(s)) for s in subs])

def ref_subsets(nums):
    res = []
    for r in range(len(nums) + 1):
        for combo in itertools.combinations(nums, r):
            res.append(list(combo))
    return res

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        [1, 2, 3],
        [0],
        [],
        [1, 2],
        [-1, 0, 1]
    ]

    for nums in fixed:
        ans = norm_subsets(solver.subsets(nums))
        exp = norm_subsets(ref_subsets(nums))
        assert ans == exp, f"Failed on {nums}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(25):
        sz = rng.randint(1, 8)
        nums = sorted(list(set(rng.randint(-50, 50) for _ in range(sz))))
        ans = norm_subsets(solver.subsets(nums))
        exp = norm_subsets(ref_subsets(nums))
        assert ans == exp

    # Scale test: N = 10 (1024 subsets)
    nums10 = list(range(10))
    t0 = time.perf_counter()
    ans = solver.subsets(nums10)
    t1 = time.perf_counter()
    assert len(ans) == 1024
    print(f"✓ Subsets: fixed and 25 random cases passed. Scale (N=10 -> 1024 subsets): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'combination-sum': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'combination-sum.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def norm_combos(combos):
    return sorted([sorted(list(c)) for c in combos])

def ref_combination_sum(candidates, target):
    res = []
    def backtrack(idx, rem, path):
        if rem == 0:
            res.append(list(path))
            return
        if rem < 0:
            return
        for i in range(idx, len(candidates)):
            path.append(candidates[i])
            backtrack(i, rem - candidates[i], path)
            path.pop()
    backtrack(0, target, [])
    return res

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([2, 3, 6, 7], 7),
        ([2, 3, 5], 8),
        ([2], 1),
        ([1], 2),
        ([7, 3, 2], 18)
    ]

    for cands, target in fixed:
        ans = norm_combos(solver.combinationSum(list(cands), target))
        exp = norm_combos(ref_combination_sum(list(cands), target))
        assert ans == exp, f"Failed on {cands}, {target}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(25):
        sz = rng.randint(1, 5)
        cands = sorted(list(set(rng.randint(2, 15) for _ in range(sz))))
        target = rng.randint(4, 25)
        ans = norm_combos(solver.combinationSum(list(cands), target))
        exp = norm_combos(ref_combination_sum(list(cands), target))
        assert ans == exp

    # Scale test
    t0 = time.perf_counter()
    _ = solver.combinationSum([2, 3, 5, 7], 30)
    t1 = time.perf_counter()
    print(f"✓ Combination Sum: fixed and 25 random cases passed. Scale (target=30): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'permutations': `#!/usr/bin/env python3
import json, os, re, random, time, itertools

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'permutations.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def norm_perms(perms):
    return sorted([list(p) for p in perms])

def ref_permute(nums):
    return [list(p) for p in itertools.permutations(nums)]

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        [1, 2, 3],
        [0, 1],
        [1],
        [-1, 2, 0],
        [4, 3, 2, 1]
    ]

    for nums in fixed:
        ans = norm_perms(solver.permute(list(nums)))
        exp = norm_perms(ref_permute(nums))
        assert ans == exp, f"Failed on {nums}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(25):
        sz = rng.randint(1, 5)
        nums = rng.sample(range(-50, 50), sz)
        ans = norm_perms(solver.permute(list(nums)))
        exp = norm_perms(ref_permute(nums))
        assert ans == exp

    # Scale test: N = 7 (5040 permutations)
    nums7 = list(range(7))
    t0 = time.perf_counter()
    ans = solver.permute(nums7)
    t1 = time.perf_counter()
    assert len(ans) == 5040
    print(f"✓ Permutations: fixed and 25 random cases passed. Scale (N=7 -> 5040 perms): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'word-search': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'word-search.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_exist(board, word):
    R, C = len(board), len(board[0])
    visited = [[False] * C for _ in range(R)]

    def dfs(r, c, k):
        if k == len(word):
            return True
        if r < 0 or r >= R or c < 0 or c >= C:
            return False
        if visited[r][c] or board[r][c] != word[k]:
            return False
        visited[r][c] = True
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            if dfs(r + dr, c + dc, k + 1):
                visited[r][c] = False
                return True
        visited[r][c] = False
        return False

    for r in range(R):
        for c in range(C):
            if dfs(r, c, 0):
                return True
    return False

def clone_board(b):
    return [row[:] for row in b]

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    base_board = [
        ["A","B","C","E"],
        ["S","F","C","S"],
        ["A","D","E","E"]
    ]

    fixed = [
        (base_board, "ABCCED", True),
        (base_board, "SEE", True),
        (base_board, "ABCB", False),
        ([["a"]], "a", True),
        ([["a"]], "b", False),
        ([["a","b"],["c","d"]], "abcd", False),
        ([["A","B","C","E"],["S","F","E","S"],["A","D","E","E"]], "ABCESEEEFS", True)
    ]

    for b, word, exp in fixed:
        ans = solver.exist(clone_board(b), word)
        assert ans == exp, f"Failed on word={word}: expected {exp}, got {ans}"

    rng = random.Random(42)
    letters = "ABCDEF"
    for _ in range(25):
        R = rng.randint(2, 5)
        C = rng.randint(2, 5)
        b = [[rng.choice(letters) for _ in range(C)] for _ in range(R)]
        w_len = rng.randint(1, 6)
        w = ''.join(rng.choice(letters) for _ in range(w_len))
        exp = ref_exist(b, w)
        ans = solver.exist(clone_board(b), w)
        assert ans == exp, f"Failed on random board with word={w}"

    # Scale test: 6x6 board
    b6 = [["A"] * 6 for _ in range(6)]
    b6[5][5] = "B"
    t0 = time.perf_counter()
    ans = solver.exist(clone_board(b6), "AAAAAB")
    t1 = time.perf_counter()
    assert ans is True
    print(f"✓ Word Search: fixed and 25 random cases passed. Scale (6x6 board): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`
};

export function writeBatch3Tests() {
  const testsDir = path.join(rootDir, 'dataset', 'tests');
  for (const [slug, testScript] of Object.entries(TESTS)) {
    const slugDir = path.join(testsDir, slug);
    fs.mkdirSync(slugDir, { recursive: true });
    const targetFile = path.join(slugDir, 'test.py');
    fs.writeFileSync(targetFile, testScript, { encoding: 'utf8', mode: 0o755 });
    console.log(`✓ Wrote ${targetFile}`);
  }
  console.log(`✓ Successfully generated ${Object.keys(TESTS).length} test.py files for Batch 3`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  writeBatch3Tests();
}
