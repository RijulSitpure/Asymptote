from collections import Counter

class Solution:
    def similarPairs(self, words: list[str]) -> int:
        counts = Counter()
        for w in words:
            mask = 0
            for ch in w:
                mask |= 1 << (ord(ch) - 97)
            counts[mask] += 1
        return sum(c * (c - 1) // 2 for c in counts.values())
