class Solution:
    def minNumberOfSeconds(self, mountainHeight: int, workerTimes: list[int]) -> int:
        import math
        
        def check(seconds: int) -> bool:
            total_height = 0
            for t in workerTimes:
                # t * x * (x + 1) / 2 <= seconds
                # x * (x + 1) <= 2 * seconds / t
                # x^2 + x - 2 * seconds / t <= 0
                val = (2 * seconds) // t
                x = int((-1 + math.isqrt(1 + 4 * val)) // 2)
                total_height += x
                if total_height >= mountainHeight:
                    return True
            return False
            
        low = 1
        # Upper bound: fastest worker does all work
        min_w = min(workerTimes)
        high = min_w * mountainHeight * (mountainHeight + 1) // 2
        ans = high
        
        while low <= high:
            mid = (low + high) // 2
            if check(mid):
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
                
        return ans
