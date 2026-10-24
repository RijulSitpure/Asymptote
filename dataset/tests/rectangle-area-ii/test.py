from typing import List

class Solution:
    def rectangleArea(self, rectangles: List[List[int]]) -> int:
        MOD = 1_000_000_007
        xs = sorted(list(set([r[0] for r in rectangles] + [r[2] for r in rectangles])))
        total_area = 0

        for i in range(len(xs) - 1):
            x1, x2 = xs[i], xs[i + 1]
            width = x2 - x1
            intervals = []
            for rx1, ry1, rx2, ry2 in rectangles:
                if rx1 <= x1 and rx2 >= x2:
                    intervals.append((ry1, ry2))
            intervals.sort()
            covered_y = 0
            cur_bottom = -1
            for y1, y2 in intervals:
                cur_bottom = max(cur_bottom, y1)
                if y2 > cur_bottom:
                    covered_y += y2 - cur_bottom
                    cur_bottom = y2
            total_area = (total_area + covered_y * width) % MOD

        return total_area

def test():
    sol = Solution()
    assert sol.rectangleArea([[0, 0, 2, 2], [1, 0, 2, 3], [1, 0, 3, 1]]) == 6, "test 1 failed"
    assert sol.rectangleArea([[0, 0, 1000000000, 1000000000]]) == 49, "test 2 failed"
    print("✓ rectangle-area-ii passed")

if __name__ == "__main__":
    test()
