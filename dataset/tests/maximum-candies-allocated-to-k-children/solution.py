from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def maximumCandies(self, candies: list[int], k: int) -> int:
        l, r = 1, max(candies)
        ans = 0
        while l <= r:
            mid = (l + r) // 2
            if sum(c // mid for c in candies) >= k:
                ans = mid
                l = mid + 1
            else:
                r = mid - 1
        return ans
