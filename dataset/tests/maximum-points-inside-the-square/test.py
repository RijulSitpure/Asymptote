from solution import Solution

s = Solution()
assert s.maxPointsInsideSquare([[2, 2], [-1, -2], [-4, 4], [-3, 1], [3, -3]], "abdca") == 2
assert s.maxPointsInsideSquare([[1, 1], [-2, -2], [-2, 2]], "abb") == 1
assert s.maxPointsInsideSquare([[1, 1], [-1, -1], [2, -2]], "ccd") == 0
print("All tests passed successfully.")
