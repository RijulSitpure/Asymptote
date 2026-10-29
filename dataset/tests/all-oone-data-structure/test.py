import json

with open('dataset/problems/all-oone-data-structure.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
AllOne = scope['AllOne']

ao = AllOne()
ao.inc("hello")
ao.inc("hello")
assert ao.getMaxKey() == "hello"
assert ao.getMinKey() == "hello"
ao.inc("leet")
assert ao.getMaxKey() == "hello"
assert ao.getMinKey() == "leet"
ao.dec("hello")
assert ao.getMaxKey() in ["hello", "leet"]
print("Passed all-oone-data-structure tests")
