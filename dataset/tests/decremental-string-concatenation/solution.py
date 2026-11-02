class Solution:
    def minimizeConcatenatedLength(self, words: list[str]) -> int:
        n = len(words)
        from functools import lru_cache
        @lru_cache(None)
        def dp(idx: int, first: str, last: str) -> int:
            if idx == n:
                return 0
            w = words[idx]
            w_first, w_last, w_len = w[0], w[-1], len(w)
            # Option 1: append to right (join last with w_first)
            save1 = 1 if last == w_first else 0
            res1 = (w_len - save1) + dp(idx + 1, first, w_last)
            # Option 2: prepend to left (join w_last with first)
            save2 = 1 if w_last == first else 0
            res2 = (w_len - save2) + dp(idx + 1, w_first, last)
            return min(res1, res2)
        return len(words[0]) + dp(1, words[0][0], words[0][-1])
