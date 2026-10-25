class Solution:
    def minInsertions(self, s: str) -> int:
        n = len(s)
        r = s[::-1]
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            nxt = [0] * (n + 1)
            for j in range(1, n + 1):
                if s[i - 1] == r[j - 1]:
                    nxt[j] = dp[j - 1] + 1
                else:
                    nxt[j] = max(dp[j], nxt[j - 1])
            dp = nxt
        return n - dp[n]

def test():
    sol = Solution()
    assert sol.minInsertions("zzazz") == 0, "test 1 failed"
    assert sol.minInsertions("mbadm") == 2, "test 2 failed"
    assert sol.minInsertions("leetcode") == 5, "test 3 failed"
    print("✓ minimum-insertion-steps-to-make-a-string-palindrome passed")

if __name__ == "__main__":
    test()
