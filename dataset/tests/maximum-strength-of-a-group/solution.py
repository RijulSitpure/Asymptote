class Solution:
    def maxStrength(self, nums: list[int]) -> int:
        if len(nums) == 1:
            return nums[0]
        pos = [x for x in nums if x > 0]
        neg = [x for x in nums if x < 0]
        zeros = [x for x in nums if x == 0]
        neg.sort()
        if len(neg) % 2 == 1:
            neg.pop()
        chosen = pos + neg
        if not chosen:
            return 0
        prod = 1
        for x in chosen:
            prod *= x
        return prod
