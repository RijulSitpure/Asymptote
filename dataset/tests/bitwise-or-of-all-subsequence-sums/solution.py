class Solution:
    def subsequenceSumOr(self, nums: list[int]) -> int:
        ans = 0
        prefix = 0
        for x in nums:
            prefix += x
            ans |= x | prefix
        return ans
