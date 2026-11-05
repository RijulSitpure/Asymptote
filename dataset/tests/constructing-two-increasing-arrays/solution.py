class Solution:
    def minLargest(self, nums1: list[int], nums2: list[int]) -> int:
        m, n = len(nums1), len(nums2)
        dp = [[float('inf')] * (n + 1) for _ in range(m + 1)]
        dp[0][0] = 0
        
        def get_next(prev, num):
            return prev + (2 if prev % 2 == num else 1)
            
        for i in range(m + 1):
            for j in range(n + 1):
                if i > 0:
                    dp[i][j] = min(dp[i][j], get_next(dp[i - 1][j], nums1[i - 1]))
                if j > 0:
                    dp[i][j] = min(dp[i][j], get_next(dp[i][j - 1], nums2[j - 1]))
                    
        return dp[m][n]
