from solution import Solution
s = Solution()
assert s.findColumnWidth([[1], [22], [333]]) == [3]
assert s.findColumnWidth([[-15, 1, 3], [15, 7, 12], [5, 6, -2]]) == [3, 1, 2]
print('All tests passed for find-the-width-of-columns-of-a-grid!')
