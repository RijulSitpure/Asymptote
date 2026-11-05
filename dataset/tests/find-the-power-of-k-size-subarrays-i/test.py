from solution import Solution
sol = Solution()
assert sol.resultsArray([1, 2, 3, 4, 3, 2, 5], 3) == [3, 4, -1, -1, -1]
assert sol.resultsArray([2, 2, 2, 2, 2], 4) == [-1, -1]
assert sol.resultsArray([3, 2, 3, 2, 3, 2], 2) == [-1, 3, -1, 3, -1]
print("All tests passed successfully.")
