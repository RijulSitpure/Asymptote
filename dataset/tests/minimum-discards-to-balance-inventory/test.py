from collections import Counter
from typing import List

class Solution:
    def minDiscards(self, inventory: List[int], maxAllowed: int) -> int:
        counts = Counter(inventory)
        discards = 0
        for item, count in counts.items():
            if count > maxAllowed:
                discards += (count - maxAllowed)
        return discards

def run_tests():
    sol = Solution()
    assert sol.minDiscards([1, 1, 1, 2, 2, 3], 2) == 1
    assert sol.minDiscards([1, 2, 3], 1) == 0
    assert sol.minDiscards([5, 5, 5, 5], 1) == 3
    print("All tests passed for 3679.")

if __name__ == "__main__":
    run_tests()
