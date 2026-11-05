class Solution:
    def constructTransformedArray(self, nums: list[int]) -> list[int]:
        n = len(nums)
        return [nums[(i + nums[i]) % n] for i in range(n)]
