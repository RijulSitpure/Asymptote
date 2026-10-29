import json

class Node:
    def __init__(self, val, isLeaf, topLeft=None, topRight=None, bottomLeft=None, bottomRight=None):
        self.val = val
        self.isLeaf = isLeaf
        self.topLeft = topLeft
        self.topRight = topRight
        self.bottomLeft = bottomLeft
        self.bottomRight = bottomRight

with open('dataset/problems/construct-quad-tree.json') as f:
    prob = json.load(f)

scope = {'Node': Node}
exec(prob['solutions'][0]['code'], scope)
sol = scope['Solution']()

grid = [
    [0, 1],
    [1, 0]
]
root = sol.construct(grid)
assert not root.isLeaf
assert root.topLeft.isLeaf and root.topLeft.val == False
assert root.topRight.isLeaf and root.topRight.val == True
print("Passed construct-quad-tree tests")
