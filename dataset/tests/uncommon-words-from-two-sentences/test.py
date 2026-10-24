from typing import List
from collections import Counter

class Solution:
    def uncommonFromSentences(self, s1: str, s2: str) -> List[str]:
        count = Counter((s1 + " " + s2).split())
        return [w for w, c in count.items() if c == 1]

def test():
    sol = Solution()
    res1 = sorted(sol.uncommonFromSentences("this apple is sweet", "this apple is sour"))
    assert res1 == ["sour", "sweet"], f"test 1 failed: {res1}"
    res2 = sorted(sol.uncommonFromSentences("apple apple", "banana"))
    assert res2 == ["banana"], f"test 2 failed: {res2}"
    print("✓ uncommon-words-from-two-sentences passed")

if __name__ == "__main__":
    test()
