def countGridPaths(grid: list[list[int]]) -> int:
    m = len(grid)
    n = len(grid[0])
    if grid[0][0] == 1 or grid[m - 1][n - 1] == 1:
        return 0
    dp = [0] * n
    dp[0] = 1
    for r in range(m):
        for c in range(n):
            if grid[r][c] == 1:
                dp[c] = 0
            elif c > 0:
                dp[c] += dp[c - 1]
    return dp[n - 1]