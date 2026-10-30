from typing import List

class Solution:
    def countElements(self, nums: List[int]) -> int:
        min_val = min(nums)
        max_val = max(nums)
        return sum(1 for x in nums if min_val < x < max_val)
