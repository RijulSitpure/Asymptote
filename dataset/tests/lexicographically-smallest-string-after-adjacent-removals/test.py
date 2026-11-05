class Solution:
    def lexicographicallySmallestString(self, s: str) -> str:
        n = len(s)
        dp = [[""] * (n + 1) for _ in range(n + 1)]

        def is_consecutive(a: str, b: str) -> bool:
            return abs(ord(a) - ord(b)) in (1, 25)

        for d in range(1, n + 1):
            for i in range(n - d + 1):
                j = i + d
                min_str = s[i] + dp[i + 1][j]
                for k in range(i + 1, j):
                    if is_consecutive(s[i], s[k]) and dp[i + 1][k] == "":
                        cand = dp[k + 1][j]
                        if min_str == "" or cand < min_str:
                            min_str = cand
                dp[i][j] = min_str

        return dp[0][n]

def run_tests():
    s = Solution()
    res = s.lexicographicallySmallestString("abczba")
    assert res == "", f"Expected '', got '{res}'"
    print("3563 lexicographically-smallest-string-after-adjacent-removals PASSED")

if __name__ == "__main__":
    run_tests()
