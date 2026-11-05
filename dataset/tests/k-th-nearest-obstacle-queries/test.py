from solution import Solution
sol = Solution()
assert sol.resultsArray([[1,2],[3,4],[2,3],[-3,0]], 2) == [-1, 7, 5, 3]
assert sol.resultsArray([[5,5],[4,4],[3,3]], 1) == [10, 8, 6]
print("All tests passed successfully.")
