class Solution:
    def encode(self, s: str) -> str:
        n = len(s)
        dp = [[""] * n for _ in range(n)]

        for length in range(1, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                sub = s[i:j + 1]
                dp[i][j] = sub
                if length < 5:
                    continue

                pos = (sub + sub).find(sub, 1)
                if pos < len(sub):
                    period = dp[i][i + pos - 1]
                    compressed = f"{len(sub) // pos}[{period}]"
                    if len(compressed) < len(dp[i][j]):
                        dp[i][j] = compressed

                for k in range(i, j):
                    if len(dp[i][k]) + len(dp[k + 1][j]) < len(dp[i][j]):
                        dp[i][j] = dp[i][k] + dp[k + 1][j]

        return dp[0][n - 1]

def test():
    sol = Solution()
    assert sol.encode("aaa") == "aaa", "test 1 failed"
    assert sol.encode("aaaaa") == "5[a]", "test 2 failed"
    assert sol.encode("aaaaaaaaaa") == "10[a]", "test 3 failed"
    assert sol.encode("aabcaabc") == "2[aabc]", "test 4 failed"
    print("✓ encode-string-with-shortest-length passed")

if __name__ == "__main__":
    test()
