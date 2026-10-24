from typing import List
from collections import Counter
import math
from functools import reduce

class Solution:
    def hasGroupsSizeX(self, deck: List[int]) -> bool:
        counts = Counter(deck).values()
        return reduce(math.gcd, counts) >= 2

def test():
    sol = Solution()
    assert sol.hasGroupsSizeX([1, 2, 3, 4, 4, 3, 2, 1]) is True, "test 1 failed"
    assert sol.hasGroupsSizeX([1, 1, 1, 2, 2, 2, 3, 3]) is False, "test 2 failed"
    print("✓ x-of-a-kind-in-a-deck-of-cards passed")

if __name__ == "__main__":
    test()
