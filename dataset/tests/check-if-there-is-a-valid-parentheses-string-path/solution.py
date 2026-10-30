class Solution:
    def hasValidPath(self, grid: list[list[str]]) -> bool:
        m, n = len(grid), len(grid[0])
        if (m + n - 1) % 2 != 0 or grid[0][0] == ")" or grid[m - 1][n - 1] == "(":
            return False
        
        dp = [[set() for _ in range(n)] for _ in range(m)]
        dp[0][0].add(1)
        
        for r in range(m):
            for c in range(n):
                for bal in dp[r][c]:
                    for dr, dc in [(1, 0), (0, 1)]:
                        nr, nc = r + dr, c + dc
                        if nr < m and nc < n:
                            nbal = bal + (1 if grid[nr][nc] == "(" else -1)
                            if nbal >= 0 and nbal <= (m - 1 - nr + n - 1 - nc):
                                dp[nr][nc].add(nbal)
        
        return 0 in dp[m - 1][n - 1]
