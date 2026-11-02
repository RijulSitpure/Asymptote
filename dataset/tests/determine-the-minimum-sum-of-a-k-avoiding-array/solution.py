from typing import List, Optional
class Solution:
    def minimumSum(self, n: int, k: int) -> int:
        m = min(n, k // 2)
        rem = n - m
        sum1 = m * (m + 1) // 2
        sum2 = rem * k + rem * (rem - 1) // 2
        return sum1 + sum2
