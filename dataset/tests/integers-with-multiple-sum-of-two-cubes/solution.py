from collections import Counter

def findTaxicabNumbers(n: int) -> list[int]:
    counts = Counter()
    limit = int(n ** (1 / 3)) + 2
    for a in range(1, limit):
        a3 = a ** 3
        if a3 >= n:
            break
        for b in range(a, limit):
            s = a3 + b ** 3
            if s > n:
                break
            counts[s] += 1
    return sorted(s for s, count in counts.items() if count >= 2)