class Solution:
    def countPathsWithXorValue(self, grid: list[list[int]], k: int) -> int:
        m, n = len(grid), len(grid[0])
        MOD = 1_000_000_007
        dp = [[[0] * 16 for _ in range(n)] for _ in range(m)]
        dp[0][0][grid[0][0]] = 1
        
        for i in range(m):
            for j in range(n):
                for x in range(16):
                    val = dp[i][j][x]
                    if val == 0:
                        continue
                    if i + 1 < m:
                        nxt = x ^ grid[i + 1][j]
                        dp[i + 1][j][nxt] = (dp[i + 1][j][nxt] + val) % MOD
                    if j + 1 < n:
                        nxt = x ^ grid[i][j + 1]
                        dp[i][j + 1][nxt] = (dp[i][j + 1][nxt] + val) % MOD
                        
        return dp[m - 1][n - 1][k]
