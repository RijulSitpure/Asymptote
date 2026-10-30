class Solution:
    def arithmeticTriplets(self, nums: list[int], diff: int) -> int:
        s = set(nums)
        return sum(1 for x in nums if x + diff in s and x + 2 * diff in s)
