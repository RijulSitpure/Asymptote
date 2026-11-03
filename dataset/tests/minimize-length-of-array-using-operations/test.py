import sys
from solution import Solution
sol = Solution()

res = sol.minimumArrayLength(nums = [1, 4, 3, 1])
assert res == 1, f"Expected { 1 }, got {res}"
res = sol.minimumArrayLength(nums = [5, 5, 5, 10, 5])
assert res == 2, f"Expected { 2 }, got {res}"
res = sol.minimumArrayLength(nums = [2, 3, 4])
assert res == 1, f"Expected { 1 }, got {res}"
print('All tests passed!')
