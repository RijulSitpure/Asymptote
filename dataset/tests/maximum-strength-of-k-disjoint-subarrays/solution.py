class Solution:
    def maximumStrength(self, nums: list[int], k: int) -> int:
        n = len(nums)
        dp = [[-float('inf')] * (k + 1) for _ in range(n + 1)]
        dp[0][0] = 0
        for j in range(1, k + 1):
            w = (k - j + 1) if j % 2 == 1 else -(k - j + 1)
            mx = -float('inf')
            for i in range(j, n + 1):
                mx = max(mx, dp[i - 1][j - 1])
                val = w * nums[i - 1]
                dp[i][j] = val + max(dp[i - 1][j], mx)
        ans = -float('inf')
        for i in range(k, n + 1):
            ans = max(ans, dp[i][k])
        return ans
