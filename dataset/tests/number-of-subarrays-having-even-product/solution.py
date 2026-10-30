class Solution:
    def evenProduct(self, nums: list[int]) -> int:
        last_even = -1
        ans = 0
        for i, x in enumerate(nums):
            if x % 2 == 0:
                last_even = i
            ans += last_even + 1
        return ans
