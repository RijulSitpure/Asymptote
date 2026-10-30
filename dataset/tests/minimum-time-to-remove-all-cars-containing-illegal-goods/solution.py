class Solution:
    def minimumTime(self, s: str) -> int:
        n = len(s)
        min_sub = 0
        cur = 0
        for ch in s:
            val = 1 if ch == '1' else -1
            cur = min(val, cur + val)
            min_sub = min(min_sub, cur)
        return n + min_sub
