class Solution:
    def minimumCost(self, nums: list[int]) -> int:
        return nums[0] + sum(sorted(nums[1:])[:2])
