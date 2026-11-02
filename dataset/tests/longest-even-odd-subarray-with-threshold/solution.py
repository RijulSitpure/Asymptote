class Solution:
    def longestAlternatingSubarray(self, nums: list[int], threshold: int) -> int:
        n = len(nums)
        ans = 0
        for l in range(n):
            if nums[l] % 2 == 0 and nums[l] <= threshold:
                r = l
                while r + 1 < n and nums[r + 1] <= threshold and nums[r + 1] % 2 != nums[r] % 2:
                    r += 1
                ans = max(ans, r - l + 1)
        return ans
