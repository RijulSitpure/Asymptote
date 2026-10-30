from collections import defaultdict

class DetectSquares:
    def __init__(self):
        self.points = defaultdict(int)

    def add(self, point: list[int]) -> None:
        self.points[(point[0], point[1])] += 1

    def count(self, point: list[int]) -> int:
        qx, qy = point
        ans = 0
        for (x, y), cnt in self.points.items():
            if abs(qx - x) == abs(qy - y) and abs(qx - x) > 0:
                ans += cnt * self.points[(qx, y)] * self.points[(x, qy)]
        return ans
