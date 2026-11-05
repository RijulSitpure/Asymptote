def countGoodIntegersInRange(low: int, high: int, k: int) -> int:
    def countUpTo(limit: int) -> int:
        if limit < 0:
            return 0
        s = str(limit)
        memo = {}
        def dp(idx: int, rem: int, is_less: bool) -> int:
            if idx == len(s):
                return 1 if rem == 0 else 0
            state = (idx, rem, is_less)
            if state in memo:
                return memo[state]
            ub = 9 if is_less else int(s[idx])
            total = 0
            for d in range(ub + 1):
                total += dp(idx + 1, (rem + d) % k, is_less or (d < ub))
            memo[state] = total
            return total
        return dp(0, 0, False)

    return countUpTo(high) - countUpTo(low - 1)