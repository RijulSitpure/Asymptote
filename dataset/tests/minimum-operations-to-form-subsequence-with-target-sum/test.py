from solution import Solution
s = Solution()
assert s.minOperations([1, 2, 8], 7) == 1
assert s.minOperations([1, 32, 1, 2], 12) == 2
assert s.minOperations([1, 32, 1], 35) == -1
print("minimum-operations-to-form-subsequence-with-target-sum passed")
