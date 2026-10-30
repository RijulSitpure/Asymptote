class Solution:
    def minimumMoves(self, s: str) -> int:
        i = 0
        moves = 0
        n = len(s)
        while i < n:
            if s[i] == 'X':
                moves += 1
                i += 3
            else:
                i += 1
        return moves
