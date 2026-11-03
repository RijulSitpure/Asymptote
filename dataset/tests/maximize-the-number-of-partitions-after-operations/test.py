import sys
from solution import Solution
sol = Solution()

res = sol.maxPartitionsAfterOperations(s = 'accca', k = 2)
assert res == 3, f'Expected 3, got {res}'
res = sol.maxPartitionsAfterOperations(s = 'aabaab', k = 3)
assert res == 1, f'Expected 1, got {res}'
res = sol.maxPartitionsAfterOperations(s = 'xxyz', k = 1)
assert res == 4, f'Expected 4, got {res}'
print('All tests passed!')
