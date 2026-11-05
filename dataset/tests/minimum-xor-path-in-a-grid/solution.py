def minXorPath(grid: list[list[int]]) -> int:
    m, n = len(grid), len(grid[0])
    dp = [[set() for _ in range(n)] for _ in range(m)]
    dp[0][0].add(grid[0][0])
    for r in range(m):
        for c in range(n):
            val = grid[r][c]
            if r > 0:
                for x in dp[r - 1][c]:
                    dp[r][c].add(x ^ val)
            if c > 0:
                for x in dp[r][c - 1]:
                    dp[r][c].add(x ^ val)
    return min(dp[m - 1][n - 1])