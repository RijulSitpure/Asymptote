class Solution:
    def alternatingSubarray(self, nums: list[int]) -> int:
        n = len(nums)
        ans = -1
        for i in range(n):
            expected_diff = 1
            j = i
            while j + 1 < n and nums[j + 1] - nums[j] == expected_diff:
                expected_diff *= -1
                j += 1
            if j > i:
                ans = max(ans, j - i + 1)
        return ans
