import sys
from solution import Solution
sol = Solution()

res = sol.maxFrequencyScore(nums = [1,2,6,4], k = 3)
assert res == 3, f'Expected 3, got {res}'
res = sol.maxFrequencyScore(nums = [1,4,4,2,4], k = 0)
assert res == 3, f'Expected 3, got {res}'
print('All tests passed!')
