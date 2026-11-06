def minElevatorTrips(weights: list[int], max_weight: int) -> int:
    n = len(weights)
    # dp[mask] = (rides, current_weight)
    dp = [(n + 1, 0)] * (1 << n)
    dp[0] = (1, 0)
    for mask in range(1 << n):
        rides, cur_w = dp[mask]
        for i in range(n):
            if not (mask & (1 << i)):
                nxt_mask = mask | (1 << i)
                w = weights[i]
                if cur_w + w <= max_weight:
                    cand = (rides, cur_w + w)
                else:
                    cand = (rides + 1, w)
                if cand < dp[nxt_mask]:
                    dp[nxt_mask] = cand
    return dp[(1 << n) - 1][0]