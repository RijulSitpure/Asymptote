def minTotalCostToProcess(costs: list[int]) -> int:
    costs.sort(reverse=True)
    total = 0
    for idx, c in enumerate(costs):
        total += (idx + 1) * c
    return total