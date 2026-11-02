class Solution:
    def numberOfWays(self, n: int, x: int) -> int:
        mod = 10**9 + 7
        dp = [0] * (n + 1)
        dp[0] = 1
        base = 1
        while True:
            val = base ** x
            if val > n:
                break
            for s in range(n, val - 1, -1):
                dp[s] = (dp[s] + dp[s - val]) % mod
            base += 1
        return dp[n]