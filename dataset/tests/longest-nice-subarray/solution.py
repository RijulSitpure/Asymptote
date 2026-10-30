class Solution:
    def longestNiceSubarray(self, nums: list[int]) -> int:
        cur_or = 0
        left = 0
        max_len = 0
        for right in range(len(nums)):
            while (cur_or & nums[right]) != 0:
                cur_or ^= nums[left]
                left += 1
            cur_or |= nums[right]
            max_len = max(max_len, right - left + 1)
        return max_len
