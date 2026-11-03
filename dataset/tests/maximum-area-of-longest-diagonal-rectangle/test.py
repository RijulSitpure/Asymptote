import sys
from solution import Solution
sol = Solution()

res = sol.areaOfMaxDiagonal(dimensions = [[9,3],[8,6]])
assert res == 48, f'Expected 48, got {res}'
res = sol.areaOfMaxDiagonal(dimensions = [[3,4],[4,3]])
assert res == 12, f'Expected 12, got {res}'
print('All tests passed!')
