from solution import Solution

s = Solution()
assert s.minimumDiameterAfterMerge([[0, 1], [0, 2], [0, 3]], [[0, 1]]) == 3
assert s.minimumDiameterAfterMerge([[0, 1], [0, 2], [0, 3], [2, 4], [2, 5], [3, 6], [2, 7]], [[0, 1], [0, 2], [0, 3], [2, 4], [2, 5], [3, 6], [2, 7]]) == 5
print('All tests passed successfully.')