from typing import List

class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        res = [0] * len(nums)
        pos, neg = 0, 1
        for x in nums:
            if x > 0:
                res[pos] = x
                pos += 2
            else:
                res[neg] = x
                neg += 2
        return res
