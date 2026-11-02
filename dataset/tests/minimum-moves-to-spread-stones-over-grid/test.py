from solution import Solution
s = Solution()
assert s.minimumMoves([[1, 1, 0], [1, 1, 1], [1, 2, 1]]) == 3
assert s.minimumMoves([[1, 3, 0], [1, 0, 0], [1, 0, 3]]) == 4
print("minimum-moves-to-spread-stones-over-grid passed")
