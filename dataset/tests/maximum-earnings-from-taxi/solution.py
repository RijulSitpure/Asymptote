class Solution:
    def maxTaxiEarnings(self, n: int, rides: list[list[int]]) -> int:
        rides_by_end = [[] for _ in range(n + 1)]
        for s, e, t in rides:
            rides_by_end[e].append((s, e - s + t))
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            dp[i] = dp[i - 1]
            for s, gain in rides_by_end[i]:
                if dp[s] + gain > dp[i]:
                    dp[i] = dp[s] + gain
        return dp[n]
