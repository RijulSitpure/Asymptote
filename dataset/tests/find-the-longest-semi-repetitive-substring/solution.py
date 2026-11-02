class Solution:
    def longestSemiRepetitiveSubstring(self, s: str) -> int:
        left = 0
        ans = 1
        repeats = 0
        for right in range(1, len(s)):
            if s[right] == s[right - 1]:
                repeats += 1
            while repeats > 1:
                if s[left] == s[left + 1]:
                    repeats -= 1
                left += 1
            ans = max(ans, right - left + 1)
        return ans
