from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def minimumAverageDifference(self, nums: list[int]) -> int:
        n = len(nums)
        total = sum(nums)
        pref = 0
        min_diff = float("inf")
        best_idx = 0
        for i in range(n):
            pref += nums[i]
            left_avg = pref // (i + 1)
            right_cnt = n - 1 - i
            right_avg = (total - pref) // right_cnt if right_cnt > 0 else 0
            diff = abs(left_avg - right_avg)
            if diff < min_diff:
                min_diff = diff
                best_idx = i
        return best_idx
