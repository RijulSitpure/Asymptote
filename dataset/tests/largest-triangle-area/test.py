from typing import List

class Solution:
    def largestTriangleArea(self, points: List[List[int]]) -> float:
        n = len(points)
        ans = 0.0
        for i in range(n):
            x1, y1 = points[i]
            for j in range(i + 1, n):
                x2, y2 = points[j]
                for k in range(j + 1, n):
                    x3, y3 = points[k]
                    area = 0.5 * abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2))
                    if area > ans:
                        ans = area
        return ans

def test():
    sol = Solution()
    pts1 = [[0, 0], [0, 1], [1, 0], [0, 2], [2, 0]]
    assert sol.largestTriangleArea(pts1) == 2.0, "test 1 failed"
    pts2 = [[1, 0], [0, 0], [0, 1]]
    assert sol.largestTriangleArea(pts2) == 0.5, "test 2 failed"
    print("✓ largest-triangle-area passed")

if __name__ == "__main__":
    test()
