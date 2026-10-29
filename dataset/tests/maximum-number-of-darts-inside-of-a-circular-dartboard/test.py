import math

class Solution:
    def numPoints(self, darts: list[list[int]], r: int) -> int:
        n = len(darts)
        ans = 1
        for i in range(n):
            x1, y1 = darts[i]
            for j in range(i + 1, n):
                x2, y2 = darts[j]
                d2 = (x1 - x2)**2 + (y1 - y2)**2
                if d2 > 4 * r * r: continue
                d = math.sqrt(d2)
                mid_x, mid_y = (x1 + x2) / 2, (y1 + y2) / 2
                h = math.sqrt(max(0.0, r * r - (d / 2)**2))
                vx, vy = -(y2 - y1) / d, (x2 - x1) / d
                for sign in [-1, 1]:
                    cx = mid_x + sign * h * vx
                    cy = mid_y + sign * h * vy
                    cnt = sum(1 for px, py in darts if (px - cx)**2 + (py - cy)**2 <= r * r + 1e-7)
                    if cnt > ans: ans = cnt
        return ans

sol = Solution()
assert sol.numPoints([[-2,0],[2,0],[0,2],[0,-2]], 2) == 4
assert sol.numPoints([[-3,0],[3,0],[2,6]], 5) == 3
print("All tests passed successfully.")
