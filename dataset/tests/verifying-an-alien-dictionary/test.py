from typing import List

class Solution:
    def isAlienSorted(self, words: List[str], order: str) -> bool:
        rank = {ch: i for i, ch in enumerate(order)}
        for i in range(len(words) - 1):
            w1, w2 = words[i], words[i + 1]
            min_len = min(len(w1), len(w2))
            diff = False
            for k in range(min_len):
                if w1[k] != w2[k]:
                    if rank[w1[k]] > rank[w2[k]]:
                        return False
                    diff = True
                    break
            if not diff and len(w1) > len(w2):
                return False
        return True

def test():
    sol = Solution()
    assert sol.isAlienSorted(["hello","leetcode"], "hlabcdefgijkmnopqrstuvwxyz") is True, "test 1 failed"
    assert sol.isAlienSorted(["word","world","row"], "worldabcefghijkmnpqstuvxyz") is False, "test 2 failed"
    assert sol.isAlienSorted(["apple","app"], "abcdefghijklmnopqrstuvwxyz") is False, "test 3 failed"
    print("✓ verifying-an-alien-dictionary passed")

if __name__ == "__main__":
    test()
