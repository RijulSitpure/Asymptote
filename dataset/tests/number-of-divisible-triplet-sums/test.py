import sys
from solution import Solution
sol = Solution()

res = sol.divisibleTripletCount(nums = [3,3,4,6,5], d = 3)
assert res == 4, f'Expected 4, got {res}'
res = sol.divisibleTripletCount(nums = [1,2,3,4,5], d = 5)
assert res == 2, f'Expected 2, got {res}'
print('All tests passed!')
