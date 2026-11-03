import sys
from solution import Solution
sol = Solution()

res = sol.minimumCoins(prices = [3,1,2])
assert res == 4, f'Expected 4, got {res}'
res = sol.minimumCoins(prices = [1,10,1,1])
assert res == 2, f'Expected 2, got {res}'
print('All tests passed!')
