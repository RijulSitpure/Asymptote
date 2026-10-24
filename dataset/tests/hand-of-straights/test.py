from typing import List
from collections import Counter

class Solution:
    def isNStraightHand(self, hand: List[int], groupSize: int) -> bool:
        if len(hand) % groupSize != 0:
            return False
        count = Counter(hand)
        for val in sorted(count):
            if count[val] > 0:
                needed = count[val]
                for k in range(val, val + groupSize):
                    if count[k] < needed:
                        return False
                    count[k] -= needed
        return True

def test():
    sol = Solution()
    assert sol.isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3) is True, "test 1 failed"
    assert sol.isNStraightHand([1, 2, 3, 4, 5], 4) is False, "test 2 failed"
    assert sol.isNStraightHand([8, 10, 12], 3) is False, "test 3 failed"
    print("✓ hand-of-straights passed")

if __name__ == "__main__":
    test()
