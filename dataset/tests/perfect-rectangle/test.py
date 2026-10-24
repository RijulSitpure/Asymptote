import sys
from typing import List

class Solution:
    def isRectangleCover(self, rectangles: List[List[int]]) -> bool:
        area = 0
        corners = set()
        min_x, min_y = float("inf"), float("inf")
        max_x, max_y = -float("inf"), -float("inf")
        for x1, y1, x2, y2 in rectangles:
            area += (x2 - x1) * (y2 - y1)
            min_x = min(min_x, x1)
            min_y = min(min_y, y1)
            max_x = max(max_x, x2)
            max_y = max(max_y, y2)
            for pt in [(x1, y1), (x1, y2), (x2, y1), (x2, y2)]:
                if pt in corners:
                    corners.remove(pt)
                else:
                    corners.add(pt)
        expected_corners = {(min_x, min_y), (min_x, max_y), (max_x, min_y), (max_x, max_y)}
        if corners != expected_corners:
            return False
        return area == (max_x - min_x) * (max_y - min_y)

def test():
    sol = Solution()
    rects1 = [[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]]
    assert sol.isRectangleCover(rects1) is True, "test 1 failed"
    rects2 = [[1,1,2,3],[1,3,2,4],[3,1,4,2],[3,2,4,4]]
    assert sol.isRectangleCover(rects2) is False, "test 2 failed"
    print("✓ perfect-rectangle passed")

if __name__ == "__main__":
    test()
