def countFancy(low: int, high: int) -> int:
    def count_up_to(n: int) -> int:
        if n < 0:
            return 0
        s = str(n)
        m = len(s)
        memo = {}
        def dp(idx: int, last: int, is_less: bool, started: bool) -> int:
            if idx == m:
                return 1 if started else 0
            state = (idx, last, is_less, started)
            if state in memo:
                return memo[state]
            limit = int(s[idx]) if not is_less else 9
            ans = 0
            for d in range(0, limit + 1):
                if not started and d == 0:
                    ans += dp(idx + 1, -1, is_less or (d < limit), False)
                else:
                    if d != last:
                        ans += dp(idx + 1, d, is_less or (d < limit), True)
            memo[state] = ans
            return ans
        return dp(0, -1, False, False)

    return count_up_to(high) - count_up_to(low - 1)