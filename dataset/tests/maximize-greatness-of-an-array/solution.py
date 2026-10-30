class Solution:
    def maximizeGreatness(self, nums: list[int]) -> int:
        nums.sort()
        i = 0
        for j in range(len(nums)):
            if nums[j] > nums[i]:
                i += 1
        return i
