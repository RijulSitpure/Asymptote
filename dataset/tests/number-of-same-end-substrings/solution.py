from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def sameEndSubstringCount(self, s: str, queries: List[List[int]]) -> List[int]:
        n = len(s)
        pref = [[0] * 26 for _ in range(n + 1)]
        for i in range(n):
            for c in range(26):
                pref[i + 1][c] = pref[i][c]
            pref[i + 1][ord(s[i]) - ord('a')] += 1
            
        ans = []
        for l, r in queries:
            total = 0
            for c in range(26):
                k = pref[r + 1][c] - pref[l][c]
                total += k * (k + 1) // 2
            ans.append(total)
        return ans
