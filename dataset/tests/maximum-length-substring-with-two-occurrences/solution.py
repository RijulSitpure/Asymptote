class Solution:
    def maximumLengthSubstring(self, s: str) -> int:
        freq = {}
        left = 0
        ans = 0
        for right, ch in enumerate(s):
            freq[ch] = freq.get(ch, 0) + 1
            while freq[ch] > 2:
                freq[s[left]] -= 1
                left += 1
            ans = max(ans, right - left + 1)
        return ans
