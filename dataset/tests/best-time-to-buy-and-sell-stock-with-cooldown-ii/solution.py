def maxProfitWithCooldown(prices: list[int], k: int) -> int:
    if not prices:
        return 0

    n = len(prices)
    hold = -prices[0]
    sold = [0] * (k + 1)
    rest = 0

    for p in prices[1:]:
        prev_hold = hold
        can_buy = max(rest, sold[-1])
        hold = max(hold, can_buy - p)
        rest = max(rest, sold[-1])

        # shift sold
        curr_sold = prev_hold + p
        sold = [curr_sold] + sold[:-1]

    return max(rest, max(sold))