import json

with open('dataset/problems/shortest-word-distance-ii.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
WordDistance = scope['WordDistance']

wd = WordDistance(["practice", "makes", "perfect", "coding", "makes"])
assert wd.shortest("coding", "practice") == 3
assert wd.shortest("makes", "coding") == 1
print("Passed shortest-word-distance-ii tests")
