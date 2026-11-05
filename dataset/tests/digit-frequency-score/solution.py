def digitFrequencyScore(n: int) -> int:
    return sum(int(c) for c in str(n))