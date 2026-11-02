class Solution:
    def minimumBeautifulSubstrings(self, s: str) -> int:
        pow5 = {bin(5**k)[2:] for k in range(8)}
        n = len(s)
        from functools import lru_cache
        @lru_cache(None)
        def dp(i: int) -> int:
            if i == n:
                return 0
            res = float('inf')
            for j in range(i + 1, n + 1):
                if s[i:j] in pow5:
                    res = min(res, 1 + dp(j))
            return res
        ans = dp(0)
        return ans if ans != float('inf') else -1
