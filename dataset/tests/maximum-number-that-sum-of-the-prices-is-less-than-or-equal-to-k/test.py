import sys
from solution import Solution
sol = Solution()

res = sol.findMaximumNumber(k = 9, x = 1)
assert res == 6, f'Expected 6, got {res}'
res = sol.findMaximumNumber(k = 7, x = 2)
assert res == 9, f'Expected 9, got {res}'
print('All tests passed!')
