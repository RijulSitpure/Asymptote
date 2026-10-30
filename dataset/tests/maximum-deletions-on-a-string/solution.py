class Solution:
    def deleteString(self, s: str) -> int:
        n = len(s)
        if len(set(s)) == 1:
            return n
        
        lcp = [[0] * (n + 1) for _ in range(n + 1)]
        for i in range(n - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                if s[i] == s[j]:
                    lcp[i][j] = 1 + lcp[i + 1][j + 1]
        
        dp = [1] * n
        for i in range(n - 1, -1, -1):
            for L in range(1, (n - i) // 2 + 1):
                if lcp[i][i + L] >= L:
                    if 1 + dp[i + L] > dp[i]:
                        dp[i] = 1 + dp[i + L]
        return dp[0]
