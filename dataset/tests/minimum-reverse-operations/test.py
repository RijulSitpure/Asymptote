from solution import Solution
s = Solution()
assert s.minReverseOperations(4, 0, [1, 2], 4) == [0, -1, -1, 1]
assert s.minReverseOperations(5, 0, [2, 4], 3) == [0, -1, -1, -1, -1]
assert s.minReverseOperations(4, 2, [0, 1, 3], 1) == [-1, -1, 0, -1]
print('All tests passed for minimum-reverse-operations!')
