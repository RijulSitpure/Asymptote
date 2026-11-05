class Solution:
    def maxScore(self, a: list[int], b: list[int]) -> int:
        dp = [float('-inf')] * 5
        dp[0] = 0
        
        for x in b:
            for j in range(3, -1, -1):
                if dp[j] != float('-inf'):
                    dp[j + 1] = max(dp[j + 1], dp[j] + a[j] * x)
                    
        return dp[4]
