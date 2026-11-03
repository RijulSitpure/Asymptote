import sys
from solution import Solution
sol = Solution()

res = sol.countKeyChanges(s = 'aAbBcC')
assert res == 2, f"Expected { 2 }, got {res}"
res = sol.countKeyChanges(s = 'bB')
assert res == 0, f"Expected { 0 }, got {res}"
res = sol.countKeyChanges(s = 'mMe')
assert res == 1, f"Expected { 1 }, got {res}"
print('All tests passed!')
