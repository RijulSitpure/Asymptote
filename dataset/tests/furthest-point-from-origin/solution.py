from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math

class Solution:
    def furthestDistanceFromOrigin(self, moves: str) -> int:
        l = moves.count('L')
        r = moves.count('R')
        blank = moves.count('_')
        return abs(l - r) + blank
