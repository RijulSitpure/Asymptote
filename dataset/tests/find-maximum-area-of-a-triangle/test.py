from typing import List
from collections import defaultdict

class Solution:
    def maxTriangleArea(self, points: List[List[int]]) -> float:
        x_pts = defaultdict(list)
        y_pts = defaultdict(list)
        all_x = []
        all_y = []
        
        for x, y in points:
            x_pts[x].append(y)
            y_pts[y].append(x)
            all_x.append(x)
            all_y.append(y)
            
        min_x, max_x = min(all_x), max(all_x)
        min_y, max_y = min(all_y), max(all_y)
        
        max_area = 0.0
        
        # Vertical base: same x, varying y
        for x, ys in x_pts.items():
            if len(ys) >= 2:
                base = max(ys) - min(ys)
                height = max(abs(x - min_x), abs(x - max_x))
                area = 0.5 * base * height
                if area > max_area:
                    max_area = area
                    
        # Horizontal base: same y, varying x
        for y, xs in y_pts.items():
            if len(xs) >= 2:
                base = max(xs) - min(xs)
                height = max(abs(y - min_y), abs(y - max_y))
                area = 0.5 * base * height
                if area > max_area:
                    max_area = area
                    
        return max_area

def run_tests():
    s = Solution()
    res1 = s.maxTriangleArea([[0, 0], [0, 4], [3, 0]])
    assert res1 == 6.0, f"Expected 6.0, got {res1}" # 0.5 * 4 * 3 = 6.0
    res2 = s.maxTriangleArea([[1, 1], [1, 3], [5, 2]])
    assert res2 == 4.0, f"Expected 4.0, got {res2}" # 0.5 * 2 * 4 = 4.0
    print("3588 find-maximum-area-of-a-triangle PASSED")

if __name__ == "__main__":
    run_tests()
