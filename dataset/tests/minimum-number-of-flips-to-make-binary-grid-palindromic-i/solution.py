class Solution:
    def minFlips(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        row_flips = 0
        for r in range(m):
            for c in range(n // 2):
                if grid[r][c] != grid[r][n - 1 - c]:
                    row_flips += 1
                    
        col_flips = 0
        for c in range(n):
            for r in range(m // 2):
                if grid[r][c] != grid[m - 1 - r][c]:
                    col_flips += 1
                    
        return min(row_flips, col_flips)
