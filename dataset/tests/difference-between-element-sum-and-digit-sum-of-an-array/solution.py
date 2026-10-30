class Solution:
    def differenceOfSum(self, nums: list[int]) -> int:
        elem_sum = sum(nums)
        digit_sum = sum(int(d) for x in nums for d in str(x))
        return elem_sum - digit_sum
