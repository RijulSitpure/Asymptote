from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math

class Solution:
    def minimumPossibleSum(self, n: int, target: int) -> int:
        mod = 10**9 + 7
        m = target // 2
        if n <= m:
            return (n * (n + 1) // 2) % mod
        ans = m * (m + 1) // 2
        rem = n - m
        ans += (target + target + rem - 1) * rem // 2
        return ans % mod
