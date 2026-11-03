import sys
from solution import Solution
sol = Solution()

res = sol.minOperations(nums = [2,1,3,4], k = 1)
assert res == 2, f'Expected 2, got {res}'
res = sol.minOperations(nums = [2,0,2,0], k = 0)
assert res == 0, f'Expected 0, got {res}'
print('All tests passed!')
