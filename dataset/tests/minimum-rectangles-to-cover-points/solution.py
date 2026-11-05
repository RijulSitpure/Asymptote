class Solution:
    def minRectanglesToCoverPoints(self, points: list[list[int]], w: int) -> int:
        xs = sorted(p[0] for p in points)
        ans = 0
        last = -1
        for x in xs:
            if x > last:
                ans += 1
                last = x + w
        return ans
