from typing import List

class Solution:
    def equalizeWater(self, buckets: List[int], loss: int) -> float:
        low, high = 0.0, float(max(buckets))
        factor = (100 - loss) / 100.0
        for _ in range(80):
            mid = (low + high) / 2.0
            excess = 0.0
            deficit = 0.0
            for b in buckets:
                if b > mid:
                    excess += (b - mid) * factor
                else:
                    deficit += (mid - b)
            if excess >= deficit:
                low = mid
            else:
                high = mid
        return low
