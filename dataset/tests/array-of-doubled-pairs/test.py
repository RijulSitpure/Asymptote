from collections import Counter
from typing import List

class Solution:
    def canReorderDoubled(self, arr: List[int]) -> bool:
        counts = Counter(arr)
        for x in sorted(counts.keys(), key=abs):
            if counts[x] > counts[2 * x]:
                return False
            counts[2 * x] -= counts[x]
        return True

def test():
    sol = Solution()
    assert sol.canReorderDoubled([3, 1, 3, 6]) is False, "test 1 failed"
    assert sol.canReorderDoubled([2, 1, 2, 6]) is False, "test 2 failed"
    assert sol.canReorderDoubled([4, -2, 2, -4]) is True, "test 3 failed"
    print("✓ array-of-doubled-pairs passed")

if __name__ == "__main__":
    test()
