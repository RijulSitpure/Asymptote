class Solution:
    def minScore(self, grid: list[list[int]]) -> list[list[int]]:
        m, n = len(grid), len(grid[0])
        cells = []
        for r in range(m):
            for c in range(n):
                cells.append((grid[r][c], r, c))
        cells.sort()
        row_max = [0] * m
        col_max = [0] * n
        res = [[0] * n for _ in range(m)]
        for _, r, c in cells:
            v = max(row_max[r], col_max[c]) + 1
            res[r][c] = v
            row_max[r] = v
            col_max[c] = v
        return res
