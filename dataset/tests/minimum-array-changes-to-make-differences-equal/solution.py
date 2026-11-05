class Solution:
    def minChanges(self, nums: list[int], k: int) -> int:
        n = len(nums)
        diff = [0] * (k + 2)
        for i in range(n // 2):
            a, b = nums[i], nums[n - 1 - i]
            d = abs(a - b)
            m = max(a, b, k - a, k - b)
            diff[0] += 1
            diff[d] -= 1
            diff[d + 1] += 1
            diff[m + 1] += 1
        
        curr = 0
        min_changes = float('inf')
        for x in range(k + 1):
            curr += diff[x]
            if curr < min_changes:
                min_changes = curr
        return min_changes
