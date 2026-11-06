def countMagicalPairs(s: str) -> int:
    n = len(s)
    total = 0
    for j in range(n - 1):
        left_counts = [0] * 27
        seen = set()
        for i in range(j, -1, -1):
            seen.add(s[i])
            left_counts[len(seen)] += 1

        right_counts = [0] * 27
        seen = set()
        for k in range(j + 1, n):
            seen.add(s[k])
            right_counts[len(seen)] += 1

        for d in range(1, 27):
            total += left_counts[d] * right_counts[d]
    return total
