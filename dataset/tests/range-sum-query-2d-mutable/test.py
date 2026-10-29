import json

with open('dataset/problems/range-sum-query-2d-mutable.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
NumMatrix = scope['NumMatrix']

matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
]
nm = NumMatrix(matrix)
assert nm.sumRegion(2, 1, 4, 3) == 8
nm.update(3, 2, 2)
assert nm.sumRegion(2, 1, 4, 3) == 10
print("Passed range-sum-query-2d-mutable tests")
