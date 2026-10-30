class Solution:
    def distinctAverages(self, nums: list[int]) -> int:
        nums.sort()
        i, j = 0, len(nums) - 1
        seen = set()
        while i < j:
            seen.add(nums[i] + nums[j])
            i += 1
            j -= 1
        return len(seen)
