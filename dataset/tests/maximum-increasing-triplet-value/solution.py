class Solution:
    def maximumTripletValue(self, nums: list[int]) -> int:
        import bisect
        n = len(nums)
        right = [0] * n
        right[-1] = nums[-1]
        for i in range(n - 2, -1, -1):
            right[i] = max(nums[i], right[i + 1])
        left_sorted = [nums[0]]
        ans = -float('inf')
        for j in range(1, n - 1):
            idx = bisect.bisect_left(left_sorted, nums[j]) - 1
            if idx >= 0 and right[j + 1] > nums[j]:
                ans = max(ans, left_sorted[idx] - nums[j] + right[j + 1])
            bisect.insort(left_sorted, nums[j])
        return ans if ans != -float('inf') else -1
