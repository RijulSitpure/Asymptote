import sys
from solution import Solution
sol = Solution()

res = sol.maxSelectedElements(nums = [2, 1, 5, 1, 1])
assert res == 3, f"Expected { 3 }, got {res}"
res = sol.maxSelectedElements(nums = [1, 4, 7, 10])
assert res == 1, f"Expected { 1 }, got {res}"
print('All tests passed!')
