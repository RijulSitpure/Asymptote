class Solution:
    def distinctDifferenceArray(self, nums: list[int]) -> list[int]:
        n = len(nums)
        suffix_distinct = [0] * (n + 1)
        seen_suff = set()
        for i in range(n - 1, -1, -1):
            seen_suff.add(nums[i])
            suffix_distinct[i] = len(seen_suff)
        ans = []
        seen_pref = set()
        for i in range(n):
            seen_pref.add(nums[i])
            ans.append(len(seen_pref) - suffix_distinct[i + 1])
        return ans
