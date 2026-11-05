class Solution:
    def countSubstrings(self, s: str, c: str) -> int:
        m = s.count(c)
        return m * (m + 1) // 2
