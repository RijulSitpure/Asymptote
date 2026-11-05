class Solution:
    def minimumOperations(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        # Count frequency of digits 0-9 in each column
        col_counts = [[0] * 10 for _ in range(n)]
        for r in range(m):
            for c in range(n):
                col_counts[c][grid[r][c]] += 1

        dp = [m - col_counts[0][d] for d in range(10)]

        for c in range(1, n):
            nxt_dp = [float('inf')] * 10
            for d in range(10):
                cost = m - col_counts[c][d]
                for prev_d in range(10):
                    if prev_d != d:
                        nxt_dp[d] = min(nxt_dp[d], dp[prev_d] + cost)
            dp = nxt_dp

        return min(dp)
