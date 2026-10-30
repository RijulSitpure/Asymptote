from typing import List, Optional, Tuple, Dict, Set

import heapq

class Solution:
    def maximumProduct(self, nums: list[int], k: int) -> int:
        heapq.heapify(nums)
        for _ in range(k):
            heapq.heapreplace(nums, nums[0] + 1)
        MOD = 10**9 + 7
        ans = 1
        for x in nums:
            ans = (ans * x) % MOD
        return ans
