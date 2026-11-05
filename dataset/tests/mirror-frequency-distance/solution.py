from collections import Counter

def mirrorFrequencyDistance(s: str) -> int:
    counts = Counter(s)
    total_diff = 0
    for i in range(26):
        c1 = chr(ord('a') + i)
        c2 = chr(ord('z') - i)
        total_diff += abs(counts[c1] - counts[c2])
    return total_diff // 2