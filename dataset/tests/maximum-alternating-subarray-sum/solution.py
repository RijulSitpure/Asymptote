class Solution:
    def maximumAlternatingSubarraySum(self, nums: list[int]) -> int:
        ans = nums[0]
        pos = nums[0]
        neg = float('-inf')

        for x in nums[1:]:
            new_pos = max(x, neg + x)
            new_neg = pos - x
            pos, neg = new_pos, new_neg
            ans = max(ans, pos, neg)
        return ans
