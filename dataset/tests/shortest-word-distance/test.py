import sys
from typing import List

class Solution:
    def shortestDistance(self, wordsDict: List[str], word1: str, word2: str) -> int:
        idx1, idx2 = -1, -1
        min_dist = len(wordsDict)
        for i, w in enumerate(wordsDict):
            if w == word1:
                idx1 = i
            elif w == word2:
                idx2 = i
            if idx1 != -1 and idx2 != -1:
                min_dist = min(min_dist, abs(idx1 - idx2))
        return min_dist

def test():
    sol = Solution()
    words = ["practice", "makes", "perfect", "coding", "makes"]
    assert sol.shortestDistance(words, "coding", "practice") == 3, "test 1 failed"
    assert sol.shortestDistance(words, "makes", "coding") == 1, "test 2 failed"
    print("✓ shortest-word-distance passed")

if __name__ == "__main__":
    test()
