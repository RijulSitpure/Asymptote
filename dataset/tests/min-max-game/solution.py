class Solution:
    def minMaxGame(self, nums: list[int]) -> int:
        while len(nums) > 1:
            n = len(nums) // 2
            nums = [
                min(nums[2 * i], nums[2 * i + 1]) if i % 2 == 0
                else max(nums[2 * i], nums[2 * i + 1])
                for i in range(n)
            ]
        return nums[0]
