import sys
from solution import Solution
sol = Solution()

res = sol.maxOperations(nums = [3, 2, 1, 2, 3, 4])
assert res == 3, f"Expected { 3 }, got {res}"
res = sol.maxOperations(nums = [3, 2, 6, 1, 4])
assert res == 2, f"Expected { 2 }, got {res}"
print('All tests passed!')
