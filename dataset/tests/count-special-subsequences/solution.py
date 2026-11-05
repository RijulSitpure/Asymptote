import math
from collections import defaultdict

class Solution:
    def numberOfSubsequences(self, nums: list[int]) -> int:
        n = len(nums)
        ans = 0
        left_ratios = defaultdict(int)
        
        for r in range(4, n - 2):
            q = r - 2
            for p in range(0, q - 1):
                g = math.gcd(nums[p], nums[q])
                left_ratios[(nums[p] // g, nums[q] // g)] += 1
                
            for s in range(r + 2, n):
                g = math.gcd(nums[s], nums[r])
                ans += left_ratios[(nums[s] // g, nums[r] // g)]
                
        return ans
