class Solution:
    def minElement(self, nums: list[int]) -> int:
        return min(sum(int(d) for d in str(x)) for x in nums)
