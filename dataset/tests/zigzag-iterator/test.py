import json

with open('dataset/problems/zigzag-iterator.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
ZigzagIterator = scope['ZigzagIterator']

it = ZigzagIterator([1, 2], [3, 4, 5, 6])
res = []
while it.hasNext():
    res.append(it.next())
assert res == [1, 3, 2, 4, 5, 6]
print("Passed zigzag-iterator tests")
