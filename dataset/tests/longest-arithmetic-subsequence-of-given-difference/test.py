class Solution:
    def longestSubsequence(self, arr: list[int], difference: int) -> int:
        dp = {}
        ans = 0
        for x in arr:
            dp[x] = dp.get(x - difference, 0) + 1
            if dp[x] > ans:
                ans = dp[x]
        return ans

def test():
    sol = Solution()
    assert sol.longestSubsequence([1, 2, 3, 4], 1) == 4, "test 1 failed"
    assert sol.longestSubsequence([1, 3, 5, 7], 1) == 1, "test 2 failed"
    assert sol.longestSubsequence([1, 5, 7, 8, 5, 3, 4, 2, 1], -2) == 4, "test 3 failed"
    print("✓ longest-arithmetic-subsequence-of-given-difference passed")

if __name__ == "__main__":
    test()
