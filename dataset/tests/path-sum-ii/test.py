import json, os, re, random, time, sys
sys.setrecursionlimit(20000)

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

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
    prob_path = os.path.join(base, '..', '..', 'problems', 'path-sum-ii.json')
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

    scope = {'TreeNode': TreeNode, 'ListNode': ListNode, 'List': list, 'Optional': None}
    exec(sol_code, scope)
    solver = scope['Solution']()

    arr = [5, 4, 8, 11, None, 13, 4, 7, 2, None, None, 5, 1]
    t = build_tree(arr)
    res = solver.pathSum(t, 22)
    assert sorted(res) == sorted([[5, 4, 11, 2], [5, 8, 4, 5]])

    assert solver.pathSum(build_tree([1, 2, 3]), 5) == []
    assert solver.pathSum(build_tree([1, 2]), 0) == []
    assert solver.pathSum(None, 0) == []

    # Scale test: 2000 nodes linear tree
    t_scale = TreeNode(1)
    curr = t_scale
    for _ in range(1999):
        curr.left = TreeNode(1)
        curr = curr.left
    t0 = time.perf_counter()
    res_scale = solver.pathSum(t_scale, 2000)
    t1 = time.perf_counter()
    assert len(res_scale) == 1 and len(res_scale[0]) == 2000
    print(f"✓ Path Sum II: fixed and N=2000 passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
