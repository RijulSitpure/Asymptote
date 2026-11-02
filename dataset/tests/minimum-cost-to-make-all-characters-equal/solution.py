class Solution:
    def minimumCost(self, s: str) -> int:
        n = len(s)
        ans = 0
        for i in range(n - 1):
            if s[i] != s[i + 1]:
                ans += min(i + 1, n - 1 - i)
        return ans
