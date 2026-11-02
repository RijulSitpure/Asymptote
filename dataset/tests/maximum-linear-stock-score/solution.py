from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def maxScore(self, prices: List[int]) -> int:
        groups = defaultdict(int)
        for i, p in enumerate(prices):
            groups[p - i] += p
        return max(groups.values())
