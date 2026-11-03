import sys
from solution import Solution
sol = Solution()

res = sol.countMatchingSubarrays(nums = [1, 2, 3, 4, 5, 6], pattern = [1, 1])
assert res == 4, f"Expected { 4 }, got {res}"
res = sol.countMatchingSubarrays(nums = [1, 4, 4, 1, 3, 5, 5, 3], pattern = [1, 0, -1])
assert res == 2, f"Expected { 2 }, got {res}"
print('All tests passed!')
