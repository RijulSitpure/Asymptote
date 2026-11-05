from solution import Solution

s = Solution()
assert s.queryResults(4, [[1, 4], [2, 5], [1, 3], [3, 4]]) == [1, 2, 2, 3]
assert s.queryResults(4, [[0, 1], [1, 2], [2, 2], [3, 4], [4, 5]]) == [1, 2, 2, 3, 4]
print('All tests passed successfully.')