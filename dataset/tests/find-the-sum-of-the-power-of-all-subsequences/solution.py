class Solution:
    def sumOfPower(self, nums: list[int], k: int) -> int:
        MOD = 10**9 + 7
        dp = [0] * (k + 1)
        dp[0] = 1
        for x in nums:
            for s in range(k, -1, -1):
                inc = dp[s - x] if s >= x else 0
                dp[s] = (dp[s] * 2 + inc) % MOD
        return dp[k]
