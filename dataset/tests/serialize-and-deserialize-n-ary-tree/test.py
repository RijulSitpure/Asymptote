import json

class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

with open('dataset/problems/serialize-and-deserialize-n-ary-tree.json') as f:
    prob = json.load(f)

scope = {'Node': Node}
exec(prob['solutions'][0]['code'], scope)
Codec = scope['Codec']

codec = Codec()
# Tree: 1 -> [3 -> [5, 6], 2, 4]
n1 = Node(1, [Node(3, [Node(5), Node(6)]), Node(2), Node(4)])
serialized = codec.serialize(n1)
deserialized = codec.deserialize(serialized)
assert deserialized.val == 1
assert len(deserialized.children) == 3
assert deserialized.children[0].val == 3
assert len(deserialized.children[0].children) == 2
print("Passed serialize-and-deserialize-n-ary-tree tests")
