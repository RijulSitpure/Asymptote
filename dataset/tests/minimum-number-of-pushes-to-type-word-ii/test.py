import sys
from solution import Solution
sol = Solution()

res = sol.minimumPushes(word = 'abcde')
assert res == 5, f"Expected { 5 }, got {res}"
res = sol.minimumPushes(word = 'xyzxyzxyzxyz')
assert res == 12, f"Expected { 12 }, got {res}"
res = sol.minimumPushes(word = 'aabbccddeeffgghhiiiiii')
assert res == 24, f"Expected { 24 }, got {res}"
print('All tests passed!')
