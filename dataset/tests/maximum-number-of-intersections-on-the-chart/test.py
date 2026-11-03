import sys
from solution import Solution
sol = Solution()

res = sol.maxIntersectionCount(y = [1, 2, 1, 2, 1])
assert res == 4, f"Expected { 4 }, got {res}"
res = sol.maxIntersectionCount(y = [2, 1, 3, 4, 2])
assert res == 3, f"Expected { 3 }, got {res}"
print('All tests passed!')
