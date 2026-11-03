class Solution:
    def numberOfPowerfulInt(self, start: int, finish: int, limit: int, s: str) -> int:
        def count_upto(N: int) -> int:
            s_val = int(s)
            if N < s_val:
                return 0
            str_n = str(N)
            if len(str_n) < len(s):
                return 0
            if any(int(c) > limit for c in s):
                return 0
            p_len = len(str_n) - len(s)
            suffix = str_n[p_len:]
            memo = {}
            def dp(i: int, is_less: bool, is_tight: bool) -> int:
                if i == p_len:
                    if is_less:
                        return 1
                    return 1 if s <= suffix else 0
                state = (i, is_less)
                if not is_tight and state in memo:
                    return memo[state]
                up = int(str_n[i]) if is_tight else 9
                ans = 0
                for d in range(min(up, limit) + 1):
                    ans += dp(i + 1, is_less or (d < int(str_n[i])), is_tight and (d == up))
                if not is_tight:
                    memo[state] = ans
                return ans
            return dp(0, False, True)
        return count_upto(finish) - count_upto(start - 1)
