import sys
from solution import Solution
sol = Solution()

res = sol.incremovableSubarrayCount(nums = [1,2,3,4])
assert res == 10, f'Expected 10, got {res}'
res = sol.incremovableSubarrayCount(nums = [6,5,7,8])
assert res == 7, f'Expected 7, got {res}'
res = sol.incremovableSubarrayCount(nums = [8,7,6,6])
assert res == 3, f'Expected 3, got {res}'
print('All tests passed!')
