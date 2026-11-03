import sys
from solution import Solution
sol = Solution()

res = sol.minimumOperationsToMakeEqual(x = 26, y = 1)
assert res == 3, f'Expected 3, got {res}'
res = sol.minimumOperationsToMakeEqual(x = 54, y = 2)
assert res == 4, f'Expected 4, got {res}'
res = sol.minimumOperationsToMakeEqual(x = 25, y = 30)
assert res == 5, f'Expected 5, got {res}'
print('All tests passed!')
