import sys
from solution import Solution
sol = Solution()

res = sol.placedCoins(edges = [[0,1],[0,2],[0,3],[0,4],[0,5]], cost = [1,2,3,4,5,6])
assert res == [120, 1, 1, 1, 1, 1], f'Expected [120, 1, 1, 1, 1, 1], got {res}'
res = sol.placedCoins(edges = [[0,1],[0,2],[1,3],[1,4],[1,5],[2,6],[2,7],[2,8]], cost = [1,4,2,3,5,7,8,-4,2])
assert res == [280, 140, 32, 1, 1, 1, 1, 1, 1], f'Expected [280, 140, 32, 1, 1, 1, 1, 1, 1], got {res}'
res = sol.placedCoins(edges = [[0,1],[0,2]], cost = [1,2,-2])
assert res == [0, 1, 1], f'Expected [0, 1, 1], got {res}'
print('All tests passed!')
