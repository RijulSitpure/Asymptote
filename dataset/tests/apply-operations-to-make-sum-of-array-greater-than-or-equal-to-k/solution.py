import math

class Solution:
    def minOperations(self, k: int) -> int:
        ans = k - 1
        limit = int(math.isqrt(k)) + 2
        for x in range(1, limit + 1):
            copies = (k + x - 1) // x
            ops = (x - 1) + (copies - 1)
            if ops < ans:
                ans = ops
        return ans
