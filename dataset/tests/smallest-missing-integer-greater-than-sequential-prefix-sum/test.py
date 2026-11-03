import sys
from solution import Solution
sol = Solution()

res = sol.missingInteger(nums = [1,2,3,2,5])
assert res == 6, f'Expected 6, got {res}'
res = sol.missingInteger(nums = [3,4,5,1,12,14,13])
assert res == 15, f'Expected 15, got {res}'
print('All tests passed!')
