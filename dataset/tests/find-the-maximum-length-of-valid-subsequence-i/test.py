from solution import Solution

s = Solution()
assert s.maximumLength([1, 2, 3, 4]) == 4
assert s.maximumLength([1, 2, 1, 1, 2, 1, 2]) == 6
assert s.maximumLength([1, 3]) == 2
print('All tests passed successfully.')