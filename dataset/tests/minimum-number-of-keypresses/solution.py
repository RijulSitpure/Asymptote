from collections import Counter

class Solution:
    def minimumKeypresses(self, s: str) -> int:
        counts = sorted(Counter(s).values(), reverse=True)
        total = 0
        for i, cnt in enumerate(counts):
            cost = (i // 9) + 1
            total += cnt * cost
        return total
