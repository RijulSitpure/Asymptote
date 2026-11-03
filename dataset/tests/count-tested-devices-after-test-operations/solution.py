from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def countTestedDevices(self, batteryPercentages: List[int]) -> int:
        tested = 0
        for b in batteryPercentages:
            if b - tested > 0:
                tested += 1
        return tested
