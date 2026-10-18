#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'lowest-common-ancestor-of-a-binary-search-tree.json'), 'r') as f:
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
