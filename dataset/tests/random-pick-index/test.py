import json

with open('dataset/problems/random-pick-index.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
Solution = scope['Solution']

sol = Solution([1, 2, 3, 3, 3])
assert sol.pick(1) == 0
assert sol.pick(2) == 1
picks = {sol.pick(3) for _ in range(50)}
assert picks.issubset({2, 3, 4}) and len(picks) > 1
print("Passed random-pick-index tests")
