class Solution:
    def minImpossibleOR(self, nums: list[int]) -> int:
        s = set(nums)
        val = 1
        while val in s:
            val <<= 1
        return val
