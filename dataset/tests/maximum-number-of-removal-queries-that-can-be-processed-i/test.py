import sys
from solution import Solution
sol = Solution()

res = sol.maximumProcessableQueries(nums = [1, 2, 3, 4, 5], queries = [1, 2, 3, 4, 5])
assert res == 5, f"Expected { 5 }, got {res}"
res = sol.maximumProcessableQueries(nums = [2, 3, 2], queries = [2, 2, 3])
assert res == 3, f"Expected { 3 }, got {res}"
res = sol.maximumProcessableQueries(nums = [3, 4, 3], queries = [4, 3, 2])
assert res == 2, f"Expected { 2 }, got {res}"
print('All tests passed!')
