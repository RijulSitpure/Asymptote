class Solution:
    def longestSubsequence(self, s: str, k: int) -> int:
        val = 0
        cnt = 0
        pos = 0
        for ch in reversed(s):
            if ch == '0':
                cnt += 1
            elif pos < 32 and val + (1 << pos) <= k:
                val += (1 << pos)
                cnt += 1
            pos += 1
        return cnt
