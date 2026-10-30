class Solution:
    def arrayChange(self, nums: list[int], operations: list[list[int]]) -> list[int]:
        pos = {val: i for i, val in enumerate(nums)}
        for old, new in operations:
            idx = pos.pop(old)
            nums[idx] = new
            pos[new] = idx
        return nums
