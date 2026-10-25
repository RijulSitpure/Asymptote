class Solution:
    def isValidPalindrome(self, s: str, k: int) -> bool:
        n = len(s)
        rev = s[::-1]
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            nxt = [0] * (n + 1)
            for j in range(1, n + 1):
                if s[i - 1] == rev[j - 1]:
                    nxt[j] = dp[j - 1] + 1
                else:
                    nxt[j] = max(dp[j], nxt[j - 1])
            dp = nxt
        return n - dp[n] <= k

def test():
    sol = Solution()
    assert sol.isValidPalindrome("abcdeca", 2) is True, "test 1 failed"
    assert sol.isValidPalindrome("abbababa", 1) is True, "test 2 failed"
    print("✓ valid-palindrome-iii passed")

if __name__ == "__main__":
    test()
