from typing import List

class Solution:
    def maximumANDSum(self, nums: List[int], numSlots: int) -> int:
        memo = {}
        def dp(i, mask):
            if i == len(nums):
                return 0
            if (i, mask) in memo:
                return memo[(i, mask)]
            ans = 0
            cur_mask = mask
            for slot in range(1, numSlots + 1):
                cnt = cur_mask % 3
                cur_mask //= 3
                if cnt < 2:
                    val = (nums[i] & slot) + dp(i + 1, mask + (3 ** (slot - 1)))
                    if val > ans:
                        ans = val
            memo[(i, mask)] = ans
            return ans
        return dp(0, 0)
