class Solution:
    def countPyramids(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])

        def count_directional(g: list[list[int]]) -> int:
            dp = [row[:] for row in g]
            total = 0
            for r in range(m - 2, -1, -1):
                for c in range(1, n - 1):
                    if g[r][c] == 1:
                        dp[r][c] = min(dp[r + 1][c - 1], dp[r + 1][c], dp[r + 1][c + 1]) + 1
                        total += dp[r][c] - 1
            return total

        normal = count_directional(grid)
        inverse = count_directional(grid[::-1])
        return normal + inverse
