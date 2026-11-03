import sys
from solution import Solution
sol = Solution()

res = sol.lastNonEmptyString(s = 'aabcbbca')
assert res == 'ba', f"Expected { 'ba' }, got {res}"
res = sol.lastNonEmptyString(s = 'abcd')
assert res == 'abcd', f"Expected { 'abcd' }, got {res}"
print('All tests passed!')
