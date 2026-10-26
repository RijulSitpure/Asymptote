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
    prob_path = os.path.join(base, '..', '..', 'problems', 'construct-binary-tree-from-inorder-and-postorder-traversal.json')
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

    scope = {'TreeNode': TreeNode, 'ListNode': ListNode, 'List': list, 'Optional': type('Optional', (), {'__class_getitem__': lambda cls, item: item})}
    exec(sol_code, scope)
    solver = scope['Solution']()

    def tree_to_inorder(root):
        return tree_to_inorder(root.left) + [root.val] + tree_to_inorder(root.right) if root else []

    def tree_to_postorder(root):
        return tree_to_postorder(root.left) + tree_to_postorder(root.right) + [root.val] if root else []

    ino = [9, 3, 15, 20, 7]
    post = [9, 15, 7, 20, 3]
    t = solver.buildTree(list(ino), list(post))
    assert tree_to_inorder(t) == ino
    assert tree_to_postorder(t) == post

    # Single node
    t2 = solver.buildTree([-1], [-1])
    assert t2.val == -1 and t2.left is None and t2.right is None

    # Scale test: 3000 nodes linear tree
    ino_scale = list(range(1, 3001))
    post_scale = list(range(3000, 0, -1))
    t0 = time.perf_counter()
    res = solver.buildTree(list(ino_scale), list(post_scale))
    t1 = time.perf_counter()
    assert res.val == 1
    print(f"✓ Construct Tree Inorder Postorder: fixed and N=3000 passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
