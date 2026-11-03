import sys
from solution import Solution
sol = Solution()

res = sol.maximumSubarraySum(nums = [1, 2, 3, 4, 5, 6], k = 1)
assert res == 11, f"Expected { 11 }, got {res}"
res = sol.maximumSubarraySum(nums = [-1, 3, 2, 4, 5], k = 3)
assert res == 11, f"Expected { 11 }, got {res}"
res = sol.maximumSubarraySum(nums = [-1, -2, -3, -4], k = 2)
assert res == -6, f"Expected { -6 }, got {res}"
print('All tests passed!')
