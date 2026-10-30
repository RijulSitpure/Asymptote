class Solution:
    def beautifulSubarrays(self, nums: list[int]) -> int:
        from collections import defaultdict
        count = defaultdict(int)
        count[0] = 1
        pref = 0
        ans = 0
        for x in nums:
            pref ^= x
            ans += count[pref]
            count[pref] += 1
        return ans
