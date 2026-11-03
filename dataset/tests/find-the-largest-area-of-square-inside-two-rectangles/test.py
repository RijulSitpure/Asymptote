import sys
from solution import Solution
sol = Solution()

res = sol.largestSquareArea(bottomLeft = [[1, 1], [2, 2], [3, 1]], topRight = [[3, 3], [4, 4], [6, 6]])
assert res == 1, f"Expected { 1 }, got {res}"
res = sol.largestSquareArea(bottomLeft = [[1, 1], [2, 2], [1, 2]], topRight = [[3, 3], [4, 4], [3, 4]])
assert res == 1, f"Expected { 1 }, got {res}"
res = sol.largestSquareArea(bottomLeft = [[1, 1], [3, 3], [3, 1]], topRight = [[2, 2], [4, 4], [4, 2]])
assert res == 0, f"Expected { 0 }, got {res}"
print('All tests passed!')
