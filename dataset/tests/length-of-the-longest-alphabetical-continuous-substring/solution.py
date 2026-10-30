class Solution:
    def longestContinuousSubstring(self, s: str) -> int:
        max_len = 1
        cur_len = 1
        for i in range(1, len(s)):
            if ord(s[i]) - ord(s[i - 1]) == 1:
                cur_len += 1
                max_len = max(max_len, cur_len)
            else:
                cur_len = 1
        return max_len
