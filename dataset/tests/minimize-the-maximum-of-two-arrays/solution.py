import math

class Solution:
    def minimizeSet(self, divisor1: int, divisor2: int, uniqueCnt1: int, uniqueCnt2: int) -> int:
        lcm = (divisor1 * divisor2) // math.gcd(divisor1, divisor2)
        lo = 1
        hi = 10**10
        while lo < hi:
            mid = (lo + hi) // 2
            c1 = mid - mid // divisor1
            c2 = mid - mid // divisor2
            cb = mid - mid // lcm
            if c1 >= uniqueCnt1 and c2 >= uniqueCnt2 and cb >= uniqueCnt1 + uniqueCnt2:
                hi = mid
            else:
                lo = mid + 1
        return lo
