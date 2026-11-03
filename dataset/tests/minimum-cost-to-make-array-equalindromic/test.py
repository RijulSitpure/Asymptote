import sys
from solution import Solution
sol = Solution()

res = sol.minimumCost(nums = [1,2,3,4,5])
assert res == 6, f'Expected 6, got {res}'
res = sol.minimumCost(nums = [10,12,13,14,15])
assert res == 11, f'Expected 11, got {res}'
res = sol.minimumCost(nums = [22,33,22,33,22])
assert res == 22, f'Expected 22, got {res}'
print('All tests passed!')
