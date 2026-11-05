from solution import Solution
sol = Solution()
assert sol.countKConstraintSubstrings("0001111", 2, [[0,6]]) == [26]
assert sol.countKConstraintSubstrings("010101", 1, [[0,5],[1,4],[2,3]]) == [15, 9, 3]
print("All tests passed successfully.")
