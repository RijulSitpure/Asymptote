import sys
from solution import Solution
sol = Solution()

res = sol.mostExpensiveItem(primeOne = 2, primeTwo = 5)
assert res == 3, f'Expected 3, got {res}'
res = sol.mostExpensiveItem(primeOne = 5, primeTwo = 7)
assert res == 23, f'Expected 23, got {res}'
print('All tests passed!')
