def uniquePathsWithObstaclesCount(grid: list[list[int]]) -> int:
    MOD = 1_000_000_007
    m = len(grid)
    n = len(grid[0])
    if grid[0][0] == 1 or grid[m - 1][n - 1] == 1:
        return 0
    dp = [[0] * n for _ in range(m)]
    dp[0][0] = 1
    for r in range(m):
        for c in range(n):
            if grid[r][c] == 1:
                dp[r][c] = 0
            else:
                if r > 0:
                    dp[r][c] = (dp[r][c] + dp[r - 1][c]) % MOD
                if c > 0:
                    dp[r][c] = (dp[r][c] + dp[r][c - 1]) % MOD
    return dp[m - 1][n - 1]