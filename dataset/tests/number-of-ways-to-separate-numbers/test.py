class Solution:
    def numberOfCombinations(self, num: str) -> int:
        if num[0] == "0":
            return 0
        n = len(num)
        MOD = 1_000_000_007
        
        lcp = [[0] * (n + 1) for _ in range(n + 1)]
        for i in range(n - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                if num[i] == num[j]:
                    lcp[i][j] = 1 + lcp[i + 1][j + 1]
                    
        def cmp(i, j, k):
            match = lcp[i][j]
            if match >= k:
                return True
            return num[i + match] <= num[j + match]
            
        dp = [[0] * (n + 1) for _ in range(n + 1)]
        for l in range(1, n + 1):
            dp[0][l] = 1
            
        for i in range(1, n + 1):
            for l in range(1, i + 1):
                start = i - l
                if num[start] != "0":
                    res = dp[start][min(l - 1, start)]
                    if start >= l and cmp(start - l, start, l):
                        res = (res + dp[start][l] - dp[start][l - 1]) % MOD
                    dp[i][l] = (dp[i][l - 1] + res) % MOD
                else:
                    dp[i][l] = dp[i][l - 1]
                    
        return dp[n][n]

def test_number_of_combinations():
    sol = Solution()
    assert sol.numberOfCombinations("327") == 2
    assert sol.numberOfCombinations("094") == 0
    assert sol.numberOfCombinations("0") == 0

