import math

class Solution:
    def validSubarraySplit(self, nums: list[int]) -> int:
        n = len(nums)
        dp = [float('inf')] * (n + 1)
        dp[0] = 0
        for i in range(n):
            if dp[i] == float('inf'):
                continue
            for j in range(i, n):
                if math.gcd(nums[i], nums[j]) > 1:
                    if dp[i] + 1 < dp[j + 1]:
                        dp[j + 1] = dp[i] + 1
        return dp[n] if dp[n] != float('inf') else -1
