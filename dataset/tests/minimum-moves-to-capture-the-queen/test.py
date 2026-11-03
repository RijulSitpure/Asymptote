import sys
from solution import Solution
sol = Solution()

res = sol.minMovesToCaptureTheQueen(a = 1, b = 1, c = 8, d = 8, e = 2, f = 3)
assert res == 2, f'Expected 2, got {res}'
res = sol.minMovesToCaptureTheQueen(a = 5, b = 3, c = 3, d = 4, e = 5, f = 2)
assert res == 1, f'Expected 1, got {res}'
print('All tests passed!')
