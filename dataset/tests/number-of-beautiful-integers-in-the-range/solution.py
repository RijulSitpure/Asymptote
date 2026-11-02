from typing import List, Optional
class Solution:
    def numberOfBeautifulIntegers(self, low: int, high: int, k: int) -> int:
        def count(n: int) -> int:
            s = str(n)
            memo = {}
            def dp(idx: int, diff: int, rem: int, is_tight: bool, started: bool) -> int:
                if idx == len(s):
                    return 1 if (started and diff == 0 and rem == 0) else 0
                state = (idx, diff, rem, is_tight, started)
                if state in memo:
                    return memo[state]
                limit = int(s[idx]) if is_tight else 9
                ans = 0
                for d in range(0, limit + 1):
                    nxt_tight = is_tight and (d == limit)
                    if not started:
                        if d == 0:
                            ans += dp(idx + 1, 0, 0, nxt_tight, False)
                        else:
                            nxt_diff = diff + (1 if d % 2 == 0 else -1)
                            ans += dp(idx + 1, nxt_diff, (rem * 10 + d) % k, nxt_tight, True)
                    else:
                        nxt_diff = diff + (1 if d % 2 == 0 else -1)
                        ans += dp(idx + 1, nxt_diff, (rem * 10 + d) % k, nxt_tight, True)
                memo[state] = ans
                return ans
            return dp(0, 0, 0, True, False)
        return count(high) - count(low - 1)
