import sys
from solution import Solution
sol = Solution()

res = sol.numberOfPairs(points = [[1, 1], [2, 2], [3, 3]])
assert res == 0, f"Expected { 0 }, got {res}"
res = sol.numberOfPairs(points = [[6, 2], [4, 4], [2, 6]])
assert res == 2, f"Expected { 2 }, got {res}"
res = sol.numberOfPairs(points = [[3, 1], [1, 3], [1, 1]])
assert res == 2, f"Expected { 2 }, got {res}"
print('All tests passed!')
