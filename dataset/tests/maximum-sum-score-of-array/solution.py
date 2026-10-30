from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def maximumSumScore(self, nums: list[int]) -> int:
        total = sum(nums)
        pref = 0
        ans = -float("inf")
        for x in nums:
            pref += x
            suff = total - pref + x
            ans = max(ans, pref, suff)
        return ans
