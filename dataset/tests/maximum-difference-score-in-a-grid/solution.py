class Solution:
    def maxScore(self, grid: list[list[int]]) -> int:
        R, C = len(grid), len(grid[0])
        dp = [[float('inf')] * C for _ in range(R)]
        ans = -float('inf')
        for r in range(R):
            for c in range(C):
                prev_min = float('inf')
                if r > 0:
                    prev_min = min(prev_min, dp[r - 1][c], grid[r - 1][c])
                if c > 0:
                    prev_min = min(prev_min, dp[r][c - 1], grid[r][c - 1])
                if prev_min != float('inf'):
                    ans = max(ans, grid[r][c] - prev_min)
                dp[r][c] = min(grid[r][c], prev_min)
        return ans
