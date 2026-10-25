import math

class Solution:
    def closestDivisors(self, num: int) -> list[int]:
        def get_pair(n):
            for d in range(int(math.isqrt(n)), 0, -1):
                if n % d == 0:
                    return [d, n // d]
            return [1, n]
        p1 = get_pair(num + 1)
        p2 = get_pair(num + 2)
        return p1 if abs(p1[0] - p1[1]) <= abs(p2[0] - p2[1]) else p2

def test():
    sol = Solution()
    assert sol.closestDivisors(8) == [3,3], "test 1 failed"
    assert sol.closestDivisors(123) == [5,25], "test 2 failed"
    assert sol.closestDivisors(999) == [25,40], "test 3 failed"
    print("✓ closest-divisors passed")

if __name__ == "__main__":
    test()
