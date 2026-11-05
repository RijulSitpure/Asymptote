class Solution:
    def isArraySpecial(self, nums: list[int], queries: list[list[int]]) -> list[bool]:
        n = len(nums)
        pref = [0] * n
        for i in range(1, n):
            pref[i] = pref[i - 1] + (1 if nums[i] % 2 == nums[i - 1] % 2 else 0)
        return [(pref[t] - pref[f]) == 0 for f, t in queries]
