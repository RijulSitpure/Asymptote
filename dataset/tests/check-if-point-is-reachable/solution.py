import math

class Solution:
    def isReachable(self, targetX: int, targetY: int) -> bool:
        g = math.gcd(targetX, targetY)
        while g % 2 == 0:
            g //= 2
        return g == 1
