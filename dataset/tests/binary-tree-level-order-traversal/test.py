#!/usr/bin/env python3
import json, os, re, random, time
from typing import Optional

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'binary-tree-level-order-traversal.json'), 'r') as f:
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
