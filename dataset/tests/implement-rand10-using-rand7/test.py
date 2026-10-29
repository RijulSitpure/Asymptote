import json
import random

def rand7():
    return random.randint(1, 7)

with open('dataset/problems/implement-rand10-using-rand7.json') as f:
    prob = json.load(f)

scope = {'rand7': rand7}
exec(prob['solutions'][0]['code'], scope)
sol = scope['Solution']()

counts = {i: 0 for i in range(1, 11)}
for _ in range(500):
    val = sol.rand10()
    counts[val] += 1
assert all(c > 0 for c in counts.values())
print("Passed implement-rand10-using-rand7 tests")
