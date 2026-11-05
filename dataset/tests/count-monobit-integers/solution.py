def countMonobitIntegers(low: int, high: int) -> int:
    count = 0
    p = 1
    while p <= high:
        if p >= low:
            count += 1
        p <<= 1
    return count