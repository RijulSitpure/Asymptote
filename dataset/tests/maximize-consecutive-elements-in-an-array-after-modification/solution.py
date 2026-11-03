class Solution:
    def maxSelectedElements(self, nums: list[int]) -> int:
        nums.sort()
        dp = {}
        ans = 0
        for x in nums:
            dp[x + 1] = dp.get(x, 0) + 1
            dp[x] = dp.get(x - 1, 0) + 1
            ans = max(ans, dp[x + 1], dp[x])
        return ans
