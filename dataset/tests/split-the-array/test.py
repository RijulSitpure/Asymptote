import sys
from solution import Solution
sol = Solution()

res = sol.isPossibleToSplit(nums = [1, 1, 2, 2, 3, 4])
assert res == True, f"Expected { True }, got {res}"
res = sol.isPossibleToSplit(nums = [1, 1, 1, 1])
assert res == False, f"Expected { False }, got {res}"
print('All tests passed!')
