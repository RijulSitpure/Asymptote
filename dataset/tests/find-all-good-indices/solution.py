class Solution:
    def findAllGoodIndices(self, nums: list[int], k: int) -> list[int]:
        n = len(nums)
        left = [1] * n
        for i in range(1, n):
            if nums[i] <= nums[i - 1]:
                left[i] = left[i - 1] + 1
        
        right = [1] * n
        for i in range(n - 2, -1, -1):
            if nums[i] <= nums[i + 1]:
                right[i] = right[i + 1] + 1
        
        res = []
        for i in range(k, n - k):
            if left[i - 1] >= k and right[i + 1] >= k:
                res.append(i)
        return res
