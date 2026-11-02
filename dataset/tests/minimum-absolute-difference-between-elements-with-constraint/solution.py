from typing import List, Optional
class Solution:
    def minAbsoluteDifference(self, nums: List[int], x: int) -> int:
        import bisect
        window = []
        ans = float('inf')
        for i in range(x, len(nums)):
            bisect.insort(window, nums[i - x])
            target = nums[i]
            idx = bisect.bisect_left(window, target)
            if idx < len(window):
                ans = min(ans, abs(window[idx] - target))
            if idx > 0:
                ans = min(ans, abs(window[idx - 1] - target))
        return ans
