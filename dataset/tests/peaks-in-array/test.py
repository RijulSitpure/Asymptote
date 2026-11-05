from solution import Solution

s = Solution()
assert s.countOfPeaks([3, 1, 4, 2, 5], [[2, 3, 4], [1, 0, 4]]) == [0]
assert s.countOfPeaks([4, 1, 4, 2, 1, 5], [[2, 2, 4], [1, 0, 2], [1, 0, 4]]) == [0, 1]
print('All tests passed successfully.')