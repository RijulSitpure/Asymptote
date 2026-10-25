class Solution:
    def numWays(self, steps: int, arrLen: int) -> int:
        MOD = 10**9 + 7
        max_pos = min(steps // 2, arrLen - 1)
        dp = [0] * (max_pos + 1)
        dp[0] = 1
        
        for _ in range(steps):
            nxt = [0] * (max_pos + 1)
            for j in range(max_pos + 1):
                nxt[j] = dp[j]
                if j > 0:
                    nxt[j] = (nxt[j] + dp[j - 1]) % MOD
                if j < max_pos:
                    nxt[j] = (nxt[j] + dp[j + 1]) % MOD
            dp = nxt
            
        return dp[0]

def test():
    sol = Solution()
    assert sol.numWays(3, 2) == 4, "test 1 failed"
    assert sol.numWays(2, 4) == 2, "test 2 failed"
    assert sol.numWays(4, 2) == 8, "test 3 failed"
    print("✓ number-of-ways-to-stay-in-the-same-place-after-some-steps passed")

if __name__ == "__main__":
    test()
