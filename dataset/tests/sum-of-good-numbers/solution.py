class Solution:
    def sumOfGoodNumbers(self, nums: list[int], k: int) -> int:
        n = len(nums)
        ans = 0
        for i in range(n):
            if (i - k < 0 or nums[i] > nums[i - k]) and (i + k >= n or nums[i] > nums[i + k]):
                ans += nums[i]
        return ans
