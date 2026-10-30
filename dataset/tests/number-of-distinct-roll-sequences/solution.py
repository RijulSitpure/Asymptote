import math

class Solution:
    def distinctSequences(self, n: int) -> int:
        if n == 1:
            return 6
        MOD = 1_000_000_007
        dp = [[0] * 7 for _ in range(7)]
        for i in range(1, 7):
            for j in range(1, 7):
                if i != j and math.gcd(i, j) == 1:
                    dp[j][i] = 1
                    
        for _ in range(3, n + 1):
            next_dp = [[0] * 7 for _ in range(7)]
            for prev in range(1, 7):
                for prev_prev in range(1, 7):
                    if dp[prev][prev_prev] == 0:
                        continue
                    for curr in range(1, 7):
                        if curr != prev and curr != prev_prev and math.gcd(curr, prev) == 1:
                            next_dp[curr][prev] = (next_dp[curr][prev] + dp[prev][prev_prev]) % MOD
            dp = next_dp
            
        return sum(sum(row) for row in dp) % MOD
