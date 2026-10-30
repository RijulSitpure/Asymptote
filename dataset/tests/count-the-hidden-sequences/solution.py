from typing import List

class Solution:
    def numberOfArrays(self, differences: List[int], lower: int, upper: int) -> int:
        curr = 0
        min_val = 0
        max_val = 0
        for d in differences:
            curr += d
            min_val = min(min_val, curr)
            max_val = max(max_val, curr)
        span = max_val - min_val
        return max(0, (upper - lower) - span + 1)
