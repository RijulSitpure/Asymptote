class Solution:
    def minimumSwaps(self, nums: list[int]) -> int:
        n = len(nums)
        min_val = min(nums)
        max_val = max(nums)
        min_idx = nums.index(min_val)
        max_idx = n - 1 - nums[::-1].index(max_val)
        swaps = min_idx + (n - 1 - max_idx)
        return swaps - 1 if min_idx > max_idx else swaps
