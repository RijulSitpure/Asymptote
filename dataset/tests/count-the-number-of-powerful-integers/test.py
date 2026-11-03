import sys
from solution import Solution
sol = Solution()

res = sol.numberOfPowerfulInt(start = 1, finish = 6000, limit = 4, s = '124')
assert res == 5, f'Expected 5, got {res}'
res = sol.numberOfPowerfulInt(start = 15, finish = 215, limit = 6, s = '10')
assert res == 2, f'Expected 2, got {res}'
res = sol.numberOfPowerfulInt(start = 1000, finish = 2000, limit = 4, s = '3000')
assert res == 0, f'Expected 0, got {res}'
print('All tests passed!')
