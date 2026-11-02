from typing import List, Optional
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class Solution:
    def countSteppingNumbers(self, low: str, high: str) -> int:
        MOD = 10**9 + 7
        def count_up_to(s: str) -> int:
            memo = {}
            def dp(idx: int, prev: int, is_tight: bool, started: bool) -> int:
                if idx == len(s):
                    return 1 if started else 0
                state = (idx, prev, is_tight, started)
                if state in memo:
                    return memo[state]
                limit = int(s[idx]) if is_tight else 9
                ans = 0
                for d in range(0, limit + 1):
                    nxt_tight = is_tight and (d == limit)
                    if not started:
                        if d == 0:
                            ans = (ans + dp(idx + 1, -1, nxt_tight, False)) % MOD
                        else:
                            ans = (ans + dp(idx + 1, d, nxt_tight, True)) % MOD
                    else:
                        if abs(d - prev) == 1:
                            ans = (ans + dp(idx + 1, d, nxt_tight, True)) % MOD
                memo[state] = ans
                return ans
            return dp(0, -1, True, False)
        ans = (count_up_to(high) - count_up_to(str(int(low) - 1))) % MOD
        return ans
