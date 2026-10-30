class Solution:
    def onesMinusZeros(self, grid: list[list[int]]) -> list[list[int]]:
        m, n = len(grid), len(grid[0])
        ones_row = [sum(row) for row in grid]
        ones_col = [sum(grid[r][c] for r in range(m)) for c in range(n)]
        diff = [[0] * n for _ in range(m)]
        for r in range(m):
            for c in range(n):
                diff[r][c] = 2 * ones_row[r] + 2 * ones_col[c] - m - n
        return diff
