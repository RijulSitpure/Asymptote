class Solution:
    def minMoves(self, rooks: list[list[int]]) -> int:
        n = len(rooks)
        rows = sorted(r for r, c in rooks)
        cols = sorted(c for r, c in rooks)
        return sum(abs(rows[i] - i) + abs(cols[i] - i) for i in range(n))