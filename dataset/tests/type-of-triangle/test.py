import sys
from solution import Solution
sol = Solution()

res = sol.triangleType(nums = [3, 3, 3])
assert res == 'equilateral', f"Expected { 'equilateral' }, got {res}"
res = sol.triangleType(nums = [3, 4, 5])
assert res == 'scalene', f"Expected { 'scalene' }, got {res}"
res = sol.triangleType(nums = [8, 4, 4])
assert res == 'none', f"Expected { 'none' }, got {res}"
print('All tests passed!')
