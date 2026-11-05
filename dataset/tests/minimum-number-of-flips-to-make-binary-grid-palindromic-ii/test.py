from solution import Solution
sol = Solution()
assert sol.minFlips([[1, 0, 0], [0, 1, 0], [0, 0, 1]]) == 3
assert sol.minFlips([[0, 1], [0, 1], [0, 0]]) == 2
assert sol.minFlips([[1], [1]]) == 2
print("All tests passed successfully.")
