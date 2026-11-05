from solution import Solution

s = Solution()
assert s.maximumTotalCost([1, -2, 3, 4]) == 10
assert s.maximumTotalCost([1, -1, 1, -1]) == 4
assert s.maximumTotalCost([0]) == 0
print('All tests passed successfully.')