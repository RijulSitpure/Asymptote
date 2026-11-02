from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math

class Solution:
    def numberOfPoints(self, nums: List[List[int]]) -> int:
        occupied = set()
        for start, end in nums:
            for x in range(start, end + 1):
                occupied.add(x)
        return len(occupied)
