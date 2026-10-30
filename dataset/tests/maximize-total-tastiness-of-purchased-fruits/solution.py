class Solution:
    def maxTastiness(self, price: list[int], tastiness: list[int], maxAmount: int, maxCoupons: int) -> int:
        dp = [[0] * (maxCoupons + 1) for _ in range(maxAmount + 1)]
        
        for p, t in zip(price, tastiness):
            half_p = p // 2
            for a in range(maxAmount, -1, -1):
                for c in range(maxCoupons, -1, -1):
                    if a >= p:
                        dp[a][c] = max(dp[a][c], dp[a - p][c] + t)
                    if c >= 1 and a >= half_p:
                        dp[a][c] = max(dp[a][c], dp[a - half_p][c - 1] + t)
        return dp[maxAmount][maxCoupons]
