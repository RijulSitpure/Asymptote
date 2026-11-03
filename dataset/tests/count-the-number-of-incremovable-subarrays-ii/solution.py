class Solution:
    def incremovableSubarrayCount(self, nums: list[int]) -> int:
        n = len(nums)
        p = 0
        while p + 1 < n and nums[p] < nums[p + 1]:
            p += 1
        if p == n - 1:
            return n * (n + 1) // 2
        s = n - 1
        while s > 0 and nums[s - 1] < nums[s]:
            s -= 1
        ans = (n - s + 1)
        j = s
        for i in range(p + 1):
            while j < n and nums[j] <= nums[i]:
                j += 1
            ans += (n - j + 1)
        return ans
