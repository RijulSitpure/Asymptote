import math
from collections import defaultdict
from typing import List

class Solution:
    def minAreaFreeRect(self, points: List[List[int]]) -> float:
        groups = defaultdict(list)
        n = len(points)
        for i in range(n):
            x1, y1 = points[i]
            for j in range(i + 1, n):
                x2, y2 = points[j]
                cx, cy = x1 + x2, y1 + y2
                d2 = (x1 - x2) ** 2 + (y1 - y2) ** 2
                groups[(cx, cy, d2)].append((x1, y1, x2, y2))
        min_area = float("inf")
        for pairs in groups.values():
            m = len(pairs)
            for i in range(m):
                x1, y1, x2, y2 = pairs[i]
                for j in range(i + 1, m):
                    x3, y3, _, _ = pairs[j]
                    side1 = math.hypot(x1 - x3, y1 - y3)
                    side2 = math.hypot(x2 - x3, y2 - y3)
                    min_area = min(min_area, side1 * side2)
        return min_area if min_area != float("inf") else 0.0

def test():
    sol = Solution()
    p1 = [[1,2],[2,1],[1,0],[0,1]]
    assert abs(sol.minAreaFreeRect(p1) - 2.0) < 1e-5, "test 1 failed"
    p2 = [[0,1],[2,1],[1,1],[1,0],[2,0]]
    assert abs(sol.minAreaFreeRect(p2) - 1.0) < 1e-5, "test 2 failed"
    p3 = [[0,3],[1,2],[3,0],[2,1]]
    assert abs(sol.minAreaFreeRect(p3) - 0.0) < 1e-5, "test 3 failed"
    print("✓ minimum-area-rectangle-ii passed")

if __name__ == "__main__":
    test()
