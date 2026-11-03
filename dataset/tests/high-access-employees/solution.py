from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def findHighAccessEmployees(self, access_times: List[List[str]]) -> List[str]:
        groups = defaultdict(list)
        for name, t in access_times:
            mins = int(t[:2]) * 60 + int(t[2:])
            groups[name].append(mins)
            
        ans = []
        for name, times in groups.items():
            times.sort()
            for i in range(len(times) - 2):
                if times[i + 2] - times[i] < 60:
                    ans.append(name)
                    break
        return ans
