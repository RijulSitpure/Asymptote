class Solution:
    def countSubarrays(self, nums: list[int]) -> int:
        total = 0
        cur_len = 0
        for i in range(len(nums)):
            if i > 0 and nums[i] > nums[i - 1]:
                cur_len += 1
            else:
                cur_len = 1
            total += cur_len
        return total
