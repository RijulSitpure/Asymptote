class Solution:
    def minPathCost(self, grid: list[list[int]], moveCost: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dp = list(grid[0])
        for r in range(m - 1):
            next_dp = [float("inf")] * n
            for c1 in range(n):
                val = grid[r][c1]
                cost_c1 = dp[c1]
                for c2 in range(n):
                    cand = cost_c1 + moveCost[val][c2] + grid[r + 1][c2]
                    if cand < next_dp[c2]:
                        next_dp[c2] = cand
            dp = next_dp
        return min(dp)
