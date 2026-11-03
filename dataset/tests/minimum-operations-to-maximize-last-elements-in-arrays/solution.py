from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def minOperations(self, nums1: List[int], nums2: List[int]) -> int:
        n = len(nums1)
        
        def check(target1, target2):
            cost = 0
            for i in range(n - 1):
                v1, v2 = nums1[i], nums2[i]
                if v1 <= target1 and v2 <= target2:
                    continue
                elif v2 <= target1 and v1 <= target2:
                    cost += 1
                else:
                    return float('inf')
            return cost
            
        c1 = check(nums1[-1], nums2[-1])
        c2 = check(nums2[-1], nums1[-1]) + 1
        ans = min(c1, c2)
        return ans if ans != float('inf') else -1
