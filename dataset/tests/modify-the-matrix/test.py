import sys
from solution import Solution
sol = Solution()

res = sol.modifiedMatrix(matrix = [[1, 2, -1], [4, -1, 6], [7, 8, 9]])
assert res == [[1, 2, 9], [4, 8, 6], [7, 8, 9]], f"Expected { [[1, 2, 9], [4, 8, 6], [7, 8, 9]] }, got {res}"
res = sol.modifiedMatrix(matrix = [[3, -1], [5, 2]])
assert res == [[3, 2], [5, 2]], f"Expected { [[3, 2], [5, 2]] }, got {res}"
print('All tests passed!')
