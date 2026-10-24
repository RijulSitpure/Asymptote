import sys
import math
from collections import defaultdict
from typing import List

class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        n = len(points)
        if n <= 2:
            return n
        max_pts = 0
        for i in range(n):
            slopes = defaultdict(int)
            x1, y1 = points[i]
            for j in range(i + 1, n):
                x2, y2 = points[j]
                dx, dy = x2 - x1, y2 - y1
                g = math.gcd(dx, dy)
                dx //= g
                dy //= g
                if dx < 0 or (dx == 0 and dy < 0):
                    dx, dy = -dx, -dy
                slopes[(dx, dy)] += 1
            if slopes:
                max_pts = max(max_pts, max(slopes.values()) + 1)
        return max(max_pts, 1)

def test():
    sol = Solution()
    pts1 = [[1,1],[2,2],[3,3]]
    assert sol.maxPoints(pts1) == 3, "test 1 failed"
    pts2 = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
    assert sol.maxPoints(pts2) == 4, "test 2 failed"
    print("✓ max-points-on-a-line passed")

if __name__ == "__main__":
    test()
