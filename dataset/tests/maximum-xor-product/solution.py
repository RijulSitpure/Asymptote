from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def maximumXorProduct(self, a: int, b: int, n: int) -> int:
        MOD = 10**9 + 7
        for i in range(n - 1, -1, -1):
            bit = 1 << i
            if (min(a, b) & bit) == 0:
                a ^= bit
                b ^= bit
        return (a % MOD) * (b % MOD) % MOD
