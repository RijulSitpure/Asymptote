#!/usr/bin/env python3
import json, os, re, random, time
from typing import Optional

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'kth-smallest-element-in-a-bst.json'), 'r') as f:
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
