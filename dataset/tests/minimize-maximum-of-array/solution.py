import math

class Solution:
    def minimizeArrayValue(self, nums: list[int]) -> int:
        res = 0
        pref_sum = 0
        for i, x in enumerate(nums):
            pref_sum += x
            avg = math.ceil(pref_sum / (i + 1))
            if avg > res:
                res = avg
        return res
