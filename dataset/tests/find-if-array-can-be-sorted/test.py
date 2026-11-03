import sys
from solution import Solution
sol = Solution()

res = sol.canSortArray(nums = [8, 4, 2, 30, 15])
assert res == True, f"Expected { True }, got {res}"
res = sol.canSortArray(nums = [1, 2, 3, 4, 5])
assert res == True, f"Expected { True }, got {res}"
res = sol.canSortArray(nums = [3, 16, 8, 4, 2])
assert res == False, f"Expected { False }, got {res}"
print('All tests passed!')
