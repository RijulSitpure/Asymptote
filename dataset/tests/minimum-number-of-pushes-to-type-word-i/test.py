import sys
from solution import Solution
sol = Solution()

res = sol.minimumPushes(word = 'abcde')
assert res == 5, f"Expected { 5 }, got {res}"
res = sol.minimumPushes(word = 'xycprtbo')
assert res == 8, f"Expected { 8 }, got {res}"
print('All tests passed!')
