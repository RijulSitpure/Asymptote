import json

with open('dataset/problems/generate-random-point-in-a-circle.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
Solution = scope['Solution']

sol = Solution(1.0, 0.0, 0.0)
for _ in range(50):
    x, y = sol.randPoint()
    assert (x * x + y * y) <= 1.0 + 1e-9
print("Passed generate-random-point-in-a-circle tests")
