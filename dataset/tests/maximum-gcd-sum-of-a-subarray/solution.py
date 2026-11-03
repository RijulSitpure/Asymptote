from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def maxGcdSum(self, nums: List[int], k: int) -> int:
        n = len(nums)
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] + nums[i]
            
        ans = 0
        states = []  # list of (leftmost_idx, gcd_val)
        for r, x in enumerate(nums):
            next_states = [(r, x)]
            for l_idx, g in states:
                next_states.append((l_idx, math.gcd(g, x)))
            merged = []
            for l_idx, g in next_states:
                if not merged or merged[-1][1] != g:
                    merged.append((l_idx, g))
                else:
                    merged[-1] = (min(merged[-1][0], l_idx), g)
            states = merged
            for l_idx, g in states:
                if r - l_idx + 1 >= k:
                    score = g * (pref[r + 1] - pref[l_idx])
                    if score > ans:
                        ans = score
        return ans
