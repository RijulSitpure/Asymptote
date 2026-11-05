from solution import Solution

s = Solution()
assert s.minOperations([0, 1, 1, 1, 0, 0]) == 3
assert s.minOperations([0, 1, 1, 1]) == -1
print('All tests passed successfully.')