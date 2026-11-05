class Solution:
    def minOperationsToMakeMedianK(self, nums: list[int], k: int) -> int:
        nums.sort()
        m = len(nums) // 2
        ans = abs(nums[m] - k)
        for i in range(m):
            if nums[i] > k:
                ans += nums[i] - k
        for i in range(m + 1, len(nums)):
            if nums[i] < k:
                ans += k - nums[i]
        return ans
