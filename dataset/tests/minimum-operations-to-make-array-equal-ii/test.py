from solution import Solution
s = Solution()
assert s.minOperations([4,3,1,4], [1,3,7,1], 3) == 2
assert s.minOperations([3,8,5,2], [2,4,1,6], 1) == -1
assert s.minOperations([1,2], [1,2], 0) == 0
print('All tests passed for minimum-operations-to-make-array-equal-ii!')
