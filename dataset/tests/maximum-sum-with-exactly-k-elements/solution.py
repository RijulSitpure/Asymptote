class Solution:
    def maximizeSum(self, nums: list[int], k: int) -> int:
        m = max(nums)
        return k * m + k * (k - 1) // 2
