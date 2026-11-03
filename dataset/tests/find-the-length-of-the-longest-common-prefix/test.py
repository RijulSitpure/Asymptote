import sys
from solution import Solution
sol = Solution()

res = sol.longestCommonPrefix(arr1 = [1, 10, 100], arr2 = [1000])
assert res == 3, f"Expected { 3 }, got {res}"
res = sol.longestCommonPrefix(arr1 = [1, 2, 3], arr2 = [4, 4, 4])
assert res == 0, f"Expected { 0 }, got {res}"
print('All tests passed!')
