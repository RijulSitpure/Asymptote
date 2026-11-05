def minCostToSplit(n: int) -> int:
    if n <= 1:
        return 0
    return n * (n - 1) // 2