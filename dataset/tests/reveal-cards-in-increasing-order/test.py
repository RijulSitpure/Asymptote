from collections import deque
from typing import List

class Solution:
    def deckRevealedIncreasing(self, deck: List[int]) -> List[int]:
        deck.sort()
        n = len(deck)
        q = deque(range(n))
        res = [0] * n
        for card in deck:
            res[q.popleft()] = card
            if q:
                q.append(q.popleft())
        return res

def test():
    sol = Solution()
    d1 = [17, 13, 11, 2, 3, 5, 7]
    assert sol.deckRevealedIncreasing(d1) == [2, 13, 3, 11, 5, 17, 7], "test 1 failed"
    d2 = [1, 1000]
    assert sol.deckRevealedIncreasing(d2) == [1, 1000], "test 2 failed"
    print("✓ reveal-cards-in-increasing-order passed")

if __name__ == "__main__":
    test()
