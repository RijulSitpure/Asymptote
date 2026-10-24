import sys

class Solution:
    def checkRecord(self, n: int) -> int:
        MOD = 10**9 + 7
        dp = [[0] * 3 for _ in range(2)]
        dp[0][0] = 1

        for _ in range(n):
            next_dp = [[0] * 3 for _ in range(2)]
            for a in range(2):
                for l in range(3):
                    val = dp[a][l]
                    if val == 0:
                        continue
                    next_dp[a][0] = (next_dp[a][0] + val) % MOD
                    if a == 0:
                        next_dp[1][0] = (next_dp[1][0] + val) % MOD
                    if l < 2:
                        next_dp[a][l + 1] = (next_dp[a][l + 1] + val) % MOD
            dp = next_dp

        ans = 0
        for a in range(2):
            for l in range(3):
                ans = (ans + dp[a][l]) % MOD
        return ans

def test():
    sol = Solution()
    assert sol.checkRecord(2) == 8, "test 1 failed"
    assert sol.checkRecord(1) == 3, "test 2 failed"
    assert sol.checkRecord(10101) == 183236316, "test 3 failed"
    print("✓ student-attendance-record-ii passed")

if __name__ == "__main__":
    test()
