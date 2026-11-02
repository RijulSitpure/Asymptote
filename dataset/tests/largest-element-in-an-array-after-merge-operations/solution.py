class Solution:
    def maxArrayValue(self, nums: list[int]) -> int:
        curr = nums[-1]
        for i in range(len(nums) - 2, -1, -1):
            if nums[i] <= curr:
                curr += nums[i]
            else:
                curr = nums[i]
        return curr