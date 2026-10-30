class Solution:
    def maximumProfit(self, present: list[int], future: list[int], budget: int) -> int:
        dp = [0] * (budget + 1)
        for p, f in zip(present, future):
            profit = f - p
            if profit > 0:
                for b in range(budget, p - 1, -1):
                    dp[b] = max(dp[b], dp[b - p] + profit)
        return dp[budget]
