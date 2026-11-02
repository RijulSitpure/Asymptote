from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import itertools
import sys

class Solution:
    def isReachableAtTime(self, sx: int, sy: int, fx: int, fy: int, t: int) -> bool:
        dist = max(abs(sx - fx), abs(sy - fy))
        if dist == 0 and t == 1:
            return False
        return t >= dist
