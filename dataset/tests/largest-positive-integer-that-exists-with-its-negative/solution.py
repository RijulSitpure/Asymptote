class Solution:
    def findMaxK(self, nums: list[int]) -> int:
        seen = set(nums)
        best = -1
        for x in nums:
            if x > 0 and -x in seen:
                if x > best:
                    best = x
        return best
