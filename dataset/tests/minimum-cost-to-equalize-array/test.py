from solution import Solution

s = Solution()
assert s.minCostToEqualizeArray([4, 1], 5, 2) == 15
assert s.minCostToEqualizeArray([2, 3, 3, 3, 5], 2, 1) == 6
assert s.minCostToEqualizeArray([3, 5, 3], 1, 3) == 4
print("All tests passed successfully.")
