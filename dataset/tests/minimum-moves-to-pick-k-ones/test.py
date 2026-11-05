from solution import Solution

s = Solution()
assert s.minimumMoves([1, 1, 0, 0, 0, 1, 1, 0, 0, 1], 3, 1) == 3
assert s.minimumMoves([0, 0, 0, 0], 2, 3) == 4
print("minimum-moves-to-pick-k-ones tests passed!")
