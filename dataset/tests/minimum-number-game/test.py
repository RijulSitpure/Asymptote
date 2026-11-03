import sys
from solution import Solution
sol = Solution()

res = sol.numberGame(nums = [5,4,2,3])
assert res == [3, 2, 5, 4], f'Expected [3, 2, 5, 4], got {res}'
res = sol.numberGame(nums = [2,5])
assert res == [5, 2], f'Expected [5, 2], got {res}'
print('All tests passed!')
