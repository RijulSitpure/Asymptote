def minimumMaxValue(n: int, index: int, value: int) -> int:
    steps = n - 1 - index
    if value % 2 == 0:
        return value + steps * 2
    import math
    p = 2
    for d in range(2, int(math.isqrt(value)) + 1):
        if value % d == 0:
            p = d
            break
    else:
        p = value
    return value + steps * max(2, p)
