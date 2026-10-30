from collections import Counter

class Solution:
    def checkAlmostEquivalent(self, word1: str, word2: str) -> bool:
        c1 = Counter(word1)
        c2 = Counter(word2)
        all_chars = set(c1.keys()) | set(c2.keys())
        return all(abs(c1[ch] - c2[ch]) <= 3 for ch in all_chars)
