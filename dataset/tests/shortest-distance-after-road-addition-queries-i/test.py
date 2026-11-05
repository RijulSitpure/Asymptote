from solution import Solution
sol = Solution()
assert sol.shortestDistanceAfterQueries(5, [[2, 4], [0, 2], [0, 4]]) == [3, 2, 1]
assert sol.shortestDistanceAfterQueries(4, [[0, 3], [0, 2]]) == [1, 1]
print("All tests passed successfully.")
