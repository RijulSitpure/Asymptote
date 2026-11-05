from solution import Solution

s = Solution()
assert s.numberOfRightTriangles([[0, 1, 0], [0, 1, 1], [0, 1, 0]]) == 2
assert s.numberOfRightTriangles([[1, 0, 0, 0], [0, 1, 0, 1], [1, 0, 0, 0]]) == 0
assert s.numberOfRightTriangles([[1, 0, 1], [1, 0, 0], [1, 0, 0]]) == 2
print("All tests passed successfully.")
