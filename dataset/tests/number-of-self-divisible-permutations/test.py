import sys
from solution import Solution
sol = Solution()

res = sol.selfDivisiblePermutationCount(n = 1)
assert res == 1, f'Expected 1, got {res}'
res = sol.selfDivisiblePermutationCount(n = 2)
assert res == 2, f'Expected 2, got {res}'
res = sol.selfDivisiblePermutationCount(n = 3)
assert res == 3, f'Expected 3, got {res}'
print('All tests passed!')
