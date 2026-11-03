import sys
from solution import Solution
sol = Solution()

res = sol.largestPerimeter(nums = [5,5,5])
assert res == 15, f'Expected 15, got {res}'
res = sol.largestPerimeter(nums = [1,12,1,2,5,50,3])
assert res == 12, f'Expected 12, got {res}'
res = sol.largestPerimeter(nums = [5,5,50])
assert res == -1, f'Expected -1, got {res}'
print('All tests passed!')
