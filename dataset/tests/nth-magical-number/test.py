import math

class Solution:
    def nthMagicalNumber(self, n: int, a: int, b: int) -> int:
        MOD = 1_000_000_007
        lcm = (a * b) // math.gcd(a, b)
        low, high = 1, n * min(a, b)
        while low < high:
            mid = (low + high) // 2
            cnt = mid // a + mid // b - mid // lcm
            if cnt < n:
                low = mid + 1
            else:
                high = mid
        return low % MOD

def test():
    sol = Solution()
    assert sol.nthMagicalNumber(1, 2, 3) == 2, "test 1 failed"
    assert sol.nthMagicalNumber(4, 2, 3) == 6, "test 2 failed"
    assert sol.nthMagicalNumber(5, 2, 4) == 10, "test 3 failed"
    print("✓ nth-magical-number passed")

if __name__ == "__main__":
    test()
