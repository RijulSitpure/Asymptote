from typing import List, Optional, Tuple, Dict, Set

import heapq

class Solution:
    def halveArray(self, nums: list[int]) -> int:
        pq = [-float(x) for x in nums]
        heapq.heapify(pq)
        target = sum(nums) / 2.0
        reduced = 0.0
        ops = 0
        while reduced < target:
            top = -heapq.heappop(pq)
            half = top / 2.0
            reduced += half
            heapq.heappush(pq, -half)
            ops += 1
        return ops
