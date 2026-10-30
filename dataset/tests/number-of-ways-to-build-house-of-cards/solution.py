class Solution:
    def houseOfCards(self, n: int) -> int:
        dp = [0] * (n + 1)
        dp[0] = 1
        k = 1
        while 3 * k - 1 <= n:
            cost = 3 * k - 1
            for i in range(n, cost - 1, -1):
                dp[i] += dp[i - cost]
            k += 1
        return dp[n]
