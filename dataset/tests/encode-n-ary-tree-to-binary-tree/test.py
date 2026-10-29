import json

class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

with open('dataset/problems/encode-n-ary-tree-to-binary-tree.json') as f:
    prob = json.load(f)

scope = {'Optional': None, 'Node': Node, 'TreeNode': TreeNode}
exec(prob['solutions'][0]['code'], scope)
Codec = scope['Codec']

codec = Codec()
n1 = Node(1, [Node(3, [Node(5), Node(6)]), Node(2), Node(4)])
b_tree = codec.encode(n1)
decoded = codec.decode(b_tree)
assert decoded.val == 1
assert len(decoded.children) == 3
assert decoded.children[0].val == 3
assert len(decoded.children[0].children) == 2
print("Passed encode-n-ary-tree-to-binary-tree tests")
