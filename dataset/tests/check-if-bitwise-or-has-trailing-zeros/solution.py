class Solution:
    def hasTrailingZeros(self, nums: list[int]) -> bool:
        even_count = sum(1 for x in nums if x % 2 == 0)
        return even_count >= 2
