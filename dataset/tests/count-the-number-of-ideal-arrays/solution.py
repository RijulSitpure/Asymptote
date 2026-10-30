import math

class Solution:
    def idealArrays(self, n: int, maxValue: int) -> int:
        MOD = 10**9 + 7
        max_len = min(n, 14)
        dp = [{} for _ in range(max_len + 1)]
        for v in range(1, maxValue + 1):
            dp[1][v] = 1
        for l in range(1, max_len):
            for v, cnt in dp[l].items():
                for mul in range(2 * v, maxValue + 1, v):
                    dp[l + 1][mul] = (dp[l + 1].get(mul, 0) + cnt) % MOD
        ans = 0
        for l in range(1, max_len + 1):
            total_chains = sum(dp[l].values()) % MOD
            ways = math.comb(n - 1, l - 1) % MOD
            ans = (ans + total_chains * ways) % MOD
        return ans
