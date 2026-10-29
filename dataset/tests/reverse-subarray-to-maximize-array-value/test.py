class Solution:
    def maxValueAfterReverse(self, nums: list[int]) -> int:
        base = sum(abs(nums[i] - nums[i + 1]) for i in range(len(nums) - 1))
        n = len(nums)
        res = base

        for i in range(n - 1):
            res = max(res, base - abs(nums[i] - nums[i + 1]) + abs(nums[0] - nums[i + 1]))
            res = max(res, base - abs(nums[i] - nums[i + 1]) + abs(nums[-1] - nums[i]))

        min_hi = float("inf")
        max_lo = float("-inf")
        for i in range(n - 1):
            a, b = nums[i], nums[i + 1]
            min_hi = min(min_hi, max(a, b))
            max_lo = max(max_lo, min(a, b))

        return max(res, base + max(0, (max_lo - min_hi) * 2))

sol = Solution()
assert sol.maxValueAfterReverse([2, 3, 1, 5, 4]) == 10
assert sol.maxValueAfterReverse([2, 4, 9, 24, 2, 1, 10]) == 68
print("All tests passed successfully.")
