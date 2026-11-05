class Solution:
    def maximumLength(self, nums: list[int], k: int) -> int:
        n = len(nums)
        dp = [[1] * (k + 1) for _ in range(n)]
        ans = 1
        for i in range(n):
            for j in range(k + 1):
                for p in range(i):
                    if nums[p] == nums[i]:
                        dp[i][j] = max(dp[i][j], dp[p][j] + 1)
                    elif j > 0:
                        dp[i][j] = max(dp[i][j], dp[p][j - 1] + 1)
                ans = max(ans, dp[i][j])
        return ans