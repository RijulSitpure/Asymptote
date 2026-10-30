from collections import Counter

class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        freq = Counter(s)
        return sum(c * (c + 1) // 2 for c in freq.values())
