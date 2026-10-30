class Solution:
    def waysToSplitArray(self, nums: list[int]) -> int:
        total = sum(nums)
        left_sum = 0
        splits = 0
        for i in range(len(nums) - 1):
            left_sum += nums[i]
            if left_sum >= total - left_sum:
                splits += 1
        return splits
