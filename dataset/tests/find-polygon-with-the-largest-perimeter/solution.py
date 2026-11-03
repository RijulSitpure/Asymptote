class Solution:
    def largestPerimeter(self, nums: list[int]) -> int:
        nums.sort()
        prefix = 0
        ans = -1
        for num in nums:
            if num < prefix:
                ans = prefix + num
            prefix += num
        return ans
