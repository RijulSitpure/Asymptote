from typing import List

class Solution:
    def sortEvenOdd(self, nums: List[int]) -> List[int]:
        even = sorted(nums[0::2])
        odd = sorted(nums[1::2], reverse=True)
        res = []
        for i in range(len(even)):
            res.append(even[i])
            if i < len(odd):
                res.append(odd[i])
        return res
