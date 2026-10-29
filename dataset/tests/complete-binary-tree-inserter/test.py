import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'complete-binary-tree-inserter.json')

import collections

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class CBTInserter:
    def __init__(self, root: 'TreeNode'):
        self.root = root
        self.deque = collections.deque()
        q = collections.deque([root])
        while q:
            node = q.popleft()
            if not node.left or not node.right:
                self.deque.append(node)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)

    def insert(self, val: int) -> int:
        node = TreeNode(val)
        parent = self.deque[0]
        if not parent.left:
            parent.left = node
        else:
            parent.right = node
            self.deque.popleft()
        self.deque.append(node)
        return parent.val

    def get_root(self) -> 'TreeNode':
        return self.root

r = TreeNode(1, TreeNode(2))
cbt = CBTInserter(r)
assert cbt.insert(3) == 1
assert cbt.insert(4) == 2
assert cbt.get_root().left.left.val == 4
print("✓ complete-binary-tree-inserter passed")
