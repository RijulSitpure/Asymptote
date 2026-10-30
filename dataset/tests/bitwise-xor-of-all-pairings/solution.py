from functools import reduce
import operator

class Solution:
    def xorAllNums(self, nums1: list[int], nums2: list[int]) -> int:
        res = 0
        if len(nums2) % 2 == 1:
            res ^= reduce(operator.xor, nums1)
        if len(nums1) % 2 == 1:
            res ^= reduce(operator.xor, nums2)
        return res
