from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def maxSpending(self, values: List[List[int]]) -> int:
        items = []
        for row in values:
            items.extend(row)
        items.sort()
        return sum(val * d for d, val in enumerate(items, 1))
