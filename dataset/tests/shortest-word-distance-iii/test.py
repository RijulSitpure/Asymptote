import sys
from typing import List

class Solution:
    def shortestWordDistance(self, wordsDict: List[str], word1: str, word2: str) -> int:
        idx1, idx2 = -1, -1
        min_dist = len(wordsDict)
        same = (word1 == word2)
        for i, w in enumerate(wordsDict):
            if w == word1:
                if same:
                    if idx1 != -1:
                        min_dist = min(min_dist, i - idx1)
                    idx1 = i
                else:
                    idx1 = i
                    if idx2 != -1:
                        min_dist = min(min_dist, abs(idx1 - idx2))
            elif not same and w == word2:
                idx2 = i
                if idx1 != -1:
                    min_dist = min(min_dist, abs(idx1 - idx2))
        return min_dist

def test():
    sol = Solution()
    words = ["practice", "makes", "perfect", "coding", "makes"]
    assert sol.shortestWordDistance(words, "makes", "coding") == 1, "test 1 failed"
    assert sol.shortestWordDistance(words, "makes", "makes") == 3, "test 2 failed"
    print("✓ shortest-word-distance-iii passed")

if __name__ == "__main__":
    test()
