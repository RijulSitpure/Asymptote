import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'maximum-depth-of-n-ary-tree.json')

class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

def maxDepth(root):
    if not root:
        return 0
    if not root.children:
        return 1
    return 1 + max(maxDepth(c) for c in root.children)

r1 = Node(1, [Node(3, [Node(5), Node(6)]), Node(2), Node(4)])
assert maxDepth(r1) == 3
assert maxDepth(None) == 0
assert maxDepth(Node(1)) == 1
print("✓ maximum-depth-of-n-ary-tree passed")
