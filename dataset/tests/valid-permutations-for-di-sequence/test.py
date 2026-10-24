class Solution:
    def numPermsDISequence(self, s: str) -> int:
        MOD = 1_000_000_007
        n = len(s)
        dp = [1]
        for i, ch in enumerate(s):
            nxt = [0] * (i + 2)
            if ch == 'I':
                cur = 0
                for j in range(1, i + 2):
                    cur = (cur + dp[j - 1]) % MOD
                    nxt[j] = cur
            else:
                cur = 0
                for j in range(i, -1, -1):
                    cur = (cur + dp[j]) % MOD
                    nxt[j] = cur
            dp = nxt
        return sum(dp) % MOD

def test():
    sol = Solution()
    assert sol.numPermsDISequence("DID") == 5, "test 1 failed"
    assert sol.numPermsDISequence("D") == 1, "test 2 failed"
    assert sol.numPermsDISequence("I") == 1, "test 3 failed"
    print("✓ valid-permutations-for-di-sequence passed")

if __name__ == "__main__":
    test()
