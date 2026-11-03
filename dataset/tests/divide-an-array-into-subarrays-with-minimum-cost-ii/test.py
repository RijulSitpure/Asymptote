import sys
from solution import Solution
sol = Solution()

res = sol.minimumCost(nums = [1, 3, 2, 6, 4, 2], k = 3, dist = 3)
assert res == 5, f"Expected { 5 }, got {res}"
res = sol.minimumCost(nums = [10, 1, 2, 2, 2, 1], k = 4, dist = 3)
assert res == 15, f"Expected { 15 }, got {res}"
res = sol.minimumCost(nums = [10, 8, 18, 9], k = 3, dist = 1)
assert res == 36, f"Expected { 36 }, got {res}"
print('All tests passed!')
