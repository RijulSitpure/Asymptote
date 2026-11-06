def countEvenlyGoodIntegers(n: int) -> int:
    s = str(n)
    length = len(s)
    memo = {}

    def dp(idx: int, bal: int, is_less: bool, is_started: bool) -> int:
        if idx == length:
            return 1 if (is_started and bal == 0) else 0

        state = (idx, bal, is_less, is_started)
        if state in memo:
            return memo[state]

        limit = int(s[idx]) if not is_less else 9
        total = 0

        for dig in range(limit + 1):
            next_less = is_less or (dig < limit)
            if not is_started and dig == 0:
                total += dp(idx + 1, bal, next_less, False)
            else:
                next_bal = bal + (1 if dig % 2 == 0 else -1)
                total += dp(idx + 1, next_bal, next_less, True)

        memo[state] = total
        return total

    return dp(0, 0, False, False)