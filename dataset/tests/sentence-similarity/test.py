import sys
from typing import List

class Solution:
    def areSentencesSimilar(self, sentence1: List[str], sentence2: List[str], similarPairs: List[List[str]]) -> bool:
        if len(sentence1) != len(sentence2):
            return False
        sim_set = set()
        for u, v in similarPairs:
            sim_set.add((u, v))
            sim_set.add((v, u))
        for w1, w2 in zip(sentence1, sentence2):
            if w1 != w2 and (w1, w2) not in sim_set:
                return False
        return True

def test():
    sol = Solution()
    assert sol.areSentencesSimilar(
        ["great", "acting", "skills"],
        ["fine", "drama", "talent"],
        [["great", "fine"], ["acting", "drama"], ["skills", "talent"]]
    ) is True, "test 1 failed"
    assert sol.areSentencesSimilar(["great"], ["great"], []) is True, "test 2 failed"
    print("✓ sentence-similarity passed")

if __name__ == "__main__":
    test()
