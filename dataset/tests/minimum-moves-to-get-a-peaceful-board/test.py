from solution import Solution

s = Solution()
assert s.minMoves([[0, 0], [1, 0], [1, 1]]) == 3
assert s.minMoves([[0, 0], [0, 1], [0, 2], [0, 3]]) == 6
print('All tests passed successfully.')