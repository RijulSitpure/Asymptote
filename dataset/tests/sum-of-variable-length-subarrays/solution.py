class Solution:
    def subarraySum(self, nums: list[int]) -> int:
        from itertools import accumulate
        pref = list(accumulate(nums, initial=0))
        ans = 0
        for i, x in enumerate(nums):
            start = max(0, i - x)
            ans += pref[i + 1] - pref[start]
        return ans
