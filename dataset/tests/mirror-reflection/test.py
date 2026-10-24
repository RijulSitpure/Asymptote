import math

class Solution:
    def mirrorReflection(self, p: int, q: int) -> int:
        g = math.gcd(p, q)
        p = (p // g) % 2
        q = (q // g) % 2
        if p == 1 and q == 1:
            return 1
        if p == 1 and q == 0:
            return 0
        return 2

def test():
    sol = Solution()
    assert sol.mirrorReflection(2, 1) == 2, "test 1 failed"
    assert sol.mirrorReflection(3, 1) == 1, "test 2 failed"
    print("✓ mirror-reflection passed")

if __name__ == "__main__":
    test()
