class Solution:
    def numberOfPaths(self, grid: list[list[int]], k: int) -> int:
        m, n = len(grid), len(grid[0])
        MOD = 1_000_000_007
        dp = [[[0] * k for _ in range(n)] for _ in range(m)]
        
        dp[0][0][grid[0][0] % k] = 1
        for r in range(m):
            for c in range(n):
                val = grid[r][c]
                for rem in range(k):
                    if r > 0:
                        prev = (rem - val) % k
                        dp[r][c][rem] = (dp[r][c][rem] + dp[r - 1][c][prev]) % MOD
                    if c > 0:
                        prev = (rem - val) % k
                        dp[r][c][rem] = (dp[r][c][rem] + dp[r][c - 1][prev]) % MOD
        return dp[m - 1][n - 1][0]
