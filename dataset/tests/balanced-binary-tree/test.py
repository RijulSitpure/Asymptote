#!/usr/bin/env python3
import json, os, re, random, time
from typing import Optional

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'balanced-binary-tree.json'), 'r') as f:
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
