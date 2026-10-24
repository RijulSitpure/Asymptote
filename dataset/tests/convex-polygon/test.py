import sys
from typing import List

class Solution:
    def isConvex(self, points: List[List[int]]) -> bool:
        n = len(points)
        prev_sign = 0
        for i in range(n):
            x1, y1 = points[i]
            x2, y2 = points[(i + 1) % n]
            x3, y3 = points[(i + 2) % n]
            cp = (x2 - x1) * (y3 - y2) - (y2 - y1) * (x3 - x2)
            if cp != 0:
                if prev_sign == 0:
                    prev_sign = 1 if cp > 0 else -1
                elif (cp > 0 and prev_sign < 0) or (cp < 0 and prev_sign > 0):
                    return False
        return True

def test():
    sol = Solution()
    assert sol.isConvex([[0, 0], [0, 5], [5, 5], [5, 0]]) is True, "test 1 failed"
    assert sol.isConvex([[0, 0], [0, 10], [10, 10], [10, 0], [5, 5]]) is False, "test 2 failed"
    print("✓ convex-polygon passed")

if __name__ == "__main__":
    test()
