from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def distributeCandies(self, n: int, limit: int) -> int:
        def c2(x):
            if x < 0:
                return 0
            return (x + 2) * (x + 1) // 2
            
        L = limit + 1
        return c2(n) - 3 * c2(n - L) + 3 * c2(n - 2 * L) - c2(n - 3 * L)
