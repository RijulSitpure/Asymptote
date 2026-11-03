import sys
from solution import Solution
sol = Solution()

res = sol.maxFrequencyElements(nums = [1,2,2,3,1,4])
assert res == 4, f'Expected 4, got {res}'
res = sol.maxFrequencyElements(nums = [1,2,3,4,5])
assert res == 5, f'Expected 5, got {res}'
print('All tests passed!')
