import math

class Solution:
    def nthUglyNumber(self, n: int, a: int, b: int, c: int) -> int:
        def lcm(x, y):
            return (x * y) // math.gcd(x, y)
        
        ab = lcm(a, b)
        bc = lcm(b, c)
        ac = lcm(a, c)
        abc = lcm(ab, c)
        
        def count(x):
            return (x // a + x // b + x // c
                    - x // ab - x // bc - x // ac
                    + x // abc)
        
        low, high = 1, 2 * 10**9
        ans = high
        while low <= high:
            mid = (low + high) // 2
            if count(mid) >= n:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans

def test():
    sol = Solution()
    assert sol.nthUglyNumber(3, 2, 3, 5) == 4, "test 1 failed"
    assert sol.nthUglyNumber(4, 2, 3, 4) == 6, "test 2 failed"
    assert sol.nthUglyNumber(5, 2, 11, 13) == 10, "test 3 failed"
    print("✓ ugly-number-iii passed")

if __name__ == "__main__":
    test()
