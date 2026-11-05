class Solution:
    def maxScore(self, nums: list[int]) -> int:
        n = len(nums)
        dp = [0] * n
        for i in range(n - 2, -1, -1):
            dp[i] = max((j - i) * nums[j] + dp[j] for j in range(i + 1, n))
        return dp[0]