from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def findClosestNumber(self, nums: list[int]) -> int:
        best = nums[0]
        for x in nums[1:]:
            if abs(x) < abs(best) or (abs(x) == abs(best) and x > best):
                best = x
        return best
