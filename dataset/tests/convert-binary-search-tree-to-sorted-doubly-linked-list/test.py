import json

class Node:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

with open('dataset/problems/convert-binary-search-tree-to-sorted-doubly-linked-list.json') as f:
    prob = json.load(f)

scope = {'Optional': None, 'Node': Node}
exec(prob['solutions'][0]['code'], scope)
sol = scope['Solution']()

# BST: 4, left=2 (left=1, right=3), right=5
root = Node(4, Node(2, Node(1), Node(3)), Node(5))
head = sol.treeToDoublyList(root)
vals = []
curr = head
for _ in range(5):
    vals.append(curr.val)
    curr = curr.right
assert vals == [1, 2, 3, 4, 5]
assert head.left.val == 5
assert head.left.right == head
print("Passed convert-binary-search-tree-to-sorted-doubly-linked-list tests")
