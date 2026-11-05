from solution import Solution

s = Solution()
assert s.minOperationsToMakeMedianK([2, 5, 6, 8, 5], 4) == 2
assert s.minOperationsToMakeMedianK([2, 5, 6, 8, 5], 7) == 3
assert s.minOperationsToMakeMedianK([1, 2, 3, 4, 5, 6], 4) == 0
print("All tests passed successfully.")
