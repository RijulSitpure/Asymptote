from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def numberOfWays(self, n: int, m: int, k: int, source: List[int], dest: List[int]) -> int:
        mod = 10**9 + 7
        if source == dest:
            dp = [1, 0, 0, 0]
        elif source[0] == dest[0]:
            dp = [0, 1, 0, 0]
        elif source[1] == dest[1]:
            dp = [0, 0, 1, 0]
        else:
            dp = [0, 0, 0, 1]
        for _ in range(k):
            d0, d1, d2, d3 = dp
            n0 = (d1 + d2) % mod
            n1 = (d0 * (m - 1) + d1 * (m - 2) + d3) % mod
            n2 = (d0 * (n - 1) + d2 * (n - 2) + d3) % mod
            n3 = (d1 * (n - 1) + d2 * (m - 1) + d3 * (n + m - 4)) % mod
            dp = [n0, n1, n2, n3]
        return dp[0]
