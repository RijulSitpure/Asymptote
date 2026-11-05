class Solution:
    def numberOfAlternatingGroups(self, colors: list[int], k: int) -> int:
        n = len(colors)
        extended = colors + colors[:k - 1]
        ans = 0
        alt_len = 1
        for i in range(1, len(extended)):
            if extended[i] != extended[i - 1]:
                alt_len += 1
            else:
                alt_len = 1
            if alt_len >= k:
                ans += 1
        return ans