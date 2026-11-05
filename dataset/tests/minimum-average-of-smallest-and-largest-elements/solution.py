class Solution:
    def minimumAverage(self, nums: list[int]) -> float:
        nums.sort()
        n = len(nums)
        return min((nums[i] + nums[n - 1 - i]) / 2 for i in range(n // 2))