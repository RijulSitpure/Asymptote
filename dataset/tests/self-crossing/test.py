import sys
from typing import List

class Solution:
    def isSelfCrossing(self, distance: List[int]) -> bool:
        d = distance
        for i in range(3, len(d)):
            if d[i] >= d[i - 2] and d[i - 1] <= d[i - 3]:
                return True
            if i >= 4 and d[i - 1] == d[i - 3] and d[i] + d[i - 4] >= d[i - 2]:
                return True
            if i >= 5 and d[i - 1] <= d[i - 3] and d[i - 1] + d[i - 5] >= d[i - 3] and d[i - 2] > d[i - 4] and d[i] + d[i - 4] >= d[i - 2]:
                return True
        return False

def test():
    sol = Solution()
    assert sol.isSelfCrossing([2, 1, 1, 2]) is True, "test 1 failed"
    assert sol.isSelfCrossing([1, 2, 3, 4]) is False, "test 2 failed"
    assert sol.isSelfCrossing([1, 1, 1, 2, 1]) is True, "test 3 failed"
    print("✓ self-crossing passed")

if __name__ == "__main__":
    test()
