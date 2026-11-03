from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def findMinimumOperations(self, s1: str, s2: str, s3: str) -> int:
        min_len = min(len(s1), len(s2), len(s3))
        lcp = 0
        for i in range(min_len):
            if s1[i] == s2[i] == s3[i]:
                lcp += 1
            else:
                break
        if lcp == 0:
            return -1
        return len(s1) + len(s2) + len(s3) - 3 * lcp
