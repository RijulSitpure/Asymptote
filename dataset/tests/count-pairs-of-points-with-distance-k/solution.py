from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import itertools
import sys

class Solution:
    def countPairs(self, coordinates: List[List[int]], k: int) -> int:
        counts = Counter()
        ans = 0
        for x, y in coordinates:
            for a in range(k + 1):
                b = k - a
                target = (x ^ a, y ^ b)
                ans += counts[target]
            counts[(x, y)] += 1
        return ans
