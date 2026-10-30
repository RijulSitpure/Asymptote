from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def maximumTop(self, nums: list[int], k: int) -> int:
        n = len(nums)
        if n == 1:
            return -1 if k % 2 == 1 else nums[0]
        if k == 0:
            return nums[0]
        if k == 1:
            return nums[1] if n > 1 else -1
        if k > n:
            return max(nums)
        max_val = max(nums[:k - 1])
        if k < n:
            max_val = max(max_val, nums[k])
        return max_val
