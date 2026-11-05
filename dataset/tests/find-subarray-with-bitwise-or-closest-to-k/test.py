from solution import Solution

s = Solution()
assert s.minimumDifference([1, 2, 4, 5], 3) == 0
assert s.minimumDifference([1, 2, 1, 2], 2) == 0
assert s.minimumDifference([1], 10) == 9
print('All tests passed successfully.')