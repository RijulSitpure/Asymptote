class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        memo = {}
        def dp(i, j, prev):
            if i >= j:
                return 0
            state = (i, j, prev)
            if state in memo:
                return memo[state]
            if s[i] == s[j] and s[i] != prev:
                ans = dp(i + 1, j - 1, s[i]) + 2
            else:
                ans = max(dp(i + 1, j, prev), dp(i, j - 1, prev))
            memo[state] = ans
            return ans
        return dp(0, len(s) - 1, "")

sol = Solution()
assert sol.longestPalindromeSubseq("bbabab") == 4
assert sol.longestPalindromeSubseq("dcbccacdb") == 4
print("All tests passed successfully.")
