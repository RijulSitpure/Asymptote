import math

class Solution:
    def waysToReachStair(self, k: int) -> int:
        ans = 0
        for m in range(32):
            d = (1 << m) - k
            if 0 <= d <= m + 1:
                ans += math.comb(m + 1, d)
        return ans