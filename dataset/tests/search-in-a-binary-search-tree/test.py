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
    prob_path = os.path.join(base, '..', '..', 'problems', 'search-in-a-binary-search-tree.json')
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


if __name__ == '__main__':
    main()
