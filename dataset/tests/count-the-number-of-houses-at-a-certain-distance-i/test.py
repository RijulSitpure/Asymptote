import sys
from solution import Solution
sol = Solution()

res = sol.countOfPairs(n = 3, x = 1, y = 3)
assert res == [6, 0, 0], f"Expected { [6, 0, 0] }, got {res}"
res = sol.countOfPairs(n = 5, x = 2, y = 4)
assert res == [10, 8, 2, 0, 0], f"Expected { [10, 8, 2, 0, 0] }, got {res}"
res = sol.countOfPairs(n = 4, x = 1, y = 1)
assert res == [6, 4, 2, 0], f"Expected { [6, 4, 2, 0] }, got {res}"
print('All tests passed!')
