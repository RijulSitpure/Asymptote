from solution import Solution

s = Solution()
assert s.minRectanglesToCoverPoints([[2, 1], [1, 0], [1, 4], [1, 8], [3, 5], [4, 6]], 1) == 2
assert s.minRectanglesToCoverPoints([[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6]], 2) == 3
assert s.minRectanglesToCoverPoints([[2, 3], [1, 2]], 0) == 2
print("All tests passed successfully.")
