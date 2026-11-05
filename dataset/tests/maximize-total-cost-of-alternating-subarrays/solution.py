class Solution:
    def maximumTotalCost(self, nums: list[int]) -> int:
        pos = nums[0]
        neg = float('-inf')
        for x in nums[1:]:
            new_pos = max(pos, neg) + x
            new_neg = pos - x
            pos, neg = new_pos, new_neg
        return max(pos, neg)