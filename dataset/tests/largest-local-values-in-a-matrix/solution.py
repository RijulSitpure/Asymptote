class Solution:
    def largestLocal(self, grid: list[list[int]]) -> list[list[int]]:
        n = len(grid)
        res = [[0] * (n - 2) for _ in range(n - 2)]
        for r in range(n - 2):
            for c in range(n - 2):
                res[r][c] = max(grid[r + i][c + j] for i in range(3) for j in range(3))
        return res
