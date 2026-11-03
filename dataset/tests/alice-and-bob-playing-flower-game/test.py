import sys
from solution import Solution
sol = Solution()

res = sol.flowerGame(n = 3, m = 2)
assert res == 3, f"Expected { 3 }, got {res}"
res = sol.flowerGame(n = 1, m = 1)
assert res == 0, f"Expected { 0 }, got {res}"
print('All tests passed!')
