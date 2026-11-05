class Solution:
    def numberOfWays(self, n: int, x: int, y: int) -> int:
        MOD = 1_000_000_007
        max_j = min(n, x)
        
        # Stirling numbers of the second kind S(n, j)
        dp = [[0] * (max_j + 1) for _ in range(n + 1)]
        dp[0][0] = 1
        for i in range(1, n + 1):
            for j in range(1, min(i, max_j) + 1):
                dp[i][j] = (dp[i - 1][j - 1] + j * dp[i - 1][j]) % MOD
                
        total_ways = 0
        perm = 1
        for j in range(1, max_j + 1):
            perm = (perm * (x - j + 1)) % MOD
            ways = (dp[n][j] * perm) % MOD
            ways = (ways * pow(y, j, MOD)) % MOD
            total_ways = (total_ways + ways) % MOD
            
        return total_ways
