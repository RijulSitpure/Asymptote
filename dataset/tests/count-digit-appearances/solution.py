def countDigitAppearances(n: int, d: int) -> int:
    count = 0
    m = 1
    while m <= n:
        higher = n // (m * 10)
        cur = (n // m) % 10
        lower = n % m
        if d == 0:
            if higher > 0:
                count += (higher - 1) * m
            else:
                m *= 10
                continue
            if cur == 0:
                count += lower + 1
            elif cur > 0:
                count += m
        else:
            count += higher * m
            if cur == d:
                count += lower + 1
            elif cur > d:
                count += m
        m *= 10
    return count