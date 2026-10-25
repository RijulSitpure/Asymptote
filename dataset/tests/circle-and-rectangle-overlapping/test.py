class Solution:
    def checkOverlap(self, radius: int, xCenter: int, yCenter: int, x1: int, y1: int, x2: int, y2: int) -> bool:
        closest_x = max(x1, min(xCenter, x2))
        closest_y = max(y1, min(yCenter, y2))
        dx = xCenter - closest_x
        dy = yCenter - closest_y
        return dx * dx + dy * dy <= radius * radius

def test():
    sol = Solution()
    assert sol.checkOverlap(1, 0, 0, 1, -1, 3, 1) == True, "test 1 failed"
    assert sol.checkOverlap(1, 1, 1, 1, -3, 2, -1) == False, "test 2 failed"
    assert sol.checkOverlap(1, 0, 0, -1, 0, 0, 1) == True, "test 3 failed"
    print("✓ circle-and-rectangle-overlapping passed")

if __name__ == "__main__":
    test()
