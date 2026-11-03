import sys
from solution import Solution
sol = Solution()

res = sol.hasTrailingZeros(nums = [1,2,3,4,5])
assert res == True, f'Expected True, got {res}'
res = sol.hasTrailingZeros(nums = [2,4,8,16])
assert res == True, f'Expected True, got {res}'
res = sol.hasTrailingZeros(nums = [1,3,5,7,9])
assert res == False, f'Expected False, got {res}'
print('All tests passed!')
