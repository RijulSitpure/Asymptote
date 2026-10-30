import math
import random

class Solution:
    def getCircle(self, R):
        if len(R) == 0:
            return (0.0, 0.0, 0.0)
        if len(R) == 1:
            return (float(R[0][0]), float(R[0][1]), 0.0)
        if len(R) == 2:
            cx = (R[0][0] + R[1][0]) / 2.0
            cy = (R[0][1] + R[1][1]) / 2.0
            r = math.hypot(R[0][0] - cx, R[0][1] - cy)
            return (cx, cy, r)
        (x1, y1), (x2, y2), (x3, y3) = R[0], R[1], R[2]
        d = 2 * (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2))
        if abs(d) < 1e-9:
            return (0.0, 0.0, 0.0)
        ux = ((x1**2 + y1**2) * (y2 - y3) + (x2**2 + y2**2) * (y3 - y1) + (x3**2 + y3**2) * (y1 - y2)) / d
        uy = ((x1**2 + y1**2) * (x3 - x2) + (x2**2 + y2**2) * (x1 - x3) + (x3**2 + y3**2) * (x2 - x1)) / d
        r = math.hypot(x1 - ux, y1 - uy)
        return (ux, uy, r)

    def enclose(self, trees: list[list[int]]) -> list[float]:
        P = [list(map(float, pt)) for pt in trees]
        random.seed(42)
        random.shuffle(P)

        def welzl(n, R):
            if n == 0 or len(R) == 3:
                return self.getCircle(R)
            cx, cy, r = welzl(n - 1, R)
            if math.hypot(P[n - 1][0] - cx, P[n - 1][1] - cy) <= r + 1e-7:
                return (cx, cy, r)
            return welzl(n - 1, R + [P[n - 1]])

        cx, cy, r = welzl(len(P), [])
        return [cx, cy, r]

import math

def test_enclose():
    sol = Solution()
    res = sol.enclose([[1, 2], [2, 2], [4, 2]])
    assert abs(res[0] - 2.5) < 1e-4
    assert abs(res[1] - 2.0) < 1e-4
    assert abs(res[2] - 1.5) < 1e-4

