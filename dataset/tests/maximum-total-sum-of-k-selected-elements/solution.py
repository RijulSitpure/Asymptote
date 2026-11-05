def maxTotalSumKSelected(grid: list[list[int]], k: int) -> int:
    row_maxes = [max(row) for row in grid]
    row_maxes.sort(reverse=True)
    return sum(row_maxes[:k])