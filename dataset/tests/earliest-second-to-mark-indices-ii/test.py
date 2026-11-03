import sys
from solution import Solution
sol = Solution()

res = sol.earliestSecondToMarkIndices(nums = [3, 2, 3], changeIndices = [1, 3, 2, 2, 2, 2, 3])
assert res == 6, f"Expected { 6 }, got {res}"
res = sol.earliestSecondToMarkIndices(nums = [0, 2], changeIndices = [1, 1, 1, 1, 1, 1, 1, 2, 1, 1])
assert res == 4, f"Expected { 4 }, got {res}"
print('All tests passed!')
