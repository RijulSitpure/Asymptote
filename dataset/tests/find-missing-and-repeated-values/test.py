import sys
from solution import Solution
sol = Solution()

res = sol.findMissingAndRepeatedValues(grid = [[1,3],[2,2]])
assert res == [2, 4], f'Expected [2, 4], got {res}'
res = sol.findMissingAndRepeatedValues(grid = [[9,1,7],[8,9,2],[3,4,6]])
assert res == [9, 5], f'Expected [9, 5], got {res}'
print('All tests passed!')
