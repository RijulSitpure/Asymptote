import sys
from solution import Solution
sol = Solution()

res = sol.countSubarrays(nums = [1,3,2,3,3], k = 2)
assert res == 6, f'Expected 6, got {res}'
res = sol.countSubarrays(nums = [1,4,2,1], k = 3)
assert res == 0, f'Expected 0, got {res}'
print('All tests passed!')
