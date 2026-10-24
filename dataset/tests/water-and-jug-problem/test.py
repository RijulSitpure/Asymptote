import sys

class Solution:
    def canMeasureWater(self, x: int, y: int, target: int) -> bool:
        import math
        if target > x + y:
            return False
        if target == 0:
            return True
        return target % math.gcd(x, y) == 0

def test():
    sol = Solution()
    assert sol.canMeasureWater(3, 5, 4) is True, "test 1 failed"
    assert sol.canMeasureWater(2, 6, 5) is False, "test 2 failed"
    assert sol.canMeasureWater(1, 2, 3) is True, "test 3 failed"
    print("✓ water-and-jug-problem passed")

if __name__ == "__main__":
    test()
