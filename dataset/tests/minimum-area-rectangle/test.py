from typing import List

class Solution:
    def minAreaRect(self, points: List[List[int]]) -> int:
        pt_set = {(x, y) for x, y in points}
        min_area = float("inf")
        n = len(points)
        for i in range(n):
            x1, y1 = points[i]
            for j in range(i + 1, n):
                x2, y2 = points[j]
                if x1 != x2 and y1 != y2:
                    if (x1, y2) in pt_set and (x2, y1) in pt_set:
                        area = abs(x1 - x2) * abs(y1 - y2)
                        min_area = min(min_area, area)
        return min_area if min_area != float("inf") else 0

def test():
    sol = Solution()
    p1 = [[1,1],[1,3],[3,1],[3,3],[2,2]]
    assert sol.minAreaRect(p1) == 4, "test 1 failed"
    p2 = [[1,1],[1,3],[3,1],[3,3],[4,1],[4,3]]
    assert sol.minAreaRect(p2) == 2, "test 2 failed"
    print("✓ minimum-area-rectangle passed")

if __name__ == "__main__":
    test()
