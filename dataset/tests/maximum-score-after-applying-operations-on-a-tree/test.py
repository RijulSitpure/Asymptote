from solution import Solution
s = Solution()
assert s.maximumScoreAfterOperations([[0, 1], [0, 2], [0, 3], [2, 4], [4, 5]], [5, 2, 5, 2, 1, 1]) == 11
assert s.maximumScoreAfterOperations([[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]], [20, 10, 9, 7, 4, 3, 5]) == 40
print('maximum-score-after-applying-operations-on-a-tree passed')
