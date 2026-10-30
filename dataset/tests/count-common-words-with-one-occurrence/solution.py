from collections import Counter

class Solution:
    def countWords(self, words1: list[str], words2: list[str]) -> int:
        c1 = Counter(words1)
        c2 = Counter(words2)
        return sum(1 for w, cnt in c1.items() if cnt == 1 and c2[w] == 1)
