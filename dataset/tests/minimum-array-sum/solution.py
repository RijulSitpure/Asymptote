from functools import cache

class Solution:
    def minArraySum(self, nums: list[int], k: int, op1: int, op2: int) -> int:
        n = len(nums)
        
        @cache
        def dp(i: int, o1: int, o2: int) -> int:
            if i == n:
                return 0
            x = nums[i]
            # Choice 1: no operation
            res = x + dp(i + 1, o1, o2)
            
            # Choice 2: op1 only
            if o1 > 0:
                res = min(res, (x + 1) // 2 + dp(i + 1, o1 - 1, o2))
                
            # Choice 3: op2 only
            if o2 > 0 and x >= k:
                res = min(res, (x - k) + dp(i + 1, o1, o2 - 1))
                
            # Choice 4: op1 then op2
            if o1 > 0 and o2 > 0:
                v1 = (x + 1) // 2
                if v1 >= k:
                    res = min(res, (v1 - k) + dp(i + 1, o1 - 1, o2 - 1))
                    
            # Choice 5: op2 then op1
            if o1 > 0 and o2 > 0 and x >= k:
                v2 = x - k
                res = min(res, (v2 + 1) // 2 + dp(i + 1, o1 - 1, o2 - 1))
                
            return res
            
        return dp(0, op1, op2)
