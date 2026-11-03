from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def numberOfInfectionSequences(self, n: int, sick: List[int]) -> int:
        MOD = 10**9 + 7
        gaps = []
        if sick[0] > 0:
            gaps.append(sick[0])
        interior = []
        for i in range(1, len(sick)):
            l = sick[i] - sick[i - 1] - 1
            if l > 0:
                gaps.append(l)
                interior.append(l)
        if sick[-1] < n - 1:
            gaps.append(n - 1 - sick[-1])
            
        tot = sum(gaps)
        fact = [1] * (tot + 1)
        for i in range(1, tot + 1):
            fact[i] = (fact[i - 1] * i) % MOD
            
        ans = fact[tot]
        for l in gaps:
            ans = (ans * pow(fact[l], MOD - 2, MOD)) % MOD
        for l in interior:
            ans = (ans * pow(2, l - 1, MOD)) % MOD
        return ans
