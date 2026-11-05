from solution import Solution
sol = Solution()
assert sol.canReachCorner(3, 4, [[2, 1, 1]]) == True
assert sol.canReachCorner(3, 3, [[1, 1, 2]]) == False
assert sol.canReachCorner(3, 3, [[2, 1, 1], [1, 2, 1]]) == False
print("All tests passed successfully.")
