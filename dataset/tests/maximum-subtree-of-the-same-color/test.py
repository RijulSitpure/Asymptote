import sys
from solution import Solution
sol = Solution()

res = sol.maximumSubtreeSize(edges = [[0,1],[0,2],[2,3],[2,4]], colors = [1,2,3,3,3])
assert res == 3, f'Expected 3, got {res}'
res = sol.maximumSubtreeSize(edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], colors = [1,1,1,1,1,1,1])
assert res == 7, f'Expected 7, got {res}'
print('All tests passed!')
