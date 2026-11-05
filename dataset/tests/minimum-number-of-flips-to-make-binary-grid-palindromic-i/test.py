from solution import Solution
sol = Solution()
assert sol.minFlips([[1, 0, 0], [0, 0, 0], [0, 0, 1]]) == 2
assert sol.minFlips([[0, 1], [0, 1], [0, 0]]) == 1
assert sol.minFlips([[1], [0]]) == 0
print("All tests passed successfully.")
