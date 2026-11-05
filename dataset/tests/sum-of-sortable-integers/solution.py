def sumSortableIntegers(low: int, high: int) -> int:
    total = 0
    for x in range(low, high + 1):
        s = str(x)
        if list(s) == sorted(s):
            total += x
    return total