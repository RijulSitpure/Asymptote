class Solution:
    def countPalindromicSubsequences(self, s: str) -> int:
        MOD = 10**9 + 7
        memo = {}

        def dp(i: int, j: int) -> int:
            if i > j:
                return 0
            if i == j:
                return 1
            if (i, j) in memo:
                return memo[(i, j)]

            ans = 0
            for ch in "abcd":
                left = s.find(ch, i, j + 1)
                right = s.rfind(ch, i, j + 1)
                if left == -1 or left > j or right < i:
                    continue
                if left == right:
                    ans = (ans + 1) % MOD
                else:
                    ans = (ans + 2 + dp(left + 1, right - 1)) % MOD

            memo[(i, j)] = ans
            return ans

        return dp(0, len(s) - 1)

def test():
    sol = Solution()
    assert sol.countPalindromicSubsequences("bccb") == 6, "test 1 failed"
    assert sol.countPalindromicSubsequences("abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba") == 104860361, "test 2 failed"
    print("✓ count-different-palindromic-subsequences passed")

if __name__ == "__main__":
    test()
