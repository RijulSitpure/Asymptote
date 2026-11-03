from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def beautifulSubstrings(self, s: str, k: int) -> int:
        root = 1
        while (root * root) % k != 0:
            root += 1
            
        vowels_set = set('aeiou')
        counts = defaultdict(int)
        counts[(0, 0)] = 1
        
        v = 0
        diff = 0
        ans = 0
        for c in s:
            if c in vowels_set:
                v = (v + 1) % root
                diff += 1
            else:
                diff -= 1
            state = (v, diff)
            ans += counts[state]
            counts[state] += 1
        return ans
