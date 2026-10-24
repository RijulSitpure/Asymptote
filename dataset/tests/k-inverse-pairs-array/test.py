class Solution:
    def kInversePairs(self, n: int, k: int) -> int:
        MOD = 10**9 + 7
        dp = [1] + [0] * k

        for i in range(1, n + 1):
            new_dp = [0] * (k + 1)
            new_dp[0] = 1
            for j in range(1, k + 1):
                val = (new_dp[j - 1] + dp[j] - (dp[j - i] if j >= i else 0)) % MOD
                new_dp[j] = (val + MOD) % MOD
            dp = new_dp

        return dp[k]

def test():
    sol = Solution()
    assert sol.kInversePairs(3, 0) == 1, "test 1 failed"
    assert sol.kInversePairs(3, 1) == 2, "test 2 failed"
    print("✓ k-inverse-pairs-array passed")

if __name__ == "__main__":
    test()
