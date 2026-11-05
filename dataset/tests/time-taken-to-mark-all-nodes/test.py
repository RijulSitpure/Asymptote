from solution import Solution
sol = Solution()
assert sol.timeTaken([[0, 1], [0, 2]]) == [2, 4, 3]
assert sol.timeTaken([[0, 1]]) == [1, 2]
assert sol.timeTaken([[2, 4], [0, 1], [2, 3], [0, 2]]) == [4, 6, 3, 5, 5]
print("All tests passed successfully.")