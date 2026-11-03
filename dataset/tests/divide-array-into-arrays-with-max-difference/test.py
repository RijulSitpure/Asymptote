import sys
from solution import Solution
sol = Solution()

res = sol.divideArray(nums = [1,3,4,8,7,9,3,5,1], k = 2)
assert res == [[1, 1, 3], [3, 4, 5], [7, 8, 9]], f'Expected [[1, 1, 3], [3, 4, 5], [7, 8, 9]], got {res}'
res = sol.divideArray(nums = [1,3,3,2,7,3], k = 3)
assert res == [], f'Expected [], got {res}'
print('All tests passed!')
