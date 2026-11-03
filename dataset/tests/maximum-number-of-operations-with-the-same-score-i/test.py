import sys
from solution import Solution
sol = Solution()

res = sol.maxOperations(nums = [3, 2, 1, 4, 5])
assert res == 2, f"Expected { 2 }, got {res}"
res = sol.maxOperations(nums = [3, 2, 6, 1, 4])
assert res == 1, f"Expected { 1 }, got {res}"
print('All tests passed!')
