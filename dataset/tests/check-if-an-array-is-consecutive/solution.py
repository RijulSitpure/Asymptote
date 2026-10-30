from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def isConsecutive(self, nums: list[int]) -> bool:
        return len(nums) == len(set(nums)) and max(nums) - min(nums) == len(nums) - 1
