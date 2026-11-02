class Solution:
    def count(self, num1: str, num2: str, min_sum: int, max_sum: int) -> int:
        MOD = 10**9 + 7
        def count_up_to(s: str) -> int:
            from functools import lru_cache
            @lru_cache(None)
            def dp(idx: int, cur_sum: int, is_tight: bool) -> int:
                if cur_sum > max_sum:
                    return 0
                if idx == len(s):
                    return 1 if cur_sum >= min_sum else 0
                limit = int(s[idx]) if is_tight else 9
                res = 0
                for d in range(limit + 1):
                    res = (res + dp(idx + 1, cur_sum + d, is_tight and (d == limit))) % MOD
                return res
            return dp(0, 0, True)
        ans = (count_up_to(num2) - count_up_to(num1)) % MOD
        s1 = sum(int(c) for c in num1)
        if min_sum <= s1 <= max_sum:
            ans = (ans + 1) % MOD
        return ans
