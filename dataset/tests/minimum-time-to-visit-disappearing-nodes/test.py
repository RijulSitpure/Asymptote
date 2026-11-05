from solution import Solution

s = Solution()
assert s.minimumTime(3, [[0, 1, 2], [1, 2, 1], [0, 2, 4]], [1, 1, 5]) == [0, -1, 4]
assert s.minimumTime(3, [[0, 1, 2], [1, 2, 1], [0, 2, 4]], [1, 3, 5]) == [0, 2, 3]
assert s.minimumTime(2, [[0, 1, 1]], [1, 1]) == [0, -1]
print("All tests passed successfully.")
