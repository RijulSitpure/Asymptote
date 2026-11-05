class Solution:
    def minimumLength(self, s: str) -> int:
        from collections import Counter
        counts = Counter(s)
        total = 0
        for c in counts.values():
            if c % 2 == 1:
                total += 1
            else:
                total += 2
        return total
