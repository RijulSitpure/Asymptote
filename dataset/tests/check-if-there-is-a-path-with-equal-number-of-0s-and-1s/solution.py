class Solution:
    def isThereAPath(self, grid: list[list[int]]) -> bool:
        m, n = len(grid), len(grid[0])
        total_len = m + n - 1
        if total_len % 2 == 1:
            return False
        target = total_len // 2
        dp = [0] * n
        dp[0] = 1 << grid[0][0]
        for c in range(1, n):
            dp[c] = dp[c - 1] << grid[0][c]
        for r in range(1, m):
            dp[0] = dp[0] << grid[r][0]
            for c in range(1, n):
                dp[c] = (dp[c] | dp[c - 1]) << grid[r][c]
        return bool((dp[-1] >> target) & 1)
