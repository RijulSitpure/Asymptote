class Solution:
    def maximumDifference(self, nums: list[int]) -> int:
        min_val = nums[0]
        max_diff = -1
        for x in nums[1:]:
            if x > min_val:
                max_diff = max(max_diff, x - min_val)
            else:
                min_val = x
        return max_diff
