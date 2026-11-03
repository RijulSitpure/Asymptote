import sys
from solution import Solution
sol = Solution()

res = sol.minimumTimeToInitialState(word = 'abacaba', k = 3)
assert res == 2, f"Expected { 2 }, got {res}"
res = sol.minimumTimeToInitialState(word = 'abacaba', k = 4)
assert res == 1, f"Expected { 1 }, got {res}"
res = sol.minimumTimeToInitialState(word = 'abcbabcd', k = 2)
assert res == 4, f"Expected { 4 }, got {res}"
print('All tests passed!')
