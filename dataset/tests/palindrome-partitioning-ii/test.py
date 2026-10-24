import sys

class Solution:
    def minCut(self, s: str) -> int:
        n = len(s)
        dp = list(range(n))

        for mid in range(n):
            l, r = mid, mid
            while l >= 0 and r < n and s[l] == s[r]:
                dp[r] = 0 if l == 0 else min(dp[r], dp[l - 1] + 1)
                l -= 1
                r += 1
            l, r = mid, mid + 1
            while l >= 0 and r < n and s[l] == s[r]:
                dp[r] = 0 if l == 0 else min(dp[r], dp[l - 1] + 1)
                l -= 1
                r += 1

        return dp[-1]

def test():
    sol = Solution()
    assert sol.minCut("aab") == 1, "test 1 failed"
    assert sol.minCut("a") == 0, "test 2 failed"
    assert sol.minCut("ab") == 1, "test 3 failed"
    print("✓ palindrome-partitioning-ii passed")

if __name__ == "__main__":
    test()
