class Solution:
    def peopleAwareOfSecret(self, n: int, delay: int, forget: int) -> int:
        MOD = 10**9 + 7
        dp = [0] * (n + 1)
        dp[1] = 1
        share = 0
        for i in range(2, n + 1):
            if i - delay >= 1:
                share = (share + dp[i - delay]) % MOD
            if i - forget >= 1:
                share = (share - dp[i - forget] + MOD) % MOD
            dp[i] = share
        total = 0
        for i in range(n - forget + 1, n + 1):
            if i >= 1:
                total = (total + dp[i]) % MOD
        return total
