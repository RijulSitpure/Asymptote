class Solution:
    def countSubarrays(self, nums: list[int], k: int) -> int:
        left = 0
        running_sum = 0
        ans = 0
        for right in range(len(nums)):
            running_sum += nums[right]
            while running_sum * (right - left + 1) >= k:
                running_sum -= nums[left]
                left += 1
            ans += (right - left + 1)
        return ans
