from solution import Solution
s = Solution()
assert s.minIncrementOperations([2, 3, 0, 0, 2], 4) == 3
assert s.minIncrementOperations([0, 1, 3, 3], 5) == 2
assert s.minIncrementOperations([1, 1, 2], 1) == 0
print('minimum-increment-operations-to-make-array-beautiful passed')
