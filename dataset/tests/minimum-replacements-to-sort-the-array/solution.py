class Solution:
    def minimumReplacement(self, nums: list[int]) -> int:
        ans = 0
        limit = nums[-1]
        for i in range(len(nums) - 2, -1, -1):
            if nums[i] > limit:
                parts = (nums[i] + limit - 1) // limit
                ans += parts - 1
                limit = nums[i] // parts
            else:
                limit = nums[i]
        return ans
