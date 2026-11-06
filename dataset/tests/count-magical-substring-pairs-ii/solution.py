def countMagicalPairs(s: str) -> int:
    n = len(s)
    total = 0
    for j in range(n - 1):
        left_counts = [0] * 27
        mask = 0
        for i in range(j, -1, -1):
            mask |= 1 << (ord(s[i]) - 97)
            left_counts[mask.bit_count()] += 1

        right_counts = [0] * 27
        mask = 0
        for k in range(j + 1, n):
            mask |= 1 << (ord(s[k]) - 97)
            right_counts[mask.bit_count()] += 1

        for d in range(1, 27):
            total += left_counts[d] * right_counts[d]
    return total
