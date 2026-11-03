import sys
from solution import Solution
sol = Solution()

res = sol.minOrAfterOperations(nums = [3, 5, 3, 2, 7], k = 2)
assert res == 3, f"Expected { 3 }, got {res}"
res = sol.minOrAfterOperations(nums = [7, 3, 15, 14, 2, 8], k = 4)
assert res == 2, f"Expected { 2 }, got {res}"
res = sol.minOrAfterOperations(nums = [10, 7, 10, 3, 9, 14, 9, 4], k = 1)
assert res == 15, f"Expected { 15 }, got {res}"
print('All tests passed!')
