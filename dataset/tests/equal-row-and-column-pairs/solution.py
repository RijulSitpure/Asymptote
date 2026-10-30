from collections import Counter

class Solution:
    def equalPairs(self, grid: list[list[int]]) -> int:
        n = len(grid)
        row_counts = Counter(tuple(row) for row in grid)
        ans = 0
        for c in range(n):
            col = tuple(grid[r][c] for r in range(n))
            ans += row_counts[col]
        return ans
