import sys
from solution import Solution
sol = Solution()

res = sol.earliestSecondToMarkIndices(nums = [2, 2, 0], changeIndices = [2, 2, 2, 2, 3, 2, 2, 1])
assert res == 8, f"Expected { 8 }, got {res}"
res = sol.earliestSecondToMarkIndices(nums = [1, 3], changeIndices = [1, 1, 1, 2, 1, 1, 1])
assert res == 6, f"Expected { 6 }, got {res}"
res = sol.earliestSecondToMarkIndices(nums = [0, 1], changeIndices = [2, 2, 2])
assert res == -1, f"Expected { -1 }, got {res}"
print('All tests passed!')
