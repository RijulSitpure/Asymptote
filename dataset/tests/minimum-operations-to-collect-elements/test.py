from solution import Solution
s = Solution()
assert s.minOperations([3, 1, 5, 4, 2], 2) == 4
assert s.minOperations([3, 1, 5, 4, 2], 5) == 5
assert s.minOperations([3, 2, 5, 3, 1], 3) == 4
print("minimum-operations-to-collect-elements passed")
