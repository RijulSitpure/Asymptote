from solution import Solution

s = Solution()
assert s.getResults([[1, 2], [2, 3, 3], [2, 3, 1], [2, 2, 2]]) == [False, True, True]
assert s.getResults([[1, 7], [2, 7, 6], [1, 2], [2, 7, 5], [2, 7, 6]]) == [True, True, False]
print('All tests passed successfully.')