class Solution:
    def countAlternatingSubarrays(self, nums: list[int]) -> int:
        ans = 1
        cur = 1
        for i in range(1, len(nums)):
            if nums[i] != nums[i - 1]:
                cur += 1
            else:
                cur = 1
            ans += cur
        return ans
