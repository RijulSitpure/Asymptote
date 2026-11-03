from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def beautifulSubstrings(self, s: str, k: int) -> int:
        vowels_set = set('aeiou')
        n = len(s)
        ans = 0
        for i in range(n):
            v = 0
            c = 0
            for j in range(i, n):
                if s[j] in vowels_set:
                    v += 1
                else:
                    c += 1
                if v == c and (v * c) % k == 0:
                    ans += 1
        return ans
