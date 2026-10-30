class Solution:
    def minimumDeletions(self, nums: list[int]) -> int:
        n = len(nums)
        if n <= 2:
            return n

        min_idx = nums.index(min(nums))
        max_idx = nums.index(max(nums))

        i = min(min_idx, max_idx)
        j = max(min_idx, max_idx)

        both_front = j + 1
        both_back = n - i
        one_each = (i + 1) + (n - j)

        return min(both_front, both_back, one_each)
