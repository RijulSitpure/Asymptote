from collections import Counter

class Solution:
    def equalFrequency(self, word: str) -> bool:
        for i in range(len(word)):
            trimmed = word[:i] + word[i + 1:]
            counts = Counter(trimmed)
            if len(set(counts.values())) == 1:
                return True
        return False
