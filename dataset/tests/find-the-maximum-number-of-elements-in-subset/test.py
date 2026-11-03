import sys
from solution import Solution
sol = Solution()

res = sol.maximumLength(nums = [5, 4, 1, 2, 2])
assert res == 3, f"Expected { 3 }, got {res}"
res = sol.maximumLength(nums = [1, 3, 2, 4])
assert res == 1, f"Expected { 1 }, got {res}"
res = sol.maximumLength(nums = [1, 1, 1, 1, 1])
assert res == 5, f"Expected { 5 }, got {res}"
print('All tests passed!')
