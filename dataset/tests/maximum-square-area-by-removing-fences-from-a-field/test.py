import sys
from solution import Solution
sol = Solution()

res = sol.maximizeSquareArea(m = 4, n = 3, hFences = [2,3], vFences = [2])
assert res == 4, f'Expected 4, got {res}'
res = sol.maximizeSquareArea(m = 6, n = 7, hFences = [2], vFences = [4])
assert res == -1, f'Expected -1, got {res}'
print('All tests passed!')
