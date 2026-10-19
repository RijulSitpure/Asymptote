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
    prob_path = os.path.join(base, '..', '..', 'problems', 'convert-sorted-array-to-binary-search-tree.json')
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

    def is_balanced(node):
        def depth(nd):
            if not nd: return 0
            l = depth(nd.left)
            r = depth(nd.right)
            if l == -1 or r == -1 or abs(l - r) > 1: return -1
            return max(l, r) + 1
        return depth(node) != -1

    def tree_to_inorder(root):
        return tree_to_inorder(root.left) + [root.val] + tree_to_inorder(root.right) if root else []

    nums = [-10, -3, 0, 5, 9]
    t = solver.sortedArrayToBST(nums)
    assert tree_to_inorder(t) == nums
    assert is_balanced(t)

    # Scale test: 10,000 nodes
    vals = list(range(10000))
    t0 = time.perf_counter()
    res = solver.sortedArrayToBST(vals)
    t1 = time.perf_counter()
    assert is_balanced(res)
    assert tree_to_inorder(res) == vals
    print(f"✓ Convert Sorted Array to BST: fixed and N=10000 passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
