def maxSaleItemsI(items: list[list[int]], budget: int) -> int:
    n = len(items)
    cheapest = min(item[1] for item in items)
    max_ans = budget // cheapest
    for i in range(n):
        f_i, p_i = items[i]
        if p_i <= budget:
            free_count = 1 + sum(1 for j in range(n) if j != i and items[j][0] % f_i == 0)
            rem_budget = budget - p_i
            total = free_count + (rem_budget // cheapest)
            max_ans = max(max_ans, total)
    return max_ans