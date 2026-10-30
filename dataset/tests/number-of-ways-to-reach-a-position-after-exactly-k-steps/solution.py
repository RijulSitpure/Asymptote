import math

class Solution:
    def numberOfWays(self, startPos: int, endPos: int, k: int) -> int:
        d = abs(endPos - startPos)
        if d > k or (k - d) % 2 != 0:
            return 0
        MOD = 1_000_000_007
        r = (k + d) // 2
        return math.comb(k, r) % MOD
