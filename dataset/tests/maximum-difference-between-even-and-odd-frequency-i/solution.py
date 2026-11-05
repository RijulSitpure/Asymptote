class Solution:
    def maxDifference(self, s: str) -> int:
        from collections import Counter
        counts = Counter(s)
        max_odd = -float("inf")
        min_even = float("inf")
        for freq in counts.values():
            if freq % 2 == 1:
                if freq > max_odd:
                    max_odd = freq
            else:
                if freq < min_even:
                    min_even = freq
        return max_odd - min_even
