def sumKDigitNumbers(low: int, high: int, k: int) -> int:
    MOD = 1_000_000_007
    k_min = 10 ** (k - 1)
    k_max = 10 ** k - 1
    start = max(low, k_min)
    end = min(high, k_max)
    if start > end:
        return 0
    count = end - start + 1
    total = (start + end) * count // 2
    return total % MOD