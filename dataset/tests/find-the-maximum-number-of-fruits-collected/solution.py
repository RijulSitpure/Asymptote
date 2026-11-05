class Solution:
    def maxCollectedFruits(self, fruits: list[list[int]]) -> int:
        n = len(fruits)
        child1 = sum(fruits[i][i] for i in range(n))
        
        def collect_upper(grid):
            dp = [[-1] * n for _ in range(n)]
            dp[0][n - 1] = grid[0][n - 1]
            for r in range(n - 1):
                for c in range(r + 1, n):
                    if dp[r][c] == -1:
                        continue
                    for nc in (c - 1, c, c + 1):
                        if nc > r + 1 and nc < n and nc >= n - 1 - (r + 1):
                            if dp[r][c] + grid[r + 1][nc] > dp[r + 1][nc]:
                                dp[r + 1][nc] = dp[r][c] + grid[r + 1][nc]
                        elif r + 1 == n - 1 and nc == n - 1:
                            if dp[r][c] + grid[r + 1][nc] > dp[r + 1][nc]:
                                dp[r + 1][nc] = dp[r][c] + grid[r + 1][nc]
            return dp[n - 1][n - 1]
        
        child2 = collect_upper(fruits)
        transposed = [[fruits[c][r] for c in range(n)] for r in range(n)]
        child3 = collect_upper(transposed)
        
        return child1 + child2 + child3 - 2 * fruits[n - 1][n - 1]
