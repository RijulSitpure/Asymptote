from solution import Solution

s = Solution()
assert s.minOperations([2, 11, 10, 1, 3], 10) == 3
assert s.minOperations([1, 1, 2, 4, 9], 1) == 0
assert s.minOperations([1, 1, 2, 4, 9], 9) == 4
print("minimum-operations-to-exceed-threshold-value-i tests passed!")
