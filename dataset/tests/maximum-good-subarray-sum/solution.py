class Solution:
    def maximumSubarraySum(self, nums: list[int], k: int) -> int:
        pref = 0
        min_pref = {}
        ans = float('-inf')
        for x in nums:
            if x in min_pref:
                min_pref[x] = min(min_pref[x], pref)
            else:
                min_pref[x] = pref
            pref += x
            if x - k in min_pref:
                ans = max(ans, pref - min_pref[x - k])
            if x + k in min_pref:
                ans = max(ans, pref - min_pref[x + k])
        return ans if ans != float('-inf') else 0
