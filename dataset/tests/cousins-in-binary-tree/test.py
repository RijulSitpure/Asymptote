import json, os, re, random, time, sys
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
    prob_path = os.path.join(base, '..', '..', 'problems', 'cousins-in-binary-tree.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'TreeNode': TreeNode, 'List': list, 'Optional': type('Optional', (), {'__class_getitem__': lambda cls, item: item})}
    exec(sol_code, scope)
    solver = scope['Solution']()

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


if __name__ == '__main__':
    main()
