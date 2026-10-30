from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def minDeletion(self, nums: list[int]) -> int:
        deleted = 0
        n = len(nums)
        for i in range(n - 1):
            if (i - deleted) % 2 == 0 and nums[i] == nums[i + 1]:
                deleted += 1
        if (n - deleted) % 2 == 1:
            deleted += 1
        return deleted
