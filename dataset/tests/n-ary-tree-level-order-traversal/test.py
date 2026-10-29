import json

class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

with open('dataset/problems/n-ary-tree-level-order-traversal.json') as f:
    prob = json.load(f)

scope = {'Node': Node}
exec(prob['solutions'][0]['code'], scope)
sol = scope['Solution']()

n1 = Node(1, [Node(3, [Node(5), Node(6)]), Node(2), Node(4)])
res = sol.levelOrder(n1)
assert res == [[1], [3, 2, 4], [5, 6]]
print("Passed n-ary-tree-level-order-traversal tests")
