import sys
from solution import Solution
sol = Solution()

res = sol.returnToBoundaryCount(nums = [2, 3, -5])
assert res == 1, f"Expected { 1 }, got {res}"
res = sol.returnToBoundaryCount(nums = [3, 2, -3, -4])
assert res == 0, f"Expected { 0 }, got {res}"
print('All tests passed!')
