from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def minGroupsForValidAssignment(self, nums: List[int]) -> int:
        cnt = Counter(nums)
        freqs = list(cnt.values())
        m = min(freqs)
        for k in range(m, 0, -1):
            total_groups = 0
            possible = True
            for f in freqs:
                q, r = divmod(f, k)
                if r > q:
                    possible = False
                    break
                total_groups += (f + k) // (k + 1)
            if possible:
                return total_groups
        return len(nums)
