class Solution:
    def shortestCommonSupersequence(self, str1: str, str2: str) -> str:
        m, n = len(str1), len(str2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m):
            for j in range(n):
                if str1[i] == str2[j]:
                    dp[i + 1][j + 1] = dp[i][j] + 1
                else:
                    dp[i + 1][j + 1] = max(dp[i][j + 1], dp[i + 1][j])
        
        res = []
        i, j = m, n
        while i > 0 and j > 0:
            if str1[i - 1] == str2[j - 1]:
                res.append(str1[i - 1])
                i -= 1
                j -= 1
            elif dp[i - 1][j] >= dp[i][j - 1]:
                res.append(str1[i - 1])
                i -= 1
            else:
                res.append(str2[j - 1])
                j -= 1
        while i > 0:
            res.append(str1[i - 1])
            i -= 1
        while j > 0:
            res.append(str2[j - 1])
            j -= 1
        return "".join(reversed(res))

def is_subseq(sub, s):
    it = iter(s)
    return all(c in it for c in sub)

def test():
    sol = Solution()
    res1 = sol.shortestCommonSupersequence("abac", "cab")
    assert len(res1) == 5 and is_subseq("abac", res1) and is_subseq("cab", res1), f"test 1 failed: {res1}"
    res2 = sol.shortestCommonSupersequence("aaaaaaaa", "aaaaaaaa")
    assert res2 == "aaaaaaaa", f"test 2 failed: {res2}"
    print("✓ shortest-common-supersequence passed")

if __name__ == "__main__":
    test()
