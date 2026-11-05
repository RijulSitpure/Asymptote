class Solution:
    def minOperations(self, nums: list[int], k: int) -> int:
        for x in nums:
            if x < k:
                return -1
        unique = set(nums)
        return len(unique) - (1 if k in unique else 0)
