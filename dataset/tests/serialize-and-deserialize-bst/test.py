import json

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

with open('dataset/problems/serialize-and-deserialize-bst.json') as f:
    prob = json.load(f)

scope = {'Optional': None, 'TreeNode': TreeNode}
exec(prob['solutions'][0]['code'], scope)
Codec = scope['Codec']

codec = Codec()
root = TreeNode(2, TreeNode(1), TreeNode(3))
s = codec.serialize(root)
d = codec.deserialize(s)
assert d.val == 2
assert d.left.val == 1
assert d.right.val == 3
print("Passed serialize-and-deserialize-bst tests")
