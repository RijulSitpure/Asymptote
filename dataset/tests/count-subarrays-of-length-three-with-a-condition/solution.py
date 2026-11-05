class Solution:
    def countSubarrays(self, nums: list[int]) -> int:
        count = 0
        for i in range(1, len(nums) - 1):
            if (nums[i - 1] + nums[i + 1]) * 2 == nums[i]:
                count += 1
        return count
