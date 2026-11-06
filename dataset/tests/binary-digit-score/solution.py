def calculateScore(a: int, b: int) -> int:
    s1 = a.bit_count()
    s2 = b.bit_count()
    if s1 >= s2:
        return s1 * s2
    return s2 // s1
