import json

with open('dataset/problems/random-point-in-non-overlapping-rectangles.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
Solution = scope['Solution']

rects = [[-2, -2, 1, 1], [2, 2, 4, 6]]
sol = Solution(rects)
points = [sol.pick() for _ in range(50)]
for x, y in points:
    inside_r1 = (-2 <= x <= 1 and -2 <= y <= 1)
    inside_r2 = (2 <= x <= 4 and 2 <= y <= 6)
    assert inside_r1 or inside_r2
print("Passed random-point-in-non-overlapping-rectangles tests")
