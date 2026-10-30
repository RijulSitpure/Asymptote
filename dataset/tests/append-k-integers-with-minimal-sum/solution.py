from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def minimalKSum(self, nums: list[int], k: int) -> int:
        ans = k * (k + 1) // 2
        for x in sorted(set(nums)):
            if x <= k:
                ans += (k + 1) - x
                k += 1
        return ans
