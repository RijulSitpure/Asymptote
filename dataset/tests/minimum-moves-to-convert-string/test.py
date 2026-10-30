from solution import Solution

s = Solution()
assert s.minimumMoves('XXX') == 1
assert s.minimumMoves('XXOX') == 2
assert s.minimumMoves('OOOO') == 0
print('OK')