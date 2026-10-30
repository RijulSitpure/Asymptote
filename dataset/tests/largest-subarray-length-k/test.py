class Solution:
    def largestSubarray(self, nums: list[int], k: int) -> list[int]:
        max_idx = 0
        for i in range(1, len(nums) - k + 1):
            if nums[i] > nums[max_idx]:
                max_idx = i
        return nums[max_idx:max_idx + k]

sol = Solution()
assert sol.largestSubarray([1,4,5,2,3], 3) == [5,2,3]
assert sol.largestSubarray([1,4,5,2,3], 4) == [4,5,2,3]
assert sol.largestSubarray([1,4,5,2,3], 1) == [5]
print("All tests passed successfully.")
