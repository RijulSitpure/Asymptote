class Solution:
    def countMatchingSubarrays(self, nums: list[int], pattern: list[int]) -> int:
        def sgn(x):
            return 1 if x > 0 else (-1 if x < 0 else 0)
        diff = [sgn(nums[i + 1] - nums[i]) for i in range(len(nums) - 1)]
        m = len(pattern)
        ans = 0
        for i in range(len(diff) - m + 1):
            if diff[i:i + m] == pattern:
                ans += 1
        return ans
