import math

class Solution:
    def visiblePoints(self, points: list[list[int]], angle: int, location: list[int]) -> int:
        lx, ly = location
        same = 0
        angles = []
        for x, y in points:
            if x == lx and y == ly:
                same += 1
            else:
                angles.append(math.degrees(math.atan2(y - ly, x - lx)))
        angles.sort()
        angles += [a + 360 for a in angles]
        max_visible = 0
        left = 0
        for right in range(len(angles)):
            while angles[right] - angles[left] > angle:
                left += 1
            max_visible = max(max_visible, right - left + 1)
        return same + max_visible

def test():
    sol = Solution()
    assert sol.visiblePoints([[2,1],[2,2],[3,3]], 90, [1,1]) == 3
    assert sol.visiblePoints([[2,1],[2,2],[3,4],[1,1]], 90, [1,1]) == 4
    assert sol.visiblePoints([[1,0],[2,1]], 13, [1,1]) == 1

    print("✓ maximum-number-of-visible-points passed")

if __name__ == '__main__':
    test()
