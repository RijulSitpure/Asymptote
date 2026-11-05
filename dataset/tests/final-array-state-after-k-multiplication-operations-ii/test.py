from solution import Solution
sol = Solution()
assert sol.getFinalState([2, 1, 3, 5, 6], 5, 2) == [8, 4, 6, 5, 6]
assert sol.getFinalState([100000, 2000], 2, 1000000) == [999999307, 999999993]
print("All tests passed successfully.")
