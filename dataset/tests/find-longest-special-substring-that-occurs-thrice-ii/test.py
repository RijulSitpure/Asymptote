import sys
from solution import Solution
sol = Solution()

res = sol.maximumLength(s = "aaaa")
assert res == 2, f'Expected 2, got {res}'
res = sol.maximumLength(s = "abcdef")
assert res == -1, f'Expected -1, got {res}'
res = sol.maximumLength(s = "abcaba")
assert res == 1, f'Expected 1, got {res}'
print('All tests passed!')
