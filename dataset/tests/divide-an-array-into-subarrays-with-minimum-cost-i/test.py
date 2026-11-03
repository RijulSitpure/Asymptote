import sys
from solution import Solution
sol = Solution()

res = sol.minimumCost(nums = [1, 2, 3, 12])
assert res == 6, f"Expected { 6 }, got {res}"
res = sol.minimumCost(nums = [5, 4, 3])
assert res == 12, f"Expected { 12 }, got {res}"
res = sol.minimumCost(nums = [10, 3, 1, 1])
assert res == 12, f"Expected { 12 }, got {res}"
print('All tests passed!')
