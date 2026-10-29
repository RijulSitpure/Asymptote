import json

with open('dataset/problems/insert-delete-getrandom-o1-duplicates-allowed.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
RandomizedCollection = scope['RandomizedCollection']

rc = RandomizedCollection()
assert rc.insert(1) == True
assert rc.insert(1) == False
assert rc.insert(2) == True
assert rc.getRandom() in [1, 2]
assert rc.remove(1) == True
assert rc.getRandom() in [1, 2]
print("Passed insert-delete-getrandom-o1-duplicates-allowed tests")
