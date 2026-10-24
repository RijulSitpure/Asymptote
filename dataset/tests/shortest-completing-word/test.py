import sys
from typing import List

class Solution:
    def shortestCompletingWord(self, licensePlate: str, words: List[str]) -> str:
        from collections import Counter
        target = Counter(c.lower() for c in licensePlate if c.isalpha())
        best_word = None
        for word in words:
            word_counts = Counter(word)
            if all(word_counts[c] >= target[c] for c in target):
                if best_word is None or len(word) < len(best_word):
                    best_word = word
        return best_word

def test():
    sol = Solution()
    assert sol.shortestCompletingWord("1s3 PSt", ["step", "steps", "stripe", "stepple"]) == "steps", "test 1 failed"
    assert sol.shortestCompletingWord("1s3 456", ["looks", "pest", "stew", "show"]) == "pest", "test 2 failed"
    print("✓ shortest-completing-word passed")

if __name__ == "__main__":
    test()
