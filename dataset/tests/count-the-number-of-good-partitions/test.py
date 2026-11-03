import sys
from solution import Solution
sol = Solution()

res = sol.numberOfGoodPartitions(nums = [1,2,3,4])
assert res == 8, f'Expected 8, got {res}'
res = sol.numberOfGoodPartitions(nums = [1,1,1,1])
assert res == 1, f'Expected 1, got {res}'
res = sol.numberOfGoodPartitions(nums = [1,2,1,3])
assert res == 2, f'Expected 2, got {res}'
print('All tests passed!')
