#!/usr/bin/env python3
import json, os, re, random, time
from typing import Optional

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'validate-binary-search-tree.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
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
