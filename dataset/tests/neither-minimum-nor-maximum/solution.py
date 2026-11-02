class Solution:
    def findNonMinOrMax(self, nums: list[int]) -> int:
        if len(nums) < 3:
            return -1
        sub = sorted(nums[:3])
        return sub[1]
