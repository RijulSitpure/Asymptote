import sys
from solution import Solution
sol = Solution()

res = sol.numberCount(a = 1, b = 20)
assert res == 19, f"Expected { 19 }, got {res}"
res = sol.numberCount(a = 9, b = 19)
assert res == 10, f"Expected { 10 }, got {res}"
res = sol.numberCount(a = 80, b = 120)
assert res == 27, f"Expected { 27 }, got {res}"
print('All tests passed!')
