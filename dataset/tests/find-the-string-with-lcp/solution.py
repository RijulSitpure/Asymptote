class Solution:
    def findTheString(self, lcp: list[list[int]]) -> str:
        n = len(lcp)
        word = [''] * n
        curr_char = ord('a')
        for i in range(n):
            if not word[i]:
                if curr_char > ord('z'):
                    return ""
                ch = chr(curr_char)
                curr_char += 1
                for j in range(i, n):
                    if lcp[i][j] > 0:
                        word[j] = ch
        s = "".join(word)
        dp = [[0] * (n + 1) for _ in range(n + 1)]
        for i in range(n - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                if s[i] == s[j]:
                    dp[i][j] = dp[i + 1][j + 1] + 1
                if dp[i][j] != lcp[i][j]:
                    return ""
        return s
