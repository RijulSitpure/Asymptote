class Solution:
    def countSubarrays(self, nums: list[int], k: int) -> int:
        max_val = max(nums)
        ans = 0
        left = 0
        count = 0
        for right, num in enumerate(nums):
            if num == max_val:
                count += 1
            while count >= k:
                if nums[left] == max_val:
                    count -= 1
                left += 1
            ans += left
        return ans
