from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def minimumSteps(self, s: str) -> int:
        ans = 0
        black_cnt = 0
        for c in s:
            if c == '1':
                black_cnt += 1
            else:
                ans += black_cnt
        return ans
