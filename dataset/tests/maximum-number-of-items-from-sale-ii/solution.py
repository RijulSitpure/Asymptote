def maxSaleItemsII(items: list[list[int]], budget: int) -> int:
    cheapest = min(it[1] for it in items)
    max_ans = budget // cheapest
    max_factor = max(it[0] for it in items)
    freq = [0] * (max_factor + 1)
    for f, _ in items:
        freq[f] += 1
    multiples = [0] * (max_factor + 1)
    for i in range(1, max_factor + 1):
        if freq[i] > 0:
            count = 0
            for j in range(i, max_factor + 1, i):
                count += freq[j]
            multiples[i] = count
    for f, p in items:
        if p <= budget:
            total_unlocked = multiples[f]
            rem_budget = budget - p
            max_ans = max(max_ans, total_unlocked + (rem_budget // cheapest))
    return max_ans