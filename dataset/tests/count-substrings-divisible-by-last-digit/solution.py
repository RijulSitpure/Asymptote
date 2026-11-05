class Solution:
    def countSubstrings(self, s: str) -> int:
        dp = [[0] * m for m in range(10)]
        total = 0
        for ch in s:
            x = ord(ch) - ord("0")
            next_dp = [[0] * m for m in range(10)]
            for m in range(1, 10):
                next_dp[m][x % m] += 1
                for r in range(m):
                    if dp[m][r] > 0:
                        new_r = (r * 10 + x) % m
                        next_dp[m][new_r] += dp[m][r]
            if x > 0:
                total += next_dp[x][0]
            dp = next_dp
        return total
