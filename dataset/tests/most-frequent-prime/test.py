import sys
from solution import Solution
sol = Solution()

res = sol.mostFrequentPrime(mat = [[1, 1], [9, 9], [1, 1]])
assert res == 19, f"Expected { 19 }, got {res}"
res = sol.mostFrequentPrime(mat = [[7]])
assert res == -1, f"Expected { -1 }, got {res}"
print('All tests passed!')
