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
    prob_path = os.path.join(base, '..', '..', 'problems', 'same-tree.json')
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


if __name__ == '__main__':
    main()
