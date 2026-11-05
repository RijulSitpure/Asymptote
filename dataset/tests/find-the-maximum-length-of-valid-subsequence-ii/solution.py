class Solution:
    def maximumLength(self, nums: list[int], k: int) -> int:
        dp = [[0] * k for _ in range(k)]
        ans = 0
        for x in nums:
            r = x % k
            for target in range(k):
                prev = (target - r) % k
                dp[r][target] = dp[prev][target] + 1
                if dp[r][target] > ans:
                    ans = dp[r][target]
        return ans