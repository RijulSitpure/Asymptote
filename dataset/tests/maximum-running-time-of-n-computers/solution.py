from typing import List

class Solution:
    def maxRunTime(self, n: int, batteries: List[int]) -> int:
        low, high = 1, sum(batteries) // n
        while low < high:
            mid = (low + high + 1) // 2
            total = sum(min(b, mid) for b in batteries)
            if total >= n * mid:
                low = mid
            else:
                high = mid - 1
        return low
