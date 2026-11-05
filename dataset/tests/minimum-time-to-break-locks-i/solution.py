from functools import cache

class Solution:
    def findMinimumTime(self, strength: list[int], k: int) -> int:
        n = len(strength)
        
        @cache
        def dfs(mask: int) -> int:
            if mask == (1 << n) - 1:
                return 0
            cnt = mask.bit_count()
            x = 1 + cnt * k
            ans = float('inf')
            for j in range(n):
                if not (mask & (1 << j)):
                    time_taken = (strength[j] + x - 1) // x
                    ans = min(ans, time_taken + dfs(mask | (1 << j)))
            return ans
            
        return dfs(0)
