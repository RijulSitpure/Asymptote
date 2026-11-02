class Solution:
    def maxScore(self, nums: list[int], x: int) -> int:
        dp = [-float("inf"), -float("inf")]
        first_parity = nums[0] % 2
        dp[first_parity] = nums[0]
        for v in nums[1:]:
            p = v % 2
            dp[p] = max(dp[p] + v, dp[1 - p] + v - x)
        return max(dp[0], dp[1])