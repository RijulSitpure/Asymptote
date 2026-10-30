class Solution:
    def waysToDistribute(self, n: int, k: int) -> int:
        MOD = 10**9 + 7
        dp = [0] * (k + 1)
        dp[0] = 1
        for i in range(1, n + 1):
            new_dp = [0] * (k + 1)
            for j in range(1, min(i, k) + 1):
                new_dp[j] = (dp[j - 1] + j * dp[j]) % MOD
            dp = new_dp
        return dp[k]

sol = Solution()
assert sol.waysToDistribute(3, 2) == 3
assert sol.waysToDistribute(4, 2) == 7
assert sol.waysToDistribute(20, 5) == 206085257
print("All tests passed successfully.")
