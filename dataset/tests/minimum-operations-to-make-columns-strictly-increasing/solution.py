class Solution:
    def minimumOperations(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        operations = 0
        for j in range(n):
            for i in range(1, m):
                if grid[i][j] <= grid[i - 1][j]:
                    target = grid[i - 1][j] + 1
                    operations += target - grid[i][j]
                    grid[i][j] = target
        return operations
