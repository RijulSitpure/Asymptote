class Solution:
    def numberOfWays(self, n: int) -> int:
        MOD = 10**9 + 7
        dp = [0] * (n + 1)
        dp[0] = 1
        for c in [1, 2, 6]:
            for j in range(c, n + 1):
                dp[j] = (dp[j] + dp[j - c]) % MOD
        
        ans = dp[n]
        if n >= 4:
            ans = (ans + dp[n - 4]) % MOD
        if n >= 8:
            ans = (ans + dp[n - 8]) % MOD
        return ans