class Solution:
    def numberOfArrays(self, s: str, k: int) -> int:
        MOD = 10**9 + 7
        n = len(s)
        dp = [0] * (n + 1)
        dp[n] = 1
        for i in range(n - 1, -1, -1):
            if s[i] == "0":
                continue
            val = 0
            for j in range(i, n):
                val = val * 10 + int(s[j])
                if val > k:
                    break
                dp[i] = (dp[i] + dp[j + 1]) % MOD
        return dp[0]

def test():
    sol = Solution()
    assert sol.numberOfArrays("1000", 10000) == 1, "test 1 failed"
    assert sol.numberOfArrays("1000", 10) == 0, "test 2 failed"
    assert sol.numberOfArrays("1317", 2000) == 8, "test 3 failed"
    print("✓ restore-the-array passed")

if __name__ == "__main__":
    test()
