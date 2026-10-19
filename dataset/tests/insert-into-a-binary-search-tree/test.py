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
    prob_path = os.path.join(base, '..', '..', 'problems', 'insert-into-a-binary-search-tree.json')
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

    scope = {'TreeNode': TreeNode, 'List': list, 'Optional': None}
    exec(sol_code, scope)
    solver = scope['Solution']()

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


if __name__ == '__main__':
    main()
