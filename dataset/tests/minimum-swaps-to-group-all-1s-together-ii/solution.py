from typing import List

class Solution:
    def minSwaps(self, nums: List[int]) -> int:
        k = sum(nums)
        if k <= 1:
            return 0
        n = len(nums)
        curr = sum(nums[:k])
        max_ones = curr
        for i in range(n):
            curr += nums[(i + k) % n] - nums[i]
            if curr > max_ones:
                max_ones = curr
        return k - max_ones
