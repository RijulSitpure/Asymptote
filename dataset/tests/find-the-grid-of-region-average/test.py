import sys
from solution import Solution
sol = Solution()

res = sol.resultGrid(image = [[5, 6, 7, 10], [8, 9, 10, 10], [11, 12, 13, 10]], threshold = 3)
assert res == [[9, 9, 9, 9], [9, 9, 9, 9], [9, 9, 9, 9]], f"Expected { [[9, 9, 9, 9], [9, 9, 9, 9], [9, 9, 9, 9]] }, got {res}"
res = sol.resultGrid(image = [[10, 20, 30], [15, 25, 35], [20, 30, 40]], threshold = 2)
assert res == [[10, 20, 30], [15, 25, 35], [20, 30, 40]], f"Expected { [[10, 20, 30], [15, 25, 35], [20, 30, 40]] }, got {res}"
print('All tests passed!')
