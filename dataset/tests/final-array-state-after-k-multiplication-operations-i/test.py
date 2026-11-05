from solution import Solution
sol = Solution()
assert sol.getFinalState([2, 1, 3, 5, 6], 5, 2) == [8, 4, 6, 5, 6]
assert sol.getFinalState([1, 2], 3, 4) == [16, 8]
print("All tests passed successfully.")
