class Solution:
    def countFairPairs(self, nums: list[int], lower: int, upper: int) -> int:
        nums.sort()
        def count_less_equal(val: int) -> int:
            res = 0
            i, j = 0, len(nums) - 1
            while i < j:
                if nums[i] + nums[j] <= val:
                    res += (j - i)
                    i += 1
                else:
                    j -= 1
            return res
        return count_less_equal(upper) - count_less_equal(lower - 1)
