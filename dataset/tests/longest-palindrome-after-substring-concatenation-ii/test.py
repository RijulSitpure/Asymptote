class Solution:
    def longestPalindrome(self, s: str, t: str) -> int:
        m, n = len(s), len(t)

        def get_palindrome_lengths(string: str, is_suffix: bool) -> list[int]:
            length = len(string)
            dp = [[False] * length for _ in range(length)]
            lengths = [0] * length
            for i in range(length - 1, -1, -1):
                for j in range(i, length):
                    if string[i] == string[j] and (j - i < 2 or dp[i + 1][j - 1]):
                        dp[i][j] = True
                        idx = i if is_suffix else j
                        if j - i + 1 > lengths[idx]:
                            lengths[idx] = j - i + 1
            return lengths

        suffix = get_palindrome_lengths(s, True)
        prefix = get_palindrome_lengths(t, False)
        ans = max(max(suffix, default=0), max(prefix, default=0))

        dp = [[0] * n for _ in range(m)]
        for i in range(m):
            for j in range(n - 1, -1, -1):
                if s[i] == t[j]:
                    dp[i][j] = 2 + (dp[i - 1][j + 1] if i > 0 and j < n - 1 else 0)
                    extend = max(
                        (suffix[i + 1] if i + 1 < m else 0),
                        (prefix[j - 1] if j > 0 else 0)
                    )
                    ans = max(ans, dp[i][j] + extend)

        return ans

def run_tests():
    s = Solution()
    assert s.longestPalindrome("ab", "ba") == 4
    assert s.longestPalindrome("race", "car") == 7
    print("All tests passed for longest-palindrome-after-substring-concatenation-ii")

if __name__ == '__main__':
    run_tests()
