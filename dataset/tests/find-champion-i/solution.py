from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def findChampion(self, grid: List[List[int]]) -> int:
        n = len(grid)
        for i, row in enumerate(grid):
            if sum(row) == n - 1:
                return i
        return -1
