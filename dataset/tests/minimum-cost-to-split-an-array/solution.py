class Solution:
    def minCost(self, nums: list[int], k: int) -> int:
        n = len(nums)
        dp = [float('inf')] * (n + 1)
        dp[0] = 0
        for i in range(1, n + 1):
            counts = {}
            trimmed = 0
            for j in range(i - 1, -1, -1):
                x = nums[j]
                c = counts.get(x, 0)
                if c == 1:
                    trimmed += 2
                elif c > 1:
                    trimmed += 1
                counts[x] = c + 1
                cost = dp[j] + k + trimmed
                if cost < dp[i]:
                    dp[i] = cost
        return dp[n]
