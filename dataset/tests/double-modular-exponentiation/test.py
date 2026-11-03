import sys
from solution import Solution
sol = Solution()

res = sol.getGoodIndices(variables = [[2,3,3,10],[3,3,3,1],[6,1,1,4]], target = 2)
assert res == [0, 2], f'Expected [0, 2], got {res}'
res = sol.getGoodIndices(variables = [[39,3,1000,1000]], target = 17)
assert res == [], f'Expected [], got {res}'
print('All tests passed!')
