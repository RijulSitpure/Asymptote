from solution import Solution
s = Solution()
assert s.handleQuery([1, 0, 1], [0, 0, 0], [[1, 1, 1], [2, 1, 0], [3, 0, 0]]) == [3]
assert s.handleQuery([1], [5], [[2, 0, 0], [3, 0, 0]]) == [5]
print('All tests passed for handling-sum-queries-after-update!')
