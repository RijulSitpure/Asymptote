class Solution:
    def maxRemovals(self, source: str, pattern: str, targetIndices: list[int]) -> int:
        n, m = len(source), len(pattern)
        is_target = [0] * n
        for idx in targetIndices:
            is_target[idx] = 1
            
        dp = [-float('inf')] * (m + 1)
        dp[0] = 0
        
        for i in range(n):
            cost = is_target[i]
            ch = source[i]
            for j in range(m, 0, -1):
                if ch == pattern[j - 1]:
                    dp[j] = max(dp[j] + cost, dp[j - 1])
                else:
                    dp[j] = dp[j] + cost
            dp[0] += cost
            
        return dp[m]
