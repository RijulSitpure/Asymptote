class Solution:
    def numberOfWays(self, numPeople: int) -> int:
        MOD = 10**9 + 7
        n = numPeople // 2
        dp = [0] * (n + 1)
        dp[0] = 1
        for i in range(1, n + 1):
            for j in range(i):
                dp[i] = (dp[i] + dp[j] * dp[i - 1 - j]) % MOD
        return dp[n]

def test():
    sol = Solution()
    assert sol.numberOfWays(2) == 1, "test 1 failed"
    assert sol.numberOfWays(4) == 2, "test 2 failed"
    assert sol.numberOfWays(6) == 5, "test 3 failed"
    print("✓ handshakes-that-dont-cross passed")

if __name__ == "__main__":
    test()
