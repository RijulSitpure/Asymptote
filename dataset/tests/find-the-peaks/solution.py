from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def findPeaks(self, mountain: List[int]) -> List[int]:
        return [i for i in range(1, len(mountain) - 1) if mountain[i] > mountain[i - 1] and mountain[i] > mountain[i + 1]]
