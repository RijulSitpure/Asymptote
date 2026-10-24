from collections import Counter
import re
from typing import List

class Solution:
    def mostCommonWord(self, paragraph: str, banned: List[str]) -> str:
        banned_set = set(banned)
        words = re.findall(r'\w+', paragraph.lower())
        counts = Counter(w for w in words if w not in banned_set)
        return counts.most_common(1)[0][0]

def test():
    sol = Solution()
    p1 = "Bob hit a ball, the hit BALL flew far after it was hit."
    b1 = ["hit"]
    assert sol.mostCommonWord(p1, b1) == "ball", "test 1 failed"
    p2 = "a."
    b2 = []
    assert sol.mostCommonWord(p2, b2) == "a", "test 2 failed"
    print("✓ most-common-word passed")

if __name__ == "__main__":
    test()
