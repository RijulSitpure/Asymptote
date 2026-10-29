import json

with open('dataset/problems/unique-word-abbreviation.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
ValidWordAbbr = scope['ValidWordAbbr']

vwa = ValidWordAbbr(["deer", "door", "cake", "card"])
assert vwa.isUnique("dear") == False
assert vwa.isUnique("cart") == True
assert vwa.isUnique("cac") == True
assert vwa.isUnique("cake") == True
print("Passed unique-word-abbreviation tests")
