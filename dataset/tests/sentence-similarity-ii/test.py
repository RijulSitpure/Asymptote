from typing import List

class Solution:
    def areSentencesSimilarTwo(self, sentence1: List[str], sentence2: List[str], similarPairs: List[List[str]]) -> bool:
        if len(sentence1) != len(sentence2):
            return False

        parent = {}

        def find(x: str) -> str:
            if x not in parent:
                parent[x] = x
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def union(x: str, y: str) -> None:
            rx, ry = find(x), find(y)
            if rx != ry:
                parent[rx] = ry

        for u, v in similarPairs:
            union(u, v)

        for w1, w2 in zip(sentence1, sentence2):
            if w1 != w2 and find(w1) != find(w2):
                return False
        return True

def test():
    sol = Solution()
    s1 = ["great", "acting", "skills"]
    s2 = ["fine", "drama", "talent"]
    pairs = [["great", "good"], ["fine", "good"], ["drama", "acting"], ["skills", "talent"]]
    assert sol.areSentencesSimilarTwo(s1, s2, pairs) is True, "test 1 failed"
    print("✓ sentence-similarity-ii passed")

if __name__ == "__main__":
    test()
