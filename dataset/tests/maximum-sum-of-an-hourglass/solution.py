class Solution:
    def maxSum(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        best = 0
        for r in range(m - 2):
            for c in range(n - 2):
                cur = (
                    grid[r][c] + grid[r][c + 1] + grid[r][c + 2]
                    + grid[r + 1][c + 1]
                    + grid[r + 2][c] + grid[r + 2][c + 1] + grid[r + 2][c + 2]
                )
                if cur > best:
                    best = cur
        return best
