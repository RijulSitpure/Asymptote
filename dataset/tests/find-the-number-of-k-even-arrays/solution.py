class Solution:
    def countOfArrays(self, n: int, m: int, k: int) -> int:
        MOD = 1_000_000_007
        even = m // 2
        odd = m - even
        
        dp = [[0, 0] for _ in range(k + 1)]
        dp[0][0] = even
        dp[0][1] = odd
        
        for _ in range(2, n + 1):
            new_dp = [[0, 0] for _ in range(k + 1)]
            for j in range(k + 1):
                from_even = dp[j - 1][0] if j > 0 else 0
                from_odd = dp[j][1]
                new_dp[j][0] = ((from_even + from_odd) * even) % MOD
                new_dp[j][1] = ((dp[j][0] + dp[j][1]) * odd) % MOD
            dp = new_dp
            
        return (dp[k][0] + dp[k][1]) % MOD
