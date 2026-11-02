class Solution:
    def countCompleteSubarrays(self, nums: list[int]) -> int:
        k = len(set(nums))
        counts = {}
        left = 0
        ans = 0
        for right in range(len(nums)):
            counts[nums[right]] = counts.get(nums[right], 0) + 1
            while len(counts) == k:
                counts[nums[left]] -= 1
                if counts[nums[left]] == 0:
                    del counts[nums[left]]
                left += 1
            ans += left
        return ans