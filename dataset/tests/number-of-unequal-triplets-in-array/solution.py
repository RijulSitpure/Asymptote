from collections import Counter

class Solution:
    def unequalTriplets(self, nums: list[int]) -> int:
        freq = Counter(nums)
        vals = list(freq.values())
        ans = 0
        left = 0
        n = len(nums)
        for c in vals:
            right = n - left - c
            ans += left * c * right
            left += c
        return ans
