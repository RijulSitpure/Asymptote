class Solution:
    def longestSubarray(self, nums: list[int]) -> int:
        max_val = max(nums)
        max_len = 0
        cur_len = 0
        for x in nums:
            if x == max_val:
                cur_len += 1
                if cur_len > max_len:
                    max_len = cur_len
            else:
                cur_len = 0
        return max_len
