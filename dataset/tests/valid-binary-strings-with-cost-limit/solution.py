def countValidBinaryStrings(n: int, max_cost: int) -> int:
    MOD = 1_000_000_007
    if n == 0:
        return 1
    # dp[cost][last_bit]
    dp = {0: [1, 1]}  # length 1: cost 0 for '0' and '1'
    for _ in range(1, n):
        nxt = {}
        for c, (c0, c1) in dp.items():
            # append '0'
            cost0 = c + 1  # same bit costs 1
            cost1 = c      # different bit costs 0
            # from last=0 -> append 0 (cost + 1), append 1 (cost + 0)
            if cost0 <= max_cost:
                nxt.setdefault(cost0, [0, 0])[0] = (nxt.setdefault(cost0, [0, 0])[0] + c0) % MOD
            if cost1 <= max_cost:
                nxt.setdefault(cost1, [0, 0])[1] = (nxt.setdefault(cost1, [0, 0])[1] + c0) % MOD
            # from last=1 -> append 0 (cost + 0), append 1 (cost + 1)
            if cost1 <= max_cost:
                nxt.setdefault(cost1, [0, 0])[0] = (nxt.setdefault(cost1, [0, 0])[0] + c1) % MOD
            if cost0 <= max_cost:
                nxt.setdefault(cost0, [0, 0])[1] = (nxt.setdefault(cost0, [0, 0])[1] + c1) % MOD
        dp = nxt
    ans = 0
    for c, (c0, c1) in dp.items():
        if c <= max_cost:
            ans = (ans + c0 + c1) % MOD
    return ans