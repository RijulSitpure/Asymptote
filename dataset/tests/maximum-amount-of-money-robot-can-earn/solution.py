class Solution:
    def maximumAmount(self, coins: list[list[int]]) -> int:
        m, n = len(coins), len(coins[0])
        dp = [[[-float('inf')] * 3 for _ in range(n)] for _ in range(m)]
        
        for k in range(3):
            if coins[0][0] < 0 and k > 0:
                dp[0][0][k] = 0
            else:
                dp[0][0][k] = coins[0][0]
                
        for i in range(m):
            for j in range(n):
                for k in range(3):
                    val = coins[i][j]
                    if i > 0:
                        dp[i][j][k] = max(dp[i][j][k], dp[i - 1][j][k] + val)
                        if val < 0 and k > 0:
                            dp[i][j][k] = max(dp[i][j][k], dp[i - 1][j][k - 1])
                    if j > 0:
                        dp[i][j][k] = max(dp[i][j][k], dp[i][j - 1][k] + val)
                        if val < 0 and k > 0:
                            dp[i][j][k] = max(dp[i][j][k], dp[i][j - 1][k - 1])
                            
        return max(dp[m - 1][n - 1])
