def maximumTotalValue(values: list[int], k: int) -> int:
    values.sort(reverse=True)
    return sum(values[:k])