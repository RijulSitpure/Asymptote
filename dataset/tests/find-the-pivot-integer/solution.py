import math

class Solution:
    def pivotInteger(self, n: int) -> int:
        total = n * (n + 1) // 2
        x = int(math.isqrt(total))
        return x if x * x == total else -1
